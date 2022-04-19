//usamos el modelo para trabajar la cookie de "recordar usuario" en login
const User = require('../models/User');

//middleware de aplicacion, es global en toda la app
//userLoggedMiddleware es para que mostremos 
function userLoggedMiddleware(req, res, next) {
	//respondemos (res) de estandar que es falso
	res.locals.isLogged = false;

	//variables para recordar usuario por cookies
	//emailInCookie contiene a .userEmail, cookie de login de userController.js
	//userEmail tiene el email del usuario que se logueo y dió "recordar usuario"
	let emailInCookie = req.cookies.userEmail;

	//aqui usarmos findByField del modelo, para buscar el usuario con el mismo email
	let userFromCookie = User.findByField('email', emailInCookie);

	//verificamos si hay alguien en userFromCookie
	if (userFromCookie) {
		//si lo hay lo guardamos en req.session.userLogged
		req.session.userLogged = userFromCookie;
	}

	// pero si en (req) hay una sesion? entonces: 
	if (req.session.userLogged) {
		//respodemos (res) que es verdadero
		res.locals.isLogged = true;
		//guardamos el (req) en (res)
		res.locals.userLogged = req.session.userLogged;
	}

	

	

	next();
}

module.exports = userLoggedMiddleware;