exports.encode = function(url){
    var obj = url;
    obj = obj.split('').reverse().join('');
    obj = new Buffer(obj);
    obj = obj.toString('base64');
    obj = obj.split('').reverse().join('');
    obj = encodeURIComponent(obj);
    return obj;
};
exports.decode = function(str){
    var obj = str;
    obj = decodeURIComponent(obj);
    obj = obj.split('').reverse().join('');
    obj = new Buffer(obj, "base64");
    obj = obj.toString();
    obj = obj.split('').reverse().join('');
    return obj;
};