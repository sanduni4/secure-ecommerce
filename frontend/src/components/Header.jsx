import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Example: get cart count from localStorage (you can replace with state or context)
  const cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#902828ff",
        color: "#fff",
      }}
    >
      <div>
        <Link
          to="/"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}
        >
          Clothees
        </Link>
      </div>

      <nav style={{ display: "flex", alignItems: "center" }}>
        {!token && (
          <>
            <Link to="/login" style={{ margin: "0 10px", color: "#fff" }}>
              Login
            </Link>
            <Link to="/register" style={{ margin: "0 10px", color: "#fff" }}>
              Register
            </Link>
          </>
        )}

        {token && role === "customer" && (
          <>
            <Link to="/" style={{ margin: "0 10px", color: "#fff" }}>
              Home
            </Link>
            <Link to="/cart" style={{ margin: "0 10px", color: "#fff", position: "relative" }}>
              🛒 Cart
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    background: "red",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/orders" style={{ margin: "0 10px", color: "#fff" }}>
              My Orders
            </Link>
            <button onClick={handleLogout} style={{ margin: "0 10px", cursor: "pointer" }}>
              Logout
            </button>
          </>
        )}

        {token && role === "admin" && (
          <>
            <Link to="/admin" style={{ margin: "0 10px", color: "#fff" }}>
              Dashboard
            </Link>
            <Link to="/admin/products" style={{ margin: "0 10px", color: "#fff" }}>
              Products
            </Link>
            <Link to="/admin/orders" style={{ margin: "0 10px", color: "#fff" }}>
              Orders
            </Link>
            <button onClick={handleLogout} style={{ margin: "0 10px", cursor: "pointer" }}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
