import { Request,Response } from "express";
import { categoriesSchema } from "../../model/categories";
import { productSchema } from "../../model/product";
import { Op } from "sequelize";

export const productFilterController=async (req:Request,res:Response)=>{
    try{
        let data:any=""
        if(req.query.Sub_category){
                data=await categoriesSchema.findAll({
                attributes:['id'],
                where:{name:req.query.Sub_category}
            })
            data=JSON.parse(JSON.stringify(data))
        }else if(req.query.Category)
        {
            data=await categoriesSchema.findOne({
                attributes:['id'],
                where:{name:req.query.Category}
            })
            data=JSON.parse(JSON.stringify(data))
                data=await categoriesSchema.findAll({
                attributes:['id'],
                where:{parentId:data.id}
            })
            data=JSON.parse(JSON.stringify(data))
        }
        else{
            let finalData=await productSchema.findAll({
                attributes:['name','title','description','base_price','bidding_price']
            })
            return res.send(finalData)
        }
        let category_list:any=[]
        data.forEach((element:any) => {
            category_list.push(element.id)
        });
        let finalData=await productSchema.findAll(
            {
                attributes:['name','title','description','base_price','bidding_price'],
            where:{
                categoryId:{[Op.in]:category_list}
            }
        })
        res.send(finalData)
    }catch(error){
        res.send(error)
    }
}
