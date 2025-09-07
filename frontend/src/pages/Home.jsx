import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <Link to="/cart">🛒 Go to Cart</Link>
      {products.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
          <h3>{p.name}</h3>
          <p>{p.price} LKR</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
