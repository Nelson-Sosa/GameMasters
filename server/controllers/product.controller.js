const { MongooseError } = require('mongoose');
const Product = require('../models/product.models');
const {request} = require('express');
const Stripe = require('stripe');
// Inicializamos Stripe con la clave secreta de prueba (sk_test_...)
const stripe = Stripe('sk_test_51PxDMmRt6zQTXipIoi6NdMsHncrdJJkErnnL4pe50T2kjpBOZ39jyNZw4GePqz0uPaPOs3ZEx8BDQ7nTUGpUiAHZ00W3n2ShcA');

module.exports.agregarProducto = async (req, res) => {
    try {
      const { category, nombre, marca, precio, descripcion } = req.body;

      //verifica si la imagen fue cargada correctamente
      if(!req.file){
        return res.status(400).json({error: "Imagen no cargada correctamente"})
      }
  
      // Crear el nuevo producto
      const newProduct = await Product.create({
        category,
        nombre,
        marca,
        precio,
        descripcion,
        imageUrl: `/uploads/${req.file.filename}`// Guardar la URL de la imagen en la base de datos
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

  module.exports.updateProduct = (req, res) =>{
    Product.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
    .then(updaProduct => res.json(updaProduct))
    .catch(error => res.json(error));
  }

  module.exports.getProduct = (req, res) =>{
    Product.findOne({_id:req.params.id})
    .then(product =>res.json(product))
    .catch(error =>res.json(error))
  }

  module.exports.searchGlobal = async (req, res) =>{
    try{

      const category = req.query.category.trim(); //Limpia la entrada

      if(!category){
        return res.status(400).json({message: 'La categoria este requerido'})
      }
      // Verifica que se esté buscando por 'category' y no por '_id'
      const product = await Product.find({ category: { $regex: category, $options: 'i' } });

      if(product.length === 0){
        return res.status(404).json({message: 'Producto no encontrado'})
      }


    res.json(product);
    } catch (err){
      res.status(500).json({error: err.message});
    }
  }

  module.exports.agregarPago  = async(req, res) => {
    const { cantidad } = req.body; // Monto en centavos
    try {
        // Crear la intención de pago con Stripe  
        const paymentIntent = await stripe.paymentIntents.create({
            amount: cantidad, // La cantidad se espera en centavos (100 = $1.00 USD)
            currency: 'usd',  // Moneda en la que se procesará el pago, en este caso, dólares estadounidenses
        });
        // Respondemos con el client_secret necesario para confirmar el pago en el frontend
        res.status(200).send({
            clientSecret: paymentIntent.client_secret, // Enviar client_secret al frontend
        });

    } catch(err) {
        console.error("Error en agregarPago:", err.message);
        res.status(500).send({ error: err.message });
    }
};
