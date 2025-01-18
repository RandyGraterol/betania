require('dotenv').config();
const {CLAVESITIO,CLAVESECRETA} = process.env;
const express = require('express');
const router = express.Router();
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(CLAVESITIO,CLAVESECRETA);
const ContactosController = require('../controllers/controllers.js');

router.get('/',ContactosController.index);
router.get('/getComentarios',ContactosController.getComentarios);

//rutas post 

router.post('/contactosPost',ContactosController.add);

module.exports = router;