import virtualModel from "./model.js";
import classModel from '../../classes/data/model.js'
import programModel from '../../programs/data/model.js'
import DaoMongo from "../../../libraries/customs/dao.mongo.js";
import AppError from "../../../config/AppError.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(virtualModel);
  }
  
  // async create(programId, teacherId, studentIds, title, language, level) {
    
  //   const program = await programModel.findById(programId).populate('classes');
  //   if (!program) { throw new AppError('El Programa no fue encontardo', 400); }

  //   const newVClass = this.model.create({
  //     title,
  //     program: program._id,
  //     teacher: teacherId,
  //     students: studentIds,
  //     language,
  //     level,
  //     classes: [],
  //   });

  //   const duplicatedClasses = await Promise.all(program.classes.map(async (classItem) => {
  //     const newClass = new Class({
  //       title: classItem.title,
  //       description: classItem.description,
  //       content: classItem.content,
  //       duration_hours: classItem.duration_hours,
  //       program: program._id,
  //       resources: classItem.resources,
  //       teacher: teacherId,
  //       language: classItem.language,
  //       level: classItem.level,
  //       link_meet: classItem.link_meet,
  //       link_calendar: classItem.link_calendar,
  //       daytime: classItem.daytime,
  //       students: studentIds,
  //     });
  //     await newClass.save();
  //     return newClass._id;
  //   }));

  //   // Asociar las clases duplicadas con el VirtualClassroom
  //   virtualClassroom.classes = duplicatedClasses;
  //   await virtualClassroom.save();

  //   return virtualClassroom;
  // }
}

