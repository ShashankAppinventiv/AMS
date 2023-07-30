import sequilizeDB from'../provider/database'
import { DataType } from 'sequelize-typescript'


export const categoriesSchema=sequilizeDB.define("categories",{
    name:{
        type:DataType.STRING
    },
    parentId:{
        type:DataType.INTEGER
    }
})