function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "30px 20px",
        backgroundColor: "#902828ff",
        color: "#fff",
        marginTop: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Contact Info */}
      <div style={{ marginBottom: "15px" }}>
        <p>📞 +94 1234 5678</p>
        <p>🏠 123 Main Street, Colombo</p>
        <p>✉️ info@clothshop.com</p>
      </div>

      {/* Divider */}
      <hr style={{ borderColor: "rgba(255,255,255,0.3)", margin: "15px 0" }} />

      {/* Copyright */}
      <p>© 2025 ClothShop. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
