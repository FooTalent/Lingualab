import CustomController from "../../../libraries/customs/controller.js";
import { toUTC } from "../../../libraries/utils/convertToUTC.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service());
    this.requiredFields = ["title", "level", "language", "teacher"];
  }

  get    = async (req, res, next) => {
    try {
      const filter = {};

      const { teacherId, isTemplate, first_class } = req.query;
      if (teacherId) filter.teacher = teacherId;
      if (isTemplate) filter.isTemplate = isTemplate === "true";
      if (first_class) filter.first_class = toUTC(first_class);

      const element = await this.service.get(filter);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error);
    }
  }

  create = async (req, res, next) => {
    try {
      let newElement = validateFields(req.body, this.requiredFields);
      const { description, isTemplate, first_class } = req.body;
      if (first_class) {
        newElement.first_class = toUTC(first_class);
      }
      const element = await this.service.create({ ...newElement, description, isTemplate });
      res.sendSuccess(element);
    } catch (error) {
      next(error);
    }
  }

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
