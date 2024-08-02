import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setPage } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, page, totalPages } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
  if (typeof newPage === 'number' && newPage > 0 && newPage <= totalPages) {
    dispatch(setPage(newPage));
    dispatch(fetchProducts(newPage));
  } else {
    console.error("Invalid page number:", newPage);
  }
};

  const handleAddToCart = (productSku) => {
    if (isAuthenticated) {
      const result = dispatch(addToCart({ productId: productSku, quantity: 1 }));
    } else {
      alert("You must be logged in to add products to your cart.");
    }
  };

  if (loading) return <div className="text-center text-2xl font-bold">Cargando...</div>;
  if (error) return <div className="text-center text-2xl font-bold text-red-500">Error: {error}</div>;

  if (!products || products.length === 0) {
    return <div className="text-center text-2xl font-bold">No hay productos disponibles.</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={`${product.sku}-${product.nombre}`} className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{product.nombre}</h3>
          <p className="text-gray-600 mb-4">{product.descripcion}</p>
          <button 
            onClick={() => handleAddToCart(product.sku)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={!isAuthenticated}
          >
            {isAuthenticated ? "Agregar al carrito" : "Inicia sesión para comprar"}
          </button>
        </div>
      ))}
      </div>
      <div className="mt-8 flex justify-center items-center space-x-4">
        <button 
          disabled={page === 1} 
          onClick={() => handlePageChange(page - 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button 
          disabled={page === totalPages || products.length === 0}
          onClick={() => handlePageChange(page + 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
export default ProductList;