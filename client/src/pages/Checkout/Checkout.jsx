import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe('pk_test_51PxDMmRt6zQTXipITWkIwDzvLWs9t6dsBRAsxXWf3rA3t7AaCXBbGI3N0EJk3Kv1yhcHPbsDZRRAm8GExsOcSfS100lW2AKtm0');

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);

    useEffect(() =>{
        // Realiza una solicitud POST al backend para crear la intención de pago
        axios.post('http://localhost:8000/api/create-payment-intent', {cantidad: 5000})// Monto en centavos
        .then(response => setClientSecret(response.data.clientSecret)) // Almacena el clientSecret si la solicitud es exitosa
        .catch(error => setError("Error al crear intentoPago")); // Muestra un error si la solicitud falla
    }, []);


    return (
      <div>
         {/* Si el clientSecret está disponible, muestra el formulario de pago */}
        {clientSecret ? (
            <Elements stripe={stripePromise}> {/* Componente que envuelve el formulario y se encarga de proporcionar el contexto de Stripe */}
                <CheckoutForm clientSecret={clientSecret} />{/* Pasa el clientSecret al formulario */}
            </Elements>
        ) : (
            <div>Cargando...</div>// Mientras no se tenga el clientSecret, muestra un mensaje de carga
        )}
        {error && <div>{error}</div>}
      </div>
    )
  };
  
  export default Checkout;