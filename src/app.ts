import { TZ } from './config/index'
import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

// body parser
import bodyParser from 'body-parser'

// form data
// eslint-disable-next-line camelcase
import * as form_req from 'express-form-data'

// auth import
import authRoutes from './routes/auth'

// save file
import fileRoutes from './routes/file'

// validation
import { ValidationError } from 'express-validation'

// method override
// eslint-disable-next-line camelcase
import method_override from 'method-override'

import Controller from './controllers/Index'

// error logging
import pino from 'pino'
import expressPino from 'express-pino-logger'
require('dotenv').config()
// import * as conf from './config/index'

process.env.TZ = TZ

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: { colorize: true }
})
const expressLogger = expressPino({ logger })

const app: Express = express()
// app.use(timeout('10000s'))
app.use(expressLogger)

const PORT: string | number = process.env.PORT || 4000

// app.use(express.json()) // for json
// app.use(express.urlencoded({ extended: true })) // for form data

app.use(method_override())

app.use(form_req.parse())

app.use(bodyParser.json())

// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }))

// form dharmendra

app.use(cors())

// auth group
app.use('/auth', authRoutes)

app.use('/file', fileRoutes)

app.use('/upload/:filename', async (req: Request, res : Response) : Promise<void> => {
  return res.download(process.cwd() + '/upload/' + req.params.filename)
})

// page not found

const errorHandler = async (err : Error, req : Request, res : Response, next: () => Response<any, Record<string, any>> | PromiseLike<Response<any, Record<string, any>>>) : Promise<Response> => {
  if (err instanceof ValidationError) {
    new Controller().log(err)
    return res.status(err.statusCode).json(err)
  }
  return next()
}

// @ts-ignore
app.use(errorHandler)

app.use(async (req : Request, res : Response) : Promise<Response> => {
  return res.status(404).json({ message: 'page not found' })
  // return res.status(404).json(err);
})

// app.use((req: Request, res: Response, next): any => {
//   if (!req.timedout) return next()
// })

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useFindAndModify', false)

/**
 * @param  {String} uri
 * @param  {mongoose.ConnectOptions} options
 */
mongoose.connect(uri, options).then(() =>
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  )
).catch((error) => {
  console.log(` :::: STOP :::: Server is not running on http://localhost:${PORT}`, ' ::: CAUSE ::: ', error.message)
  // throw error
})
