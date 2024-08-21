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
      select: 'title teacher students duration_hours',
      populate: [
        {
          path: 'students',
          select: '_id first_name last_name',
          options: { maxDepth: 1 }
        },
        {
          path: 'teacher',
          select: '_id first_name last_name',
          options: { maxDepth: 1 }
        }
      ],
      options: { maxDepth: 1 }
    })
    return result;
  }

  deleteMany = async (filter) => {
    const result = await this.model.deleteMany(filter)
    return result
  }
}