var md5 = require('MD5');
var sharp = require('sharp');
var redis = require('redis');
var request = require('request');
var fs = require('fs');
var info = require('./info');
var urlcrypt = require('./urlcrypt');
var config = require('./config').config;

var client = redis.createClient(config.dbPort);
client.on('error', function (err) {
    console.log('Error ' + err);
});

var URLCache = function (Token, imageSize, callback){
    var reqURL = urlcrypt.decode(Token);
    var dbKey = config.dbPre + ":" + "url_" + imageSize + "_" + md5(reqURL);
    client.get(dbKey, function(err, reply){
        if(!err){
            if(reply){
                callback(null, GetCache(reply,imageSize));
            }else{
                ImageCache(reqURL, imageSize, function(err, result, imageHash){
                    client.set(dbKey,imageHash);
                    callback(err, result);
                });
            }
        }else{
            callback(err);
        }
    });
};

var ImageCache = function (reqURL, imageSize, callback){
    VerifyURL(reqURL, function(isok){
        if(isok){
            DownloadImage(reqURL, function(err, result){
                var imageHash = md5(result);
                fs.mkdir(GetCache(imageHash,null,true),null,function(){
                    sharp(result)
                        .resize(parseInt(imageSize), null)
                        .progressive()
                        .toFile(GetCache(imageHash,imageSize),
                        function(err){
                            callback(err,GetCache(imageHash,imageSize),imageHash);
                        }
                    );
                });
            });
        }else{
            callback("Invalid URL!");
        }
    });
};

var GetCache = function (hash, imageSize, onlyDir){
    var partName = hash.substr(0,config.partNum);
    if(!onlyDir){
        return config.storagePath + "/" + partName + "/" + imageSize + "_" + hash + ".jpg";
    }else{
        return config.storagePath + "/" + partName;
    }
}

var DownloadImage = function (reqURL, callback){
    request({url: reqURL, encoding: null}, function (err, res, body){
        callback(err, body);
    });
}

var VerifyURL = function (reqURL, callback){
    var allowType = ['image/jpeg','image/png','image/gif'];
    request(reqURL, function (err, res, body){
        if(allowType.indexOf(res.headers['content-type']) != -1
        && parseInt(res.headers['content-length']) <= config.maxSize * 1024 * 1024){
            callback(true);
        }else{
            callback(false);
        }
    });
}

var PathMaker = function(dirpath, mode, callback) {
    path.exists(dirpath, function(exists) {
        if(exists) {
            callback(dirpath);
        }else{
            PathMaker(path.dirname(dirpath), mode, function(){
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
};

exports.Request = function (req, res){
    //验证URL格式
    var p1 = req.params.p1;
    var p2 = req.params.p2.replace(".jpg","");
    if(req.params.p2.substr(req.params.p2.length-4) == '.jpg'){
        if(config.allowSize.indexOf(parseInt(p1)) != -1){
            //res.send("在参数1中找到大小，即：/大小/Token.jpg");
            URLCache(p2, p1, function(err, result){
                if(!err){
                    res.set('Content-Type', 'image/jpeg');
                    res.sendfile(result);
                }else{
                    res.send("yooo" + err);
                }
            });
        }else if(config.allowSize.indexOf(parseInt(p2)) != -1){
            //res.send("在参数2中找到大小，即：/Token/大小.jpg");
            URLCache(p1, p2, function(err, result){
                if(!err){
                    res.set('Content-Type', 'image/jpeg');
                    res.sendfile(result);
                }else{
                    res.send("yooo" + err);
                }
            });
            
        }else{
            info.Error_Arg(req, res);
        }
    }else{
        info.Error_Arg(req, res);
    }
};