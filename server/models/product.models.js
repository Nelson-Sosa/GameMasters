const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true],
    },
    nombre: {
        type : String,
        require: [true]
    },
    marca:{
        type: String,
        require:[true]
    },
    precio:{
        type: Number,
        require: [true]
    },
    descripcion:{
        type: String,
        require: [true]
    },
    imageUrl:{
        type: String
    } //URL de la imagen
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;