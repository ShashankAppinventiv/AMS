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
const signup_1 = __importDefault(require("./src/router/user/auth/signup"));
const login_1 = __importDefault(require("./src/router/user/auth/login"));
const logout_1 = __importDefault(require("./src/router/user/auth/logout"));
const getProfile_1 = __importDefault(require("./src/router/user/profile/getProfile"));
const addAddress_1 = __importDefault(require("./src/router/user/profile/addAddress"));
const forgetPass_1 = __importDefault(require("./src/router/user/auth/forgetPass"));
const addPicture_1 = __importDefault(require("./src/router/user/profile/addPicture"));
const addProduct_1 = __importDefault(require("./src/router/activity/addProduct"));
//All constant decleration
const app = (0, express_1.default)();
const port = process.env.PORT;
dotenv_1.default.config();
app.use(express_1.default.json());
//Routers
app.use('/user', signup_1.default);
app.use('/user', login_1.default);
app.use('/user', logout_1.default);
app.use("/user", getProfile_1.default);
app.use("/user", addAddress_1.default);
app.use('/user', forgetPass_1.default);
app.use('/user', addPicture_1.default);
app.use('/product', addProduct_1.default);
(0, redis_1.redFun)(); //function calling for redis connection
app.listen(port, () => {
    console.log(`Listen to the port ${port}`);
});
