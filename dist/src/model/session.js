"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSchema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importDefault(require("../provider/database"));
const user_1 = require("./user");
exports.sessionSchema = database_1.default.define("session", {
    userId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: user_1.userSchema,
            key: 'id', // The column in the referenced table to use as the reference
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    isActive: {
        type: sequelize_typescript_1.DataType.BOOLEAN
    }
});
