var pkg = require('./package.json');

var config = {
    /* 基础设置 */
    nodeName: "Linode/Tokyo",   //节点名称，将以名为Node-Name的头信息输出
    hostname: "localhost",      //主机名称，一般设置成域名
    listenPort: 3000,           //监听端口
    
    /* Redis设置 */
    dbHost: "localhost",        //Redis数据库地址
    dbPre: "vn",                //键值前缀
    
    /* 存储设置 */
    storagePath: "./storage",   //存储目录，末尾不带'/'
    partNum: "1",               //分区特征，1对应36个区，n对应36^n个区
    
    /* 压缩设置 */
    allowSize: [1280,640,240],  //允许的缓存的大小
    tempPath: "./temp",         //图片临时文件夹
    
    /* 程序信息 */
    version: pkg.version,
    name: "VanishNode",
    allowNewCache: true         //是否允许新的缓存
}

module.exports = config;
module.exports.config = config;