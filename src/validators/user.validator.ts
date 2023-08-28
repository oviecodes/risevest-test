import Joi from 'joi'

export default {
  register: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  file: Joi.object().keys({
    file: Joi.string().required(),
  }),
}
