// Dependencias
  const {engine} = require("express-handlebars")
  const express = require("express")
  const app = express()
  const bodyParser = require("body-parser")
  const admin = require("./routers/admin.js")
  const path = require("path")
  const mongoose = require("mongoose")
  const PORT = 8081
  const session = require("express-session")
// Configurações

  // Handlebars
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');
  // body parser
     app.use(bodyParser.urlencoded({ extended: false }))
     app.use(bodyParser.json())
  // Mongosse //
    mongoose.connect("mongodb+srv://gustavo:progamacao10@cluster0.3wzok.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(()=> {
      console.log("Banco de dados conectado com sucesso!")
    }).catch((err)=> {
      console.log("Deu pau! Erro: "+err)
    })
    
  // Boostrap //
    app.use(express.static("public"))


// Rotas //
  app.get("/", (req, res)=>{
    res.render("admin/index")
  })
  app.get("/post", (req, res)=>{
    res.send("Lista de postagens: ")
  })
  app.use((req, res, next)=> {
    console.log("Ele gostaa")
    next()
  })
  app.use("/admin", admin)
// Outros //
  app.listen(PORT, ()=> {
    console.log("Servidor Rodando na porta: "+PORT)
  })
