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
        const [imageUrl, setImageUrl] = useState(null);
        const navegar = useNavigate();
        const [login, setLogin] = useState(false);
        const [errors, setErrors] = useState({});
        const [success, setSuccess] = useState("");

        const validateForm = ()=>{
            const newErrors = {}
            if(!category) newErrors.category = "Category is required";

            if(!nombre) newErrors.nombre = "Name is required"

            if(!marca) newErrors.marca = "Brand is required"

            if(!precio) newErrors.precio = "price is required"

            if(!descripcion) newErrors.descripcion = "description is required"

            if (!imageUrl) newErrors.imageUrl = "Image is required";
            
            return newErrors;
        }

        const handleImageChange = (e) =>{
            setImageUrl(e.target.files[0])
        };

        const procesaForm = async (e) =>{
            e.preventDefault();
            const newErrors = validateForm();
            if(Object.keys(newErrors).length > 0){
                setErrors(newErrors);
                return;
            }
            
            /*cuando carga una imagen junto con otros datos del formulario,
            debe utilizar un método FormData para manejar el archivo de forma adecuada.
            */
            const formData = new FormData();
            formData.append('category',category);
            formData.append('nombre', nombre);
            formData.append('marca', marca);
            formData.append('precio', precio);
            formData.append('descripcion', descripcion);
            formData.append('imageUrl', imageUrl); 

            await axios.post('http://localhost:8000/api/agregar/producto',formData,{
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
                setImageUrl("");
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
                        {errors.category && <span className="error">{errors.category}</span>}
                    </p>
                    <p>
                    <label>Nombre:</label>
                    <input type="text"
                            name="nombre"
                            onChange={(e)=> setNombre(e.target.value)}
                            value={nombre} />
                            {errors.nombre && <span className="error">{errors.nombre}</span>}
                    </p>
                    <p>
                        <label>Marca:</label>
                        <input type="text"
                            name="marca"
                            onChange={(e)=> setMarca(e.target.value)}
                            value={marca} />
                            {errors.marca && <span className="error">{errors.marca}</span>}
                    </p>
                    <p>
                        <label>Precio:</label>
                        <input type="number"
                            name="precio"
                            onChange={(e)=> setPrecio(e.target.value)}
                            value={precio} />
                            {errors.precio && <span className="error">{errors.precio}</span>}
                    </p>
                    <p>
                        <label>Descripcion</label>
                        <input type="text"
                            name="descripcion"
                            onChange={(e) => setDescripcion(e.target.value)}
                            value={descripcion} />
                            {errors.descripcion && <span className="error">{errors.descripcion}</span>}
                    </p>
                    <p>
                        <label>Imagen</label>
                        <input type="file" onChange={handleImageChange} />
                    </p>
                    <button>Add Product</button>
                </form>
            </div>
            </>
        )

    }

    export default FormProduct;
        
