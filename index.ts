import express from 'express';
import dotenv from 'dotenv'
import swaggerJsDocs from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

//database importing

import { redFun } from './src/provider/redis'//redis

//importing routers
//user routes
import signup from './src/router/user/auth/signup'
import login from './src/router/user/auth/login'
import logout from './src/router/user/auth/logout'
import getProfile from './src/router/user/profile/getProfile'
import addAddress from './src/router/user/profile/addAddress'
import forgetPass from './src/router/user/auth/forgetPass'
import addProfilePic from './src/router/user/profile/addPicture'
import addDetails from './src/router/user/profile/updateProfileDetails'
//Product Routes
import addProduct from './src/router/activity/addProduct'
import deleteProduct from './src/router/activity/deleteRouter'
import buyProductRoutes from './src/router/activity/buyProduct'
import filterCategory from './src/router/activity/filter'
//All constant decleration

const app=express()
const port=process.env.PORT;
dotenv.config();
app.use(express.json())
//Swagger
const SwaggerOptions={
    swaggerDefinition:{
        info:{
            title:'Advertisement Managenemt System',
            version:'1.0.1'
        }
    },
    apis:['./swagger/swagger-user.yaml']
}
const swaggerDocs=swaggerJsDocs((SwaggerOptions))

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
//Routers

app.use('/user',signup)
app.use('/user',login)
app.use('/user',logout)
app.use("/user",getProfile)
app.use("/user",addAddress)
app.use('/user',forgetPass)
app.use('/user',addProfilePic)
app.use('/user',addDetails)
app.use('/product',addProduct)
app.use('/product',deleteProduct)
app.use('/product',buyProductRoutes)
app.use('/product',filterCategory)
redFun();//function calling for redis connection

app.listen(port,()=>{
    console.log(`Listen to the port ${port}`)
})