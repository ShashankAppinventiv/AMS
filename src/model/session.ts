import { DataType } from "sequelize-typescript";
import sequlizeDB from '../provider/database'


export const sessionSchema=sequlizeDB.define("session",{
    userId:{
        type:DataType.INTEGER
    },
    isActive:{
        type:DataType.BOOLEAN
    }
})