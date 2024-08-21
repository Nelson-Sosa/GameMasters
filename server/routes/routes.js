const UserController = require('../controllers/user.controllers');
const ProductControler = require('../controllers/product.controller');
const validarToken = require('../middlewares/validarToken');
const express = require('express')
const router= express.Router();

//Ruta para buscado global
router.get('/search', validarToken, ProductControler.searchGlobal);

module.exports = (app) =>{
    app.use("/api/product", validarToken, router);
    app.get("/api/usuarios",validarToken, UserController.todosLosUsuarios);
    app.post("/api/login", UserController.login);
    app.post("/api/agregar/usuario", UserController.agregarUsuario);
    app.delete("/api/remover/usuario",validarToken, UserController.removerUsuario);
    app.put('/api/actulizar/product/:id', validarToken, ProductControler.updateProduct);
    app.post("/api/agregar/producto", validarToken, ProductControler.agregarProducto);
    app.get('/api/productos',validarToken, ProductControler.todosLosProductos);
    app.get('/api/products', validarToken, ProductControler.categoriaProductos);
    app.delete('/api/remover/product/:id', validarToken, ProductControler.removerProducto);
    app.get('/api/product/:id', validarToken, ProductControler.getProduct);
}



