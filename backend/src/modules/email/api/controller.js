import validateFields from "../../../libraries/validatefiels.js";
import { sendMail } from "../../../libraries/emails/sendMail.js";

export default class Controller {
  constructor() {
    this.requieredfield = ['to', 'subject', 'template']
  }


  sendEmail = (req, res) => {
    try {
      const userData = validateFields(req.body, this.requieredfield);
      const { context } = req.body;
      context ? userData.context = context : userData.context = {};

      const resp = sendMail( userData.to, userData.subject, userData.template, userData.context)
      res.sendSuccess( {resp, userData}, "Prueba"); 

    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error)
    }
  }
}