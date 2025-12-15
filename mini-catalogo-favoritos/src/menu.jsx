// src/menu.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { getCartCount } = useCart();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Estilos del menú lateral
  const sidebarStyle = {
    position: 'fixed',
    left: isCollapsed ? '-250px' : '0',
    top: 0,
    width: '250px',
    height: '100vh',
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
    padding: '20px',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    transition: 'left 0.3s ease'
  };

  const toggleButtonStyle = {
    position: 'fixed',
    left: isCollapsed ? '10px' : '260px',
    top: '20px',
    width: '40px',
    height: '40px',
    background: '#646cff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    zIndex: 1001,
    transition: 'left 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  };

  const menuItemStyle = (isActive) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '15px 20px',
    margin: '5px 0',
    borderRadius: '8px',
    display: 'block',
    cursor: 'pointer',
    fontSize: '16px',
    background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    borderLeft: isActive ? '4px solid #646cff' : '4px solid transparent',
    transition: 'all 0.3s ease'
  });

  const logoutButtonStyle = {
    marginTop: 'auto',
    padding: '12px 20px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Función para verificar si la ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button 
        style={toggleButtonStyle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#535bf2';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#646cff';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isCollapsed ? '☰' : '✕'}
      </button>

      <div style={sidebarStyle}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>Mi Aplicación</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: '5px 0 0 0' }}>
            Sistema de Gestión
          </p>
        </div>

      <nav style={{ flex: 1 }}>
        <div 
          style={menuItemStyle(isActive('/inicio'))}
          onClick={() => navigate('/inicio')}
          onMouseEnter={(e) => {
            if (!isActive('/inicio')) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/inicio')) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          🏠 Inicio
        </div>

        <div 
          style={menuItemStyle(isActive('/products'))}
          onClick={() => navigate('/products')}
          onMouseEnter={(e) => {
            if (!isActive('/products')) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/products')) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          📦 Productos
        </div>

        <div 
          style={menuItemStyle(isActive('/api_externa'))}
          onClick={() => navigate('/api_externa')}
          onMouseEnter={(e) => {
            if (!isActive('/api_externa')) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/api_externa')) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          🌐 API Externa
        </div>

        <div 
          style={{
            ...menuItemStyle(isActive('/cart')),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          onClick={() => navigate('/cart')}
          onMouseEnter={(e) => {
            if (!isActive('/cart')) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/cart')) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          <span>🛒 Carrito</span>
          {getCartCount() > 0 && (
            <span style={{
              background: '#dc3545',
              borderRadius: '50%',
              padding: '2px 8px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {getCartCount()}
            </span>
          )}
        </div>
      </nav>

      <button 
        style={logoutButtonStyle}
        onClick={handleLogout}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#bb2d3b';
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#dc3545';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        🚪 Cerrar Sesión
      </button>
      </div>
    </>
  );
};

export default Menu;