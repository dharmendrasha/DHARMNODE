import IDownloadScrap from '../types/IDownloadScrap'
import { model, Schema } from 'mongoose'
const DownloadScrap : Schema = new Schema({

  setVideoUrlLow: {
    type: String,
    required: false,
    default: null
  },
  setVideoUrlHigh: {
    type: String,
    required: false,
    default: null
  },
  setVideoHLS: {
    type: String,
    required: false,
    default: null
  },
  setThumbUrl: {
    type: String,
    required: false,
    default: null
  },
  setThumbUrl169: {
    type: String,
    required: false,
    default: null
  },
  setThumbSlide: {
    type: String,
    required: false,
    default: null
  },
  setThumbSlideBig: {
    type: String,
    required: false,
    default: null
  },
  Scrap: {
    type: Schema.Types.ObjectId,
    required: false,
    default: null
  },
  StartedAt: {
    type: Date,
    required: false,
    default: null
  },
  EndedAt: {
    type: Date,
    required: false,
    default: null
  }

})

export default model<IDownloadScrap>('DownloadScrap', DownloadScrap)
