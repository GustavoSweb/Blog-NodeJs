const mongoose = require("mongoose")
var Schema = mongoose.Schema

const usuario = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  eAdimin: {
    type: Number,
    require: true,
    default: 0
  },
  senha: {
    type: String,
    required: true
  }
})
mongoose.model("usuarios", usuario)
