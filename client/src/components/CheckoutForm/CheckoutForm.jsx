import { useState } from "react";
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../CheckoutForm/CheckoutForm.css';
//CardElement=  Hook para acceder a los elementos de pago en el formulario, como el campo de la tarjeta de crédito

const CheckoutForm = ({clientSecret}) =>{
    const stripe = useStripe();// Hook para acceder a la instancia de Stripe
    const elements = useElements(); //Hook para acceder a los elementos de Stripe en el formulario
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Estado para manejar el proceso de carga

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        
        // Verifica si Stripe y elements están cargados
        if(!stripe || elements){
            return;
        }
        
        const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement) // Obtiene la información de la tarjeta ingresada
            }
        });

        if (error){
            setError(error.message);
            setLoading(false);
        }else if(paymentIntent.status === 'succeeded'){
             // El pago se procesó correctamente
             alert('Pago exitoso');
             setLoading(false);
        }
    };

    return(
       <div className="targ-cont">
        <h1>Formulario de Pago</h1>
        <form onSubmit={handleSubmit}>
            <CardElement /> {/* Elemento que maneja la entrada de datos de la tarjeta */}
            <button  type="submit" disabled={!stripe || loading} >
                {loading ? "Procesando..." : "Pagar"}
            </button>
            {error && <div>{error}</div>}
        </form>
       </div>
    )
}

export default CheckoutForm;