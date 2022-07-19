const db = require("./db.js")
const Post = db.sequelize.define("postagens", {
  titulo: {
    type: db.Sequelize.STRING
  },
  conteudos: {
    type: db.Sequelize.TEXT
  }
})

module.exports = Post