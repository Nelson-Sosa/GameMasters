const mongoose = require('mongoose');

const suppliersSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: [true, "Nombre es requerido"],
        minlength: [3, "El nombre requiere minimo 3 caracteres "]
    },
    apellido:{
        type: String,
        required: [true, "Apellido es requerido"]
    },
    ruc:{
        type: String,
        required: [true, "Ruc es requerido"]
    },
    telefono:{
        type: Number,
        require: [true, "Numero de telefono es requerido"]
    },
    correo:{
        type: String,
        required: [true, "Correo es requerido"],
        minlength: [5, "Ciudad tiene que tener minimo 5 caracteres"],
        match: [/.+\@.+\..+/, "Por favor, rellene una dirección de correo electrónico válida"]
    },
    ciudad: {
        type: String,
        required: [true, "Ciudad es requerido"],
        minlength: [5, "Ciudad tiene que tener minimo 5 caracteres"]
    },
    codigoPostal:{
        type: Number,
        required: [true, "Codigo postal es requerido"]
    }
});

const Suppliers = mongoose.model("Suppliers", suppliersSchema);

module.exports = Suppliers;