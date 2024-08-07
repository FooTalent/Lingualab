import { Schema, model} from 'mongoose'

const reviewSchema = new Schema({
  student:     { type: Schema.Types.ObjectId, ref: 'users',   required: true, },
  teacher:     { type: Schema.Types.ObjectId, ref: 'users',   required: true, },
  
  program:     { type: Schema.Types.ObjectId, ref: 'programs',required: true, },
  classes:     { type: Schema.Types.ObjectId, ref: 'classes', required: true,  },
  score:       { type: Number, required: true,   min: 1, max: 10, },
  comment:     { type: String, },

  // data of conection
  created:     { type: Date,   default: Date.now,  immutable: true, },
  updated:     { type: Date,   default: Date.now,  }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

reviewSchema.pre(['findOne', 'find'], function(next) {
  this
  .populate({ path: 'student', select: 'first_name last_name level photo' })
  .populate({ path: 'teacher', select: 'first_name last_name' })
  .populate({ path: 'program', select: 'title' })
  .populate({ path: 'classes', select: 'title' })
  next();
});

const dataModel = model('reviews', reviewSchema)

export default dataModel