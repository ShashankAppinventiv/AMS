"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller
const addProfilePic_1 = require("../../../controller/user/addProfilePic");
const multerFileUploading_1 = require("../../../middleware/multerFileUploading");
//Middleware
const session_1 = require("../../../middleware/session");
const routes = (0, express_1.default)();
routes.patch('/profile_pic', session_1.sessionCheck, multerFileUploading_1.upload, addProfilePic_1.addPicController);
exports.default = routes;
