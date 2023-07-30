import express from 'express';
import dotenv from 'dotenv'
//database importing

import { redFun } from './src/provider/redis'//redis

//importing routers
import signup from './src/router/user/auth/signup'
import login from './src/router/user/auth/login'
import logout from './src/router/user/auth/logout'
import getProfile from './src/router/user/profile/getProfile'
import addAddress from './src/router/user/profile/addAddress'
import forgetPass from './src/router/user/auth/forgetPass'
import addProfilePic from './src/router/user/profile/addPicture'
import addProduct from './src/router/activity/addProduct'
//All constant decleration

const app=express()
const port=process.env.PORT;
dotenv.config();
app.use(express.json())

//Routers

app.use('/user',signup)
app.use('/user',login)
app.use('/user',logout)
app.use("/user",getProfile)
app.use("/user",addAddress)
app.use('/user',forgetPass)
app.use('/user',addProfilePic)
app.use('/product',addProduct)
redFun();//function calling for redis connection
app.listen(port,()=>{
    console.log(`Listen to the port ${port}`)
})