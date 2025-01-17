// controllers/contactosController.js
const ContactosModel = require('../models/models.js');
const fs = require('fs');

class ContactosController {
  async add(req, res) {
    const { email,nombre,comentario } = req.body;
    const ip = req.ip;
    try {
      await ContactosModel.addContact({ email,nombre,comentario,ip});
      return res.status(201).json({status:true});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al agregar el contacto' ,status:false});
    }
  }
  async getComentarios(req,res){
    try{
    const comentarios = await ContactosModel.getAllContacts();
    return res.status(200).json(comentarios);
    }catch(error){
     console.error(error.message);
     return res.status(500).json({ message: 'Error al obtener comentarios' ,status:false})
    }
  }
  async index(req,res){
    try{//esto sirve para intentar ejecutar codigo o instrucciones de codigo
     const ruta = 'static/imagenes';
     await fs.readdir(ruta,(err,files)=>{
      if(err){
        console.error(`Error al leer archivos`);
      }else{
        res.render('index',{files});
      }
    }) 

  }catch(error){//esto sirve para atrapar el error en caso de que ocurra uno
   console.error(error.message);
   res.status(500).send('Error en el servidor');
 }
}
}

module.exports = new ContactosController();