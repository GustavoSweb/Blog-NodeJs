// Dependencias
  const {engine} = require("express-handlebars")
  const express = require("express")
  const app = express()
  const bodyParser = require("body-parser")
  const admin = require("./routers/admin.js")
// Configurações

  // Handlebars
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');
  // body parser
     app.use(bodyParser.urlencoded({ extended: false }))
     app.use(bodyParser.json())
  
// Rotas
  app.get("/", (req, res)=>{
    res.send("essa e a pagina principal")
  })
  app.get("/post", (req, res)=>{
    res.send("Lista de postagens: ")
  })
  app.use("/admin", admin)
// Outros
  const PORT = 8081
  app.listen(PORT, ()=> {
    console.log("Servidor Rodando na porta: "+PORT)
  })
