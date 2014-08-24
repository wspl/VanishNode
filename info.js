exports.Index = function(req,res){
    res.send("Welcome to VanishNode!");
};

exports.Error_404 = function(req,res){
    res.send(404,"<h1>404 - Page Not Found!</h1>");
};

exports.Error_Arg = function(req,res){
    res.send("参数错误");
};