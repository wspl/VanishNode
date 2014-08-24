var info = require("./info");
var cahe = require("./cache");

module.exports = function(app) {
    app.get('/', info.index);
    app.get('/:p1/:p2', cache.request);
    app.get('/404', info.error_404);
};