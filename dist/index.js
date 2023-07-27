"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//database importing
const redis_1 = require("./src/provider/redis"); //redis
//importing routers
const signup_1 = __importDefault(require("./src/router/user/signup"));
const login_1 = __importDefault(require("./src/router/user/login"));
const logout_1 = __importDefault(require("./src/router/user/logout"));
//All constant decleration
const app = (0, express_1.default)();
const port = process.env.PORT;
dotenv_1.default.config();
app.use(express_1.default.json());
//Routers
app.use('/user', signup_1.default);
app.use('/user', login_1.default);
app.use('/user', logout_1.default);
(0, redis_1.redFun)(); //function calling for redis connection
app.listen(port, () => {
    console.log(`Listen to the port ${port}`);
});
