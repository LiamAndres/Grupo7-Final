const express = require('express');
const router = express.Router();

const productsApiController = require('../../controllers/api/productsApiController');


// ****** inicio de multer *******
const multer = require("multer");
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/img/products"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

//si var storage = multer.disk... se llamaria var pepe = multer.disk... entonces var upload = multer({storage:pepe})
let upload = multer({storage});

const { route } = require('express/lib/application');
const { Router } = require('express');

router.get("/",productsApiController.listar); /* listado de producto */

// TAREA, implementar el metodo de detalle para la vista del cliente.
router.get("/:id", productsApiController.detail);

router.get("/crearProducto",productsApiController.vistaCrear); /* Formulario de creación de productos. solo visualiza crearProducto.ejs */
//CRUD2//
/*Verificar estas rutas de products*/
//Recordar que si la ruta router.post('/products/create'.....va a ser este el cambio en las pruebas
router.post('/products/create', productsApiController.create);
router.get('/products/edit/:id', productsApiController.edit);

module.exports = router;
