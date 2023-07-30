"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesSchema = void 0;
const database_1 = __importDefault(require("../provider/database"));
const sequelize_typescript_1 = require("sequelize-typescript");
exports.categoriesSchema = database_1.default.define("categories", {
    name: {
        type: sequelize_typescript_1.DataType.STRING
    },
    parentId: {
        type: sequelize_typescript_1.DataType.INTEGER
    }
});
