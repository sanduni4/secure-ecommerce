import { useState, useEffect } from "react";
import api from "../api/axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  // ✅ Fetch all products
  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add new product
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/products", form);
      setProducts([...products, res.data]);
      setForm({ name: "", price: "", description: "" });
      alert("✅ Product added!");
    } catch (err) {
      alert("❌ Failed to add product (maybe not admin?)");
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("❌ Failed to delete product");
    }
  };

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        .products-container {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h2, h3 {
          color: #2c3e50;
          margin-bottom: 15px;
        }
        form {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        input {
          padding: 8px;
          border: 1px solid #bbb;
          border-radius: 5px;
        }
        input:focus {
          outline: none;
          border-color: #3498db;
        }
        button {
          background: #3498db;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background: #2980b9;
        }
        .product-card {
          border: 1px solid #ddd;
          background: #f9f9f9;
          padding: 15px;
          margin: 8px 0;
          border-radius: 8px;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.05);
        }
        .product-card p {
          margin: 6px 0;
        }
        .product-card button {
          margin-top: 8px;
          background: #e74c3c;
        }
        .product-card button:hover {
          background: #c0392b;
        }
      `}</style>

      <div className="products-container">
        <h2>Admin – Manage Products</h2>

        {/* Add product form */}
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <button type="submit">Add Product</button>
        </form>

        {/* Product list */}
        <h3>Products</h3>
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <p>
              <b>{p.name}</b> – {p.price} LKR
            </p>
            <p>{p.description}</p>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
