import CustomController from "../../../libraries/customs/controller.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
    this.requieredfield = ["title", "level", "language", "teacher", "program"]
  }
  get    = async (req, res) => {
    const {tid, date} = req.query
    const filter = {}

    if (tid) filter.teacher = tid
    if (date) {
      const initialDate = new Date(`${date}T00:00:00-03:00`)
      const finalDate = new Date(`${date}T23:59:59-03:00`)

      const startDateUTC = new Date(initialDate.getTime() + initialDate.getTimezoneOffset() * 60000);
      const endDateUTC = new Date(finalDate.getTime() + finalDate.getTimezoneOffset() * 60000);

      filter.daytime = {
        $gte: startDateUTC,
        $lte: endDateUTC
      }
    }
    const elements = await this.service.get(filter)
    res.sendSuccessOrNotFound(elements)
  }

  create = async (req, res, next) => {
    try {
      const newElement = validateFields(req.body, this.requieredfield);
      const { description, duration_hours, daytime} = req.body
      const element = await this.service.create({...newElement, description, duration_hours, daytime});
      res.sendSuccess(element)
    } catch (error) {
      next(error)
    }
  }
}