import { Schema, model} from 'mongoose'
import { CURRENCIES, GENDERS, LANGUAGES, ROLES, COUNTRIES } from '../../valueList.js';

const educationSchema = new Schema({
  title:       { type: String,},
  link:        { type: String,},
}, { _id: false });

const userSchema = new Schema({
  // basic properties
  first_name:  { type: String,   required: true, maxLength: 50 },
  last_name:   { type: String,   required: true, maxLength: 50 },
  email:       { type: String,   required: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Debe completar un email valido'], unique: true },
  password:    { type: String,   required: true },
  role:        { type: String,   default: "Teacher", enum: ROLES,},

  // specific properties
  program:     [{ type: Schema.Types.ObjectId, ref: 'programs',}],

  // aditional properties
  photo:       { type: String,   },
  presentation:{ type: String,   },
  birthday:    { type: Date,     },
  gender:      { type: String,   enum: GENDERS,},
  phone:       { type: String, maxLength: 20   },
  studies:     { type: [educationSchema], },
  certificate: { type: [educationSchema], },

  // configuration
  languages:   [{ type: String, enum: LANGUAGES, }],
  country:     { type: String, enum: COUNTRIES},
  time_zone:   { type: Number,   },

  // google
  google_id:   { type: String,   },
  googleAccessToken: { type: String },
  googleRefreshToken: { type: String },

  // only teacher
  price_per_hour: { type: Number,},
  currency:    { type: String,   default: "ARS", enum: CURRENCIES,},

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

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const dataModel = model('users', userSchema)

export default dataModel