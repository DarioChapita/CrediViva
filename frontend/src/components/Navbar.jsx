import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">Mi Tienda</div>
          <ul className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/" className="text-white hover:text-blue-200">Productos</Link>
                </li>
                <li>
                  <Link to="/cart" className="text-white hover:text-blue-200">Carrito ({totalQuantity})</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-white hover:text-blue-200">Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="text-white hover:text-blue-200">Iniciar Sesión</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;