const jwt = require('jsonwebtoken');

const SECRETO = "secreto";

const validarToken = ( (req, res, next)=>{
    const token_usuario = req.headers.token_usuario;
    jwt.verify(token_usuario, SECRETO, (error, decodificado) =>{
        if(error){
           return res.status(401).json({mensaje: "Token no valido. No autorizado."})
        }
        
        req.infoUsuario = {
            nombre: decodificado.nombre,
            apellido: decodificado.apellido,
            correo: decodificado.correo
        }

        next();

    });
})

module.exports = validarToken;