// src/cart.jsx
import React from 'react';
import { useCart } from './CartContext';
import Menu from './menu';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const containerStyle = {
    marginLeft: '250px',
    padding: '40px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: 'white',
    marginBottom: '30px',
    textAlign: 'center',
  };

  const cartContainerStyle = {
    background: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  };

  const emptyCartStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666',
  };

  const cartItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e0e0e0',
    gap: '20px',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '10px',
  };

  const itemDetailsStyle = {
    flex: 1,
  };

  const quantityControlStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const buttonStyle = {
    padding: '8px 15px',
    background: '#646cff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  };

  const removeButtonStyle = {
    ...buttonStyle,
    background: '#dc3545',
  };

  const totalStyle = {
    marginTop: '30px',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const clearButtonStyle = {
    ...buttonStyle,
    background: '#ffc107',
    color: '#000',
    marginTop: '20px',
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Menu />
        <div style={containerStyle}>
          <div style={contentStyle}>
            <h1 style={titleStyle}>🛒 Carrito de Compras</h1>
            <div style={cartContainerStyle}>
              <div style={emptyCartStyle}>
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos desde la sección de Productos</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Menu />
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1 style={titleStyle}>🛒 Carrito de Compras</h1>
          <div style={cartContainerStyle}>
            {cartItems.map(item => (
              <div key={item.id} style={cartItemStyle}>
                <img src={item.image_url} alt={item.name} style={imageStyle} />
                <div style={itemDetailsStyle}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
                  <p style={{ margin: '0', color: '#666' }}>{item.description}</p>
                  <p style={{ margin: '10px 0 0 0', fontSize: '1.2rem', color: '#646cff', fontWeight: 'bold' }}>
                    ${item.price}
                  </p>
                </div>
                <div style={quantityControlStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#535bf2'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#646cff'}
                  >
                    -
                  </button>
                  <span style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    minWidth: '50px', 
                    textAlign: 'center',
                    padding: '0 15px',
                    color: '#2c3e50'
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    style={buttonStyle}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#535bf2'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#646cff'}
                  >
                    +
                  </button>
                </div>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold', minWidth: '100px', textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  style={removeButtonStyle}
                  onClick={() => removeFromCart(item.id)}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#bb2d3b'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                >
                  🗑️ Eliminar
                </button>
              </div>
            ))}
            
            <div style={totalStyle}>
              <h2 style={{ margin: 0 }}>Total:</h2>
              <h2 style={{ margin: 0, color: '#646cff' }}>${getCartTotal().toFixed(2)}</h2>
            </div>

            <button
              style={clearButtonStyle}
              onClick={clearCart}
              onMouseEnter={(e) => e.currentTarget.style.background = '#ffcd39'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#ffc107'}
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
