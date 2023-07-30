"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const session_1 = require("../../model/session");
const redis_1 = __importDefault(require("../../provider/redis"));
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = "" + req.headers.authorization;
        let decode = JSON.parse(JSON.stringify(jsonwebtoken_1.default.verify(token, 's1h2a3')));
        let data = yield session_1.sessionSchema.update({ isActive: false }, { where: { userId: decode === null || decode === void 0 ? void 0 : decode.id } });
        yield redis_1.default.del(`${decode === null || decode === void 0 ? void 0 : decode.id}`);
        res.status(200).send("Logout successfully");
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.logoutController = logoutController;
