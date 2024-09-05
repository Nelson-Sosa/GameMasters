import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../SupplierForm/SupplierForm.css';

export const SupplierForm = ()=>{
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [ruc, setRuc  ] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const navegar = useNavigate();

    
        const fetchSupplier = async (e)=>{
            e.preventDefault();
            await axios.post('http://localhost:8000/api/add/suppliers', {
                nombre,
                apellido,
                ruc,
                telefono,
                correo,
                ciudad,
                codigoPostal
            }, {
                headers: {
                    token_usuario: localStorage.getItem("token")
                }
            })

            .then(res=>{
                if(res.status ===200){
                    setNombre("");
                    setApellido("");
                    setRuc("");
                    setTelefono("");
                    setCorreo("");
                    setCiudad("");
                    setCodigoPostal("");
                }
            })
            .catch(err =>{
                console.error("Error al cargar proveedor");
                if(err.response && err.response.status === 401){
                    navegar('/login');
                }
            })
            }
        return(
            <div className="cont-sup">
                <button className="btn1">
                    <Link to='/suppliers' >todos los suppliers</Link>
                </button>
                <h2>Add Supplier</h2>
                <form onSubmit={fetchSupplier}>
                    <p>
                        <label>Nombre:</label>
                        <input type="text"
                                name="nombre" 
                                onChange={(e)=>setNombre(e.target.value)}
                                value={nombre}   />
                    </p>
                    <p>
                        <label>Apellido:</label>
                        <input type="text"
                            name="apellido"
                            onChange={(e)=>setApellido(e.target.value)}
                            value={apellido} />
                    </p>
                    <p>
                        <label>Ruc:</label>
                        <input type="text"
                        name="ruc"
                        onChange={(e)=>setRuc(e.target.value)}
                        value={ruc}/>
                    </p>
                    <p>
                        <label>Telefono:</label>
                        <input type="number"
                        name="telefono"
                        onChange={(e) =>setTelefono(e.target.value)} 
                        value={telefono}/>
                    </p>
                    <p>
                        <label>Correo:</label>
                        <input type="text"
                        name="correo"
                        onChange={(e)=>setCorreo(e.target.value)}
                        value={correo} />
                    </p>
                    <p>
                        <label>Ciudad:</label>
                        <input type="text"
                        name="ciudad"
                        onChange={(e)=>setCiudad(e.target.value)}
                        value={ciudad} />
                    </p>
                    <p>
                        <label>Codigo Postal:</label>
                        <input type="number"
                        name="codigoPostal"
                        onChange={(e) =>setCodigoPostal(e.target.value)}
                        value={codigoPostal} />
                    </p>
                    <button className="btn-conf">Add Suppliers</button>
                </form>
            </div>
        )
            
        }
