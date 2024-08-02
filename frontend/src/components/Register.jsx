import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

/**
 * Register component for user registration.
 *
 * @return {JSX.Element} The rendered Register component.
 */
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth.error);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ username, password }));
      toast.success("Registro exitoso!");
      navigate('/login');
    } catch (err) {
      toast.error("Error in registration: " + (error || "Unknown error"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username - Must be a email address"
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password - Must be at least 6 characters"
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;