const UserController = require('../controllers/user.controllers');
const ProductControler = require('../controllers/product.controller');
const validarToken = require('../middlewares/validarToken');

module.exports = (app) =>{
    app.get("/api/usuarios",validarToken, UserController.todosLosUsuarios);
    app.post("/api/login", UserController.login);
    app.post("/api/agregar/usuario", UserController.agregarUsuario);
    app.delete("/api/remover/usuario",validarToken, UserController.removerUsuario);
    app.post("/api/agregar/producto", validarToken, ProductControler.agregarProducto);
    app.get('/api/productos',validarToken, ProductControler.todosLosProductos);
    app.delete('/api/remover/product/:id', validarToken, ProductControler.removerProducto);
}


