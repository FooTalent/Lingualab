import { Schema, model} from 'mongoose'

const thisSchema = new Schema({
  teacher:        { type: Schema.Types.ObjectId, ref: 'Users',   required: true, },
  students:       { type: [
    { Student: {type: Schema.Types.ObjectId, ref: 'Users',   required: true }}
  ] },
  daytime:     { type: Date,   label: 'Fecha y Hora de inicio', }, // es fecha y hora
  language:    { type: String, label: 'Lenguaje', required: true },
  level:       { type: String, label: 'Nivel',    enum: ["BASICO", "MEDIO", "ALTO"], required: true },
  duration_hours: { type: Number, label: 'Duración hs', required: true,   min: 1, max: 10, },
  link_meet:         { type: String, label: 'Link',   },
  link_calendar:         { type: String, label: 'Link',   },
  link_pago:         { type: String, label: 'Link',   },
  class:        { type: Schema.Types.ObjectId, ref: 'Class'},

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

thisSchema.pre('save', function (next) {
  this.updated = Date.now();
  next();
});

const dataModel = model('classroom', thisSchema)

export default dataModel