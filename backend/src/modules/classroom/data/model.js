import { Schema, model} from 'mongoose';
import { LANGUAGES, LEVELS } from '../../valueList.js'

const thisSchema = new Schema({
  teacher:        { type: Schema.Types.ObjectId, ref: 'Users',   required: true, },
  students:       { type: [
    { Student:    { type: Schema.Types.ObjectId, ref: 'Users',   required: true }}
  ] },
  daytime:        { type: Date,   }, // es fecha y hora
  language:       { type: String, enum: LANGUAGES, required: true },
  level:          { type: String, enum: LEVELS,    required: true },
  duration_hours: { type: Number, required: true,  min: 1, max: 10, },
  link_meet:      { type: String, },
  link_calendar:  { type: String, },
  link_pago:      { type: String, },
  class:          { type: Schema.Types.ObjectId, ref: 'Class'},

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
  const User = model('User'); // Importar el modelo User

  // Verificar que el teacher tenga el rol de 'teacher'
  const teacher = await User.findById(this.teacher);
  if (!teacher || teacher.role !== 'teacher') {
    const err = new Error('El teacher debe tener el rol de teacher.');
    return next(err);
  }

  // Verificar que todos los estudiantes tengan el rol de 'student'
  for (const student of this.students) {
    const studentDoc = await User.findById(student.student);
    if (!studentDoc || studentDoc.role !== 'student') {
      const err = new Error('Todos los estudiantes deben tener el rol de student.');
      return next(err);
    }
  }

  next();
});

const dataModel = model('Classroom', thisSchema)

export default dataModel