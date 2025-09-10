import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.createRoot(document.getElementById("root")).render(
    <Auth0Provider
    domain="dev-fe6ffyy7tkh1j2ol.us.auth0.com"
    clientId="Mln7y4HuJh0bZujbM009AzvNnuoOOTBi"
    audience = "https://clothshop-api"

    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
    <CartProvider>
    <App />
     </CartProvider>
  </React.StrictMode>
  </Auth0Provider>
  
      
   
);
