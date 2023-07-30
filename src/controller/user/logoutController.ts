import jwt from 'jsonwebtoken'
import { Request,Response } from 'express'
import {sessionSchema} from '../../model/session'
import redisClient from '../../provider/redis'
export const logoutController=async (req:Request,res:Response)=>{
    try{
        let token:string=""+req.headers.authorization;
        let decode= JSON.parse(JSON.stringify(jwt.verify(token,'s1h2a3')))
        let data=await sessionSchema.update(
            { isActive: false },
            { where: { userId: decode?.id } }
          )
        await redisClient.del(`${decode?.id}`)
        res.status(200).send("Logout successfully")
    }catch(error){
        res.status(500).send(error)
    }
}