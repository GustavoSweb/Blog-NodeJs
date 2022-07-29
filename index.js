// Dependencias
  const {engine} = require("express-handlebars")
  const express = require("express")
  const app = express()
  const bodyParser = require("body-parser")
  const admin = require("./routers/admin.js")
  const path = require("path")
  const PORT = 8081
// Configurações

  // Handlebars
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');
  // body parser
     app.use(bodyParser.urlencoded({ extended: false }))
     app.use(bodyParser.json())
  // Mongosse //
  // Boostrap //
    app.use(express.static("public"))


// Rotas //
  app.get("/", (req, res)=>{
    res.render("admin/index")
  })
  app.get("/post", (req, res)=>{
    res.send("Lista de postagens: ")
  })
  app.get("/admin/categorias", (req, res)=>{
    res.render("/admin/categorias")
  })
  app.get("/admin/categorias/add", (req, res)=> {
    res.render("/admin/categoriasadd")
  })
  app.use("/admin", admin)
// Outros //
  app.listen(PORT, ()=> {
    console.log("Servidor Rodando na porta: "+PORT)
  })
