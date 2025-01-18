// controllers/contactosController.js
const ContactosModel = require('../models/models.js');
const fs = require('fs');
const axios = require('axios');
const nodemailer= require('nodemailer');
/////////////////////////////////////////////////////////
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:'globaldorado78@gmail.com',
    pass:'fauthesukyadpjmv'
  }
});

// Función para obtener la fecha y hora actuales en formato YYYY-MM-DDTHH:MM
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses de 0-11
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  

  class ContactosController {
    async add(req, res) {
      let country;
      let datee = getCurrentDateTime();
      const { email,nombre,comentario } = req.body;
      let lat = req.query.lat;
      let lng = req.query.lng;
      console.log(`latitud : ${lat} longitud : ${lng}`);
      const ip = req.ip;
      const apiKey = '5112e9a74b7e4a7f81bf1cc97f22e98e';
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
      try {
         //if(!req.recaptcha.error){
         const response = await axios.get(url);

         if (response.data.results.length > 0) {
           country = response.data.results[0].components.country;
    // Continuar con la lógica
        }else{
          console.log('no se pudo obtener pais de origen');
          return res.status(400).json({ message: 'No se encontraron resultados para las coordenadas proporcionadas.',status:false});
        }
        await ContactosModel.addContact({ email,nombre,comentario,ip,country});
        const mailOptions = {
          from:'globaldorado78@gmail.com',
    to: 'programacion2ais@dispostable.com',// Agrega aquí la dirección de correo a la lista de destinatarios
    subject: 'Un usuario a enviado un mensaje',
    text: `Datos del usuario:\n\n
           Nombre: ${nombre}\n
           Email: ${email}\n
           Comentario: ${comentario}\n
           ip: ${ip}\n
           pais: ${country}\n
    fecha de solicitud: ${datee}`
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error al enviar el correo:', error);
        return res.status(500).json({ message: 'Error al enviar el correo', status: false });
    } else {
      console.log('Correo enviado:', info.response);
    }

  });
  return res.status(201).json({status:true}); 

} catch (error) {
  console.error(error);
  return res.status(500).json({message: 'Error al agregar el contacto' ,status:false});
}
}
/////////////////////////////////////////////////////////////////////////
async getComentarios(req,res){
  try{
    const comentarios = await ContactosModel.getAllContacts();
    return res.status(200).json(comentarios);
  }catch(error){
   console.error(error.message);
   return res.status(500).json({ message: 'Error al obtener comentarios' ,status:false})
 }
}
/////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////
}

module.exports = new ContactosController();