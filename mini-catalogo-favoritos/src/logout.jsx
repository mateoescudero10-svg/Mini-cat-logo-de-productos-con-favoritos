// src/logout.jsx
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login'); // Redirige al login después de cerrar sesión
    };

    // Este componente actúa como un botón en la barra de navegación
    return (
        <button 
            onClick={handleLogout} 
            style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
        >
            Cerrar Sesión
        </button>
    );
};

export default LogoutComponent;