import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
  }
}