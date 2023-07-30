"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const addProduct_1 = require("../../controller/addProduct");
const addressController_1 = require("../../controller/addressController");
//Middleware
const session_1 = require("../../middleware/session");
const routes = (0, express_1.default)();
routes.post('/add', session_1.sessionCheck, addProduct_1.categories);
routes.post('/add/:categorie', session_1.sessionCheck, addProduct_1.subCategories);
routes.post('/add/:categorie/:subCategories', session_1.sessionCheck, addressController_1.addressController);
routes.post('/add/:categorie/:subCategories/:address', session_1.sessionCheck, addProduct_1.addProductController);
exports.default = routes;
