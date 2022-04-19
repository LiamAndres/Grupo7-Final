
module.exports = {
    home: (req,res)=> {
        if(req.session.first_name){
            let data = req.session;
            return res.render("home", {data});
        }

        res.render("home")
    },
    carrito: (req,res)=> {
        res.render("carrito")
    },
    detalleProducto: (req,res)=> {
        
        res.render("./products/detalleProducto.ejs")
    },
    /* login: (req,res)=> {
        res.render("./users/login.ejs")
    },
    registro: (req,res)=> {
        res.render("./users/registro.ejs")
    }, */
    /* listar: (req,res)=> {
        res.render("./products/listaProducto.ejs")
    },
    crear: (req,res)=> {
        res.render("./products/crearProducto.ejs")
    }, */

};