const express = require('express');//modulo express
const path = require('path');//camino --- rutas
const app = express();//instancia de express
const port = 4000;//port
const cors = require('cors');

const ContactosModel = require('./models/models.js');

const routes = require('./routes/router.js');

app.use(express.static(path.join(__dirname,'/static')));//ruta archivos estaticos 

app.set('view engine','ejs');//motor EJS

app.set('views',path.join(__dirname,'/views'));//ruta de las vistas

app.use(cors());

//definir archivos estaticos 
app.use(express.static(path.join(__dirname,'/public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

//sirve para recibir los datos de la solicitud del cliente 
app.use(express.urlencoded({extended:false}));
//sirve para enviar o responderle al usuario 
app.use(express.json());

app.use('/',routes);

app.listen(port,()=>{
 console.log(`ruta completa del servidor : ${__dirname}`);
 console.log(`Servidor corriendo en el puerto : ${port}`);	
});

