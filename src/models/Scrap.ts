import { model, Schema } from 'mongoose'
import IScrap from '../types/Scrap'
const Scrap : Schema = new Schema({

  link: {
    type: String,
    required: false,
    default: null
  },
  title: {
    type: String,
    required: false,
    default: null
  },
  length: {
    type: String,
    required: false,
    default: null
  },
  poster: {
    type: String,
    required: false,
    default: null
  },
  iFrame: {
    type: String,
    required: false,
    default: null
  },
  tags: {
    type: String,
    required: false,
    default: null
  },
  featured: {
    type: String,
    required: false,
    default: null
  },
  uploadedOn: {
    type: String,
    required: false,
    default: null
  },
  category: {
    type: String,
    required: false,
    default: null
  },
  IsScrapComplete: {
    type: Boolean,
    required: false,
    default: false
  },
  inProcess: {
    type: Boolean,
    required: false,
    default: false
  }

})
export default model<IScrap>('Scrap', Scrap)
