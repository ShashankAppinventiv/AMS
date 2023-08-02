import { Request,Response } from "express";
import { Op ,QueryTypes,Sequelize} from "sequelize";
import sequelize from "../../provider/database";

export const productFilterController=async (req:Request,res:Response)=>{
    try{
        let data:any=await sequelize.query(`
            select * from "products" where "categoryId" in (
            WITH RECURSIVE "last_category" AS (
                        SELECT "id", "name", 1 AS "level"
                        FROM "categories" "c"
                        WHERE "name" = '${req.query.choice}'
                      
                        UNION ALL
                      
                        SELECT "c2"."id", "c2"."name", "lc"."level" + 1
                        FROM "categories" "c2"
                        INNER JOIN "last_category" "lc" ON "c2"."parentId" = "lc"."id"
                        WHERE "c2"."parentId" IS NOT NULL 
                        )
                      select "id"
                      FROM "last_category"
            )`, { type: QueryTypes.SELECT })
        
        res.status(200).send(data)
    }catch(error){
        res.status(404).send(error)
    }
}
