const UserController = require('../controllers/user.controllers');
const ProductController = require('../controllers/product.controller');
const SuppliersController = require('../controllers/suppliers.controller');
const validarToken = require('../middlewares/validarToken');
const express = require('express')
const router= express.Router();
const upload = require('../configuration/multerConfig'); //importar la configuracion de multer

//Ruta para buscado global
router.get('/search', validarToken, ProductController.searchGlobal);


module.exports = (app) =>{
    app.use("/api/product", validarToken, router);
    app.post("/api/agregar/producto", validarToken, upload.single('imageUrl'), ProductController.agregarProducto);
    app.get("/api/usuarios",validarToken, UserController.todosLosUsuarios);
    app.post("/api/login", UserController.login);
    app.post("/api/agregar/usuario", UserController.agregarUsuario);
    app.delete("/api/remover/usuario",validarToken, UserController.removerUsuario);
    app.put('/api/actulizar/product/:id', validarToken, ProductController.updateProduct);
    app.get('/api/productos',validarToken, ProductController.todosLosProductos);
    app.get('/api/products', validarToken, ProductController.categoriaProductos);
    app.delete('/api/remover/product/:id', validarToken, ProductController.removerProducto);
    app.get('/api/product/:id', validarToken, ProductController.getProduct);
    app.post('/api/add/suppliers', validarToken, SuppliersController.addSuppliers);
    app.delete('/api/delete/supplier/:id', validarToken, SuppliersController.deleteSuppliers);
    app.get('/api/suppliers', validarToken, SuppliersController.allSuppliers);
}



