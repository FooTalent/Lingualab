import { Schema, model} from 'mongoose'
import { LANGUAGES, LEVELS } from '../../valueList.js'

const thisSchema = new Schema({
  // basic properties
  title:      { type: String, required: true },
  program:    { type: Schema.Types.ObjectId, ref: 'programs', required: true,},
  teacher:    { type: Schema.Types.ObjectId, ref: 'Users',   required: true, },
  students:   [{ type: Schema.Types.ObjectId, ref: 'Users'}],

  // aditional properties
  language:   { type: String, enum: LANGUAGES, required: true },
  level:      { type: String, enum: LEVELS, required: true },

  classes:    [{ type: Schema.Types.ObjectId, ref: 'Class' }],

  // data of conection
  created:    { type: Date,   default: Date.now,  immutable: true, disabled: true},
  updated:    { type: Date,   default: Date.now,  disabled: true},

}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})
const dataModel = model('virtualclassrooms', thisSchema)

export default dataModel