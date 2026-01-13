"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controllers/login.controller");
const send_otp_controller_1 = require("../controllers/send-otp.controller");
const AuthRouter = express_1.default.Router();
AuthRouter.post('/login', login_controller_1.LoginController);
AuthRouter.post('/sendOTP', send_otp_controller_1.SendOTPController);
exports.default = AuthRouter;
