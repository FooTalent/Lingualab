import validateFields from "../../../libraries/utils/validatefiels.js";
import Service from "../logic/service.js";


export default class Controller {
  constructor() {
    this.service = new Service()
  }
  create = async (req, res, next) => {
    try {
      const { templateId, studentIds, startDate } = req.body;

      const newProgram = await this.service.createCustomProgram( templateId, studentIds, startDate, req.user );
      res.sendSuccess(newProgram)
    } catch (error) {
      next(error);
    }
  };
}