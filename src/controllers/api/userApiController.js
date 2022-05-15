
const path = require('path');
const bcryptjs = require("bcryptjs");

const db = require('../../database/models');


const Users = db.Usuario;


const usersApiController = {

    listar: async (req,res) => {
        try {
            const usuarios = await db.Usuario.findAll();

            const cuentaUsuarios = usuarios.length;
            const listaUsuarios = usuarios.map(usuario => ({
                'id': usuario.id,
                'name': usuario.nombre,
                'email': usuario.email,
                'detail': 'api/usuarios/'+ usuario.id //Hay que verificar
            }))

            const respuesta = {
                'count': cuentaUsuarios,
                'users': listaUsuarios
            };


            return res.json(respuesta);
        }catch (error) {
            return res.send(error + ' Error de santi');
        }
    },        

    detail: (req, res) => {
        db.Usuario.findByPk(req.params.id)
            .then(usuarios => {

                const objSalida = {
                    'id':usuarios.id,
                    'nombre': usuarios.nombre,
                    'apellido': usuarios.apellido,
                    'email': usuarios.email
                }
                res.json(objSalida);
            });       
    }

};

module.exports =  usersApiController;