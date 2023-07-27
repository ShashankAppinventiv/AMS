"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.newUserValidate = void 0;
const joi_1 = __importDefault(require("joi"));
//Fucntion for user validation
const newUserValidate = (req, res, next) => {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().required(),
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        email: joi_1.default.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        password: joi_1.default.string().min(8).required(),
        number: joi_1.default.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
        gender: joi_1.default.string().equal(...['male', 'female']).required(),
        DOB: joi_1.default.date().required()
    });
    const result = userSchema.validate(req.body);
    console.log(result.error);
    if (result.error) {
        res.status(400).send("Enter the valid details");
    }
    else {
        console.log("Move to next");
        next();
    }
};
exports.newUserValidate = newUserValidate;
const loginValidation = (req, res, next) => {
    const isValid = joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).required()
    });
    let result = isValid.validate(req.body);
    result.error ? res.status(400).send(result) : next();
};
exports.loginValidation = loginValidation;
