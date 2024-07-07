import { Schema, model} from 'mongoose'

const thisSchema = new Schema({
  text:       { type: String, label: 'Texto', },
  lastupdate: { type: Date,   label: 'Actualización',                  default: Date.now, disabled: true},
})

const dataModel = model('users', thisSchema)

export default dataModel