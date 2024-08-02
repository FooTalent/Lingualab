import Programs from '../../programs/data/dao.mongo.js'
import Classes from '../../classes/data/dao.mongo.js'
import AppError from '../../../config/AppError.js';


export default class CustomService {
  constructor() {
    this.daoProgram = new Programs();
    this.daoClass = new Classes();
  }

  createCustomProgram = async (templateId, studentIds = [], startDate, user ) => {
    console.log(templateId);
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
          students: studentIds,
        });
        return newClass;
      });

      const newClasses = await Promise.all(newClassesPromises);
      const idClasses = newClasses.map((newClass) => newClass._id);
      console.log('New Classes IDs:', idClasses);

      await this.daoProgram.update({ _id: savedProgram._id }, { classes: idClasses });
    }

    const updatedProgram = await this.daoProgram.getBy({ _id: savedProgram._id });
    console.log('Updated Program with Classes:', updatedProgram);
    return updatedProgram;
  }
}