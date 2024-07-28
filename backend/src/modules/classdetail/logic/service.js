import AppError from "../../../config/AppError.js";
import CustomService from "../../../libraries/customs/service.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import DaoClassRoom from "../../classroom/data/dao.mongo.js"
const classroom = new DaoClassRoom();

export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo);
  }
  list = async (uid) => await this.dao.list(uid)

  create = async (newElement, idClassroom) => {
    const newClassDetail = await this.dao.create (newElement)
    if (!newClassDetail) new AppError("Hubo un error al crear la classdetail",500)
    if (idClassroom ) {
      const updateRoom = await classroom.update({_id: idClassroom},{class_detail: newClassDetail._id})
      if (!updateRoom) new AppError("Hubo un error agregar la classdetail al classroom",500)
    }

    return newClassDetail
    
  }
}