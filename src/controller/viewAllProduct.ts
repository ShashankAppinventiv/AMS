import { Op } from "sequelize";
import { productSchema } from "../model/product";
import { Request,Response } from "express";

export const list=async (req:Request,res:Response)=>{
    try{
        console.log(req.body.id)
        let data=await productSchema.findAll({
            attributes:['id','name','title','description','base_price'],
            where:{
                sellerId:{
                  [Op.not]: parseInt(req.body.id)
                }
            }
        })
        res.send(data)
    }catch(error){
        res.status(404).send(error)
    }
}
