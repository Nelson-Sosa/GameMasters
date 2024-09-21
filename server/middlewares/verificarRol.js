const verificarRol = (rolRequerido) =>(req, res, next) =>{
    const {infoUsuario} = req;
    if(!infoUsuario){
        return res.status(401).json({message: "Usuario no encontrado"})
    }


if(!infoUsuario || infoUsuario.rol !== rolRequerido){
    return res.status(403).json({message: `Acceso denegado: se requiere el rol de ${rolRequerido}.`})
}
next();// Continúa si el rol es el correcto

};

module.exports = verificarRol;