import { Request,Response } from "express"
import { addressSchema } from "../model/address"

export const addressController=async (req:Request,res:Response)=>{
    try{
        let data=await addressSchema.findAll({
            where:{
                    userId:req.body.id
                }
        })
        res.status(200).json({"Choose Address" : data})
    }catch(error){
        res.status(400).send(error)
    }
}