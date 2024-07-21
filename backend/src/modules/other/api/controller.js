import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
  }
  get    = (req, res) => { res.sendSuccess({}, "GET"); }
  getBy  = (req, res) => { res.sendSuccess({}, "GET BY"); }
  create = (req, res) => { res.sendSuccess({}, "POST"); }
  update = (req, res) => { res.sendSuccess({}, "PUT"); }
  del    = (req, res) => { res.sendSuccess({}, "DELETE"); }
}