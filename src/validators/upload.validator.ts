import Joi from 'joi'

export default {
  getFile: Joi.object().keys({
    slug: Joi.string().required(),
  }),
  fetchFolder: Joi.object().keys({
    id: Joi.string().required(),
  }),
}
