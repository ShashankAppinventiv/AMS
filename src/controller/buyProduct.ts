import { Op, literal } from "sequelize";
import { productSchema } from "../model/product";
import { Request,Response } from "express";

export const viewProductDetails=async (req:Request,res:Response)=>{
    try{
        console.log(req.body.price)
        if(req.body.price){
            const data=await productSchema.update(
                {
                    bidderId: req.body.id,
                    bidding_price: req.body.price
                },
                {
                    where: {
                        id: parseInt(req.params.productId),
                        sellerId: {
                          [Op.ne]: req.body.id//{[Op.col]: literal('bidderId')}
                        },
                        bidding_price: {
                          [Op.lt]: req.body.price//{[Op.col]: literal('bidding_price')}
                        }
                    }
                }
            )
            res.status(200).send(data[0]==0?"Bidding price is lower that pervious":"Bidding applyed")
        }else{
            let data=await productSchema.findOne({
                where:{
                    id:parseInt(req.params.productId),
                    sellerId:{[Op.ne]:req.body.id}
                }
            })
            res.status(200).send(data)
        }
    }catch(error){
        res.status(404).send(error)
    }
}
