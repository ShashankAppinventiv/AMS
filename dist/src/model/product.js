"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importDefault(require("../provider/database"));
const user_1 = require("./user");
const address_1 = require("./address");
exports.productSchema = database_1.default.define("product", {
    name: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    description: {
        type: sequelize_typescript_1.DataType.STRING
    },
    title: {
        type: sequelize_typescript_1.DataType.STRING
    },
    base_price: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    bidding_price: {
        type: sequelize_typescript_1.DataType.FLOAT
    },
    bidderId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: user_1.userSchema,
            key: 'id', // The column in the referenced table to use as the reference
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    SellerId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: user_1.userSchema,
            key: 'id', // The column in the referenced table to use as the reference
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    category: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    addressId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: address_1.addressSchema,
            key: 'id', // The column in the referenced table to use as the reference
        },
        allowNull: false,
        onDelete: 'CASCADE'
    }
});
