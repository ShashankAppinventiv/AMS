"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserValidation = exports.updateValidation = exports.addressValidation = exports.loginValidation = exports.productValidator = exports.newUserValidate = void 0;
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
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.newUserValidate = newUserValidate;
const productValidator = (req, res, next) => {
    const productSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        title: joi_1.default.string().required(),
        base_price: joi_1.default.number().required()
    });
    const result = productSchema.validate({
        name: req.body.name,
        description: req.body.description,
        title: req.body.title,
        base_price: req.body.base_price
    });
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.productValidator = productValidator;
const loginValidation = (req, res, next) => {
    const isValid = joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).required()
    });
    let result = isValid.validate(req.body);
    result.error ? res.status(400).send(result) : next();
};
exports.loginValidation = loginValidation;
const addressValidation = (req, res, next) => {
    const addressSchema = joi_1.default.object({
        userId: joi_1.default.number().required(),
        house_no: joi_1.default.string().required(),
        street_no: joi_1.default.string().required(),
        area: joi_1.default.string().required(),
        landmark: joi_1.default.string().allow('').optional(),
        city: joi_1.default.string().required(),
        zipcode: joi_1.default.number().required(),
        address_type: joi_1.default.valid('home', 'office', 'other').required()
    });
    const result = addressSchema.validate({
        userId: req.body.id,
        house_no: req.body.house_no,
        street_no: req.body.street_no,
        area: req.body.area,
        landmark: req.body.landmark,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address_type: req.body.address_type
    });
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.addressValidation = addressValidation;
const updateValidation = (req, res, next) => {
    const userSchema = joi_1.default.object({
        first_name: joi_1.default.string().min(1).optional(),
        last_name: joi_1.default.string().min(1).optional(),
        email: joi_1.default.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).optional(),
        Mob_number: joi_1.default.number().integer().min(10 ** 9).max(10 ** 10 - 1).optional(),
        gender: joi_1.default.string().equal(...['male', 'female']).optional(),
        DOB: joi_1.default.date().optional()
    });
    const result = userSchema.validate(req.body);
    (result.error) ? res.status(404).send(result.error) : next();
};
exports.updateValidation = updateValidation;
const DeleteUserValidation = (req, res, next) => {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().min(1).required(),
        otp: joi_1.default.number().min(4).optional(),
        password: joi_1.default.string().min(8).optional(),
    });
    const result = userSchema.validate(req.body);
    (result.error) ? res.status(404).send(result.error) : next();
};
exports.DeleteUserValidation = DeleteUserValidation;
