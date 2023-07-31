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
exports.fpController = exports.otpMailGenerator = void 0;
const redis_1 = __importDefault(require("../../provider/redis"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const mailgen_1 = __importDefault(require("mailgen"));
const user_1 = require("../../model/user");
dotenv_1.default.config();
const otpMailGenerator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.otp) {
            let emailAddress = yield user_1.userSchema.findOne({
                where: { username: req.body.username },
                attributes: ['email'], // Specify the attributes you want to select
            });
            const emailId = JSON.parse(JSON.stringify(emailAddress));
            let otp = otp_generator_1.default.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false, digits: true });
            let config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            };
            const transport = nodemailer_1.default.createTransport(config);
            const mailGenerator = new mailgen_1.default({
                theme: "default",
                product: {
                    name: "Verification code",
                    link: "https://mail.google.com/mail/u/0/#inbox"
                }
            });
            const description = {
                body: {
                    intro: `Your OTP is ${otp} and valid for 15 minutes`
                }
            };
            const mail = mailGenerator.generate(description);
            let message = {
                from: process.env.EMAIL,
                to: `${emailId.email}`,
                subject: "Forget password OTP",
                html: mail
            };
            transport.sendMail(message).then(() => {
                redis_1.default.setEx(`OTP${req.body.username}`, 9000, `${otp}`);
                res.send("Mail Send Successfully");
            }).catch((err) => {
                res.send(err);
            });
        }
        else {
            next();
        }
        // const message={
        //     from: "shashanksaxena226@gmail.com", // sender address
        //     to: "hello@gmail.com", // list of receivers
        //     subject: `Forget password opt`, // Subject line
        //     text: `Your Opt is valid for 15 minutes :${otp}`, // plain text body
        //     html: `<b>Your otp is ${otp}</b>`, // html body
        //   }
    }
    catch (error) {
        res.json({ error: error });
    }
});
exports.otpMailGenerator = otpMailGenerator;
const fpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let otp = yield redis_1.default.get(`OTP${req.body.username}`);
        if (req.body.otp == otp && (req.body.password).length >= 8) {
            user_1.userSchema.update({ password: req.body.password }, { where: { username: req.body.username } });
            redis_1.default.del(`OTP${req.body.id}`);
            res.status(201).send("Password changed successfully");
        }
        else {
            res.status(200).send("OTP Either invalid or expired");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.fpController = fpController;
