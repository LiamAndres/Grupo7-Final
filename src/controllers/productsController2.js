const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const { redirect } = require("express/lib/response");



const controller = {
    listar: (req,res)=> {

        res.render("./products/listaProducto.ejs", { products })
    },
    vistaCrear: (req,res)=> {
        res.render("./products/crearProducto.ejs")
    },
    detail: (req, res) => {
        let id = req.params.id
        let product = products.find(p => p.id == id );

        res.render("./products/detalleProducto.ejs", { product });
    },
    crear: (req,res)=> {
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
    }



};

module.exports =  controller;