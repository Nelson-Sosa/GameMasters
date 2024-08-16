const Product = require('../models/product.models');
const {request} = require('express');

module.exports.agregarProducto = async (req, res) => {
    try {
      const { category, nombre, marca, precio, descripcion } = req.body;
  
      // Crear el nuevo producto
      const newProduct = await Product.create({
        category,
        nombre,
        marca,
        precio,
        descripcion,
      });

      console.log("New Product:", newProduct);
      res.json(newProduct);
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(400).json(err);
    }
  };

  module.exports.todosLosProductos = (req, res) => {
    Product.find()
      .then((Product) => {
        console.log("All Product:", Product);
        res.json(Product);
      })
      .catch((err) => {
        console.error("Error retrieving Products:", err);
        res.status(500).json(err);
      });
  };

  module.exports.removerProducto = (req, res)=>{
    Product.deleteOne({_id: req.params.id})
    .then(deleteProduct => res.json(deleteProduct))
    .catch(err => res.json(err));
  } 

  module.exports.categoriaProductos = async (req, res) =>{
    try{
      const {category} = req.query;
      const products = await Product.find(category ? {category} : {});
      res.json(products)
    } catch (error) {
      res.status(500).json({error: 'Error al obtener productos'})
    }
  }