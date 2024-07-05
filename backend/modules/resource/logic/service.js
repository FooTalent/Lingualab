import CustomService from "../../../libraries/customs/service.js";
import ThisDaoMongo from "../data/dao.mongo.js";

export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo);
  }
}