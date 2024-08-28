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
      const { description, isTemplate, duration_hours, first_class } = req.body;
      if (first_class) {
        newElement.first_class = toUTC(first_class, "new");
      }
      const element = await this.service.create({ ...newElement, description, duration_hours, isTemplate });
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

  countPrograms = async (req, res, next) => {
    try {
      let {techaerId, isTemplate} = req.query

      if (!techaerId) return res.sendUserError("Falta incluir el campo: techaerId")
      if (!isTemplate) return res.sendUserError("Falta incluir el campo: isTemplate")
      isTemplate = isTemplate === "true"

      const units = await this.service.countPrograms(techaerId, isTemplate)

      res.sendSuccess(units);
    } catch (error) {
      next(error);
    }
  }

  hourlyLoad  = async (req, res, next) => {
    try {
      const teacherId = req.user._id;
      const hours = await this.service.hourlyLoad(teacherId )
      res.sendSuccess(hours)
    } catch (error) {
      next(error);
    }
  }
}
