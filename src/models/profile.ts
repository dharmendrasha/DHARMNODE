import IProfile from '../types/profile'
import { model, Schema } from 'mongoose'
import * as conf from '../config/index'

const profileSchema : Schema = new Schema({
  user_id: {
    type: String,
    index: true,
    required: true
  },
  profile_picture: {
    type: String,
    required: false,
    default: null
  },
  pictures_collage: {
    type: Array,
    required: false,
    default: []
  },
  zip_code: {
    type: Number,
    required: false,
    default: null
  },
  country: {
    type: String,
    required: false,
    default: null
  },
  full_address: {
    type: String,
    required: false,
    default: null
  },
  city: {
    type: String,
    required: false,
    default: null
  },
  state: {
    type: String,
    required: false,
    default: null
  },
  race: {
    type: String,
    required: false,
    default: null
  },
  height: {
    foot: {
      type: Number,
      required: false,
      default: null
    },
    inch: {
      type: Number,
      required: false,
      default: null
    }
  },
  body_type: {
    type: String,
    required: false,
    default: null
  },
  annual_income: {
    type: Number,
    required: false,
    default: null
  },
  sexual_preference: {
    type: String,
    enum: conf.GENDER,
    default: 'None'
  },
  interested_in: {
    type: String,
    enum: conf.TYPE,
    default: 'None'
  },
  looking_for_age_beetween: {
    start: {
      type: Number,
      required: false,
      default: null
    },
    end: {
      type: Number,
      required: false,
      default: null
    }
  },
  profile_heading: {
    type: String,
    required: false,
    default: null
  },
  about_your_self: {
    type: String,
    required: false,
    default: null
  },
  looking_for_describe: {
    type: String,
    required: false,
    default: null
  },
  Register: {
    type: Schema.Types.ObjectId,
    ref: 'Register',
    required: true
  }
}, { timestamps: true })

export default model<IProfile>('Profile', profileSchema)
