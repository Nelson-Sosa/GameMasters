const UserController = require('../controllers/user.controllers');
const ProductController = require('../controllers/product.controller');
const SuppliersController = require('../controllers/suppliers.controller');
const validarToken = require('../middlewares/validarToken');
const express = require('express')
const router= express.Router();
const upload = require('../configuration/multerConfig'); //importar la configuracion de multer
const verificarRol = require('../middlewares/verificarRol')// verifica el rol del usuario


//Ruta para buscado global
router.get('/search', validarToken, ProductController.searchGlobal);


module.exports = (app) =>{
 // Rutas relacionadas con productos
app.use("/api/product", validarToken, router);  
app.post("/api/agregar/producto", validarToken, verificarRol('admi'), upload.single('imageUrl'), ProductController.agregarProducto);  
app.put('/api/actulizar/product/:id', validarToken, verificarRol('admi'), ProductController.updateProduct);  
app.delete('/api/remover/product/:id', validarToken, verificarRol('admi'), ProductController.removerProducto); 
app.get('/api/product/:id', validarToken, ProductController.getProduct);  
app.get('/api/productos', validarToken, ProductController.todosLosProductos);  
app.get('/api/products', validarToken, ProductController.categoriaProductos);  

 // Rutas relacionadas con usuarios
app.post("/api/login", UserController.login);  
app.post("/api/agregar/usuario", UserController.agregarUsuario);  
app.get("/api/usuarios", validarToken, verificarRol('admi'), UserController.todosLosUsuarios);  
app.delete("/api/remover/usuario", validarToken, verificarRol('admi'), UserController.removerUsuario); 

 // Rutas relacionadas con proveedores (suppliers)
app.post('/api/add/suppliers', validarToken, verificarRol('admi'), SuppliersController.addSuppliers); 
app.put('/api/edit/supplier/:id', validarToken, verificarRol('admi'), SuppliersController.editSupplier);  
app.delete('/api/delete/supplier/:id', validarToken, verificarRol('admi'), SuppliersController.deleteSuppliers);  
app.get('/api/suppliers', validarToken, verificarRol('admi'), SuppliersController.allSuppliers); 
app.get("/api/supplier/:id", validarToken, verificarRol('admi'), SuppliersController.getSupplier);  

 // Ruta para pagos
app.post('/api/create-payment-intent', ProductController.agregarPago); 
}



