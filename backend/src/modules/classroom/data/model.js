import { Schema, model} from 'mongoose';
import userModel from '../../users/data/model.js';
import programModel from '../../programs/data/model.js';
import { LANGUAGES, LEVELS } from '../../valueList.js'

const thisSchema = new Schema({
  title:          { type: String, required: true },
  description:    { type: String, },
  teacher:        { type: Schema.Types.ObjectId, ref: 'Users',   required: true, },
  students:       [{ type: Schema.Types.ObjectId, ref: 'Users'}],
  daytime:        { type: Date,   }, // es fecha y hora
  language:       { type: String, enum: LANGUAGES, required: true },
  level:          { type: String, enum: LEVELS,    required: true },
  duration_hours: { type: Number, required: true,  min: 1, max: 10, },
  link_meet:      { type: String, },
  link_calendar:  { type: String, },
  class_detail:   { type: Schema.Types.ObjectId, ref: 'ClassDetail'},
  program:        { type: Schema.Types.ObjectId, ref: 'Programs', required: true,},

  // data of conection
  created:        { type: Date,   default: Date.now,  immutable: true, disabled: true},
  updated:        { type: Date,   default: Date.now,  disabled: true},

}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

// Middleware para verificar roles antes de guardar
thisSchema.pre('save', async function (next) {

  // Verificar que el teacher tenga el rol de 'teacher'
  const teacher = await userModel.findById(this.teacher);
  console.log(this.teacher);
  if (!teacher || teacher.role !== 'Teacher') {
    const err = new Error('El teacher debe tener el rol de teacher.');
    return next(err);
  }

  // Verificar que todos los estudiantes tengan el rol de 'student'
  for (const student of this.students) {
    const studentDoc = await userModel.findById(student.student);
    if (!studentDoc || studentDoc.role !== 'Student') {
      const err = new Error('Todos los estudiantes deben tener el rol de student.');
      return next(err);
    }
  }
  next();
});

thisSchema.post('save', async function (doc, next) {
  await programModel.findByIdAndUpdate(doc.program, { $push: { classes: doc._id } });
  next();
});

thisSchema.pre('findOne', function(next) {
  this
  .populate('class_detail')
  next();
})

const dataModel = model('Classroom', thisSchema)

export default dataModel