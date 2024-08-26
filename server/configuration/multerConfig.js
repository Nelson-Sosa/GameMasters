const multer = require('multer');// Importa multer para manejar la subida de archivos
const path = require('path');// Importa path para manejar y transformar rutas de archivo
const fs = require('fs');

// Verificar si la carpeta 'uploads' existe, si no, crearla
const uploadDir = path.join(__dirname, '..', 'uploads');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// configuracion de almacenamiento del multer
const storange = multer.diskStorage({
    // Definición del destino donde se almacenarán los archivos
    destination: (req, file, cb) =>{
        cb(null, 'uploads/'); //carpeta donde se guardara las imagenes
    },
    // Definición del nombre con el que se guardarán los archivos
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname)); //nombre unico para la imagen
    }
})
// Crear la instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storange});

module.exports = upload;