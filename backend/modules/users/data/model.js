import { Schema, model} from 'mongoose'

const bankDetailsSchema = new Schema({
  alias:       { type: String, },
  cbu:         { type: String, },
  banco:       { type: String, required: true, }
}, { _id: false });

const reviewSchema = new Schema({
  user:        { type: Schema.Types.ObjectId, ref: 'Users',   required: true, },
  created:     { type: Date,   label: 'Fecha Creación',       default: Date.now,  immutable: true, disabled: true},
  comment:     { type: String, label: 'Comentario',           required: true, },
  score:       { type: Number, label: 'Puntaje',              required: true,   min: 1, max: 10, },
}, { _id: false });

const thisSchema = new Schema({
  email:       { type: String, label: "Email",                required: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], unique: true },
  password:    { type: String, label: "Contraseña",           required: true },
  role:        { type: String, label: "Rol",                  default: "teacher", enum: ["teacher", "student", "admin"],},
  photo:       { type: String, label: "Foto",                 }, // TODO falta MULTER
  first_name:  { type: String, label: "Nombre",               required: true },
  last_name:   { type: String, label: "Apellido",             required: true, },
  birthday:    { type: Date,   label: 'Fecha Nacimiento',     },
  gender:      { type: String, label: 'Género',               enum: ["masculino", "femenino"],},
  presentation:{ type: String, label: "Presentación"          },
  languages:   { type: Array,  label: "Idiomas"               },
  country:     { type: [String], label: "Pais"                },
  time_zone:   { type: Number, label: "Zona Horaria"          },
  phone:       { type: String, label: "Telefono"              },
  
  reviews:     { type: [reviewSchema], },

  // only teacher
  price_per_hour: { type: Number, label: "precio por hora",   default: 1,},
  currency:    { type: String, label: "Moneda",               default: "ARS", enum: ["ARS", "DOL", "EUR"],},
  bank_details:{ type: [bankDetailsSchema], },

  // only student
  have_debt:   { type: Boolean },

  // data of conection
  created:     { type: Date,   label: 'Fecha Creación',       default: Date.now,  immutable: true, disabled: true},
  updated:     { type: Date,   label: 'Ultima actualización', default: Date.now,  disabled: true},
  connection:  { type: Date,   label: 'Ultima conexión',      default: Date.now,  disabled: true},

}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('Users', thisSchema)

export default dataModel