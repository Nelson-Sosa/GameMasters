import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../formularioLogin/formularioLogin.css';
import {Image} from "@nextui-org/image";

const FormularioLogin = (props) => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navegacion = useNavigate();
  const [error, setError] = useState();

  const procesaLogin = async (e)=>{
    e.preventDefault();
    
    try{
      const res = await axios.post('http://localhost:8000/api/login',{
              correo,
              contraseña
    });

    const datos = res.data;
    if(res.status === 200){
      console.log("Inicio de sesión exitoso", datos);
      localStorage.setItem("token", datos.token);
      props.setLogin(true);
      setError("");
      navegacion("/category/pcgamer");
    }
  } catch (error) {
    const errorMessage = error.response
      ? (typeof error.response.data === 'string'
        ? error.response.data
        : error.response.data.mensaje || JSON.stringify(error.response.data))
      : error.message;
  
    setError(errorMessage);
    console.error("Error durante el inicio de sesión", errorMessage);
  }

  };

  return (
    <div className="contenedor"> 
      <h1>Login</h1>
      <Image className="im"
      width={300}
      
      alt="NextUI hero Image"
      src="/img/minecraft.jpg"
    />
      <form onSubmit={procesaLogin} className="">
        <div>
          <label htmlFor="correo">mail:</label>
          <input
            type="text"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contraseña">password:</label>
          <input
            type="password"  
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>
        <button> Login </button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};

export default FormularioLogin;

