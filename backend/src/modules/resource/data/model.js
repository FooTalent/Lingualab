import { Schema, model} from 'mongoose'
import { LANGUAGES, LEVELS, RESOURCE_TYPES } from '../../valueList.js'

const thisSchema = new Schema({
  title:       { type: String, label: 'Titulo',   required: true },
  type:        { type: String, label: 'Tipo',     enum: RESOURCE_TYPES, required: true },
  level:       { type: String, label: 'Nivel',    enum: LEVELS, required: true },
  language:    { type: String, label: 'Lenguaje', enum: LANGUAGES, required: true },
  url:         { type: String, label: 'URL',      },
  description: { type: String, label: 'Descripcion', },
  teacher:        { type: Schema.Types.ObjectId, ref: 'Users', },
  
  // data of conection
  created:     { type: Date,   label: 'Fecha Creación',       default: Date.now,  immutable: true, disabled: true},
  updated:     { type: Date,   label: 'Ultima actualización', default: Date.now,  disabled: true},

}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('resources', thisSchema)

export default dataModel