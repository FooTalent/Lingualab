import dataModel from "./model.js";
import DaoMongo from "../../../libraries/customs/dao.mongo.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(dataModel);

  }

  getProgramsByTeacherId = async (teacherId) => {
    return await this.model.find({ teacher: teacherId }).select('_id');
  };
}

