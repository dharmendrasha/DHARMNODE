import { Document } from 'mongoose'

export interface ILogin extends Document{
    username:string,
    password:string
}
