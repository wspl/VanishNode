var config = require('./config').config;
var redis = require('redis');
var fs = require('fs');
var client = redis.createClient(config.dbPort);
client.on('error', function (err) {
    console.log('Error ' + err);
});

exports.Debug = function(req,res){
    if(config.debugMode && (req.params.key == config.debugKey)){
        switch(req.params.com){
            case 'dropAll':
                client.keys(config.dbPre + ":*", function (err, arrayOfKeys) {
                    arrayOfKeys.forEach( function (key) {
                        client.del(key);
                    });
                });
                deleteFolderRecursive(config.storagePath);
                fs.mkdir(config.storagePath);
                res.send('图片缓存/数据库清理成功！');
            break;
        }
    }else{
        res.send('调试模式未开启或者密钥错误！');
    }
};

var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};