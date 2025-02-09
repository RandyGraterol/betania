require('dotenv').config()
// controllers/contactosController.js
const ContactosModel = require('../models/models.js');
const UserModels = require('../models/users.js');
const fs = require('fs');
const axios = require('axios');
const bcrypt = require('bcrypt');
const nodemailer= require('nodemailer');

const ogData = {
        title: 'Pagina web programacion',
        type: 'website',
        image: 'https://example.com/imagen.jpg',
        url: 'https://theglobaldorado.com',
        description: 'Pagina de la materia.'
    };

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
  );

/////////////////////////////////////////////////////////
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:'elrandygraterol@gmail.com',
    pass:'mmtpozhyuyavswbd'
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
        from:'elrandygraterol@gmail.com',
    to:'soapdelinger@gmail.com',// Agrega aquí la dirección de correo a la lista de destinatarios
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
auth(req,res){
  try{
    const url = client.generateAuthUrl({
      access_type:'offline',
      scope:['profile','email']
    }); 
    res.redirect(url);
  }catch(error){
    console.error(error.message);
    res.status(500).send('Error en el servidor',error.message);
  }
}
/////////////////////////////////////////////////////////////////////////
async callback(req,res){
    const code = req.query.code;
  try{

    const {tokens} = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken:tokens.id_token,
      audience:process.env.GOOGLE_CLIENT_ID
    }); 

    const payload = ticket.getPayload();
    req.session.user ={
      name:payload.name,
      email:payload.email,
      picture:payload.picture 
    }
    req.session.google=true;
    res.redirect('/getComentarios');
  }catch(error){
    console.error(error.message);
    res.status(500).send('Error en el servidor',error.message);
  }
}
//////////////////////////////////////////////////////777////////////////
logouT(req,res){
  req.session.destroy(err=>{
    if(err) return res.status(500).send('Error al cerrar sesion');
    res.redirect('/login');
  })

}
/////////////////////////////////////////////////////////////////////////
async getComentarios(req,res){
  try{
    const contacto = await ContactosModel.getAllContacts();
    return res.render('contactos',{contacto});
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
        if(req.session.user){
          res.redirect('/getComentarios');
        }else{
         res.render('index',{files,ogData}); 
        }
        
      }
    }) 

  }catch(error){//esto sirve para atrapar el error en caso de que ocurra uno
   console.error(error.message);
   res.status(500).send('Error en el servidor');
 }
}
////////////////////////////////////////////////////////////////////////
async filtro(req,res){
  try{
    const query = req.body.query;
    const resultados = await ContactosModel.filtro(query);
    if(resultados && resultados.length > 0){
     res.json({status:true,resultados}); 
   }else{
     res.json({status:false});
   }
 }catch(error){
  console.error(error.message);
  res.status(500).send('Error en el servidor',error.message);
}
}
////////////////////////////////////////////////////////////////////////
async registerPost(req,res){
  try{
   const { username, password } = req.body;

        // Generar un hash de la contraseña
        const saltRounds = 10; // Número de rondas de sal
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Guardar el nuevo usuario en la base de datos
        const crear = await UserModels.registerPost({ username, password_hash });

        if (crear) return res.redirect('/getRegister');
      }catch(error){
        console.error(error.message);
        res.status(500).send('Error en el servidor',error.message);
      }
    }
////////////////////////////////////////////////////////////////////////
    getRegister(req,res){
      try{
        res.render('register');
      }catch(error){
        console.error(error.message);
        res.status(500).send('Error en el servidor',error.message);
      }
    }
////////////////////////////////////////////////////////////////////////
    login(req,res){
      try{
        res.render('login');
      }catch(error){
        console.error(error.message);
        res.status(500).send('Error en el servidor',error.message);
      }

    }
////////////////////////////////////////////////////////////////////////
    async loginPost(req,res){
      try{
       const {username,password} = req.body;
       const userVerificado = await UserModels.loginPost({username});
       if(!userVerificado) return res.json({status:'I',message:'Usuario no registrado'});
       const match = await bcrypt.compare(password,userVerificado.password_hash);
       if(!match) return res.json({status:'II',message:'Contraseña incorrecta'});
       req.session.isClient=true;
       req.session.username=userVerificado.username;
       res.json({status:'III',message:'¡Login success papu!'});
      }catch(error){//el randy 
        console.error(error.message);
        res.status(500).send('Error en el servidor',error.message);
      }
    }
    ////////////////////////////////////////////////////////////////////
    async logout(req,res){
      try{
       req.session.destroy(err=>{
        if(err) return res.status(500).send({message:'Error al eliminar sesion de usuario'});
        res.redirect('/login');
      })
     }catch(error){
      console.error(error.message);
      res.status(500).send('Error en el servidor',error.message);
    }
  }
////////////////////////////////////////////////////////////////////////
}

module.exports = new ContactosController();