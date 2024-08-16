const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;