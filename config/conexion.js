// db.js (archivo de configuración de la base de datos)
const {Sequelize} = require('sequelize');
const path = require('path');
// Crear una instancia de Sequelize y conectarla a una base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage:path.join(__dirname,'/base.db')// Especifica la ruta de tu archivo de base de datos SQLite
});

module.exports = sequelize;
