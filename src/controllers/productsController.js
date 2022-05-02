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
    listar: async (req,res) => {
        try {
            const productos = await db.Producto.findAll();
            res.render('listaProducto.ejs', { productos });
        }catch (error) {
            res.send('error');
        }
    },        
    vistaCrear: (req,res)=> {
        db.Producto.findAll ({
            order: [
                ['precio','DESC']
            ],
            limit: 5  
        })   
             .then(productos =>{
                 res.render("crearProducto.ejs", { productos });    
    });
},
    detail: (req, res) => {
        db.Producto.findByPk(req.params.id)
            .then(productos => {
                res.render('detalleProducto.ejs', { productos });
            });       
    },
    
    //detail: (req, res) => {
        //let id = req.params.id
        //let product = products.find(p => p.id == id );//
        //res.render("./products/detalleProducto.ejs", { product });//
    //
    //CRUD 2//
    create: async (req, res) => {
        const{referencia, fabricante, direccion, precio, stock } = req.body;
        console.log(req.body);
        await products.create({
            referencia,
            fabricante,
            direccion,
            precio,
            stock
        });
        return res.redirect("/products");
    },
    edit: async (req, res) => {
       const poductoId = req.params.id;
       const promProduct = Productos.findByPk(productoId, {include: ['categoriaprod']
    });
        const promCategoriasProd =  CategoriasProd.findAll();
        const result = await Promise.all([promProduct, promCategoriasProd]);
        return res.render('editarProducto.ejs', { Producto, allCategoriaProd });
    },

    //CRUD 1//
    /*crear: (req,res)=> {
            //tambien podemos todo lo que contiene: req.body
            //si existe crear el nombre requerir file.name y si no poner un nombre por defecto
            let image = req.file ? req.file.filename : "no existe";

            let newProduct = {
                id: products[products.length - 1].id + 1,
                ... req.body,
                image
            }
            products.push(newProduct)
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
        // Campo para Guardar informacion del formulario crear

        res.redirect("/products") //pensar lo que vamos a redireccionar
    },
    editar: (req,res)=> {
        
        let id = req.params.id
		let product = products.find(el => el.id == id)

		res.render("./products/editarProducto.ejs", { product })
            
        // Campo para Guardar informacion del formulario crear

        //res.redirect("/listaProducto") //pensar lo que vamos a redireccionar
    },
    actualizar: (req, res) => {
        let id = req.params.id;
		let productToEdit = products.find(el => el.id == id)

        let image = req.file ? req.file.filename : productToEdit.image;

		productToEdit = {
			id: productToEdit.id,
			... req.body,
			image: image
		}

		let newProducts = products.map(product => { 
			if(product.id == productToEdit.id) {
				return product = {... productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, " "))
		res.redirect("/products")
    },
    destroy: (req, res) => {
        let id = req.params.id;
		let finalProduct = products.filter(el => el.id != id);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProduct, null, " "))
		res.redirect("/products")
    }*/

};

module.exports =  productsController;