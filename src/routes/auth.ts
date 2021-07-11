/* eslint-disable camelcase */
import { Router } from 'express'

import { anyIndex, postRegister, postLogin, verifyemailaddress, verifyemailaddress_get, forgotpassword, forgotpassword_get, contactus, CheckUsername } from '../controllers/auth/index'

import { validate } from 'express-validation'
// auth validation
import { registerValidation, loginValidation, emailverifyValidation, forgotpassword as validforgot, contactValidation } from '../validation/auth/index'

const route : Router = Router()

route.all('/', anyIndex) // main index route
route.post('/register', validate(registerValidation, {}, {}), postRegister) // for register
route.post('/login', validate(loginValidation, {}, {}), postLogin) // for login

route.post('/verify/email', validate(emailverifyValidation, {}, {}), verifyemailaddress) // for login

route.get('/verify/email', verifyemailaddress_get) // for login
route.post('/forgotpassword', validate(validforgot, {}, {}), forgotpassword) // for forgot password
route.get('/forgotpassword', forgotpassword_get) // for forgot password

route.post('/contact', validate(contactValidation), contactus)

route.post('/checkusername', CheckUsername)

export default route
