import { Schema, model } from 'mongoose'
import IContact from '../types/contact'
const contactSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })
export default model<IContact>('Contact', contactSchema)
