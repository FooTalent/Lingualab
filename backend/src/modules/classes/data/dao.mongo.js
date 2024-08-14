import dataModel from "./model.js";
import DaoMongo from "../../../libraries/customs/dao.mongo.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(dataModel);
  }

  get = async (filter = {}, options = {}) => {
    const result = await this.model.find(filter)
    .sort(options.sort || {})
    .limit(options.limit || 0)
    .populate({
      path: 'program',
      select: 'title teacher students',
      populate: {
        path: 'students',
        select: 'first_name last_name',  
        options: { maxDepth: 1 } 
      },
      populate: {
        path: 'teacher',
        select: '_id first_name last_name',  
        options: { maxDepth: 1 } 
      },
      options: { maxDepth: 1 }
    })
    .select('-students.password');
    return result;
  }

  deleteMany = async (filter) => {
    const result = await this.model.deleteMany(filter)
    return result
  }
}