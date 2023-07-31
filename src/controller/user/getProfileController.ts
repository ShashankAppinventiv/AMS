import { Op } from "sequelize";
import { userSchema } from "../../model/user";
import { Request,Response } from "express";


export const getProfileController=async (req:Request,res:Response)=>{
    try{

        let id=req.body.id
        let data =await userSchema.findOne({
            where:{
                id:{
                    [Op.eq]: id      
                }
            }
        })
        delete req.body.id
        res.send(data)
    }catch(error){
        res.send(error)
    }
}