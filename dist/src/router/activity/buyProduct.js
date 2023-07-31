"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const viewAllProduct_1 = require("../../controller/viewAllProduct");
const buyProduct_1 = require("../../controller/buyProduct");
//Middleware
const session_1 = require("../../middleware/session");
const routes = (0, express_1.default)();
routes.get('/buy', session_1.sessionCheck, viewAllProduct_1.list);
routes.get('/buy/:productId', session_1.sessionCheck, buyProduct_1.viewProductDetails);
exports.default = routes;
