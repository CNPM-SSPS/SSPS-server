import Joi from 'joi';
import { password, objectId } from './custom.validation.js';

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: password.required(),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin')
  })
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

export const getUser = {
  params: Joi.object().keys({
    userId: objectId.required()
  })
};

export const updateUser = {
  params: Joi.object().keys({
    userId: objectId.required()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: password.required(),
      name: Joi.string()
    })
    .min(1)
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: objectId.required()
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
