import { Schema, model} from 'mongoose'

const thisSchema = new Schema({
  teacher:        { type: Schema.Types.ObjectId, ref: 'Users',   required: true, },
  language:       { type: String, label: 'Lenguaje', required: true },
  level:          { type: String, label: 'Nivel',    enum: ["BASICO", "MEDIO", "ALTO"], required: true },
  duration_hours: { type: Number, label: 'Duración hs', min: 1, max: 10, },
  resources:      [{
    resource:       { type: Schema.Types.ObjectId,  ref: 'Resources',  required: true, }
  }],

  // data of conection
  created:     { type: Date,   label: 'Fecha Creación',       default: Date.now,  immutable: true, disabled: true},
  updated:     { type: Date,   label: 'Ultima actualización', default: Date.now,  disabled: true},
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('Class', thisSchema)

export default dataModel