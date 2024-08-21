import { useEffect, useState } from "react";
import axios from "axios"; 
import { Link, useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import CustomNavigate from "../CustomNavigate/CustomNavigate";
import { useParams } from "react-router-dom";
import '../Products/Products.css';

export const Products = ({RemoverFromDom}) => {
    const {category} = useParams();
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
            const res = await axios.get(`http://localhost:8000/api/products?category=${category}`, {
                headers: {
                    token_usuario: localStorage.getItem("token")
                }
                })
                if(res.status === 200){
                    setProduct(res.data);
                    setLogin(true);
                    console.log(category);
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
    }, [category]);

    return (
        <>
            <div>
                <SearchBar setSearchResultados={setProduct}/>
        {
        (login)? //para comprobar si login es true
      <nav className="btn-cont">
        <button className="btn">
        <Link to='/agregar/product'>Add product</Link>
        </button>
      </nav> :
      ""
       }
                <CustomNavigate />
                <div className="prod-cont">
                    <div className="sub">
                <h1>{category}</h1>   
                <ul>
                    {product.map((producto, idx) => {
                        return (
                            <li key={idx}>
                                <strong>Categoria:</strong>{producto.category}<br/>
                                <strong>Nombre:</strong> {producto.nombre} <br />
                                <strong>Marca:</strong> {producto.marca} <br />
                                <strong>Precio:</strong> {producto.precio}<strong>Gs.</strong> <br />
                                <strong>Descripción:</strong> {producto.descripcion}
                                <div>
                                <button className="btnD" onClick={()=> deleteProduct(producto._id)}>Delete</button>
                                <button className="btnU">
                                    <Link to={`/actualizar/product/${producto._id}`}>Update</Link>
                                </button>
                                </div>
                            </li>
                        );
                    })}
                    
                </ul>
                </div>
                </div>
            </div>
        </>
    );
};
