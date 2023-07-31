"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const forgetPasswordController_1 = require("../../../controller/user/forgetPasswordController");
const routes = (0, express_1.default)();
//middleware
const joiValidation_1 = require("../../../middleware/joiValidation");
routes.patch('/forget_password', joiValidation_1.DeleteUserValidation, forgetPasswordController_1.otpMailGenerator);
routes.patch('/forget_password/verify', joiValidation_1.DeleteUserValidation, forgetPasswordController_1.fpController);
exports.default = routes;
