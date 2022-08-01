const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("../modules/categorias.js")
const categoria = mongoose.model('categorias')
const router = express.Router()
router.get("/", (req, res)=> {
  res.send("Seja bem vindo admin")
})
router.get("/post", (req, res)=> {
  res.send("Area de postagens para admin")
})
router.get("/categorias", (req, res)=>{
    res.render("admin/categorias")
  })
router.get("/categorias/add", (req, res)=> {
    res.render("admin/categoriasadd")
  })
router.post("/categorias/nova", (req, res)=> {
  new categoria({
    name: req.body.name,
    slug: req.body.slug
  }).save().then(()=>{
    res.redirect("/admin/categorias")
  }).catch((err)=>{
    res.send("Opa! Deu ERRO: "+err)
  })
})

module.exports = router
