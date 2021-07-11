import { Joi } from 'express-validation'

module.exports = {
  body: Joi.object({
    email: Joi.string().required()
  })
}

const emailverifyValidation = module.exports

export default emailverifyValidation
