import CustomService from "../../../libraries/customs/service.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import ClassDaoMongo from "../../classes/data/dao.mongo.js";
import AppError from "../../../config/AppError.js";

export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo());
    this.classDao = new ClassDaoMongo();
  }

  update = async (eid, elementUpdate) => {
    const dayOfWeekMap = {
      "Lunes": 1,
      "Martes": 2,
      "Miércoles": 3,
      "Jueves": 4,
      "Viernes": 5,
      "Sábado": 6,
      "Domingo": 0
    };

    try {
      if (!elementUpdate.first_class && !elementUpdate.daysOfWeek) {
        return await this.dao.update({ _id: eid }, elementUpdate);
      }

      const program = await this.dao.getBy({ _id: eid });
      if (!program) {
        throw new AppError('Programa no encontrado', 404);
      }

      const firstClassDate = elementUpdate.first_class ? new Date(elementUpdate.first_class) : program.first_class;
      const daysOfWeek = elementUpdate.daysOfWeek || program.daysOfWeek;

      if (!Array.isArray(daysOfWeek) || daysOfWeek.length === 0) {
        throw new AppError('Días de la semana inválidos', 400);
      }

      const validDaysOfWeek = Object.keys(dayOfWeekMap);
      if (!daysOfWeek.every(day => validDaysOfWeek.includes(day))) {
        throw new AppError('Uno o más días de la semana son inválidos', 400);
      }
      
      const existingClasses = [];
      for (const classId of program.classes) {
        const classData = await this.classDao.getBy({ _id: classId });
        if (classData) {
          existingClasses.push(classData);
        } else {
          throw new AppError(`Clase con ID ${classId} no encontrada`, 404);
        }
      }

      let currentDate = new Date(firstClassDate);

      const getNextValidDate = (date) => {
        let dayIndex = date.getDay();
        let daysAdded = 0;

        while (!daysOfWeek.includes(Object.keys(dayOfWeekMap).find(day => dayOfWeekMap[day] === dayIndex))) {
          date.setDate(date.getDate() + 1);
          dayIndex = date.getDay();
          daysAdded++;
          
          if (daysAdded > 7) {
            throw new AppError('No se encontró un día válido dentro de una semana', 400);
          }
        }
        return date;
      };

      for (let i = 0; i < existingClasses.length; i++) {
        const classDate = getNextValidDate(new Date(currentDate));

        await this.classDao.update({ _id: existingClasses[i]._id }, {
          daytime: classDate,
        });

        currentDate = new Date(classDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return await this.dao.update({ _id: eid }, elementUpdate);
    } catch (error) {
      throw error;
    }
  }
}
