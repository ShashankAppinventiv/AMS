"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const loginController_1 = require("../../../controller/user/loginController");
//Middleware
const joiValidation_1 = require("../../../middleware/joiValidation");
const routes = (0, express_1.default)();
/**
 * @swagger
 *
 *
 */
routes.post('/signin', joiValidation_1.loginValidation, loginController_1.loginController);
exports.default = routes;
