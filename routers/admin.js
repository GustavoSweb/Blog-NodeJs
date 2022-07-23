const express = require("express")
const router = express.Router()
router.get("/", (req, res)=> {
  res.send("Seja bem vindo admin")
})
router.get("/post", (req, res)=> {
  res.send("Area de postagens para admin")
})

router.get("/categorias", (req, res)=> {
  res.send("Área de categorias")
})

module.exports = router
