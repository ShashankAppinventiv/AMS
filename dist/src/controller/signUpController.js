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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = void 0;
const user_1 = require("../model/user");
const sequelize_1 = require("sequelize");
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body == undefined) {
            res.status(404).send("User Not Found");
        }
        else {
            if (!(yield isExist(req))) {
                console.log("Inserting data in database");
                const data = yield user_1.userSchema.create({
                    username: req.body.username,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    Mob_number: req.body.number,
                    gender: req.body.gender,
                    DOB: req.body.DOB
                });
                console.log("User Registered", data);
                res.status(201).send("Register Successfully");
            }
            else {
                res.status(400).send("User Already Exist");
            }
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.signUpController = signUpController;
const isExist = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let data;
    try {
        data = yield user_1.userSchema.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { username: (_a = req.body) === null || _a === void 0 ? void 0 : _a.username },
                    { password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password }
                ]
            }
        });
        if (Object.keys(data).length > 0) {
            console.log("true");
            return true;
        }
    }
    catch (err) {
        console.log("Some error occure");
    }
    console.log("false");
    return false;
});
