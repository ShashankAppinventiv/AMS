
import { Request,Response } from "express";
import redisclient from '../../provider/redis';
import dotenv from 'dotenv'
import { userSchema } from "../../model/user";
dotenv.config()
export const fpController=async (req:Request,res:Response)=>{
    try{
        let otp=await redisclient.get(`OTP${req.body.username}`);
        console.log(otp)
        if(req.body.otp==otp&& (req.body.password).length>=8){
            userSchema.update(
                {password:req.body.password},
                {where : {username : req.body.username}})
            redisclient.del(`OTP${req.body.id}`)
            res.status(201).send("Password changed successfully")
        }else{
            res.status(200).send("OTP Either invalid or expired")
        }
    }catch(error){
        res.status(400).send(error)
    }
}