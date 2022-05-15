const express = require('express');
const router = express.Router();

// Controller
const userApiController = require('../../controllers/api/userApiController');

// Middlewares



//lista de todos los usuarios Prueba revisar *****
router.get("/",userApiController.listar);
router.get("/:id", userApiController.detail);



module.exports =router;