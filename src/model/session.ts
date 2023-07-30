import { DataType } from "sequelize-typescript";
import sequlizeDB from '../provider/database'
import { userSchema } from "./user";


export const sessionSchema=sequlizeDB.define("session",{
    userId:{
        type:DataType.INTEGER,
        references: {
            model: userSchema, // The name of the referenced table (case-sensitive)
            key: 'id',      // The column in the referenced table to use as the reference
          },
          allowNull: false,
          onDelete: 'CASCADE'
    },
    isActive:{
        type:DataType.BOOLEAN
    }
}
)
