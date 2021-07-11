import { model, Schema } from 'mongoose'
// @ts-ignore
import { Sliders } from '../types/home'
const SliderModel : Schema = new Schema({
  image_link: {
    type: Schema.Types.ObjectId,
    ref: 'file',
    required: false
  },
  title: {
    type: String,
    required: false,
    default: null
  },
  anchor_title: {
    type: String,
    required: false,
    default: 'Buy Now'
  },
  anchor_link: {
    type: String,
    required: false,
    default: '#'
  }
})

export default model<Sliders>('Sliders', SliderModel)
