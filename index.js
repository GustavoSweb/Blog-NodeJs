  // Dependencias
  const {engine} = require("express-handlebars")
  const express = require("express")
  const app = express()
  const bodyParser = require("body-parser")
  const admin = require("./routers/admin.js")
  const usuario = require("./routers/usuario.js")
  const path = require("path")
  const mongoose = require("mongoose")
  const PORT = process.env.PORT || 8081
  const session = require("express-session")
  const flash = require("connect-flash")
  require("./modules/postagens.js")
  const postagem = mongoose.model("postagens")
  const passport = require('passport');
  const senha = process.env.SENHA
require('./config/auth')(passport);
  
  require("./modules/categorias.js")
  const categoria = mongoose.model("categorias")
  require("./modules/usuarios.js")
// Configurações
app.use(express.static(path.resolve('public')))
  // session
    app.use(session({
      secret: "cursodenodejs",
      resave: true,
      saveUnitialized: true
      
    }))
    app.use(passport.initialize());
    app.use(passport.session())
  // Flash 
    app.use(flash())
    //Configuração
      app.use((req, res, next)=>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
        next()
      })

  // Handlebars
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');
  // body parser
     app.use(bodyParser.urlencoded({ extended: false }))
     app.use(bodyParser.json())
  // Mongosse //
    mongoose.connect(process.env.SERVE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(()=> {
      console.log("Banco de dados conectado com sucesso!")
    }).catch((err)=> {
      console.log("Deu pau! Erro: "+err)
    })
    
  // Boostrap //
  app.use('/static', express.static(__dirname + '/public'))
    


// Rotas //
  app.get("/", (req, res)=>{
    postagem.find().populate('categoria').lean().limit(5).then((post)=>{
      res.render("index", {post:post})
    }).catch(()=> {
      res.render("404")
    })
  })
  app.get("/postagens", (req, res)=>{
    res.send("Lista de postagens: ")
  })
  app.get("/postagens/:slug", (req, res)=> {
    postagem.findOne({slug: req.params.slug}).populate("categoria").lean().then((post)=> {
      if(post){
      res.render("leiapostagens", {post:post})
      }else{
        res.render("404")
      }
    }).catch(()=> {
      res.render("404")
    })
  })
  app.get("/categorias", (req, res)=> {
    categoria.find().lean().sort({date: 'desc'}).then((cate)=> {
      res.render("categorias", {cate:cate})
    }).catch((err)=> {
      req.flash("error_msg", "Houuve um erro ao listar as categorias")
      res.redirect("/")
    })
  })
  app.get("/categorias/:slug", (req, res)=> {
    categoria.findOne({slug: req.params.slug}).then((cate)=> {
      if(cate){
        postagem.find({categoria: cate._id}).lean().populate("categoria").then((post)=> {
          res.render("postagens", {post:post, cate:cate})
        }).catch(()=> {
          req.flash("error_msg", "Houve um erro interno ao listar as postagens dessa categoria!")
          res.redirect("/")
        })
      }else{
        
        res.render("404")
      }
    }).catch(()=> {
      req.flash("error_msg", "Houve um erro interno ao listar as postagens dessa categoria!")
      res.redirect("/")
    })
  })
  app.use("/admin", admin)
  app.use("/usuario", usuario)
// Outros //
  app.listen(PORT, ()=> {
    console.log("Servidor Rodando na porta: "+PORT)
  })
