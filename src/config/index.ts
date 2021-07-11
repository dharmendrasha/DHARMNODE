import * as ICrawl from '../controllers/crawl/interface'
export const SALT : string = process.env.SALT || 'qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*())(*&^%$#@!ZXCVBNMPLKNBVCSERTGHJIUYT'
export const TOKEN_EXPIRE : number = 86400
export const MAIL_CONF : object = {
  host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.MAIL_PORT || 2525,
  secure: false,
  auth: {
    user: process.env.MAIL_USER || '59fd7a2919f440',
    pass: process.env.MAIL_PASS || '1d91fb3e953fca'
  }
}
export const MAIL_FROM : string = process.env.MAIL_FROM || 'admin@host.com'
export const MAIL_NAME : string = process.env.MAIL_NAME || 'administrator website'

export const FILE_UPLOAD_PATH :string = process.cwd() + '\\upload'

export const TZ : string = 'Asia/Kolkata'

export const FCBK : object = {
  app_id: process.env.facebook_app_id || '697962680902377',
  app_secret: process.env.facebook_app_secret || '4275350eaa3bfad5693f9aa6d1458553'
}

export const EMAIL : string = 'dharmendrashah2002@yahoo.com'

export const GENDER : String[] = ['Male', 'Female', 'Both', 'None']

export const TYPE : String[] = ['Sugar Daddy', 'None', 'Sugar Baby', 'Sugar Baby Male', 'Sugar Momma', 'Gay Sugar Daddy', 'Women For Extra Marital', 'Man For Extra Marital']

export const SSH : ICrawl.ISshConfig = {
  host: '31.220.49.111',
  username: 'root',
  port: 22,
  password: 'Dharmendra9024!@',
  tryKeyboard: true
}
