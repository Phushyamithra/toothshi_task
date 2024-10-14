import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Import styles

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch products from Fake Store API
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const addToCart = (product) => {
        setCart([...cart, { ...product, quantity: 1 }]);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Product Listing</h1>
            <input
                type="text"
                placeholder="Search for products"
                value={search}
                onChange={handleSearch}
            />
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <Link to="/cart" state={{ cart }}>
                <button>Go to Cart</button>
            </Link>
        </div>
    );
};

export default ProductList;
