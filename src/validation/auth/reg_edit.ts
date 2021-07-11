/* eslint-disable camelcase */
import { Joi } from 'express-validation'

module.exports = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    mobile: Joi.number().required(),
    gender: Joi.string().required(),
    dob: Joi.string().regex(/^(\d{1,2})-(\d{1,2})-(\d{4})$/).required(),
    email: Joi.optional(),
    country_code: Joi.string().regex(/^(\d{1,3}|\d{1,4})$/).optional()
  })
}

const reg_edit = module.exports

export default reg_edit
