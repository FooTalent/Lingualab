import { Schema, model} from 'mongoose'
import { LANGUAGES, LEVELS } from '../../valueList.js'


const thisSchema = new Schema({
  // basic properties
  title:       { type: String, require:true },
  description: { type: String, },
  classes:     [{ type: Schema.Types.ObjectId, ref: 'classes' }],
  teacher:        { type: Schema.Types.ObjectId, ref: 'users', required: true },
  students:       [{ type: Schema.Types.ObjectId, ref: 'users'}],
  isTemplate:  { type: Boolean, default: true },

  // aditional properties
  language:    { type: String, enum: LANGUAGES, required: true },
  level:       { type: String, enum: LEVELS, required: true },
  link_meet:      { type: String, },

  // data of update
  created:     { type: Date,   default: Date.now,  immutable: true, },
  updated:     { type: Date,   default: Date.now,  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

thisSchema.pre('findOne', function(next) {
  this.populate({
    path: 'teacher',
    select: '-password'
  }).populate('classes');
  next();
});

// TODO usar en la ruta .populate('classes')

const dataModel = model('programs', thisSchema)

export default dataModel