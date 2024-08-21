import './SearchBar.css'
import axios from "axios";
import backgroundImage from '../../assets/images/need-for-speed-hea.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SearchBar = ({setSearchResultados}) =>{
const [consulta, setConsulta] = useState('');
const navigate = useNavigate();


const productSearch = async (e) =>{
  e.preventDefault();
  try{
  
    navigate(`/category/${consulta}`);

    const res = await axios.get(`http://localhost:8000/api/product/search?category=${consulta}`,{
      headers: {
        token_usuario: localStorage.getItem("token")
    }
    })
    setSearchResultados(res.data)
  }catch(err){
    console.error("Ocurrió un error:", err.response?.data || err.message);
  }
}


    return(
      <div className="searchBarContain" style={{ backgroundImage: `url(${backgroundImage})` }}>

      <nav className="btn-cont">
        <button className="btn">
        <Link to='/agregar/product'>Add product</Link>
        </button>
      </nav> 

        <form class="max-w-md mx-auto" onSubmit={productSearch}>
          <label className='lab'
            for="default-search"
            
          >
            Search products
          </label>
          <div class="relative">
            <input
              type="search"
              id="default-search"
              placeholder="Search"
              value={consulta}
              onChange={(e) =>setConsulta(e.target.value)}
            />
            <button
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
   
    )
}

export default SearchBar;