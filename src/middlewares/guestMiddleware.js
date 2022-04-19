/* guestMiddleware es para no permitir el acceso a /login o /register
si ya hay un usuario logueado */

function guestMiddleware(req, res, next) {
	//preguntamos si req.session.userLogged es verdadero
	//recordemos que userLogged es la propiedad de loginProcess de userController.js
	if (req.session.userLogged) {
		return res.redirect('/users/profile');
	}
	//si no hay nada en la sesion o bien si no hay alguien logueado entonces continuar
	next();
}

module.exports = guestMiddleware;