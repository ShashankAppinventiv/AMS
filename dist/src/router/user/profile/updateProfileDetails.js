"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const updateProfile_1 = require("../../../controller/user/updateProfile");
const joiValidation_1 = require("../../../middleware/joiValidation");
//Middleware
const session_1 = require("../../../middleware/session");
const routes = (0, express_1.default)();
routes.patch('/update', joiValidation_1.updateValidation, session_1.sessionCheck, updateProfile_1.updateProfileController);
exports.default = routes;
