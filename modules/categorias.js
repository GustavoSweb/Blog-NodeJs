const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Categoria = new mongoose.Schema({ 
  name: String,
  slug: String,
  date: {
    type: Date,
    default: Date.now()
  }
  
})
const MyModel = mongoose.model('categorias', Categoria);

