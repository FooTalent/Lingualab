import dataModel from "./model.js";
import DaoMongo from "../../../libraries/customs/dao.mongo.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(dataModel);
  }

  get = async (filter = {}) => {
    const result = await this.model.find(filter)
      .populate({
        path: 'program',
        select: 'title'
      })
      .populate({
        path: 'students',
        select: 'first_name, last_name'
      })
      .select('-students.password');
    return result;
  }
}

