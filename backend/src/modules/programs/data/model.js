import { Schema, model} from 'mongoose'
import { LANGUAGES, LEVELS, DAYSOFWEEK } from '../../valueList.js'


const thisSchema = new Schema({
  // basic properties
  title:       { type: String, require:true },
  description: { type: String, },
  classes:     [{ type: Schema.Types.ObjectId, ref: 'classes',autopopulate: false }],
  teacher:        { type: Schema.Types.ObjectId, ref: 'users', required: true, autopopulate: false },
  students:       [{ type: Schema.Types.ObjectId, ref: 'users'}],
  isTemplate:  { type: Boolean, default: true },

  // aditional properties
  language:    { type: String, enum: LANGUAGES, required: true },
  level:       { type: String, enum: LEVELS, required: true },
  link_meet:      { type: String, },
  first_class: { type: Date, },
  duration_hours: { type: Number, min: 1, max: 10, default: 1},
  daysOfWeek:  [{ type: String, enum: DAYSOFWEEK,}],

  // data of update
  created:     { type: Date,   default: Date.now,  immutable: true, },
  updated:     { type: Date,   default: Date.now,  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

// thisSchema.pre(['findOne', 'find'], function(next) {
//   this
//   .populate({
//     path: 'teacher',
//     select: '-password'
//   })
//   .populate('classes')
//   .populate({
//     path: 'students',
//     select: '_id first_name last_name'
//   });
//   next();
// });

const dataModel = model('programs', thisSchema)

export default dataModel