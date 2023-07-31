import { userSchema } from "../../model/user";
import { Request,Response } from "express";

export const updateProfileController=async (req:Request,res:Response)=>{
    try{
        let id=req.body.id
        delete req.body.id
        await userSchema.update(
            req.body,
            {
                where:{
                        id:id
                }   
            }
        )
        res.status(200).send("Update successfully")
    }catch(error){
        res.status(404).send(error)
    }
}