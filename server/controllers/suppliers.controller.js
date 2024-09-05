const Supplier = require('../models/Suppliers.model');
const {request} = require('express');

module.exports.editSupplier = (req, res) =>{
    Supplier.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
    .then(editSuppliers => res.json(editSuppliers))
    .catch(err => res.json(err));
}

module.exports.addSuppliers = async (req, res) =>{
    try{
        const {nombre, apellido, ruc, telefono, correo, ciudad, codigoPostal} = req.body;

        const newSupplier = await Supplier.create({
            nombre,
            apellido,
            ruc, 
            telefono,
            correo,
            ciudad,
            codigoPostal
        });
        console.log("New Supplier", newSupplier);
        res.json(newSupplier);
    }catch(err){
        console.error("Error creating Suppliers", err);
        res.status(400).json(err);
    }
}

module.exports.deleteSuppliers= (req, res) =>{
    Supplier.deleteOne({_id: req.params.id}, req.body, {new:true})
    .then(deleteSupplier => res.json(deleteSupplier))
    .catch(error => res.json(error));
}

module.exports.allSuppliers = (req, res) =>{
    Supplier.find()
    .then((suppliers) =>{
        console.log("All Suppliers", suppliers)
        res.json(suppliers)
        
    })
    .catch((err) =>{
        console.error("Error", err);
        res.status(401).json(err);
    })

}

  module.exports.getSupplier = (req, res) =>{
    Supplier.findOne({_id:req.params.id})
    .then(supplier =>res.json(supplier))
    .catch(error =>res.json(error))
  }