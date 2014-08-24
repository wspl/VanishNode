var info = require('./info');
var cache = require('./cache');
var debug = require('./debug');
var config = require('./config').config;

module.exports = function(app) {
    var toVanish = function(arg,func){
        app.get(arg,function(req,res){
            res.set('X-Powered-By','VanishNode/' + config.version);
            res.set('X-Cache','Hit from ' + config.nodeName);
            func(req,res);
        });
    };
    
    toVanish('/', info.Index);
    toVanish('/:p1/:p2', cache.Request);
    
    toVanish('/debug/:key/:com', debug.Debug);
};