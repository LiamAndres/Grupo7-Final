const path = require('path');
const { body } = require('express-validator');

module.exports = [

	body('first_name').notEmpty().withMessage('Tienes que escribir tu nombre').bail().isLength({min:2}).withMessage('el nombre debe tener al menos 2 caracteres y maximo 30'),
	body('last_name').notEmpty().withMessage('Tienes que escribir tu apellido').bail().isLength({min:2}).withMessage('el apellido debe tener al menos 2 caracteres y maximo 30'),
	body('user_name').notEmpty().withMessage('Tienes que escribir un nombre de usuario'),
	body('email')
			.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
			.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail().isLength({min:8}).withMessage('la contraseña debe tener al menos 8 caracteres y maximo 30'),
		//body('country').notEmpty().withMessage('Tienes que elegir un país'),
	body('avatar').custom((value, { req }) => {
			let file = req.file;
			let acceptedExtensions = ['.jpg', '.png', '.gif'];
			
			if (!file) {
				throw new Error('Tienes que subir una imagen');
			} else {
				let fileExtension = path.extname(file.originalname);
				if (!acceptedExtensions.includes(fileExtension)) {
					throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
				}
			}
	
			return true;
		})
]