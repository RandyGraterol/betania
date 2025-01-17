// models/contactosModel.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Definición del modelo Contacto
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../config/base.db'), // Ruta del archivo de la base de datos
});

const Contacto = sequelize.define('Contacto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  comentario: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  timestamps: true,
  freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
});

class ContactosModel {
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

  async addContact(contactData) {
    try {
      const newContact = await Contacto.create(contactData);
      return newContact;
    } catch (error) {
      console.error('Error al agregar el contacto:', error);
      throw error;
    }
  }

  async getAllContacts(){
    try {
      const contacts = await Contacto.findAll();
      return contacts;
    } catch (error) {
      console.error('Error al obtener los contactos:', error);
      throw error;
    }
  }

  // Otros métodos (getContactById, updateContact, deleteContact) pueden ser añadidos aquí
}

module.exports = new ContactosModel(); // Exporta la instancia única