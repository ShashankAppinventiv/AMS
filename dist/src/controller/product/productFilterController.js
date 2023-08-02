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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFilterController = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../provider/database"));
const productFilterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield database_1.default.query(`
            select * from "products" where "categoryId" in (
            WITH RECURSIVE "last_category" AS (
                        SELECT "id", "name", 1 AS "level"
                        FROM "categories" "c"
                        WHERE "name" = '${req.query.choice}'
                      
                        UNION ALL
                      
                        SELECT "c2"."id", "c2"."name", "lc"."level" + 1
                        FROM "categories" "c2"
                        INNER JOIN "last_category" "lc" ON "c2"."parentId" = "lc"."id"
                        WHERE "c2"."parentId" IS NOT NULL 
                        )
                      select "id"
                      FROM "last_category"
            )`, { type: sequelize_1.QueryTypes.SELECT });
        res.status(200).send(data);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.productFilterController = productFilterController;
