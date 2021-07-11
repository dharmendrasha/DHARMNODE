
import { Request, Response } from 'express'

// model
import Register from '../models/register'

// type
import { UserInfo } from '../types/userinfo'

// helper

import * as help from '../helper/index'

const isAuth = async (req: UserInfo, res : Response, next: () => Response<any, Record<string, any>> | PromiseLike<Response<any, Record<string, any>>>) : Promise<Response<any, Record<string, any> | Request<any, any, any, Record<string, any>>>> => {
  try {
    if (!req.headers.token) {
      throw new Error('Auth token does not sent')
    }

    const jwtdecode : any = help.jwtverify(req.headers.token)

    const find = await Register.findOne({ api_token: jwtdecode.api_token }).populate('profile')

    if (!find) {
      throw new Error('no user found please check the token once again')
    }

    req.user = find
    return next()
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

export default isAuth
