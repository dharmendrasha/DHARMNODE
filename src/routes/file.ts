import { Router } from 'express'

import { saveFile } from '../controllers/file/file'

import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ dest: 'upload/', storage: storage })

const route : Router = Router()

route.post('/save', upload.single('file'), saveFile)

export default route
