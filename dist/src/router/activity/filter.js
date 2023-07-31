"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const productFilterController_1 = require("../../controller/product/productFilterController");
//Middleware
const session_1 = require("../../middleware/session");
const routes = (0, express_1.default)();
routes.get('/filter', session_1.sessionCheck, productFilterController_1.productFilterController);
exports.default = routes;
