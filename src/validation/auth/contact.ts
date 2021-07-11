import { Joi } from 'express-validation'

module.exports = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    message: Joi.string().required()
  })
}
const contactValidation = module.exports
export default contactValidation
