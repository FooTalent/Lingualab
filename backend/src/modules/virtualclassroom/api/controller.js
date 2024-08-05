import { toUTC } from "../../../libraries/utils/convertToUTC.js";
import Service from "../logic/service.js";


export default class Controller {
  constructor() {
    this.service = new Service()
  }
  create = async (req, res, next) => {
    try {
      let { templateId, studentIds, first_class, daysOfWeek,} = req.body;

      if (first_class) { first_class = toUTC(first_class); }
      console.log("Controller studentIds: ",studentIds);

      const newProgram = await this.service.createCustomProgram(templateId, studentIds, first_class, daysOfWeek, req.user);
      res.sendSuccess(newProgram)
    } catch (error) {
      next(error);
    }
  };

  updateId = async (req, res, next) => {
    try {
      const { eid } = req.params;
      let newElement = req.body;
      if (newElement.first_class) {
        newElement.first_class = toUTC(newElement.first_class);
      }
      const element = await this.service.update(eid, newElement);
      res.sendSuccess(element);
    } catch (error) {
      next(error);
    }
  }
}