import Controller from '../Index'
import { Request, Response } from 'express'
/**
 * This is the main class for Porn API
 * @class Porn
 */
export default class Porn extends Controller {
  /**
   * @param  {any} model?
   */
  constructor (model? : any) {
    super(model)
    this.getCategories = this.getCategories.bind(this)
  }

  public getCategories (req: Request, res: Response) : any {

  }
}
