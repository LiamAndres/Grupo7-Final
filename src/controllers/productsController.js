const fs = require('fs');
const path = require('path');
//base de datos//
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const { redirect } = require("express/lib/response");
const res = require('express/lib/response');

const Productos = db.Producto;
const Users = db.Usuario;
const CategoriasProd = db.CategoriaProd;


/**
 * Return listar de products
 * @param {import('express').Request} 
 * @param {import('express').Response} 
 */

const productsController = {
            
    vistaCrear: async (req,res)=> {
        const CategoriasProd = await db.CategoriaProd.findAll();
        db.Producto.findAll ({
            /* order: [
                ['precio','DESC']
            ],
            limit: 5   */
        })   
             .then(productos =>{
                 res.render("./products/crearProducto.ejs", { productos, CategoriasProd });    
                });
    },
    guardado: async (req, res) => {        
        //const{referencia, fabricante, descripcion, precio, stock } = req.body;
        console.log(req.body.referencia);
        await Productos.create({
            referencia : req.body.referencia,
            fabricante : req.body.fabricante,
            descripcion : req.body.descripcion,
            precio : req.body.precio,
            stock : req.body.stock
        });
        console.log(req.body);

        
        res.redirect("/products/listado");
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
                res.render('./products/detalleProducto.ejs', { productos });
                });       
    },
    
    //detail: (req, res) => {
        //let id = req.params.id
        //let product = products.find(p => p.id == id );//
        //res.render("./products/detalleProducto.ejs", { product });//
    //
    //CRUD 2//
    

    
    edit: async (req, res) => {
       const productoId = req.params.id;
       const promProduct = Productos.findByPk(productoId, {include: ['categoriaprod']
    });
        const promCategoriasProd =  CategoriasProd.findAll();
        const result = await Promise.all([promProduct, promCategoriasProd]);
        return res.render('editarProducto.ejs', { Producto, allCategoriaProd });
    },

    

};

module.exports =  productsController;