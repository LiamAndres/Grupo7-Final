const path = require('path');
//base de datos//
const db = require('../../database/models');
//const sequelize = db.sequelize;
const { Op } = require("sequelize");


const Productos = db.Producto;
const Users = db.Usuario;
const CategoriasProd = db.CategoriaProd;

const productsApiController = {
    listar: async (req,res) => {
        try {
            const productos = await db.Producto.findAll();

            const listaCateg = [... new Set(productos.map((elem)=>elem.fabricante))];
            const resumenCateg = Object.fromEntries(listaCateg.map(elem=>([elem, productos.filter(elemProd=> elemProd.fabricante == elem).length])));

            const listaProductos = productos.map(producto=>({
                'id': producto.id,
                'name': producto.referencia,
                'description': producto.descripcion,
                'detail': '/api/productos/' + producto.id
            }))
            
 
            const respuesta ={
                'count':productos.length,
                'countByCategory': resumenCateg,
                'productos': listaProductos
            }

            return res.json(respuesta);
        }catch (error) {
            return res.send(error + 'Error');
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
                
                const respuesta ={
                    'id': productos.id,
                    'referencia': productos.referencia,
                    'fabricante': productos.fabricante,
                    'descripcion': productos.descripcion,
                    'precio': productos.precio,
                    'stock': productos.stock,
                    'urlImagenProducto': '../images/img'+ (productos.id + 1)+".jpg"
                }
                res.json(respuesta);
            });       
    },
    
    //CRUD 2//
    create: async (req, res) => {
        const{referencia, fabricante, descripcion, precio, stock } = req.body;
        //console.log(req.body);
        await products.create({
            referencia,
            fabricante,
            descripcion,
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

};

module.exports =  productsApiController;
