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
exports.productFilterController = void 0;
const categories_1 = require("../model/categories");
const product_1 = require("../model/product");
const sequelize_1 = require("sequelize");
const productFilterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = "";
        if (req.query.Sub_category) {
            data = yield categories_1.categoriesSchema.findAll({
                attributes: ['id'],
                where: { name: req.query.Sub_category }
            });
            data = JSON.parse(JSON.stringify(data));
        }
        else if (req.query.Category) {
            data = yield categories_1.categoriesSchema.findOne({
                attributes: ['id'],
                where: { name: req.query.Category }
            });
            data = JSON.parse(JSON.stringify(data));
            data = yield categories_1.categoriesSchema.findAll({
                attributes: ['id'],
                where: { parentId: data.id }
            });
            data = JSON.parse(JSON.stringify(data));
        }
        else {
            let finalData = yield product_1.productSchema.findAll({
                attributes: ['name', 'title', 'description', 'base_price', 'bidding_price']
            });
            return res.send(finalData);
        }
        let category_list = [];
        data.forEach((element) => {
            category_list.push(element.id);
        });
        let finalData = yield product_1.productSchema.findAll({
            attributes: ['name', 'title', 'description', 'base_price', 'bidding_price'],
            where: {
                categoryId: { [sequelize_1.Op.in]: category_list }
            }
        });
        res.send(finalData);
    }
    catch (error) {
        res.send(error);
    }
});
exports.productFilterController = productFilterController;
