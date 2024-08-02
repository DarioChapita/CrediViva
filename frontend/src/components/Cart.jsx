import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, checkout, cleanCart } from "../redux/actions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchCart());
    }
  }, [dispatch, navigate]);

  const handleUpdateQuantity = (productSku, newQuantity) => {
    if (newQuantity < 1) {
      alert("La cantidad no puede ser menor que 1.");
      return;
    }
    dispatch(updateCartItem({ productSku, quantity: newQuantity }));
  };

  const handleCheckout = async () => {
    try {
      const [checkoutResult, _] = await Promise.all([
        dispatch(checkout()),
        dispatch(cleanCart())
      ]);
  
      if (checkoutResult?.error) {
        console.error("Checkout failed:", checkoutResult.error);
        return;
      }
  
      await dispatch(fetchCart());
      navigate('/order-summary', { state: { items } });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const isCartEmpty = items.length === 0;
  const isCartCompleted = items.length === 0 || items.every(item => item.status === 'completed');

  if (loading) return <div className="text-center text-2xl font-bold">Cargando...</div>;
  if (error) return <div className="text-center text-2xl font-bold text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Carrito</h2>
      {items.map((item, index) => (
        <div key={`${item.product}-${item._id || item.product}-${index}`} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="flex-grow">
            <h3 className="text-xl font-semibold">{item.nombre}</h3>
            <p className="text-gray-600">{item.descripcion.substring(0, 50)}...</p>
          </div>
          <div className="flex items-center">
            <label htmlFor={`quantity-${item._id}`} className="sr-only">Cantidad de {item.nombre}</label>
            <div className="flex items-center">
              <p className="text-red-500 text-sm">Debes seleccionar una cantidad</p>
              <input 
                id={`quantity-${item.product}`}
                type="number" 
                value={item.quantity} 
                min="1" 
                className="border-2 border-gray-300 rounded p-2 w-16 text-center mx-2 shadow-md"
                onChange={(e) => handleUpdateQuantity(item._doc.product, parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={handleCheckout}
        className={`mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full ${isCartEmpty || isCartCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isCartEmpty || isCartCompleted}
      >
        Finalizar compra
      </button>
    </div>
  );
};

export default Cart;