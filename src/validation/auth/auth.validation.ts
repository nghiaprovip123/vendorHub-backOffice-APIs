import Joi from "joi";

export const authSchema = {
    register: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        userName: Joi.string().optional()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
};