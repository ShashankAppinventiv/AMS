"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importDefault(require("../provider/database"));
exports.userSchema = database_1.default.define('users', {
    username: {
        type: sequelize_typescript_1.DataType.STRING
    },
    first_name: {
        type: sequelize_typescript_1.DataType.STRING
    },
    last_name: {
        type: sequelize_typescript_1.DataType.STRING
    },
    email: {
        type: sequelize_typescript_1.DataType.STRING
    },
    password: {
        type: sequelize_typescript_1.DataType.STRING
    },
    profile: {
        type: sequelize_typescript_1.DataType.BLOB,
        defaultValue: null
    },
    Mob_number: {
        type: sequelize_typescript_1.DataType.BIGINT
    },
    gender: {
        type: sequelize_typescript_1.DataType.STRING
    },
    DOB: {
        type: sequelize_typescript_1.DataType.DATEONLY //store data in format 1990-01-15
    }
});
