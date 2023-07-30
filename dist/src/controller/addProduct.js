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
exports.subCategories = exports.categories = exports.addProductController = void 0;
const categories_1 = require("../model/categories");
const sequelize_1 = require("sequelize");
const addProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ "address": req.params.address });
});
exports.addProductController = addProductController;
const categories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield CategoryQuery(null);
        res.status(200).json({ "choose category": data });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.categories = categories;
const subCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield CategoryQuery(parseInt(req.params.categorie));
        res.status(200).send({ "choose sub-categorie": data });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.subCategories = subCategories;
//common query for category
const CategoryQuery = (value) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield categories_1.categoriesSchema.findAll({
        attributes: ['id', 'name'],
        where: {
            parentId: {
                [sequelize_1.Op.eq]: value,
            }
        }
    });
    return data;
});
