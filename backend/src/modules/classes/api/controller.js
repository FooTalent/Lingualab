import CustomController from "../../../libraries/customs/controller.js";
import convertToUTC from "../../../libraries/utils/convertToUTC.js";
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
  
      if (teacherId) {
        const programsWithTeacher = await model('programs').find({ teacher: teacherId }).select('_id');
        filter.program = { $in: programsWithTeacher.map(p => p._id) };
      }
  
      if (startDate || endDate) {
          const start = startDate ? convertToUTConvertToUTC(startDate) : undefined;
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
      const { description, daytime, isTemplate} = req.body
      const element = await this.service.create({...newElement, description, daytime, isTemplate});
      res.sendSuccess(element)
    } catch (error) {
      next(error)
    }
  }
}