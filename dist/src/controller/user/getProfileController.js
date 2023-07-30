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
exports.getProfileController = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("../../model/user");
const getProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.body.id;
        let data = yield user_1.userSchema.findOne({
            where: {
                id: {
                    [sequelize_1.Op.eq]: id
                }
            }
        });
        delete req.body.id;
        console.log(req.body);
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getProfileController = getProfileController;
