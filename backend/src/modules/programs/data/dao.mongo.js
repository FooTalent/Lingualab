import dataModel from "./model.js";
import DaoMongo from "../../../libraries/customs/dao.mongo.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(dataModel);

  }
  get = async (filter = {}) => await this.model.find(filter).populate({
    path: 'teacher',
    select: '-password'
  })
  .populate('classes')
  .populate({
    path: 'students',
    select: '_id first_name last_name'
  });

  getBy = async (filter) => await this.model.findOne(filter).populate({
    path: 'teacher',
    select: '-password'
  })
  .populate('classes')
  .populate({
    path: 'students',
    select: '_id first_name last_name'
  });

  getProgramsByTeacherId = async (teacherId) => {
    return await this.model.find({ teacher: teacherId, isTemplate: false }).select('_id');
  };

  countPrograms = async (teacherId, isTemplate) => await this.model.countDocuments({ teacher: teacherId, isTemplate })
}

