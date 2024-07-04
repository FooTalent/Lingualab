import { Schema, model} from 'mongoose'

const thisSchema = new Schema({
  title:       { type: String, label: 'Titulo',   required: true },
  type:        { type: String, label: 'Tipo',     enum: ["JUEGO", "CANCION", "SERIE", "PELICULA", "DICCIONARIO", "LIBRO", "AUDIO LIBRO", "EJERCICIO", "EXAMEN"], required: true },
  level:       { type: String, label: 'Nivel',    enum: ["BASICO", "MEDIO", "ALTO"], required: true },
  language:    { type: String, label: 'Lenguaje', required: true },
  url:         { type: String, label: 'URL',      required: true },

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

const dataModel = model('Resources', thisSchema)

export default dataModel