import '../pages/formularioLogin/formularioLogin';
import { Routes, Route, Link} from "react-router-dom";
import FormularioLogin from '../pages/formularioLogin/formularioLogin';
import Home from '../pages/home/home';
import { Products } from '../pages/Products/Products';
import { useState } from 'react';
import FormProduct from '../components/formProduct/formProduct';
import FormRegistro from '../pages/formRegistro/formRegistro';
import UpdateProduct from '../components/UpdateProduct/UpdateProduct';
const App = ()=> {
  const [login, setLogin] = useState(false);

  return (
    <div>
    <Routes >
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={ <FormularioLogin setLogin={setLogin} />} />
      <Route path='/register' element={<FormRegistro />}/>
      <Route path='/category/:category' element={ <Products />} />
      <Route path='/agregar/product' element={<FormProduct />}/>
      <Route path='/actualizar/product/:id' element={<UpdateProduct />} />
    </Routes>
    </div>
  );
}

export default App;


