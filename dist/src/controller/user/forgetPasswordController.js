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
exports.fpController = void 0;
const redis_1 = __importDefault(require("../../provider/redis"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../../model/user");
dotenv_1.default.config();
const fpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let otp = yield redis_1.default.get(`OTP${req.body.id}`);
        if (req.body.otp == otp && (req.body.password).length >= 8) {
            yield user_1.userSchema.update({ password: req.body.password }, { where: { id: req.body.id } });
            yield redis_1.default.del(`OTP${req.body.id}`);
            res.status(201).send("Password changed successfully");
        }
        else {
            res.status(200).send("OTP Either invalid or expired");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.fpController = fpController;
