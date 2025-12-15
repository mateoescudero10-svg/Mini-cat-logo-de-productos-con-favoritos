// src/inicio.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './login.css';

const Inicio = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  const handleAddToFavorites = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        alert('¡Producto agregado a favoritos!');
      }
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      alert('Error al agregar a favoritos');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', color: '#333', margin: 0 }}>
            🛍️ Mini Catálogo
          </h1>
          {user && (
            <p style={{ fontSize: '14px', color: '#666', margin: '5px 0 0 0' }}>
              Hola, <strong>{user.name}</strong>
              {user.is_admin && <span style={{ 
                marginLeft: '10px', 
                background: '#ffd700', 
                padding: '2px 8px', 
                borderRadius: '3px',
                fontSize: '12px'
              }}>⭐ Admin</span>}
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {user && (
            <>
              <button 
                onClick={() => navigate('/favoritos')}
                style={{
                  padding: '10px 20px',
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ❤️ Mis Favoritos
              </button>
              
              {user.is_admin && (
                <button 
                  onClick={() => navigate('/admin/productos')}
                  style={{
                    padding: '10px 20px',
                    background: '#ffd700',
                    color: '#333',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  ⚙️ Gestionar Productos
                </button>
              )}
              
              <button 
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cerrar Sesión
              </button>
            </>
          )}
          
          {!user && (
            <>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  padding: '10px 20px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={() => navigate('/registrar')}
                style={{
                  padding: '10px 20px',
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </header>

      {/* Banner de Bienvenida */}
      <div style={{
        background: 'white',
        margin: '30px auto',
        maxWidth: '1200px',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '10px' }}>
          🎉 Bienvenido al Catálogo
        </h2>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Explora nuestros productos increíbles
        </p>
      </div>

      {/* Grid de Productos */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'white', fontSize: '20px' }}>
            Cargando productos...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '25px'
          }}>
            {products.map((product) => (
              <div key={product.id} style={{
                background: 'white',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>
                    {product.name}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#666', 
                    marginBottom: '15px',
                    minHeight: '40px'
                  }}>
                    {product.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '24px', 
                      fontWeight: 'bold', 
                      color: '#667eea' 
                    }}>
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleAddToFavorites(product.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      ❤️ Favorito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '18px', color: '#666' }}>
              No hay productos disponibles en este momento
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '30px',
        color: 'white',
        marginTop: '50px'
      }}>
        <p>✨ Mini Catálogo - Tu tienda de confianza ✨</p>
      </footer>
    </div>
  );
};

export default Inicio;