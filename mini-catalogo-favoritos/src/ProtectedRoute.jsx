// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importar desde el mismo nivel

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirige al login si no está autenticado
        return <Navigate to="/login" replace />;
    }

    // Muestra el contenido si está autenticado
    return <Outlet />;
};

export default ProtectedRoute;