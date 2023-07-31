import { DataType } from "sequelize-typescript";
import sequlizeDB from '../provider/database'
import { userSchema } from "./user";
import { addressSchema } from "./address";


export const productSchema=sequlizeDB.define("product",{
    name:{
        type:DataType.STRING,
    },
    description:{
        type:DataType.STRING
    },
    title:{
        type:DataType.STRING
    },
    base_price:{
        type:DataType.FLOAT
    },
    bidding_price:{
        type:DataType.FLOAT,
        defaultValue:0
    },
    bidderId:{
        type:DataType.INTEGER,
        references: {
            model: userSchema, // The name of the referenced table (case-sensitive)
            key: 'id',      // The column in the referenced table to use as the reference
          },
          onDelete: 'CASCADE'
    },
    sellerId:{
        type:DataType.INTEGER,        
        references: {
            model: userSchema, // The name of the referenced table (case-sensitive)
            key: 'id',      // The column in the referenced table to use as the reference
          },
          allowNull: false,
          onDelete: 'CASCADE'
    },
    categoryId:{
        type:DataType.INTEGER,        
    },
    addressId:{
        type:DataType.INTEGER,
        references: {
            model: addressSchema, // The name of the referenced table (case-sensitive)
            key: 'id',      // The column in the referenced table to use as the reference
          },
          allowNull: false,
          onDelete: 'CASCADE'
    }
})
