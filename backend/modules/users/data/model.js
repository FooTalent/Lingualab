import { Schema, model} from 'mongoose'

const thisSchema = new Schema({
  first_name:  { type: String, label: "Nombre",               required: true },
  last_name:   { type: String, label: "Apellido",             required: true, },
  email:       { type: String, label: "Email",                required: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], unique: true },
  password:    { type: String, label: "Contraseña",           required: true },
  role:        { type: String, label: "Rol",                  default: "user", enum: ["user", "admin"],},
  isTeacher:   { type: Boolean,label: "¿es Maestro?",         },
  isStudent:   { type: Boolean,label: "¿es Estudiante?",      },
  gender:      { type: String, label: 'Género',               enum: ["masculino", "femenino"],},
  birthday:    { type: Date,   label: 'Fecha Nacimiento',     },
  created:     { type: Date,   label: 'Fecha Creación',       default: Date.now,  disabled: true},
  updated:     { type: Date,   label: 'Ultima actualización', default: Date.now,  disabled: true},
  connection:  { type: Date,   label: 'Ultima conexión',      default: Date.now,  disabled: true},
})

const dataModel = model('users', thisSchema)

export default dataModel