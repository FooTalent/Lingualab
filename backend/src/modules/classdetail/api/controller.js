import CustomController from "../../../libraries/customs/controller.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);this.requieredfield = ["title", "level", "language", "teacher"]
  }

    create = async (req, res, next) => {
    try {
      const newElement = validateFields(req.body, this.requieredfield);
      const { description, duration_hours, idClassroom} = req.body
      const element = await this.service.create({...newElement, description, duration_hours}, idClassroom);
      res.sendSuccess(element)
    } catch (error) {
      next(error)
    }
  }

  list = async(req, res, next) => {
    try {
      const {uid} = req.params
      const list = await this.service.list(uid);
      res.sendSuccess(list)
    } catch (e) {
      next(e)
    }
  }
}