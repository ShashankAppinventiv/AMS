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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let token = "";
    let data = yield user_1.userSchema.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { username: (_a = req.body) === null || _a === void 0 ? void 0 : _a.username },
                { password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password }
            ]
        }
    });
    let userData = JSON.parse(JSON.stringify(data));
    token = jsonwebtoken_1.default.sign({ id: userData.id }, 's1h2a3', { expiresIn: 3600 });
    if (userData) {
        let redisResponse = yield redis_1.default.get(`${userData.id}`);
        console.log(redisResponse);
        if (redisResponse == null) {
            console.log("cache miss");
            let isActiveSession = yield session_1.sessionSchema.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { userId: userData.id },
                        { isActive: true }
                    ]
                }
            });
            if (JSON.parse(JSON.stringify(isActiveSession)) == null) {
                {
                    yield session_1.sessionSchema.create({
                        userId: userData.id,
                        isActive: true
                    });
                    redis_1.default.setEx(`${userData.id}`, 3600, 'true');
                }
            }
            else {
                redis_1.default.setEx(`${userData.id}`, 3600, 'true');
            }
            res.status(201).send(token);
        }
        else {
            console.log('cache hit');
            res.status(200).send(token);
        }
    }
    else {
        return res.status(404).send("Please register yourself first");
    }
});
exports.loginController = loginController;
