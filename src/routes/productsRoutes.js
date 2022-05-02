const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');


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

router.get("/",productsController.listar); /* listado de producto */

// TAREA, implementar el metodo de detalle para la vista del cliente.
router.get("/detalle/:id", productsController.detail);

router.get("/crearProducto",productsController.vistaCrear); /* Formulario de creación de productos. solo visualiza crearProducto.ejs */
//CRUD2//
/*Verificar estas rutas de products*/
//Recordar que si la ruta router.post('/products/create'.....va a ser este el cambio en las pruebas
router.post('/products/create', productsController.create);
router.get('/products/edit/:id', productsController.edit);

module.exports =router;



/*router.post("/crearProducto", upload.single("image"),productsController.crear); /* Acción de creación. "crea producto" con form y redirecciona a listaProducto.ejs */

 /* Formulario de edición de productos */
//router.get("/editar/:id",productsController.editar); 

/* Acción de edición (a donde se envía el formulario): */
//router.patch("/editar/:id", upload.single('image'),productsController.actualizar); 

/* Acción de borrado */
//router.delete("/eliminar/:id", productsController.destroy); 



// TAREA, implementar el metodo de detalle para la vista del cliente.



