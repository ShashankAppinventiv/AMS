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
exports.deleteProduct = exports.list = void 0;
const product_1 = require("../../model/product");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield product_1.productSchema.findAll({
            where: {
                sellerId: req.body.id
            }
        });
        res.send(data);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.list = list;
const deleteProduct = (req, res) => {
    try {
        product_1.productSchema.destroy({
            where: {
                id: req.params.productId
            }
        });
        res.status(200).send("Product delete successfully");
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.deleteProduct = deleteProduct;
