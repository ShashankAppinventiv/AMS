"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const signUpController_1 = require("../../controller/signUpController");
//Middleware
const joiValidation_1 = require("../../middleware/joiValidation");
const routes = (0, express_1.default)();
routes.post('/signup', joiValidation_1.newUserValidate, signUpController_1.signUpController);
exports.default = routes;
