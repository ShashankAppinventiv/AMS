"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const addressController_1 = require("../../../controller/user/addressController");
const joiValidation_1 = require("../../../middleware/joiValidation");
//Middleware
const session_1 = require("../../../middleware/session");
const routes = (0, express_1.default)();
routes.put('/add_address', session_1.sessionCheck, joiValidation_1.addressValidation, addressController_1.addAddressController);
exports.default = routes;
