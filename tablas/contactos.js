const {DataTypes} = require('sequelize');

const sequelize = require('../config/conexion.js');

const Contacto = sequelize.define('Contacto',{
	id:{
		type:DataTypes.INTEGER,
		autoIncrement:true,
		primaryKey:true
	},
	email:{
		type:DataTypes.STRING(30),
		allowNull:false
	},
	nombre:{
		type:DataTypes.STRING(30),
		allowNull:false
	},
	comentario:{
		type:DataTypes.STRING(30),
		allowNull:false
	},
	ip:{
		type:DataTypes.STRING(20),
		allowNull:false
	},
	country:{
	type:DataTypes.STRING(20),
	allowNull:false	
	}
},{timestamps:true,freezeTableName:true});

module.exports = Contacto; 