//引入express框架
const express=require("express")
//引入路由器
const user=require('./router/user.js')
// console.log(user)测试打印,返回空对象说明引入成功
//引入body-parse中间件//引入--1
const bodyParse=require("body-parser")
//创建服务器
const app=express();
//引入cors模块
const cors=require("cors");
const pool = require("./pool.js");
//创建端口
app.listen(5050,()=>{
  console.log('服务器启动...')
});
//托管静态资源到public目录
app.use(express.static('public'));
//应用中间件,将post解析为对象//引入--2
app.use(bodyParse.urlencoded({
    extended:false
}));
//引用cors也可以解决跨域
app.use(cors({
  origin:['http://localhost:8080','http://127.0.0.1:8080']
}))
//解决跨域
// app.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
//   });

// app.get('/keftooer',(req,res)=>{
//   let sql='select * from kefooter';
//   pool.query(sql,(err,result)=>{
//     if(err)throw err;
//     res.send({message:'查询成功',code:1,result:result})
//     console.log(result)
//   })
// })
//创建用户登录接口
app.post('/login',(req,res)=>{
  let phone=req.body.phone;
  console.log(phone)
  let upwd=req.body.upwd;
  console.log(upwd)
  let  sql='select * from user WHERE phone=? and upwd=?;'
  pool.query(sql,[phone,upwd],(err,result)=>{
    if(err)throw err;
    // console.log(result)
    if(result){
      res.send({message:'登录成功',code:1,result})
    }else{
      res.send({message:'登录失败',code:0})
    }
  })
})
//创建用户注册接口
app.post('/loginOff',(req,res)=>{
  let phone=req.body.phone
  let upwd=req.body.upwd
  console.log(phone)
  console.log(upwd)
  let sql='select * from user where phone=?';
  pool.query(sql,[phone],(err,result)=>{
    if(err)throw err
    if(result.length>0){
      res.send({message:'注册失败',code:0})
    }else{
      console.log(upwd)
      let sql='insert into user (phone,upwd) value (?,?)';
      pool.query(sql,[phone,upwd],(err,result)=>{
        if(err)throw err;
        res.send({message:'注册成功',code:1})
      })
    }
  })
})
//商品信息接口
app.get('/list',(req,res)=>{
  let sql='select * from kelobtop';
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send({message:'查询成功',code:1,result:result})
    // console.log(result)
  })
})
//详情页接口
app.get('/details',(req,res)=>{
  let id=req.query.id;
  let sql='select * from kedetails where id = ?';
  console.log(id)
  pool.query(sql,[id],(err,result)=>{
    if(err)throw err;
    res.send({message:'查询成功',code:1,result:result})
    console.log(result)
  })
})
//挂载路由器,并添加前缀/user
app.use('/user',user);
