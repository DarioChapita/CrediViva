import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login exitoso!");
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));

    if (result && result.error) {
      toast.error("Login error. Please verify your details.");
    } else {
      navigate('/');
    }
  };

  const handleForgotPassword = () => {
    toast.info("Password recovery instructions have been sent to your email address.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">
          Login
        </button>
        <div className="mt-4 text-center">
          <p>
            ¿No tienes una cuenta? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Regístrate</span>
          </p>
          <p className="text-blue-500 cursor-pointer" onClick={handleForgotPassword}>
            ¿Olvidaste tu contraseña?
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;