const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



const { route } = require('express/lib/application');

// Formulario de registro
router.get("/register", guestMiddleware, usersController.register);

// Procesar el registro
router.post("/register", uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get("/login", guestMiddleware, usersController.login);

// Procesar el login
router.post("/login",usersController.loginProcess);

// Perfil de Usuario
router.get("/profile", authMiddleware, usersController.profile);

// Logout
router.get("/logout", usersController.logout);

//lista de todos los usuarios Prueba revisar *****
router.get("/lista",usersController.listar);


module.exports =router;