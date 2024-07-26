import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
  }

  getByTeacherAndDate = async (req, res) => {
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
}