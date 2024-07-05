import { Schema, model} from 'mongoose'
import { CURRENCIES, GENDERS, LANGUAGES, ROLES } from '../../valueList.js';


const bankDetailsSchema = new Schema({
  alias:       { type: String, },
  cbu:         { type: String, },
  banco:       { type: String, required: true, }
}, { _id: false });

const reviewSchema = new Schema({
  user:        { type: Schema.Types.ObjectId, ref: 'Users',   required: true, },
  created:     { type: Date,   default: Date.now,  immutable: true,},
  comment:     { type: String, required: true, },
  score:       { type: Number, required: true,   min: 1, max: 10, },
}, { _id: false });

const thisSchema = new Schema({
  email:       { type: String,   required: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], unique: true },
  password:    { type: String,   required: true },
  role:        { type: String,   default: "Teacher", enum: ROLES,},
  photo:       { type: String,   }, // TODO falta MULTER
  first_name:  { type: String,   required: true },
  last_name:   { type: String,   required: true, },
  birthday:    { type: Date,     },
  gender:      { type: String,   enum: GENDERS,},
  presentation:{ type: String,   },
  languages:   { type: [
                  { type: String, enum: LANGUAGES, }],},
  country:     { type: [String], },
  time_zone:   { type: Number,   },
  phone:       { type: String,   },
  
  reviews:     { type: [reviewSchema], },

  // only teacher
  price_per_hour: { type: Number,},
  currency:    { type: String,   default: "ARS", enum: CURRENCIES,},
  bank_details:{ type: [bankDetailsSchema], },

  // only student
  have_debt:   { type: Boolean },

  // data of conection
  created:     { type: Date,   default: Date.now,  immutable: true, },
  updated:     { type: Date,   default: Date.now,  },
  connection:  { type: Date,   default: Date.now,  },

}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('Users', thisSchema)

export default dataModel