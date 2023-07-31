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
exports.addressController = void 0;
const address_1 = require("../../model/address");
const addressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield address_1.addressSchema.findAll({
            where: {
                userId: req.body.id
            }
        });
        res.status(200).json({ "Choose Address": data });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.addressController = addressController;
