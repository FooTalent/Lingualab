import { Schema, model} from 'mongoose';
import { LANGUAGES, LEVELS } from '../../valueList.js'

const classSchema = new Schema({
  // basic properties
  title:          { type: String, required: true },
  description:    { type: String, },
  content:        { type: String, },
  program:        { type: Schema.Types.ObjectId, ref: 'programs', required: true,},
  resources:      [{ type: Schema.Types.ObjectId,  ref: 'resources', }],
  isTemplate:     { type: Boolean, default: true },
  event:          { type: Schema.Types.ObjectId, ref: 'event',},

  // additional properties
  language:       { type: String, enum: LANGUAGES, required: true },
  level:          { type: String, enum: LEVELS,    required: true },
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

classSchema.pre('findOne', function(next) {
  this
    .populate({
      path: 'resources',
      select: '_id title type url'
    })
    .populate({
      path: 'event'
    });
  next();
});

const dataModel = model('classes', classSchema)

export default dataModel