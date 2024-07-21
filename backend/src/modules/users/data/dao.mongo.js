import dataModel from "./model.js";
import DaoMongo from "../../../libraries/customs/dao.mongo.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(dataModel);
  }
  
  get = async (filter = {}, excludePassword = true) => {
    let query = this.model.find(filter);
    if (excludePassword) {
      query = query.select('-password');
    }
    return await query.exec();
  };

  getBy = async (filter, excludePassword = true) => {
    let query = this.model.findOne(filter)
    if (excludePassword) {
      query = query.select('-password');
    }
    return await query.exec();
  }

  updateConection = async (filter) => await this.model.findOneAndUpdate(
    filter,
    { connection: Date.now() },
    { new: true, timestamps: false }
  )
}

