require('dotenv').config();
const {CLAVESITIO,CLAVESECRETA} = process.env;
const express = require('express');
const router = express.Router();
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(CLAVESITIO,CLAVESECRETA);
const ContactosController = require('../controllers/controllers.js');
const verify = require('../middleware/verify.js');

router.get('/',ContactosController.index);
router.get('/getComentarios',verify,ContactosController.getComentarios);
router.get('/getRegister',ContactosController.getRegister);
router.get('/login',ContactosController.login);
router.get('/auth/google',ContactosController.auth);
router.get('/auth/google/callback',ContactosController.callback);
router.get('/auth/logout/',ContactosController.logouT);

//rutas post 
router.post('/contactosPost',ContactosController.add);
router.post('/filtro',ContactosController.filtro);
router.post('/registerPost',ContactosController.registerPost);
router.post('/loginPost',ContactosController.loginPost);
router.get('/logout',ContactosController.logout);

module.exports = router;