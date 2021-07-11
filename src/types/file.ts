/* eslint-disable camelcase */
import { Document } from 'mongoose'
export default interface IFile extends Document{
    name:String,
    size:Number,
    saved_as:String,
    type:String
}
