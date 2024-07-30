import CustomController from "../../../libraries/customs/controller.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
    this.requieredfield = ["title", "level", "language", "teacher"]
  }
  get    = async (req, res, next) => {
    try {
      const filter = {}

      const { isTemplate } = req.query
      if ( isTemplate ) filter.isTemplate = isTemplate

      const element = await this.service.get(filter);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      const newElement = validateFields(req.body, this.requieredfield);
      const { description, isTemplate } = req.body
      const element = await this.service.create({...newElement, description, isTemplate});
      res.sendSuccess(element)
    } catch (error) {
      next(error)
    }
  }
}