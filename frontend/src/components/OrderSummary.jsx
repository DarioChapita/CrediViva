import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const { items } = location.state || { items: [] };

  const totalItems = items.reduce((acc, item) => {
    const quantity = item?._doc?.quantity || 0;
    if (typeof quantity === 'number') {
      return acc + quantity;
    }
    return acc;
  }, 0);

  if (totalItems === 0) {
    return <p>No hay productos en la compra.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Compra finalizada</h2>
      <p className="mb-4">Has comprado un total de {totalItems} productos:</p>
      <ul className="mb-4">
        {items.map((item, index) => (
          <li key={`${item._doc.product}-${index}`} className="mb-2">
            <h3 className="font-semibold">{item.nombre}</h3>
            <p>{item.descripcion}</p>
            <p>Cantidad: {item._doc.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSummary;
