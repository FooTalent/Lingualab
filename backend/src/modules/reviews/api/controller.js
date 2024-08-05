import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service());
    this.requiredFields = ["student", "teacher", "program", "classes", "score"];
  }

  get    = async (req, res, next) => {
    try {
      const filter = req.body
      const element = await this.service.get(filter);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      let newElement = validateFields(req.body, this.requiredFields);
      const { comment } = req.body;

      const element = await this.service.create({ ...newElement, comment });
      res.sendSuccess(element);
    } catch (error) {
      next(error);
    }
  }
}
