
const chalk = require('chalk');
const env = process.env.NODE_ENV; // 获取环境参数

console.log('环境为' + chalk.yellow(env));

// 配置
let MYSQL_CONF;
let REDIS_CONF;
// 判断：运行环境
if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'abc355488A',
        port: '3306',
        database: 'myblog'
    };

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'abc355488A',
        port: '3306',
        database: 'myblog'
    };

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

}


module.exports = {
    MYSQL_CONF,
    REDIS_CONF
};