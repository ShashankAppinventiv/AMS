"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importDefault(require("../provider/database"));
const user_1 = require("./user");
exports.addressSchema = database_1.default.define('address', {
    userId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: user_1.userSchema,
            key: 'id', // The column in the referenced table to use as the reference
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    house_no: {
        type: sequelize_typescript_1.DataType.STRING
    },
    street_no: {
        type: sequelize_typescript_1.DataType.STRING
    },
    area: {
        type: sequelize_typescript_1.DataType.STRING
    },
    landmark: {
        type: sequelize_typescript_1.DataType.STRING
    },
    city: {
        type: sequelize_typescript_1.DataType.STRING,
        defaultValue: null
    },
    zipcode: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    address_type: {
        type: sequelize_typescript_1.DataType.STRING
    }
});
