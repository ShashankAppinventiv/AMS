import { Request,Response } from "express";
import { categoriesSchema } from "../../model/categories";
import { productSchema } from "../../model/product";
import { Op ,QueryTypes,Sequelize} from "sequelize";
import sequelize from "../../provider/database";

export const productFilterController=async (req:Request,res:Response)=>{
    try{
        let Data:any=await sequelize.query(`select array_agg("c2"."id") from "categories" as "c" left join "categories" as "c2" on "c"."id"="c2"."parentId" where "c"."name"='${req.query.Category}'`,{type:QueryTypes.SELECT})
        console.log(Data,Data[0]['array_agg'])
        let finalData=await productSchema.findAll({
            where:{
                categoryId:Data[0]['array_agg']
            }
        })
        res.send(finalData)
    }catch(error){
        res.send(error)
    }
}
