import Programs from '../../programs/data/dao.mongo.js'
import Classes from '../../classes/data/dao.mongo.js'
import AppError from '../../../config/AppError.js';


export default class CustomService {
  constructor() {
    this.daoProgram = new Programs();
    this.daoClass = new Classes();
  }

  createCustomProgram = async (templateId, studentIds = [], first_class, daysOfWeek, user ) => {

    // crea aula
    let templateProgram;
    if (templateId) {
      templateProgram = await this.daoProgram.getBy({ _id: templateId });
      if (!templateProgram || !templateProgram.isTemplate) {
        throw new AppError('El Id del Programa es inválido', 400);
      }
    }

    const savedProgram = await this.daoProgram.create({
      title: "PROBANDOO" + (templateId ? templateProgram.title : "Sin titulo"),//templateId ? templateProgram.title : "Sin titulo",
      description: templateId ? templateProgram.description : "",
      teacher: user._id,
      language: templateId ? templateProgram.language : "Inglés",
      level: templateId ? templateProgram.level : "A1-A2",
      isTemplate: false,
      classes: [],
      students: studentIds,
    });

    if (templateId) {
      const newClassesPromises = templateProgram.classes.map(async (classTemplateId) => {
        const classTemplate = await this.daoClass.getBy({ _id: classTemplateId });
        const newClass = await this.daoClass.create({
          title: classTemplate.title,
          description: classTemplate.description,
          content: classTemplate.content,
          program: savedProgram._id,
          resources: classTemplate.resources ? classTemplate.resources : [],
          // ! daytime: new Date(startDate.getTime() + classTemplate.duration_hours * 60 * 60 * 1000), // Example of setting date and time
          language: classTemplate.language,
          level: classTemplate.level,
          duration_hours: classTemplate.duration_hours,
          teacher: user._id,
          isTemplate: false,
        });
        return newClass;
      });

      const newClasses = await Promise.all(newClassesPromises);
      const idClasses = newClasses.map((newClass) => newClass._id);

      await this.daoProgram.update({ _id: savedProgram._id }, { classes: idClasses });
    }

    const updatedProgram = await this.daoProgram.getBy({ _id: savedProgram._id });
    
    // empieza a actualizar fechas
    const updatedDaysProgram = await this.update(updatedProgram._id, { first_class, daysOfWeek })

    return updatedDaysProgram;
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
        return await this.daoProgram.update({ _id: eid }, elementUpdate);
      }

      const program = await this.daoProgram.getBy({ _id: eid });
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
        const classData = await this.daoClass.getBy({ _id: classId });
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

        await this.daoClass.update({ _id: existingClasses[i]._id }, {
          daytime: classDate,
        });

        currentDate = new Date(classDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return await this.daoProgram.update({ _id: eid }, elementUpdate);
    } catch (error) {
      throw error;
    }
  }
}