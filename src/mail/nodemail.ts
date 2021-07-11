
import * as mailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import * as conf from '../config/index'

import { IMail } from '../types/mail'

export default class mail {
  constructor (props? : any) {
    console.log(props)
  }

    public createTransport = async () : Promise<Mail> => {
      return await mailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '59fd7a2919f440',
          pass: '1d91fb3e953fca'
        }
      })
    }

    public send = async (to : string, sub : string, body : string, html : boolean = true) : Promise<void> => {
      try {
        const trans = await this.createTransport()

        const mailbody : IMail = {
          from: conf.MAIL_FROM, // sender address
          to: to, // list of receivers
          subject: sub, // Subject line
          // text: body, // plain text body
          html: body // html body
        }

        return await trans.sendMail(mailbody)
      } catch (error) {
        // return error.message;
        console.log(error)
        throw new Error(error)
      }
    }
}
