// src/products.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Heart, Search, AlertCircle, MessageCircle, X, Send } from 'lucide-react';
import './login.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const { user, token } = useAuth();

  // Cargar productos
  useEffect(() => {
    fetchProducts();
    if (token) {
      fetchFavorites();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products', {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/favorites', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();
      setFavorites(data.map(fav => fav.product_id));
    } catch (err) {
      console.error('Error al cargar favoritos:', err);
    }
  };

  const fetchComments = async (productId) => {
    setLoadingComments(true);
    try {
      const response = await fetch(`http://localhost:8000/api/comments/${productId}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar comentarios');
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!token) {
      alert('Debes iniciar sesión para comentar');
      return;
    }

    if (!newComment.trim()) {
      alert('El comentario no puede estar vacío');
      return;
    }

    if (newComment.length > 200) {
      alert('El comentario no puede exceder 200 caracteres');
      return;
    }

    setSubmittingComment(true);
    try {
      const response = await fetch('http://localhost:8000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          content: newComment.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar comentario');
      }

      // Recargar comentarios
      await fetchComments(selectedProduct.id);
      setNewComment('');
      alert('Comentario agregado exitosamente');
    } catch (err) {
      console.error('Error al enviar comentario:', err);
      alert(err.message || 'Error al enviar comentario');
    } finally {
      setSubmittingComment(false);
    }
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setComments([]);
    setNewComment('');
    fetchComments(product.id);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    setComments([]);
    setNewComment('');
  };

  const toggleFavorite = async (productId) => {
    if (!token) {
      alert('Debes iniciar sesión para agregar favoritos');
      return;
    }

    const isFavorite = favorites.includes(productId);

    try {
      if (isFavorite) {
        const response = await fetch(`http://localhost:8000/api/favorites/${productId}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setFavorites(favorites.filter(id => id !== productId));
        }
      } else {
        const response = await fetch('http://localhost:8000/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: productId }),
        });

        if (response.ok) {
          setFavorites([...favorites, productId]);
        }
      }
    } catch (err) {
      console.error('Error al actualizar favorito:', err);
      alert('Error al actualizar favorito');
    }
  };

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || favorites.includes(product.id);
    return matchesSearch && matchesFavorites;
  });

  if (loading) {
    return (
      <div className="login-container">
        <div className="login-box">
          <p style={{ textAlign: 'center' }}>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container" style={{ minHeight: '100vh', padding: '20px 0' }}>
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="login-box" style={{ marginBottom: '20px' }}>
          <h2 className="login-title">Catálogo de Productos</h2>
          
          {user && (
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
              Bienvenido, {user.name}
            </p>
          )}

          {/* Barra de búsqueda */}
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#999'
                }} 
              />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '45px' }}
              />
            </div>
          </div>

          {/* Filtro de favoritos */}
          {token && (
            <div style={{ textAlign: 'center' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Mostrar solo favoritos ({favorites.length})
              </label>
            </div>
          )}

          {error && (
            <div className="error-message" style={{ marginTop: '15px' }}>
              <AlertCircle size={16} style={{ marginRight: '8px' }} />
              {error}
            </div>
          )}
        </div>

        {/* Grid de productos */}
        {filteredProducts.length === 0 ? (
          <div className="login-box">
            <p style={{ textAlign: 'center', color: '#666' }}>
              {showFavoritesOnly ? 'No tienes productos favoritos aún' : 'No se encontraron productos'}
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="login-box"
                style={{ 
                  padding: '0',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Imagen del producto */}
                <div 
                  style={{ 
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f5f5f5'
                  }}
                  onClick={() => openProductDetail(product)}
                >
                  <img 
                    src={product.image_url || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
                    alt={product.name}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Botón de favorito */}
                  {token && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Heart 
                        size={20} 
                        fill={favorites.includes(product.id) ? '#ff4757' : 'none'}
                        color={favorites.includes(product.id) ? '#ff4757' : '#666'}
                      />
                    </button>
                  )}
                </div>

                {/* Información del producto */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ 
                    margin: '0 0 10px 0',
                    fontSize: '18px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{ 
                    margin: '0 0 15px 0',
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '15px'
                  }}>
                    <span style={{ 
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#4a90e2'
                    }}>
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                    
                    <button 
                      className="login-button"
                      style={{ 
                        padding: '8px 16px',
                        fontSize: '14px',
                        width: 'auto'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Producto "${product.name}" agregado al carrito`);
                      }}
                    >
                      Agregar
                    </button>
                  </div>

                  {/* Botón para ver comentarios */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductDetail(product);
                    }}
                    style={{
                      width: '100%',
                      marginTop: '15px',
                      padding: '10px',
                      background: '#f8f9fa',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: '#495057',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e9ecef';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8f9fa';
                    }}
                  >
                    <MessageCircle size={16} />
                    Ver comentarios
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalle del producto con comentarios */}
      {selectedProduct && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={closeProductDetail}
        >
          <div 
            className="login-box"
            style={{
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={closeProductDetail}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            {/* Imagen del producto */}
            <img 
              src={selectedProduct.image_url || 'https://via.placeholder.com/800x400?text=Sin+Imagen'} 
              alt={selectedProduct.name}
              style={{ 
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '20px'
              }}
            />

            {/* Información del producto */}
            <h2 style={{ 
              margin: '0 0 10px 0',
              fontSize: '28px',
              color: '#2c3e50'
            }}>
              {selectedProduct.name}
            </h2>

            <p style={{ 
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              {selectedProduct.description}
            </p>

            <div style={{ 
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#4a90e2',
              marginBottom: '30px'
            }}>
              ${parseFloat(selectedProduct.price).toFixed(2)}
            </div>

            {/* Sección de comentarios */}
            <div style={{
              borderTop: '2px solid #e9ecef',
              paddingTop: '20px'
            }}>
              <h3 style={{ 
                fontSize: '20px',
                color: '#2c3e50',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <MessageCircle size={24} />
                Comentarios ({comments.length})
              </h3>

              {/* Formulario para nuevo comentario */}
              {token ? (
                <form onSubmit={handleSubmitComment} style={{ marginBottom: '25px' }}>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escribe tu comentario (máximo 200 caracteres)..."
                      maxLength={200}
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '12px',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '14px',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '8px'
                    }}>
                      <span style={{ 
                        fontSize: '12px', 
                        color: newComment.length > 180 ? '#ff4757' : '#999'
                      }}>
                        {newComment.length}/200 caracteres
                      </span>
                      <button
                        type="submit"
                        disabled={submittingComment || !newComment.trim()}
                        className="login-button"
                        style={{
                          padding: '8px 20px',
                          fontSize: '14px',
                          width: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          opacity: submittingComment || !newComment.trim() ? 0.6 : 1
                        }}
                      >
                        <Send size={16} />
                        {submittingComment ? 'Enviando...' : 'Comentar'}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div style={{
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  marginBottom: '25px',
                  color: '#666'
                }}>
                  Inicia sesión para dejar un comentario
                </div>
              )}

              {/* Lista de comentarios */}
              <div style={{ 
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {loadingComments ? (
                  <p style={{ textAlign: 'center', color: '#666' }}>
                    Cargando comentarios...
                  </p>
                ) : comments.length === 0 ? (
                  <p style={{ 
                    textAlign: 'center', 
                    color: '#999',
                    padding: '20px'
                  }}>
                    No hay comentarios aún. ¡Sé el primero en comentar!
                  </p>
                ) : (
                  comments.map(comment => (
                    <div 
                      key={comment.id}
                      style={{
                        padding: '15px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        marginBottom: '12px'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '8px'
                      }}>
                        <strong style={{ 
                          color: '#2c3e50',
                          fontSize: '14px'
                        }}>
                          {comment.user?.name || 'Usuario'}
                        </strong>
                        <span style={{ 
                          fontSize: '12px',
                          color: '#999'
                        }}>
                          {new Date(comment.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p style={{ 
                        margin: 0,
                        fontSize: '14px',
                        color: '#495057',
                        lineHeight: '1.5'
                      }}>
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;