"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const deleteProduct_1 = require("../../controller/deleteProduct");
//Middleware
const session_1 = require("../../middleware/session");
const routes = (0, express_1.default)();
routes.delete('/delete', session_1.sessionCheck, deleteProduct_1.list);
routes.delete('/delete/:productId', session_1.sessionCheck, deleteProduct_1.deleteProduct);
exports.default = routes;
