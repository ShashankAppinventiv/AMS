"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//database importing
const redis_1 = require("./src/provider/redis"); //redis
//importing routers
//user routes
const signup_1 = __importDefault(require("./src/router/user/auth/signup"));
const login_1 = __importDefault(require("./src/router/user/auth/login"));
const logout_1 = __importDefault(require("./src/router/user/auth/logout"));
const getProfile_1 = __importDefault(require("./src/router/user/profile/getProfile"));
const addAddress_1 = __importDefault(require("./src/router/user/profile/addAddress"));
const forgetPass_1 = __importDefault(require("./src/router/user/auth/forgetPass"));
const addPicture_1 = __importDefault(require("./src/router/user/profile/addPicture"));
const updateProfileDetails_1 = __importDefault(require("./src/router/user/profile/updateProfileDetails"));
//Product Routes
const addProduct_1 = __importDefault(require("./src/router/activity/addProduct"));
const deleteRouter_1 = __importDefault(require("./src/router/activity/deleteRouter"));
const buyProduct_1 = __importDefault(require("./src/router/activity/buyProduct"));
const filter_1 = __importDefault(require("./src/router/activity/filter"));
//All constant decleration
const app = (0, express_1.default)();
const port = process.env.PORT;
dotenv_1.default.config();
app.use(express_1.default.json());
//Swagger
const SwaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Advertisement Managenemt System',
            version: '1.0.1'
        }
    },
    apis: ['./swagger/swagger-user.yaml']
};
const swaggerDocs = (0, swagger_jsdoc_1.default)((SwaggerOptions));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
//Routers
app.use('/user', signup_1.default);
app.use('/user', login_1.default);
app.use('/user', logout_1.default);
app.use("/user", getProfile_1.default);
app.use("/user", addAddress_1.default);
app.use('/user', forgetPass_1.default);
app.use('/user', addPicture_1.default);
app.use('/user', updateProfileDetails_1.default);
app.use('/product', addProduct_1.default);
app.use('/product', deleteRouter_1.default);
app.use('/product', buyProduct_1.default);
app.use('/product', filter_1.default);
(0, redis_1.redFun)(); //function calling for redis connection
app.listen(port, () => {
    console.log(`Listen to the port ${port}`);
});
