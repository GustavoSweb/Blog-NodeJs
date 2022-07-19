const Sequelize = require('sequelize')
const sequelize = new Sequelize('TDG', 'u0_a682', '123456', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize
}
