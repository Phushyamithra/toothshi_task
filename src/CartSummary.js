import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation hook
import './CartSummary.css'; // Import styles

const CartSummary = () => {
    const location = useLocation();  // Use useLocation to get access to the state
    const [cart, setCart] = useState(location.state?.cart || []);  // Safe access to state

    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map((product) =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
        );
        setCart(updatedCart);
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    return (
        <div>
            <h1>Cart Summary</h1>
            {cart.length > 0 ? (
                cart.map((product) => (
                    <div key={product.id} className="cart-item">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <button
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            disabled={product.quantity <= 1}
                        >
                            -
                        </button>
                        <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                    </div>
                ))
            ) : (
                <p>No items in the cart</p>
            )}
            <div className="total">
                <h3>Total: ${calculateTotal()}</h3>
            </div>
            <Link to="/thank-you">
                <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
        </div>
    );
};

export default CartSummary;
