// src/login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ÚNICA llamada al API usando fetch
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejar errores según el status code
        if (response.status === 422) {
          throw new Error(data.message || 'Las credenciales proporcionadas son incorrectas.');
        } else if (response.status === 401) {
          throw new Error('Credenciales incorrectas');
        } else {
          throw new Error(data.message || 'Error al iniciar sesión');
        }
      }

      // Login exitoso - actualizar contexto
      login(data.user, data.token);

      // Redirigir según el rol del usuario
      if (data.user.is_admin) {
        navigate('/admin'); // Redirige a dashboard de admin
      } else {
        navigate('/'); // Redirige a inicio para usuarios normales
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Error de conexión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="register-link">
          <p>¿No tienes cuenta? <Link to="/registrar">Regístrate aquí</Link></p>
        </div>

        {/* Credenciales de prueba */}
        <div className="test-credentials">
          <p className="test-title">Credenciales de prueba:</p>
          <div className="test-info">
            <strong>Admin:</strong> admin@example.com / password<br/>
            <strong>Usuario:</strong> user@example.com / password
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;