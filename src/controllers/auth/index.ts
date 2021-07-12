/* eslint-disable new-cap */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { IRegister } from '../../types/register'
import { ILogin } from '../../types/login'
import { IEmailValid } from '../../types/emailvalidation'

import Register from '../../models/register'
import * as helper from '../../helper/index'
import mail from '../../mail/nodemail'
import contactSchema from '../../models/contact'
import * as conf from '../../config/index'

import IEmailVerifyParam from '../../types/email_verify_get'

import IForgotPass from '../../types/forgotpasstype'

import IPasswordChanegeGetParams from '../../types/password_change_get'
import IContact from '../../types/contact'
import ICheckUsername from '../../types/CheckUsername'

const anyIndex = (req:Request, res:Response) : Response<any, Record<string, any>> => {
  return res.status(200).json({ status: 'fine' })
}

const postRegister = async (req: Request, res : Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const form = req.body as Pick<IRegister, 'country_code' | 'username' | 'password' | 'mobile' | 'gender' | 'dob' | 'email'>
    if (form.username.length > 30) {
      throw new Error('username too long')
    }
    if (form.mobile.toString().length < 6 || form.mobile.toString().length > 13) {
      throw new Error('Phone number must be at least 6 and shold be less than 13')
    }
    const checkusername : IRegister[] = await Register.find({ username: form.username })

    if (checkusername.length > 0) {
      throw new Error('username already exists')
    }

    const checkphone : IRegister[] = await Register.find({ mobile: form.mobile })

    if (checkphone.length > 0) {
      throw new Error('Phone number already exist')
    }

    // check email address existed or not

    if ('email' in form) {
      if (!helper.validEmailaddress(form.email)) {
        throw new Error("Please send valid email address otherwise don't")
      }

      const check_email = await Register.find({ email: form.email })

      if (check_email.length > 0) {
        throw new Error('Email address already existes')
      }
    }

    // gender validate
    let found :boolean = false
    switch (form.gender) {
      case 'Male':
        found = true
        break
      case 'Female':
        found = true
        break
      case 'Rather Not Say':
        found = true
        break
      default :
        found = false
    }

    if (!found) {
      throw new Error('Gender should be Male | Female | Rather Not Say')
    }

    // country_code validate

    const formSave : IRegister = new Register()
    formSave.username = form.username
    formSave.password = helper.passgenerate(form.password)
    formSave.mobile = form.mobile
    formSave.gender = form.gender
    formSave.age = helper.calculateAge(form.dob)
    formSave.dob = helper.iso(form.dob)
    formSave.api_token = helper.api_key()

    if ('country_code' in form) {
      formSave.country_code = form.country_code
    }

    if ('email' in form) {
      formSave.email = form.email
    }
    await formSave.save()
    return res.status(200).json('User registered successfully.')
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

const postLogin = async (req : Request, res : Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const form = req.body as Pick<ILogin, 'username' | 'password'>
    const checkusername = await Register.findOne({ username: form.username })
    // check password

    if (checkusername == null) {
      throw new Error('No user found')
    }

    const passwordmatch = helper.pass_validate(form.password, checkusername.password)

    if (!passwordmatch) {
      throw new Error('Incorrect credentials')
    }

    // const token = jwt.sign({api_token:checkusername.api_token}, conf.SALT, {expiresIn:conf.TOKEN_EXPIRE})

    const token = helper.jwtsign({ api_token: checkusername.api_token })

    return res.status(200).json({ auth: true, token: token })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const verifyemailaddress = async (req: Request, res : Response) : Promise<Response<any, Record<string, any>>> => {
  let status : number = 200
  let body : any = {}

  try {
    const form : IEmailValid = req.body as Pick<IEmailValid, 'email'>

    if (!helper.validEmailaddress(form.email)) {
      throw new Error('Invalid email address')
    }

    // check the presense of email address
    const checkEmail : IRegister | null = await Register.findOne({ email: form.email })

    if (checkEmail === null) {
      throw new Error('Email address could not be found for validation')
    }

    // send the email address otp with jwt valiation

    const random : number = helper.randomnumber()

    checkEmail.temp_token = random

    await Register.findOneAndUpdate({ email: form.email }, checkEmail, { upsert: true })

    // send him a mail

    const jwttoken = helper.jwtsign({ otp: random, email: form.email })

    const emaillink = req.protocol + '://' + req.get('host') + '/auth/verify/email?token=' + jwttoken + '&email=' + form.email

    const emailbody = "click the link below to verify your email addresss <br/> <a href='" + emaillink + "'>" + emaillink + '</a>'

    new mail().send(form.email, 'Email varification link', emailbody)

    body = 'Email successfully sent for email verification'
  } catch (error) {
    body = error.message
    status = 500
  }

  return res.status(status).json(body)
}

const verifyemailaddress_get = async (req : Request, res : Response) : Promise<Response<any, Record<string, any>>> => {
  let status : number = 200
  let body : any = 'success'

  try {
    const query : IEmailVerifyParam = req.query as Pick<IEmailVerifyParam, 'email' | 'token'>

    if ('email' in query) {
      // valid
      if (!helper.validEmailaddress(query.email)) {
        throw new Error('Email address did not verify')
      }
    }

    if (!query.token) {
      throw new Error('did not found token in the query')
    }

    // decode jwt
    const jwt_deco = helper.jwtverify(query.token)

    if (jwt_deco.email !== query.email) {
      throw new Error('do not change the query line')
    }

    // check email id is present or not

    const check : IRegister | null = await Register.findOne({ email: query.email })

    if (check == null) {
      throw new Error('something happed wrong')
    }

    // check already verified or not
    if (check.email_verified == true) {
      throw new Error('this email address is already being updated')
    }

    // update the query
    check.email_verified = true
    check.temp_token = 0

    // update
    await Register.findOneAndUpdate({ email: query.email }, check, { upsert: true })

    body = 'Successfully verified the email address'
  } catch (error) {
    status = 500
    body = error.message
  }
  return res.status(status).json(body)
}

const forgotpassword = async (req : Request, res : Response) : Promise<Response<any, Record<string, any>>> => {
  let status : number = 200
  let body : any = 'success'

  try {
    const params : IForgotPass = req.body as Pick<IForgotPass, 'username' | 'password' | 'temp_token'>

    // check present or not
    const check : IRegister | null = await Register.findOne({ username: params.username })

    if (check === null) {
      throw new Error('No user found')
    }

    // send email verification code
    const random_num : number = helper.randomnumber()
    check.temp_token = random_num

    await Register.findOneAndUpdate({ username: params.username }, check, { upsert: true })

    // token
    params.temp_token = random_num
    const compress = helper.jwtsign(params)

    const emaillink = req.protocol + '://' + req.get('host') + '/auth/forgotpassword?token=' + compress + '&username=' + params.username

    const emailbody = "click the link below to confirm your password validation <br/> <a href='" + emaillink + "'>" + emaillink + '</a>'

    new mail().send(check.email, 'Password reset link', emailbody)

    body = 'We have sent you a verification link for the confirmation'
  } catch (error) {
    status = 500
    body = error.message
  }

  return res.status(status).json(body)
}

const forgotpassword_get = async (req : Request, res : Response) : Promise<Response<any, Record<string, any>>> => {
  let status = 200
  let body = 'Success'

  try {
    const param : IPasswordChanegeGetParams = req.query as Pick<IPasswordChanegeGetParams, 'token' | 'username'>

    const isPresent : IRegister | null = await Register.findOne({ username: param.username })

    if (isPresent == null) {
      throw new Error('Invalid link')
    }

    const jwtdeco : IForgotPass = helper.jwtverify(param.token)

    if (jwtdeco.username !== param.username) {
      throw new Error('Invalid link 0x1000')
    }

    if (isPresent.temp_token !== jwtdeco.temp_token) {
      throw new Error('Invalid link 0x2000')
    }

    // update the password
    const newPass : string = helper.passgenerate(jwtdeco.password)
    isPresent.password = newPass
    isPresent.temp_token = 0

    await Register.findOneAndUpdate({ username: param.username }, isPresent, { upsert: true })

    body = 'Password change success'
  } catch (error) {
    status = 500
    body = error.message
  }

  return res.status(status).json(body)
}

const contactus = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  let status : number = 200
  let message : any = 'success'
  try {
    const form = req.body as Pick<IContact, 'email' | 'name' | 'message'>
    if (!helper.validEmailaddress(form.email)) {
      throw new Error('Please send correct email address')
    }

    const contact = new contactSchema()
    contact.name = form.name
    contact.email = form.email
    contact.message = form.message
    contact.save()

    const message_html = `
        <style>
            table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }

            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            }

            tr:nth-child(even) {
            background-color: #dddddd;
            }
        </style>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <td>${form.name}</td>
                    <td>${form.email}</td>
                    <td>${form.message}</td>
                </tbody>
            </table>
        `

    // send message to admin
    new mail().send(conf.EMAIL, 'new Contact us query', message_html)

    message = 'Message has been successfully sent to admin'
  } catch (error) {
    status = 500
    message = error.message
  }

  return res.status(status).json({ status: status, message: message })
}

// check username is present or not in the database

const CheckUsername = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  let status : number = 200
  let message : any = 'Present'
  try {
    const form = req.body as Pick<ICheckUsername, 'username'>
    if (!form.username.length) {
      throw new Error('Username is required')
    }
    const isPresent : IRegister | null = await Register.findOne({ username: form.username })
    if (isPresent === null) {
      message = { status: true, respond: `'${form.username}' is Unique` }
    } else {
      message = { status: false, respond: `'${form.username}' is Present` }
    }
  } catch (error) {
    status = 200
    message = error.message
  }
  return res.status(status).json({ status: status, message: message })
}

export { anyIndex, postRegister, postLogin, verifyemailaddress, verifyemailaddress_get, forgotpassword, forgotpassword_get, contactus, CheckUsername }
