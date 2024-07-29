import { Schema, model} from 'mongoose';
import { LANGUAGES, LEVELS } from '../../valueList.js';

const thisSchema = new Schema({
  title:          { type: String, required: true },
  description:    { type: String, },
  teacher:        { type: Schema.Types.ObjectId, ref: 'Users', required: true, },
  language:       { type: String, enum: LANGUAGES, required: true },
  level:          { type: String, enum: LEVELS,    required: true },
  duration_hours: { type: Number, min: 1, max: 10, },
  resources:      [{
    resource:       { type: Schema.Types.ObjectId,  ref: 'Resources',  required: true, }
  }],
  content:        { type: String, },

  // data of conection
  created:     { type: Date,   default: Date.now,  immutable: true, },
  updated:     { type: Date,   default: Date.now,  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('ClassDetail', thisSchema)

export default dataModel