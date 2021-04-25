// import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";

class DummyController extends BaseController {
  constructor({ dummyRepository }) {
    super();
    this.dummyRepository = dummyRepository;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns { Promise}
   * @memberof DummyController
   */
  async create(req, res) {
    // const payload = _pick(req.body, ["subject", "note"]);
    // const response = await this.createTodo.execute(payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess({}, "Todo created successfully!", HTTP_STATUS.CREATED);
  }
}

export default DummyController;
