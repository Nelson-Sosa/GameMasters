import axios from "axios";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import '../formProduct/formProduct.css';

const FormProduct = () =>{
    const [category, setCategory] = useState('Pc Gamer');
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const navegar = useNavigate();
    const [login, setLogin] = useState(false);

    const procesaForm = async (e) =>{
        e.preventDefault();

        await axios.post('http://localhost:8000/api/agregar/producto',{
            category,
            nombre,
            marca,
            precio,
            descripcion
        },{
            headers:{
                token_usuario: localStorage.getItem("token")
            }
        })
        .then(res =>{
            console.log(localStorage.getItem("token"))
            if(res.status ===200){
            setLogin(true)
            setCategory("")
            setNombre("")
            setMarca("")
            setPrecio("")
            setDescripcion("")
            }
        })
        .catch(err =>{
            console.error("Error al cargar producto", err);
            if(err.response && err.response.status === 401){
                navegar('/login');
            }
        })
    }

    return(
        <>
        <div className="contenedor">
            <h2>Add product</h2>
            <form onSubmit={procesaForm}>
                <p>
                    <label>Categoria:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Pc Gamer">Pc Gamer</option>
                        <option value="Notebook Gamer">Notebook Gamer</option>
                        <option value="Consolas">Consolas</option>
                        <option value="Mouse">Mouse</option>
                        <option value="Teclado">Teclado</option>
                        <option value="Monitor">Monitor</option>
                    </select>
                </p>
                <p>
                <label>Nombre:</label>
                <input type="text"
                        name="nombre"
                        onChange={(e)=> setNombre(e.target.value)}
                        value={nombre} />
                </p>
                <p>
                    <label>Marca:</label>
                    <input type="text"
                           name="marca"
                           onChange={(e)=> setMarca(e.target.value)}
                           value={marca} />
                </p>
                <p>
                    <label>Precio:</label>
                    <input type="number"
                           name="precio"
                           onChange={(e)=> setPrecio(e.target.value)}
                           value={precio} />
                </p>
                <p>
                    <label>Descripcion</label>
                    <input type="text"
                          name="descripcion"
                          onChange={(e) => setDescripcion(e.target.value)}
                          value={descripcion} />
                </p>
                <button>Enviar</button>
            </form>
        </div>
        </>
    )

}

export default FormProduct;
    
