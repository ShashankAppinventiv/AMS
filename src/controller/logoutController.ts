import jwt from 'jsonwebtoken'
import { Request,Response } from 'express'
export const logoutController=(req:Request,res:Response)=>{
    try{
        let token:string=""+req.headers.authorization;
        let decode= jwt.verify(token,'s1h2a3')
    }catch(error){
        res.status(400).send("Internal Server Error")
    }
}