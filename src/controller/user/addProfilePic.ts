import { userSchema } from "../../model/user";

import { Request,Response } from "express";
import fs from 'fs'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { Op } from 'sequelize'
dotenv.config();
export const addPicController=async (req:Request,res:Response)=>{
    try{
        //secretKey
        let secretKey=""+process.env.SECRET_KEY
        let token=""+req.headers.authorization
        let decode:any=jwt.verify(token,secretKey)
        let file =fs.readFileSync(`./uploads/${req.body.filename}`)
        await userSchema.update(
            {profile:file},
            {where:{id:decode?.id}}
        )
        res.status(200).send("Profile picture change successfully")
        fs.unlink(`./uploads/${req.body.filename}`,(err)=>{
            if(err) throw err;
        })
    }catch(error){
        res.send(error)
    }
}