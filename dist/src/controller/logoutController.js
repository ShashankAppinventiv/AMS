"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logoutController = (req, res) => {
    try {
        let token = "" + req.headers.authorization;
        let decode = jsonwebtoken_1.default.verify(token, 's1h2a3');
    }
    catch (error) {
        res.status(400).send("Internal Server Error");
    }
};
exports.logoutController = logoutController;
