const fs = require('fs');
const path = require('path');
//base de datos//
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//esto permite hacer las validaciones tomadas mas adelante por el validationResult(req)
const {validationResult} =require ("express-validator");

const productsFilePath = path.join(__dirname, '../data/products.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const { redirect } = require("express/lib/response");
const res = require('express/lib/response');

//modelos
const Productos = db.Producto;
const Usuarios = db.Usuario;
const CategoriasProd = db.CategoriaProd;


/**
 * Return listar de products
 * @param {import('express').Request} 
 * @param {import('express').Response} 
 */

const productsController = {
            
    vistaCrear: async (req,res)=> {
        //
        //const CategoriasProd = await db.CategoriaProd.findAll();
        CategoriasProd.findAll ()   
             .then(CategoriasProd =>{
                 res.render("./products/crearProducto.ejs", { CategoriasProd });    
                });
    },
    guardado: async (req, res) => {        
        //const{referencia, fabricante, descripcion, precio, stock } = req.body;
        //validationResult(req) es requisito para tomar las validadciones del body o req
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            //pedimos de nuevo categoria de la DB 
            //por lo que redirige nuevamente a crearProducto.ejs
            const CategoriasProd = await db.CategoriaProd.findAll();
			return res.render('./products/crearProducto.ejs', {
                //CategoriasProd es el llamado de la tabla CategoriaProd.findAll
                CategoriasProd,
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        //console.log(resultValidation);
        //console.log(req.body.referencia);
        await Productos.create({
            referencia : req.body.referencia,
            fabricante : req.body.fabricante,
            descripcion : req.body.descripcion,
            precio : req.body.precio,
            stock : req.body.stock
        });
        //console.log(req.body);

        
        res.redirect("/products/");
    },
    listado: async (req,res) => {
        try {
            //db.Producto ese Producto es de el alias models Producto.js
            const productos = await db.Producto.findAll({
                
                order: [
                    ['precio','DESC']
                ],
                //OJO revisar lo de paginacion ***********
                //limit: 5 
                 /* order: [
                        ['precio','DESC']
                    ],
                    limit: 5   */
                });
            
                res.render('./products/listaProducto.ejs', { productos });
            }catch (error) {
                res.send('error');
        }
    },

    detalle: (req, res) => {
        db.Producto.findByPk(req.params.id,{
            include:[{association:"categoriasprod"},{association:"ordenes_compra"}]
        })
            .then(productos => {
                res.render('./products/detalleProductoA.ejs', { productos });
                });       
    },
    editar: async (req, res) => {
        const pedidoProducto = db.Producto.findByPk(req.params.id);
        const pedidoCategoria = db.Producto.findAll();

        Promise.all([pedidoProducto, pedidoCategoria])
            .then(function([productos, categorias]){
                res.render('./products/editarProducto.ejs',{ productos, categorias });
            })
    },

    actualizar: async(req, res)=>{

        //validationResult(req) es requisito para tomar las validadciones del body o req
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            //pedimos de nuevo categoria de la DB 
            //por lo que redirige nuevamente a crearProducto.ejs
            const CategoriasProd = await db.CategoriaProd.findAll();
			return res.render('./products/crearProducto.ejs', {
                //CategoriasProd es el llamado de la tabla CategoriaProd.findAll
                CategoriasProd,
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        Productos.update({
            referencia : req.body.referencia,
            fabricante : req.body.fabricante,
            descripcion : req.body.descripcion,
            precio : req.body.precio,
            stock : req.body.stock
        },{
            where: {
                id:req.params.id
            }
        });
        res.redirect("/products/"+req.params.id)
    },

    borrar: (req, res)=>{
        Productos.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect("/products/")
    }


    /* editar: async (req, res) => {
       const productoId = req.params.id;
       const promProduct = Productos.findByPk(productoId, {include: ['categoriaprod']
    });
        const promCategoriasProd =  CategoriasProd.findAll();
        const result = await Promise.all([promProduct, promCategoriasProd]);
        return res.render('editarProducto.ejs', { Producto, allCategoriaProd });
    }, */

    

};

module.exports =  productsController;