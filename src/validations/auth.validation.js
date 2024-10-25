import Joi from 'joi';
import { password } from './custom.validation.js';

export const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: password.required()
  })
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

export default { register, login, logout };
