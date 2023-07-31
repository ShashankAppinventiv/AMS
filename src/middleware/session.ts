import {sessionSchema} from '../model/session'
import { Request,Response } from 'express'
import redisclient from '../provider/redis'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Op } from 'sequelize'
dotenv.config();
export const sessionCheck=async (req:Request,res:Response,next:()=>void)=>{
  //secretKey
  let secretKey=""+process.env.SECRET_KEY
  //JWT Token
  let token=""+req.headers.authorization
  let decode:any;
  try{ 
        decode= jwt.verify(token,secretKey)
        req.body.id=decode?.id;
        let redisData=await redisclient.get(`${decode?.id}`)
        if(!(redisData==="true")){
            console.log("cache miss")
        let data=await sessionSchema.findOne({
            where:{
                    [Op.and]: [
                      { userId: decode?.id },
                      { isActive: true }
                    ]      
                }
            })
            data=JSON.parse(JSON.stringify(data))
            if(data)
            {
              redisclient.setEx(`${decode?.id}`,3600,"true")
              next()
            }else{
                res.send("Authentication error")
            }
        }else {
            console.log("cache hit")
            next()
        }
    }catch(err){
    res.status(400).send(err)
  }
}