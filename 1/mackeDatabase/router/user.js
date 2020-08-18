//先引入express
const express=require("express");
//引入连接池模块(自定义模块)
const pool=require('../pool.js')
// console.log(pool)//测试打印连接池对象是否导入成功
//创建路由器对象
const router=express.Router();
//往路由器添加路由
//1.用户注册路由
router.post('/reg',(req,res)=>{
    //获取用户传递的数据
    let obj=req.body;
    // console.log(req.body)
    //检测用户输入数据是否为空
    if(obj.phone==""){
        //Error: Can't set headers after they are sent.服务端多次执行res.send所以报错
        res.send({code:401,msg:'phone required'})
        return;
    }else if(obj.uname==""){
        res.send({code:401,msg:'uname required'})
        return;
    }else if(!obj.upwd){
        res.send({code:401,msg:'upwd required'})
        return;
    }else if(obj.cpwd==""){
        res.send({code:401,msg:'cpwd required'})
        return;
    }
    //验证是否有此数据
    pool.query('select * from user where phone =?', [obj.phone], (err, result) => {
        console.log(result)
        //因为result返回的是空数组,所以如果
        if (result.length !== 0) {
            res.send(`手机号以被注册`)
            return;
        } else { 
            //连接池对象导入之后,执行sql语句
            pool.query('INSERT INTO user SET ?', [obj], (err, result) => {
                if (err) throw err;
                res.send('注册成功')
            });
        }
    })
})

//用户登录路由
    //1.获取传递的数据
router.post('/login',(req,res)=>{
    let obj=req.body
    pool.query('select * from user where phone =? AND upwd=?', [obj.phone,obj.upwd], (err,result) => {
        console.log(result);
        if(result.length==0){
            res.send({code:301,msg:'login err'})
            return;
        }else{
            res.send({code:200,msg:'login suc'})
        }
    })
})
// 商品详情路由
router.get('/header',(req,res)=>{
   // let obj=req.query;
    //连接池对象导入之后执行sql语句
    pool.query('select * from kelobtop',(err,result)=>{
        if(err)throw err;
        console.log(result)
        console.log(err)
        res.send(result)
        // console.log(result)
    })
})
//路由器对象导出-->在服务器app.js下挂载
module.exports=router;
