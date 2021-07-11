import { Joi } from 'express-validation'
module.exports = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}

const forgotpassword = module.exports

export default forgotpassword
