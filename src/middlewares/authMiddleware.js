/* authMiddleware es para no permitir el acceso a /profile
si NO hay un usuario logueado */

function authMiddleware(req, res, next) {
	//no hay usuario logueado en sesion?
	if (!req.session.userLogged) {
		//entonces lo redireccionamos a '/users/login'
		return res.redirect('/users/login');
	}
	//hay un usuario logueado en sesion? entonces lo dejamos pasar
	next();
}

module.exports = authMiddleware;