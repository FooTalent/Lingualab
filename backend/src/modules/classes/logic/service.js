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
      if(!classToDelete){
        throw new AppError(`Clase con ID ${classId} no encontrada`, 404)
      }
      const classId = classToDelete._id
      const programId = classToDelete.program
      
      await this.programDao.update(programId, { // Saca del programa la clase eliminada.
        $pull: {classes: classId}
      })

      return await this.dao.delete(eid)

    } catch (error) {
      throw error
    }
  }
}