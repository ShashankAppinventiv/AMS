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
exports.loginController = void 0;
const redis_1 = __importDefault(require("../provider/redis"));
const user_1 = require("../model/user");
const session_1 = require("../model/session");
const sequelize_1 = require("sequelize");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let redisData = yield redis_1.default.get(`${req.body.username}`);
    if (!redisData) {
        if ((yield isExistUser(req))) {
            let isActiveSession = session_1.sessionSchema.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        { userId: (_a = req.body) === null || _a === void 0 ? void 0 : _a.username },
                        { isActive: true }
                    ]
                }
            });
            res.send(isActiveSession);
        }
        else {
            res.status(404).send("Please register yourself first");
        }
    }
    else {
        console.log("cache hit");
    }
});
exports.loginController = loginController;
const isExistUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    let data;
    try {
        data = yield user_1.userSchema.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { username: (_b = req.body) === null || _b === void 0 ? void 0 : _b.username },
                    { password: (_c = req.body) === null || _c === void 0 ? void 0 : _c.password }
                ]
            }
        });
        if (Object.keys(data).length > 0) {
            return true;
        }
    }
    catch (err) {
        console.log("Some error occure");
    }
    return false;
});
