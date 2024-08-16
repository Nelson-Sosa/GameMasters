import { useEffect, useState } from "react";
import axios from "axios"; 
import { Link, useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Navigate from "../Navigate/Navigate";

export const Products = ({RemoverFromDom}) => {
    const [product, setProduct] = useState([]);
    const [login, setLogin] = useState(false);
    const navegar = useNavigate();

    const deleteProduct = (productID) =>{
        axios.delete('http://localhost:8000/api/remover/product/' + productID, {
            headers: {
                token_usuario: localStorage.getItem("token")
            }
           })
            .then(res =>{
            if(RemoverFromDom){
                RemoverFromDom(productID);
            }
        })
        .catch(error =>{
            console.error('Error al eliminar producto', error);
            if(error.response && error.response.status === 401){
                navegar('/login');
            }
        })
    }


    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const res = await axios.get('http://localhost:8000/api/productos', {
                headers: {
                    token_usuario: localStorage.getItem("token")
                }
                })
                if(res.status === 200){
                    setProduct(res.data);
                    setLogin(true);
                }
            } catch (err) {
                console.error("Ocurrió un error:", err.message);
                if(err.response && err.response.status === 401){
                    navegar('/login');
                }
            }
        };
        console.log("Products component rendered");
        fetchProducts();
    }, []);

    return (
        <>
            <div>
                <SearchBar />
        {
        (login)? //para comprobar si login es true
      <nav>
        <Link to="/products">Todos los productos</Link>
        <br />
        <Link to='/agregar/product'>Agregar producto</Link>
      </nav> :
      ""
       }
                <h1>Todos los productos:</h1>
                <Navigate />
                <ul>
                    {product.map((producto, idx) => {
                        return (
                            <li key={idx}>
                                <strong>Nombre:</strong> {producto.nombre} <br />
                                <strong>Marca:</strong> {producto.marca} <br />
                                <strong>Precio:</strong> {producto.precio} <br />
                                <strong>Descripción:</strong> {producto.descripcion}
                                <button onClick={()=> deleteProduct(producto._id)}>Delete</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};
