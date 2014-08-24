var info = require('./info');
var cache = require('./cache');
var debug = require('./debug');

module.exports = function(app) {
    app.get('/', info.Index);
    app.get('/:p1/:p2', cache.Request);
    
    app.get('/debug/:key/:com', debug.Debug);
};