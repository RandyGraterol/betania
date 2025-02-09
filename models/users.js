// models/contactosModel.js
const { Sequelize, DataTypes, Op } = require('sequelize');
const path = require('path');
// Definición del modelo Contacto
const sequelize = new Sequelize({
  dialect: 'sqlite',
    storage: path.join(__dirname, '../config/base.db'), // Ruta del archivo de la base de datos
  });

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    validate: {
            len: [3, 30], // Longitud mínima y máxima
            isAlphanumeric: true // Solo permite caracteres alfanuméricos
          }
        },
        password_hash: {
        type: DataTypes.STRING, // Aumentar la longitud
        allowNull: false
      }
    }, {
      timestamps: true,
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
  });

class UsersModel {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await sequelize.sync(); // Sincroniza el modelo con la base de datos
      console.log('Base de datos y tablas creadas correctamente desde el modelo.');
    } catch (error){
      console.error('Error al crear la base de datos:', error);
    }
  }

  async registerPost(data) {
    try {
      await Users.create(data);
      return true;
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      throw error;
    }
  }

  async loginPost(data){
   try{
   const user = await Users.findOne({where:{username:data.username}});
   if(!user) return null;
   return user;
   }catch(error){
     console.error('Error al agregar usuario:', error);
     throw error;
   }
 }


  // Otros métodos (getContactById, updateContact, deleteContact) pueden ser añadidos aquí
}

module.exports = new UsersModel(); // Exporta la instancia única