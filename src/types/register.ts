/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'

enum gender {
    male = 'Male',
    female = 'Female',
    other = 'Rather Not Say'
}

export interface IRegister extends Document{
    _id : string,

    profile : any,
    username: string,
    password: string,
    mobile: number,
    mobile_verfied : boolean,
    gender: gender,
    dob: string,
    age : Number,
    email: string,
    email_verified : boolean,
    api_token : string,
    temp_token : number,
    country_code : number
}

interface IFileHeaders {

    'content-disposition' : string,
    'content-type' : string

}

export interface IFile{
    fieldName : string,
    originalFilename: string,
    path : string,
    headers : IFileHeaders,
    size : Number,
    name: string,
    type:string
}
