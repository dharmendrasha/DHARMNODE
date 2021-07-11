import { Joi } from 'express-validation'
module.exports = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
  })
}

const loginValidation = module.exports

export default loginValidation
