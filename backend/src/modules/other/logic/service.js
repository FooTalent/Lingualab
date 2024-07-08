import CustomServiceLU from "../../../libraries/customs/service.lu.js";
import ThisDaoMongo from "../data/dao.mongo.js";

export default class Service extends CustomServiceLU {
  constructor() {
    super(new ThisDaoMongo);
  }
}