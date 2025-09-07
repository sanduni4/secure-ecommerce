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
      <h2>Admin – Manage Products</h2>

      {/* Add product form */}
      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
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
        <div
          key={p._id}
          style={{ border: "1px solid #ddd", padding: "10px", margin: "5px" }}
        >
          <p>
            <b>{p.name}</b> – {p.price} LKR
          </p>
          <p>{p.description}</p>
          <button onClick={() => handleDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;
