const express = require('express');
const router = express.Router();

const ContactosController = require('../controllers/controllers.js');

router.get('/',ContactosController.index);
router.get('/getComentarios',ContactosController.getComentarios);

//rutas post 

router.post('/contactosPost',ContactosController.add);

module.exports = router;