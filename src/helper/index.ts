/* eslint-disable camelcase */
import passwordHash from 'password-hash'
import { v4 as uuidv4 } from 'uuid'
import * as conf from '../config/index'
import * as jwt from 'jsonwebtoken'
import moment from 'moment'

const passgenerate = (pass:string) : string => {
  return passwordHash.generate(pass)
}

const pass_validate = (pass : string, hash : string) : boolean => {
  return passwordHash.verify(pass, hash)
}

const api_key = () => {
  return uuidv4()
}

const validEmailaddress = (email:string) : boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const jwtsign = (obj:object) : string => {
  return jwt.sign(obj, conf.SALT, { expiresIn: conf.TOKEN_EXPIRE })
}

const jwtverify = (jwt_sig:string) : any => {
  return jwt.verify(jwt_sig, conf.SALT)
}

const randomnumber = () : number => {
  return Math.floor((Math.random() * 100000) + 1)
}

const url = (link:string) : string => {
  return link
}

const date = () : Date => {
  return new Date()
}

function getAge (dateString:any) : number {
  const today = new Date()
  const birthDate = new Date(dateString)

  if (today.getFullYear() < birthDate.getFullYear()) {
    throw new Error('You did not yet on earth!. \n Please check your Date of birth')
  }

  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const calculateAge = (dateString : string) : any => {
  const date = moment(dateString, 'DD-MM-YYYY')

  if (!date.isValid()) {
    throw new Error('Date format is valid it should be DD-MM-YYYY')
  }

  const age = getAge(date)

  if (age > 100) {
    throw new Error('Sorry you are dead or going to die. \n Please correct your date of birth')
  }

  if (age < 18) {
    throw new Error('You are not eligible for this website, < 18 ')
  }

  return getAge(date)
}

function replaceAll (string : String, search : string, replace : string) {
  return string.split(search).join(replace)
}

const iso = (nonisodate:any) : any => {
  return moment(nonisodate, 'DD-MM-YYYY').format('YYYY-MM-DD')
}

export { passgenerate, replaceAll, calculateAge, api_key, pass_validate, validEmailaddress, jwtsign, jwtverify, randomnumber, url, date, iso }
