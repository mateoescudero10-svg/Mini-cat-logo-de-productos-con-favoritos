// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

// Importar componentes
import Login from './login';
import Registrar from './registrar';
import ProtectedRoute from './ProtectedRoute';
import Menu from './menu';

// Importar páginas
import Inicio from './inicio';
import Products from './products';
import ApiExterna from './api_externa';
import Cart from './cart';

// Componente wrapper para incluir el menú en rutas protegidas
const LayoutWithMenu = ({ children }) => {
  return (
    <div className="flex">
      <Menu />
      {/* Ajuste del margen para el contenido principal */}
      <div className="flex-1 ml-[250px]">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Rutas públicas - SIN MENÚ */}
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />

          {/* Rutas protegidas - CON MENÚ */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/inicio"
              element={
                <LayoutWithMenu>
                  <Inicio />
                </LayoutWithMenu>
              }
            />
            <Route
              path="/products"
              element={
                <LayoutWithMenu>
                  <Products />
                </LayoutWithMenu>
              }
            />
            <Route
              path="/api_externa"
              element={
                <LayoutWithMenu>
                  <ApiExterna />
                </LayoutWithMenu>
              }
            />
            <Route
              path="/cart"
              element={
                <LayoutWithMenu>
                  <Cart />
                </LayoutWithMenu>
              }
            />
          </Route>

          {/* Ruta raíz: redirige a inicio si está autenticado, sino a login */}
          <Route path="/" element={<Navigate to="/inicio" replace />} />

          {/* Ruta 404 (catch-all): redirige a la raíz */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;