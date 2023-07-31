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
exports.viewProductDetails = void 0;
const sequelize_1 = require("sequelize");
const product_1 = require("../model/product");
const viewProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.price);
        if (req.body.price) {
            const data = yield product_1.productSchema.update({
                bidderId: req.body.id,
                bidding_price: req.body.price
            }, {
                where: {
                    id: parseInt(req.params.productId),
                    sellerId: {
                        [sequelize_1.Op.ne]: req.body.id //{[Op.col]: literal('bidderId')}
                    },
                    bidding_price: {
                        [sequelize_1.Op.lt]: req.body.price //{[Op.col]: literal('bidding_price')}
                    }
                }
            });
            res.status(200).send(data[0] == 0 ? "Bidding price is lower that pervious" : "Bidding applyed");
        }
        else {
            let data = yield product_1.productSchema.findOne({
                where: {
                    id: parseInt(req.params.productId),
                    sellerId: { [sequelize_1.Op.ne]: req.body.id }
                }
            });
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.viewProductDetails = viewProductDetails;
