"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSchema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importDefault(require("../provider/database"));
exports.sessionSchema = database_1.default.define("session", {
    userId: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    isActive: {
        type: sequelize_typescript_1.DataType.BOOLEAN
    }
});
