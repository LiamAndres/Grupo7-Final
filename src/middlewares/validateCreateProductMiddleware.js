const path = require('path');
const { body } = require('express-validator');

module.exports = [

	body('referencia').notEmpty().withMessage('Tienes que escribir el nombre del producto').bail().isLength({min:5}).withMessage('el nombre del producto debe tener al menos 5 caracteres'),
	body('fabricante').notEmpty().withMessage('Tienes que escribir el fabricante').bail().isLength({min:5}).withMessage('el fabricante del producto debe tener al menos 5 caracteres'),
	body('descripcion').notEmpty().withMessage('Tienes que escribir una descripcion').bail().isLength({min:20}).withMessage('la descripcion del producto debe tener al menos 20 caracteres'),
	
	
		//body('country').notEmpty().withMessage('Tienes que elegir un país'),
	body('image').custom((value, { req }) => {
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