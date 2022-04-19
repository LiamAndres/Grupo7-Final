const fs = require('fs');
const path = require('path');
const bcryptjs = require("bcryptjs");

const productsFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersModels= require("../models/User.js")


const { redirect } = require("express/lib/response");
const {validationResult} =require ("express-validator");

const User = require('../models/User');


const controller = {

    register: (req,res)=> {
        res.render("./users/registro.ejs")
    },
    processRegister: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('./users/registro.ejs', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        //buscar del campo "email" lo que vino del formulario / body
        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('./users/registro.ejs', {
				errors: {
                    email:{
                        msg:"Este correo ya está registrado"
                    }
                },
				oldData: req.body
			});
        }

        let userToCreate = {
            //toma los datos del formulario / body
            ...req.body,
            //sobreescribe "password" con la contraseña hasheada
            password: bcryptjs.hashSync(req.body.password, 10) ,
            //guarda la img con el nombre que se creó en "filename" en multerMiddleware.js
            avatar: req.file.filename
            
        }

        User.create(userToCreate);
		return res.redirect('/users/login');
	},
    
    login: (req,res)=> {
        res.render("./users/login.ejs")
    },

    loginProcess: (req, res)=> {
        //buscar si el campo email del body o formulario es igual al de la base de datos
        //gracias a findByField del modelo de User.js
        //userToLogin contiene todos los datos de 
        let userToLogin = User.findByField('email', req.body.email);
        

        if (userToLogin) {
            //variable que pregunta si el campo password es igual a userToLogin.password
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                //borrar del objeto userToLogin la propiedad password por seguridad
                delete userToLogin.password;
                //sesion de userToLogin que contiene todas las propiedades first_name etc, menos password
				req.session.userLogged = userToLogin;
                //redirect es la ruta de userRoutes.js "/profile"

                //si del "req" del body o pagina, viene remember_user (es el checkbox de login)
                //entonces crear una cookie variable "userEmail", y tomar de req.body solo email.
                //la duracion de la cookie es (1000miliseg * 60) * 60
                if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 1) * 1 })
                    //userEmail se usará en userLoggedMiddleware.js
				}

                return res.redirect("/users/profile")
            }
            return res.render("./users/login.ejs", {
                errors:{
                    email:{
                        msg:'Las credenciales son inválidas'
                    }
                    
                }
            })
        }

        return res.render("./users/login.ejs", {
            errors:{
                email:{
                    msg:'No se encuentra este email en nuestra base de datos'
                }
                
            }
        })
    },
    //profile es para el perfil de usuarios, ver que compraron, datos, etc
    profile: (req, res) => {
        //console.log(req.session.userLogged)
		return res.render('./users/userProfile.ejs',{
            user: req.session.userLogged
            
        });
        
	},
    logout: (req, res) => {
        //destruir cookie
        res.clearCookie("userEmail");
        //destrui session
        req.session.destroy();
        return res.redirect("/");
    },


    //lo creamos nosotros
    listar: (req,res)=> {

        res.render("./users/listaUse.ejs", { users })
    },
};

module.exports =  controller;