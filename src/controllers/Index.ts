import { Response as Res } from 'express'
import fs from 'fs-extra'

/**
 * It the parenf class of all controller
 * @class Controller
 */

interface IResponse{
  code: number;
  status: boolean;
  message: string;
  data: Array<any> | null
}

export default class Controller {
  public code : number
  public status : boolean
  public data : Array<any> | null
  public message : string

  constructor (model?:any) {
    this.Create = this.Create.bind(this)
    this.log = this.log.bind(this)
    this.code = 200
    this.status = false
    this.data = []
    this.message = 'This request has successfull response.'
    this.Response = this.Response.bind(this)
  }

  /**
   * It will log the error into the file and help us to log into the console
   * @param error Error
   * @param toBeConsole Boolean
   */
  public log (error: any, toBeConsole:boolean = true) : void {
    if (toBeConsole) {
      console.log(error)
    }
    const file = fs.createWriteStream('logs/error.log', {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
    const string = error.stack
    file.write(new Date().toISOString() + ' : ' + string + '\n')
  }

  /**
   * It will do the additional work for responsing to the client using api
   * @param callback callbackFunction
   * @param res Response
   * @returns Promise<any>
   */
  protected async Create (callback:any, res: Res) : Promise<any> {
    let status = 200
    let returning = 'Every thing is fine'
    try {
      const itRet = await callback()
      return itRet
    } catch (error : any) {
      this.log(error)
      status = 500
      returning = error.message
    }
    return res.status(500).json({ status: status, message: returning })
  }

  public Response () : IResponse {
    return {
      code: this.code,
      status: this.status,
      message: this.message,
      data: this.data
    }
  }
}
