/* eslint-disable new-cap */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
export default class Facebook {
    app_id : String;
    app_secret : String;

    constructor (app_id:String, app_secret:String) {
      this.app_id = app_id
      this.app_secret = app_secret
    }
}
