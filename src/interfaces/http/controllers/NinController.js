// import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";

class NinController extends BaseController {
  constructor({ generateVnin, verifyVnin }) {
    super();
    this.generateVnin = generateVnin;
    this.verifyVnin = verifyVnin;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns { Promise}
   * @memberof NinController
   */
  async generate(req, res) {
    const payload = req.body;
    const response = await this.generateVnin.execute(payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "vNIN successfully generated", HTTP_STATUS.OK);
  }

  async verify(req, res) {
    const payload = req.body;
    const response = await this.verifyVnin.execute(payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "vNIN successfully verified", HTTP_STATUS.OK);
  }
}

export default NinController;
