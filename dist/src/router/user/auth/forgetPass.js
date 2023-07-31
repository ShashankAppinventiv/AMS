"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const forgetPasswordController_1 = require("../../../controller/user/forgetPasswordController");
const otpMiddleware_1 = require("../../../middleware/otpMiddleware");
const routes = (0, express_1.default)();
routes.patch('/forget_password', otpMiddleware_1.otpMailGenerator, forgetPasswordController_1.fpController);
exports.default = routes;
