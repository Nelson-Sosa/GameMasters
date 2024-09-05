import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import '../Suppliers/Suppliers.css';
import { Link } from "react-router-dom";

const Suppliers = ({RemoverFromDom})=>{
    const [supplier, setSupplier] = useState([]);
    const navegar = useNavigate();


    const deleteSupplier = (supplierID) =>{
        axios.delete('http://localhost:8000/api/delete/supplier/' + supplierID,{
            headers: {
                token_usuario: localStorage.getItem("token")
            }
        })
        .then(res =>{
            if(RemoverFromDom){
                RemoverFromDom(supplierID);
            }
        })
        .catch(error =>{
            console.error('Error al eliminar proveedor', error);
            if(error.response && error.response.status === 401){
                navegar('/login');
            }
        })
    }
    


    useEffect(()=>{
        const fetchSupplier = async ()=>{
            try{
                const res = await axios.get('http://localhost:8000/api/suppliers',{
                    headers: {
                        token_usuario: localStorage.getItem("token")
                    }
                })
                if(res.status === 200){
                    setSupplier(res.data);
                    console.log(supplier);
                }

            }catch(err){
                console.error("Ocurrió un error:", err.message);
                if(err.response && err.response.status === 401){
                    navegar('/login');
                }

            }

        }
        fetchSupplier();
    },[navegar]);// Dependencias vacías para ejecutar solo al montar el componente
    return(
        <div className="cont-supplier">
            <table>
                <thead>
                    <th>Nombre:</th>
                    <th>Apellido:</th>
                    <th>Ruc:</th>
                    <th>Telefono:</th>
                    <th>Correo:</th>
                    <th>Ciudad:</th>
                    <th>Codigo Postal:</th>
                </thead>
                <tbody>
                {supplier.map((suppliers,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{suppliers.nombre}</td>
                            <td>{suppliers.apellido}</td>
                            <td>{suppliers.ruc}</td>
                            <td>{suppliers.telefono}</td>
                            <td>{suppliers.correo}</td>
                            <td>{suppliers.ciudad}</td>
                            <td>{suppliers.codigoPostal}</td>
                            <button className="btn-delete" onClick={()=>deleteSupplier(suppliers._id)}>Delete</button>
                            <Link to={`/edit/supplier/${suppliers._id}`}>
                            <button className="btn-edit">Edit</button>
                            </Link>
                        </tr>
                    )
                })}
                    </tbody>
                </table>
        </div>
    )
}

export default Suppliers;
