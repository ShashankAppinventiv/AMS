import multer from 'multer'
import { Request,Response } from 'express'



//multer
export const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            cb(null,file.originalname)
        }
    })
}).single("profile");

export const caller=(req:Request,res:Response)=>{
    console.log(req.body)
}