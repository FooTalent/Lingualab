import { Schema, model} from 'mongoose'
import { LANGUAGES, LEVELS } from '../../valueList.js'

const thisSchema = new Schema({
  title:       { type: String, require:true },
  description: { type: String, },
  level:       { type: String, enum: LEVELS, required: true },
  language:    { type: String, enum: LANGUAGES, required: true },
  teacher:     { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  classes:     [{ type: Schema.Types.ObjectId, ref: 'Classroom' }],
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
  this
  this.populate({ path: 'teacher', select: '-password' })
  .populate('classes')
  
  next();
})

const dataModel = model('Programs', thisSchema)

export default dataModel