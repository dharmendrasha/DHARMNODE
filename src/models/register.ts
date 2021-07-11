import { IRegister } from '../types/register'

import { model, Schema } from 'mongoose'

import * as conf from '../config/index'

const registerSchema : Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  i_am: {
    type: String,
    enum: conf.TYPE,
    require: false,
    default: 'None'
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  country_code: {
    type: Number,
    default: 91
  },
  gender: {
    type: String,
    enum: conf.GENDER,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  mobile_verfied: {
    type: Boolean,
    default: false,
    required: false
  },
  email: {
    type: String,
    required: false,
    default: null
  },
  email_verified: {
    type: Boolean,
    default: false,
    required: false
  },
  api_token: {
    type: String,
    required: true
  },
  temp_token: {
    type: Number,
    default: null,
    required: false
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: false
  }
}, { timestamps: true })

/*
*   @virtual schema creating for relationships
*/

registerSchema.virtual('Profile', {
  ref: 'Profile', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'user_id' // is equal to foreignField
})

// Set Object and Json property to true. Default is set to false
registerSchema.set('toObject', { virtuals: true })
registerSchema.set('toJSON', { virtuals: true })

export default model<IRegister>('Register', registerSchema)

// export default model<IRegister>('Register', registerSchema)
