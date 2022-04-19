//require express
const express = require('express');
//para usar las rutas estaticas
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

//middlewares de apliacion | por ponerlo en app.js
//significa que siempre se está ejecutando
const userLoggedMiddleware = require ("./src/middlewares/userLoggedMiddleware")

//session
app.use(session({
    secret: "palabra secret",
    resave: false,
    saveUninitialized: true, //false segun video completo login
}));

app.use(cookies());

//usando el middlewares de aplicacion
app.use(userLoggedMiddleware);


// Preparando la constante para trabajar con POST
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Asegurando la compatibilidad con PUT y DELETE
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

//express.static("public") es para fijar esa carpeta y poder acceder directamente a sus subcarpetas
app.use(express.static("public")); 
//variable para subir a heroku || puerto 3000
const PORT = process.env.PORT || 3000;
//escuchar navegador al servidor express heroku || puerto 3000
app.listen( PORT, ()=> console.log(`corriendo servidor con Express en el puerto ${PORT}`) );

//rutas estaticas
/* const publicPath = path.resolve(__dirname, './public'); */

//implemetacion ejs
app.set("view engine", "ejs");
app.set("views", "./src/views");


//require routes
const mainRoutes = require("./src/routes/mainRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const productsRoutes = require("./src/routes/productsRoutes");

app.use("/",mainRoutes);
app.use("/users",usersRoutes);
app.use("/products",productsRoutes);

/** fin del archivo app.js**/



//** haciendo pruebas, borrar luego **/
//prueba borrar
app.get('/productos/:idProductos', (req, res) => res.send(
    `Bienvenidos a `+req.params.idProductos
    ));

//prueba borrar
app.get('/productos/:idProductos/comentarios/:idcomentarios?',  (req, res) =>
    {
        if(req.params.idcomentarios==undefined){
        res.send( `Bienvenidos a producto: ${req.params.idProductos}`);
            }
        else{
        res.send( `Bienvenidos a producto: ${req.params.idProductos} y comentario ${req.params.idcomentarios}`);
            }
    }
);

   


