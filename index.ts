import express from 'express';
import dotenv from 'dotenv'
//database importing

import redisClient, { redFun } from './src/provider/redis'//redis

//importing routers
import signup from './src/router/user/signup'
import login from './src/router/user/login'
import logout from './src/router/user/logout'
//All constant decleration

const app=express()
const port=process.env.PORT;
dotenv.config();
app.use(express.json())

//Routers

app.use('/user',signup)
app.use('/user',login)
app.use('/user',logout)

redFun();//function calling for redis connection
app.listen(port,()=>{
    console.log(`Listen to the port ${port}`)
})