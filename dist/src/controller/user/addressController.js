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
exports.addAddressController = void 0;
const address_1 = require("../../model/address");
const addAddressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield address_1.addressSchema.create({
            userId: req.body.id,
            house_no: req.body.house_no,
            street_no: req.body.street_no,
            area: req.body.area,
            landmark: req.body.landmark,
            city: req.body.city,
            zipcode: req.body.zipcode,
            address_type: req.body.address_type
        });
        console.log(data);
        res.status(201).send(data);
    }
    catch (error) {
        res.send(error);
    }
});
exports.addAddressController = addAddressController;
