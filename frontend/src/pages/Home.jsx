import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="home-container">
      {/* Internal CSS */}
      <style>{`
        .home-container {
          font-family: Arial, sans-serif;
        }
        .banner {
          width: 100%;
          height: 300px;
          background: linear-gradient(90deg, #1e1d1dff, #110d08ff);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          font-weight: bold;
          border-radius: 10px;
          margin-bottom: 20px;
          margin-top: 50px;
        }
        .promo-banner {
          width: 100%;
          height: 120px;
          background: linear-gradient(90deg, #91736aff, #b33c17ff);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .product-card {
          background-color: #fff;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.2s;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-card h3 {
          font-size: 1.1rem;
          margin: 10px 0;
        }
        .product-card p {
          margin: 5px 0;
          color: #555;
        }
        .product-card button {
          padding: 8px 12px;
          background-color: #be5510ff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .product-card button:hover {
          background-color: #7f3a0cff;
        }

}

      `}</style>

      {/* Main Banner */}
      <div className="banner">
  <video 
    src="/new_video.mp4" 
    autoPlay 
    loop 
    muted 
    style={{ width: "100%", height: "auto" }}
  >
    Your browser does not support the video tag.
  </video>
</div>


      {/* Promotional Banner */}
      <div className="promo-banner">
        9.9 BIG ANNIVERSARY SALE - Up to 70% Off
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.price} LKR</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
