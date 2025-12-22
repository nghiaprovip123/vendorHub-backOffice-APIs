"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const register_service_1 = require("../../services/auth/register.service");
const registerController = async (req, res, next) => {
    try {
        const body = req.body;
        const controllerResponse = await (0, register_service_1.register)(body);
        return res.json({ message: "Create the account sucessfully", accountInfo: controllerResponse });
    }
    catch (error) {
        next(error);
    }
};
exports.registerController = registerController;
