import { productSchema } from "../model/product";
import { Request,Response } from "express";

export const list=async (req:Request,res:Response)=>{
    try{
        let data=await productSchema.findAll({
            where:{
                sellerId:req.body.id
            }
        })
        res.send(data)
    }catch(error){
        res.status(404).send(error)
    }
}

export const deleteProduct=(req:Request,res:Response)=>{
    try{
        productSchema.destroy({
            where:{
                id:req.params.productId
            }
        })
        res.status(200).send("Product delete successfully")
    }catch(error){
        res.status(404).send(error)
    }
}