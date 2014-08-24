var express = require("express");
var config = require("./config").config;
var info = require("./info");
var routes = require("./routes");

var app = express();

routes(app);

//错误处理
app.use(info.Error_404);

app.listen(config.listenPort, function () {
    
});

module.exports = app;