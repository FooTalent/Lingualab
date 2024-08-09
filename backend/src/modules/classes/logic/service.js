import CustomService from "../../../libraries/customs/service.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import ProgramDaoMongo from "../../programs/data/dao.mongo.js";
import AppError from "../../../config/AppError.js";

export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo);
    this.programDao = new ProgramDaoMongo()
  }

  delete = async (eid) => {
    try {
      const classToDelete = await this.getBy(eid)
      if (!classToDelete) {
        throw new AppError(`Clase con ID ${eid} no encontrada`, 404)
      }
      const classId = classToDelete._id
      const programId = classToDelete.program

      await this.programDao.update(programId, {
        $pull: { classes: classId }
      })

      return await this.dao.delete(eid)

    } catch (error) {
      throw error
    }
  }

  getClassesByTeacherIdAndDateRange = async (teacherId, startDate, endDate) => {
    try {
      // Obtén los programas del profesor
      const programsWithTeacher = await this.programDao.getProgramsByTeacherId(teacherId);
      const programIds = programsWithTeacher.map(p => p._id);

      // Define el filtro para las clases
      const filter = {
        program: { $in: programIds },
        isTemplate: false,
        daytime: { $exists: true, $ne: null }
      };

      if (startDate || endDate) {
        filter.daytime = {};

        if (startDate) {
          filter.daytime.$gte = new Date(startDate);
        }

        if (endDate) {
          filter.daytime.$lte = new Date(endDate);
        }
      }

      return await this.dao.get(filter);
    } catch (error) {
      throw error;
    }
  };
}