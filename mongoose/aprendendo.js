const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://gustavo:progamacao10@cluster0.3wzok.mongodb.net/?retryWrites=true&w=majority');
const user = new mongoose.Schema({ name: String})
const MyModel = mongoose.model('Test', user);

const gustavo = mongoose.model('Test')

new gustavo({
  name: "gustavo"
}).save()
