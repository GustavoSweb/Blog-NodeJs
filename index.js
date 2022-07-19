const express = require("express")
const app = express()
const db = require("./metodos/db.js")
const Post = require("./metodos/Post.js")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
//Conexão MySQL
const Sequelize = require('sequelize')
const sequelize = new Sequelize('CDU', 'u0_a682', '123456', {
  host: 'localhost',
  dialect: 'mysql'
})



//Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.get("/card", function(req, res){
  res.render('formulario')
})
//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



app.post("/add", function(req, res){
  titulo = req.body.titulo
  conteudo = req.body.conteudo
  Post.create({
    titulo: titulo,
    conteudos: conteudo
  }).then(function(){
    res.redirect("/")
  }).catch(function(erro){
    res.send('Infelizmente ocoreu um erro, Tente novamente caso ocorra novamente nos avise pela pagina contato. <br> Log: <br>'+erro)
  })
    
})
app.get("/", function(req, res){
  Post.findAll().then(function(post){
    res.render("home", {
      post:post
    })
  })
})
app.get("/deletar/:id", function(req, res){
  Post.destroy({where:{"id":req.params.id}})
  res.redirect("/")
})

db.sequelize.authenticate().then(function(){
  console.log("Conexão feita com sucesso!")
}).catch(function(erro){
  console.log("erro: "+erro)
})


//Iniciar Servidor
app.listen(8081, function(){
  console.log("O nosso servidor esta online!")
})
