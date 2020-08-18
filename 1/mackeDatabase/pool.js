//1.引入mysql
const mysql=require('mysql')

//创建连接池对象
const pool=mysql.createPool({
    host:'127.0.0.1',//服务器
    port:'3306',//要链接的端口号
    user:'root',
    password:'',
    database:'kesongfang',
    connectionLimit:15
});
// 导出链接池对象
module.exports=pool;