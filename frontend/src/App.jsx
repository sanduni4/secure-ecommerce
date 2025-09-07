import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import the new Orders component from components folder
import Orders from "./components/Orders";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} /> {/* New Orders page */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
