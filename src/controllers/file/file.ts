/* eslint-disable new-cap */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import { Response, Request } from 'express'
import IFile from '../../types/file'
import fileModel from '../../models/file'
import * as help from '../../config/index'
import * as helper from '../../helper/index'
import fs from 'fs-extra'
const saveFile = async (req: Request, res: Response) : Promise<Response> => {
  let Status : number = 200
  let message : any = 'file saved successfully'

  try {
    if ('file' in req.files) {
      const file = req.files.file as Pick<IFile, any>

      // upload to the local
      const uploadpath = help.FILE_UPLOAD_PATH
      const path_temp : string = file.path
      let filename : string = file.name
      let file_path : any

      if (fs.existsSync(uploadpath + '/' + filename)) {
        // rename
        const file : any[] = filename.split('.')
        const file_extension : string = '.' + file[1]
        const random : number = helper.randomnumber()
        filename = random.toString() + '_' + Date.now() + '_' + file[0] + file_extension
      }

      fs.move(path_temp, uploadpath + '/' + filename)

      const savefile : IFile = new fileModel()
      savefile.name = filename
      savefile.saved_as = '/upload/' + filename
      savefile.type = file.type
      savefile.size = file.size
      savefile.save()

      file_path = {
        filename: filename,
        uploadpath: savefile.saved_as,
        completepath: req.protocol + '://' + req.get('host') + '/upload/' + filename,
        size: savefile.size,
        type: savefile.type,
        id: savefile._id
      }

      message = file_path
    } else {
      throw new Error('File did not found')
    }
  } catch (error) {
    Status = 500
    message = error.message
  }

  return res.status(Status).json(message)
}

export { saveFile }
