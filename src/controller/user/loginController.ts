import { Request,Response } from 'express'
import redisClient from '../../provider/redis'
import { userSchema } from '../../model/user'
import {sessionSchema} from '../../model/session'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const loginController=async (req:Request,res:Response)=>{
    let token:string=""
    let data=await userSchema.findOne({
    where:{
            [Op.and]: [
              { username: req.body?.username },
              { password: req.body?.password }
            ]      
        }
    })
        let userData=JSON.parse(JSON.stringify(data))
        token=jwt.sign({id:userData.id},'s1h2a3',{expiresIn:3600})
    if(userData){
        let redisResponse=await redisClient.get(`${userData.id}`);
        if(redisResponse==null){
            console.log("cache miss")
            let isActiveSession=await sessionSchema.findOne({
                where:{
                        [Op.and]: [
                        { userId: userData.id},
                        { isActive: true }
                        ]      
                    }
            })
            if(JSON.parse(JSON.stringify(isActiveSession))==null){
            {
                await sessionSchema.create(
                    {
                        userId:userData.id,
                        isActive:true
                    }
                )
                redisClient.setEx(`${userData.id}`,3600,'true')
            }
            }else{
                redisClient.setEx(`${userData.id}`,3600,'true')
            }
            res.status(201).send(token)
        }else{
            console.log('cache hit')
            res.status(200).send(token)
        }
    }else{
            return res.status(404).send("Please register yourself first")
    }    
}
