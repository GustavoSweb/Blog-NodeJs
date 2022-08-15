const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
require("../modules/usuarios.js")
const usuarios = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")

router.get("/registro", (req, res)=> {
  res.render("usuario/registro")
})
router.post("/registro", (req, res)=> {
  var erros = []
  const senha = req.body.senha
  const email = req.body.email
  const name = req.body.name
  
  if(!name || name == null || typeof name == undefined){
    erros.push({texto: "Nome inválido!"})
  }else if(name.length < 4){
    erros.push({texto: "Nome muito pequeno"})
  }
  if (!senha || senha == null || typeof senha == undefined) {
    erros.push({ texto: "Senha inválida!" })
  } else if (senha.length < 4) {
    erros.push({ texto: "Nome muito pequeno" })
  }
  if(!email || email == null || typeof email == undefined){
    erros.push({texto: "E-mail inválido!"})
  }
  if(senha != req.body.senha2){
    erros.push({texto: "As senhas são diferentes, tente novamente!"})
  }
  if(erros.length > 0){
    res.render("usuario/registro", {erros:erros})
  }else{
    usuarios.findOne({email: email}).then((usuario)=>{
      if(usuario){
        req.flash("error_msg", "Esse email ja está registrado no sitema!")
        res.redirect("/usuario/registro")
      }else{
       const novoUsuario = new usuarios({
         name: name,
         email: email,
         senha: senha
       })
       bcrypt.genSalt(10, (erro, salt)=> {
         bcrypt.hash(senha, salt, (erro, hash)=> {
           if(erro){
             req.flash("error_msg", "ouve um error interno!")
             res.redirect("/")
           }
           
           novoUsuario.senha = hash
           novoUsuario.save().then(()=> {
             req.flash("success_msg", "conta criada com sucesso!")
             res.redirect("/usuario/registro")
           })
         })
       })
      }
    })
    
  }
})
router.get("/login", (req, res)=> {
  res.render("usuario/login")
})
module.exports = router
