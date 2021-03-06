var pkg = require('./package.json');

var config = {
    /* 基础设置 */
    nodeName: 'Linode/Tokyo',   //节点名称，将以名为Node-Name的头信息输出
    hostname: 'localhost',      //主机名称，一般设置成域名
    listenPort: 3000,           //监听端口
    debugMode: true,            //调试模式，将开启/debug/{key}/{command}系列功能
    debugKey: 'vanish',         //调试模式密钥
    
    /* Redis设置 */
    dbPort: 6379,               //Redis数据库端口
    dbPre: 'vn',                //键值前缀
    
    /* 缓存设置 */
    storagePath: __dirname + '/.storage',   //存储目录，末尾不带'/'，必须是绝对路径
    partNum: 1,                 //分区特征，1对应16个区，n对应16^n个区
    maxSize: 3,                 //允许的最大缓存大小，单位：MB
    
    /* 压缩设置 */
    allowSize: [0,1280,640,240],  //允许的缓存的宽度，0为不调整大小
    
    /* 程序信息 */
    version: pkg.version,
    name: 'VanishNode',
    allowNewCache: true         //是否允许新的缓存
}

module.exports = config;
module.exports.config = config;