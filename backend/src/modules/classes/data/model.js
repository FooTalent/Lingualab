import { Schema, model} from 'mongoose';
import { LANGUAGES, LEVELS } from '../../valueList.js'

const thisSchema = new Schema({
  // basic properties
  title:          { type: String, required: true },
  description:    { type: String, },
  content:        { type: String, },
  duration_hours: { type: Number, min: 1, max: 10, },
  program:        { type: Schema.Types.ObjectId, ref: 'programs', required: true,},
  resources:      [{ type: Schema.Types.ObjectId,  ref: 'resources', }],
  teacher:        { type: Schema.Types.ObjectId, ref: 'Users', required: true },

  // TODO aditional properties (en duda si va)
  language:       { type: String, enum: LANGUAGES, required: true },
  level:          { type: String, enum: LEVELS,    required: true },
  link_meet:      { type: String, },
  link_calendar:  { type: String, },
  teacher:        { type: Schema.Types.ObjectId, ref: 'Users', },
  students:       [{ type: Schema.Types.ObjectId, ref: 'Users'}],

  // se cre con la aula vitual
  daytime:        { type: Date,   }, // es fecha y hora

  // data of conection
  created:        { type: Date,   default: Date.now,  immutable: true, },
  updated:        { type: Date,   default: Date.now,  disabled: true},

}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

classSchema.post('save', async function(doc, next) {
  await model('programs').findByIdAndUpdate(doc.program, { $push: { classes: doc._id } });
  next();
});

const dataModel = model('classes', thisSchema)

export default dataModel