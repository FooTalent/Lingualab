import validateFields from "../../../libraries/utils/validatefiels.js";

export default class Controller {
  constructor() {
    this.requieredfield = ['programId', 'studentIds', 'startDate']
  }
  get = (req, res) => {res.send("Clases virtuales")}

  create = async (req, res, next) => {
    try {
      const reqData = validateFields(req.body, this.requieredfield);

      //const newProgram = await createCustomProgramForStudent(templateId, studentIds, new Date(startDate));
      res.sendSuccess(reqData)
    } catch (error) {
      next(error);
    }
  };
}