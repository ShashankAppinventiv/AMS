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
exports.addPicController = void 0;
const user_1 = require("../../model/user");
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const addPicController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //secretKey
        let secretKey = "" + process.env.SECRET_KEY;
        let token = "" + req.headers.authorization;
        let decode = jsonwebtoken_1.default.verify(token, secretKey);
        let file = fs_1.default.readFileSync(`./uploads/${req.body.filename}`);
        yield user_1.userSchema.update({ profile: file }, { where: { id: decode === null || decode === void 0 ? void 0 : decode.id } });
        res.status(200).send("Profile picture change successfully");
        fs_1.default.unlink(`./uploads/${req.body.filename}`, (err) => {
            if (err)
                throw err;
        });
    }
    catch (error) {
        res.send(error);
    }
});
exports.addPicController = addPicController;
