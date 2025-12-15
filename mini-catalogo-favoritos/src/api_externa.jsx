// src/api_externa.jsx
import React, { useState } from 'react';
import './login.css'; // Reutilizamos los estilos existentes

const ApiExterna = () => {
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDogImage = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/external/dog-image', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener la imagen del perro');
      }

      if (data.success && data.image_url) {
        setDogImage(data.image_url);
      } else {
        throw new Error('No se recibió una imagen válida');
      }

    } catch (err) {
      setError(err.message || 'Error de conexión. Intenta nuevamente.');
      setDogImage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box" style={{ maxWidth: '600px' }}>
        <h2 className="login-title">🐶 Generador de Imágenes de Perros</h2>
        
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
          ¡Obtén una imagen aleatoria de un perro adorable!
        </p>

        {error && <div className="error-message">{error}</div>}

        <button 
          onClick={fetchDogImage}
          className="login-button"
          disabled={loading}
          style={{ marginBottom: '20px' }}
        >
          {loading ? 'Cargando...' : '🎲 Obtener Perro Aleatorio'}
        </button>

        {dogImage && (
          <div style={{ 
            marginTop: '20px', 
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-in'
          }}>
            <img 
              src={dogImage} 
              alt="Perro aleatorio" 
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '15px'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Error+al+cargar+imagen';
              }}
            />
            <p style={{ 
              fontSize: '14px', 
              color: '#888',
              marginTop: '10px' 
            }}>
              ¿No te gusta este? ¡Haz clic de nuevo para ver otro!
            </p>
          </div>
        )}

        {!dogImage && !loading && !error && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#999',
            fontSize: '16px'
          }}>
            <p>👆 Haz clic en el botón para ver un perro</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ApiExterna;