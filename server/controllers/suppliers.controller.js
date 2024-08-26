const Supplier = require('../models/Suppliers.model');
const {request} = require('express');

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