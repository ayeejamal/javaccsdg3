import React, { useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082';

export const Services = () => {
  const token = localStorage.getItem('jwtToken');
  const username = localStorage.getItem('userName');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the API
    fetch(`${API_BASE_URL}/api/products`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // Debugging
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  if (!products) {
    return <div>Loading...</div>;  // Loading state
  }

  // Filter products with status 1
  const filteredProducts = products.filter(product => product.status === "1");

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Products</h2>
        </div>
        <div className="row">
          {filteredProducts.length > 0
            ? filteredProducts.map((product, index) => (
                <div key={`${product.name}-${index}`} className="col-md-4">
                  <div className="service-desc">
                    {product.imageStore && (
                      <img
                        src={`data:image/jpeg;base64,${product.imageStore}`} // Displaying image
                        alt={product.title}
                        className="img-fluid"
                        style={{ width: '350px', height: '300px' }}
                      />
                    )}
                    <h3>{product.title}</h3>
                    <h4>RM{product.tag}</h4>
                    <p>{product.postShortDescription}</p>
                    <a href={`payment/${product.postSlug}`}>
                      <button className="btn btn-custom">Buy Now</button>
                    </a>
                  </div>
                </div>
              ))
            : "No products available"}
        </div>
      </div>
    </div>
  );
};
