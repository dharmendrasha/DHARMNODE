import ISearch from '../types/search'
import { model, Schema } from 'mongoose'

import * as conf from '../config/index'

const SearchSchema : Schema = new Schema({

  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Register',
    required: false
  },
  i_am_a: {
    type: String,
    enum: conf.TYPE,
    required: true
  },
  seeking: {
    type: String,
    enum: conf.TYPE,
    required: true
  },
  between: {
    start: {
      type: Number,
      required: false,
      default: 0
    },
    end: {
      type: Number,
      required: false,
      default: 0
    }
  },
  within: {
    zip: {
      type: Number,
      required: false,
      default: 0
    },
    area_of: {
      type: String,
      required: false,
      enum: [
        '5 Miles of', '10 Miles of', '25 Miles of', '50 Miles of', '100 Miles of', '250 Miles of', 'any'
      ],
      default: 'any'
    }
  }

}, { timestamps: true })

export default model<ISearch>('Search', SearchSchema)
