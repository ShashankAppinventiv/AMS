import { DataType } from "sequelize-typescript";

import sequilizeDB from '../provider/database'
import { userSchema } from "./user";

export const addressSchema=sequilizeDB.define('address',{
    userId:{
        type:DataType.INTEGER,
        references: {
            model: userSchema, // The name of the referenced table (case-sensitive)
            key: 'id',      // The column in the referenced table to use as the reference
          },
          allowNull: false,
          onDelete: 'CASCADE'
    },
    house_no:{
        type:DataType.STRING
    },
    street_no:{
        type:DataType.STRING
    },
    area:{
        type:DataType.STRING
    },
    landmark:{
        type:DataType.STRING
    },
    city:{
        type:DataType.STRING,
        defaultValue:null
    },
    zipcode:{
        type:DataType.INTEGER
    },
    address_type:{
        type:DataType.STRING
    }
})