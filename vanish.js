var experss = require("express");
var config = require("./config").config;
var info = require("./info");

var app = express();

routes(app);

//错误处理
app.use(info.error_500);

app.listen(config.listenPort, function () {
    
});

module.exports = app;