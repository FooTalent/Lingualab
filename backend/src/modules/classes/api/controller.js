import CustomController from "../../../libraries/customs/controller.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
    this.requieredfield = ["title", "level", "language", "teacher", "program"]
  }
  get    = async (req, res, next) => {
    try {
      const {teacherId, startDate, endDate, isTemplate} = req.query
      const filter = {}
  
      if (teacherId) filter.teacher = teacherId
  
      const convertToUTC = (dateString, isEndOfDay = false) => {
        const time = isEndOfDay ? 'T23:59:59-03:00' : 'T00:00:00-03:00';
        const date = new Date(`${dateString}${time}`);
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      }
  
      if (startDate || endDate) {
          const start = startDate ? convertToUTC(startDate) : undefined;
          const end = endDate ? convertToUTC(endDate, true) : undefined;
  
          filter.daytime = {};
          if (start) filter.daytime.$gte = start;
          if (end) filter.daytime.$lte = end;
      }
      
      isTemplate ? filter.isTemplate = isTemplate : filter.isTemplate = false
      
      const elements = await this.service.get(filter)
      res.sendSuccessOrNotFound(elements)
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      const newElement = validateFields(req.body, this.requieredfield);
      const { description, duration_hours, daytime, isTemplate} = req.body
      const element = await this.service.create({...newElement, description, duration_hours, daytime, isTemplate});
      res.sendSuccess(element)
    } catch (error) {
      next(error)
    }
  }
}