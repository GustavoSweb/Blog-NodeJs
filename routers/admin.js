const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("../modules/categorias.js")
const categoria = mongoose.model('categorias')
require("../modules/postagens.js")
const postagem = mongoose.model("postagens")
const router = express.Router()
const {eAdmin} = require('../helpers/eAdmin.js')

router.get("/", eAdmin, (req, res)=> {
  res.render('admin/admin')
})
router.get("/post",eAdmin, (req, res)=> {
  res.send("Area de postagens para admin")
})
router.get("/categorias",eAdmin, (req, res)=>{
    categoria.find().lean().sort({date: 'desc'}).then((cate)=>{
      res.render("admin/categorias", {
        cate:cate
      })
    })
    
  })
router.post("/categorias/edit",eAdmin, (req, res)=> {
  var nome = req.body.name
  var slug = req.body.slug
  var id = req.body.id
  var erros = []
  if(!nome ||typeof nome == undefined || nome == null){
    erros.push({texto: "Nome inválido"})
  }else if(nome.length<2){
    erros.push({texto: "Nome muito pequeno"})
  }
  if(!slug ||typeof slug == undefined || slug == null){
    erros.push({texto: "Slug inválido"})
  }else if(slug.length<2){
    erros.push({texto: "Slug muito pequeno"})
  }
  if (erros.length > 0) {
    res.render("admin/categoriaedit", {
      erros:erros
    })
  }else{
    categoria.findOne({ _id:id}).then((cate)=>{
      cate.name = nome
      cate.slug = slug
      cate.save().then(()=>{
        req.flash("success_msg", "Categoria editada!")
        res.redirect("/admin/categorias")
      }).catch(()=> {
      req.flash("error_msg", "Não foi possível editar")
        res.redirect("/admin/categorias")
    })
    }).catch(()=> {
      req.flash("error_msg", "Categoria não encontrada")
        res.redirect("/admin/categorias")
    })
  }
      
    
})
router.get("/categorias/add",eAdmin, (req, res)=> {
    res.render("admin/categoriasadd")
  })
router.get("/categorias/edit/:id",eAdmin, (req, res)=> {
  categoria.findOne({_id:req.params.id}).lean().then((cate)=> {
    res.render("admin/categoriaedit", {
      cate:cate
    })
    }).catch((err)=>{
      req.flash("error_msg", "Categoria não existe.")
      res.redirect("/admin/categorias")
    })
  })
  
router.post("/categorias/nova",eAdmin, (req, res)=> {
  var erros = []
  const name = req.body.name
  const slug = req.body.slug
  if (typeof name == undefined || name == null) {
    erros.push({texto:"Nome inválido"})
    
  } else if(name.length < 2){
    erros.push({texto:"Nome muito pequeno"})
  }
    if (typeof slug == undefined || slug == null) {
    erros.push({texto:"Slug inválido"})
  }else if(slug.length < 2){
    erros.push({texto:"Slug muito pequeno"})
  }
  if (erros.length > 0) {
    res.render("admin/categoriasadd", {
      erros:erros
    })
  } else{
    new categoria({
    name: req.body.name,
    slug: req.body.slug
  }).save().then(()=>{
    
    req.flash("success_msg", "Categoria salva com sucesso!")
    res.redirect("/admin/categorias")
  }).catch((err)=>{
    
    req.flash("error_msg", "Infelizmente a categoria não foi salva! tente novamente.")
    res.redirect("/admin")
  })
  }
})
router.post("/categorias/deletar",eAdmin, (req, res)=> {
  categoria.deleteOne({_id: req.body.id}).then(()=>{
    req.flash("success_msg", "Categoria excluída!")
    res.redirect("/admin/categorias")
  }).catch((err)=> {
    req.flash("error_msg", "Não foi possível excluir a categoria.")
    console.log(err)
    res.redirect("/admin/categorias")
  })
})
router.get("/postagens",eAdmin, (req, res)=> {
  postagem.find().lean().populate('categoria').sort({date: 'desc'}).then((postagem)=>{
    res.render("admin/postagens", {
      post: postagem
    })
  })
  
})
router.get("/postagens/add",eAdmin, (req, res)=> {
  categoria.find().lean().then((cate)=> {
    res.render("admin/addpostagens", {
      cate:cate
    })
  }).catch((err)=> {
    req.flash("error_msg", "Houvw um erro ao listar as categorias, tente novamente!")
    res.redirect("/admin")
  })
  
})
router.post("/postagem/nova",eAdmin, (req, res)=> {

  var erros = []
  if(req.body.categoria =="0"){
    erros.push({texto: "Escolha uma categoria"})
  }
  if(erros.length > 0){
    postagem.find().lean().then((post)=>{
      res.render('admin/addpostagens', {
      erros:erros,
      post:post
      
    })
    })
    
  }else{
  var novaPostagem ={
    titulo: req.body.titulo,
    slug: req.body.slug,
    descricao: req.body.descricao,
    conteudo: req.body.conteudo,
    
    categoria: req.body.categoria
    
  }
  
  new postagem(novaPostagem).save().then(()=> {
    req.flash("success_msg", "Categoria salva com sucesso!")
    res.redirect("/admin/postagens")
  }).catch(()=> {
    req.flash("error_msg", "Houve um erro ao salvar a postagem")
    res.redirect("/admin/postagens")
  })}
})
router.get("/postagens/edit/:id",eAdmin, (req, res)=> {
  postagem.findOne({_id: req.params.id}).lean().then((post)=> {
    categoria.find().lean().then((cate) => {
      res.render("admin/editpostagens", {
      post:post,
      cate: cate
    })
    })
    
  })
})
router.post("/postagens/edit",eAdmin, (req, res)=> {
  var ep = {
    t: req.body.titulo,
    s: req.body.slug,
    d: req.body.descricao,
    c: req.body.conteudo,
    ca: req.body.categoria,
    da: Date.now()
  }
  postagem.findOne({_id: req.body.id}).then((post)=> {
    post.titulo = ep.t
    post.slug = ep.s
    post.descricao = ep.d
    post.conteudo = ep.c
    post.categoria = ep.ca
    post.date = ep.da
    post.save().then(()=> {
    req.flash("success_msg", "Categoria editada com sucesso!")
    res.redirect("/admin/postagens")
      
    }
    ).catch(()=> {
      req.flash("error_msg", "Não foi possível salvat a categoria!")
    res.redirect("/admin/postagens/edit/${req.body.id}")
    })
    
  }).catch(()=> {
    req.flash("error_msg", "Não foi possível encontrar a categoria!")
    res.redirect("/admin/postagens/edit/${req.body.id}")
  })
})
router.post("/postagens/delete",eAdmin, (req, res)=> {
  postagem.deleteOne({_id: req.body.id}).then(()=> {
    req.flash("success_msg", "Categoria deletada")
    res.redirect("/admin/postagens")
  }).catch(()=> {
    req.flash("error_msg", "Não foi possível deletar")
    res.redirect("/admin/postagens")
  })
})
module.exports = router
