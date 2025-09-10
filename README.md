# ClothEase – Secure E-Commerce Web Application

**ClothEase** is an e-commerce web application built for the **Secure Web Application Development** assignment. It allows users to purchase clothing items securely, view their order history, and manage their orders. The project emphasizes **security, authentication, and access control**, following **OWASP Top 10** best practices.

---

## Features

- User authentication and logout using **OIDC protocol** with Auth0.
- Display authenticated user's profile information (username, name, email, contact number, country).
- Place orders with the following details:
  - Date of purchase (on or after current date, excluding Sundays)
  - Preferred delivery time (10 AM, 11 AM, 12 PM)
  - Delivery location (district selection)
  - Product selection from a predefined clothing catalog (shirts, pants, jackets, etc.)
  - Quantity and optional message (e.g., special instructions)
- View all past and upcoming orders.
- Access control: users can only view/manage their own orders.
- Mitigation of **OWASP Top 10 vulnerabilities**, including XSS, injection, CSRF, and authentication bypass.

---

## Technology Stack

- **Frontend:** React with Vite
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB
- **Authentication:** OpenID Connect (OIDC) via Auth0
- **Security:** HTTPS, secure environment variables

---

## Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB (local or Atlas instance)
- Access to a cloud-based IdP (Auth0, Asgardeo, Okta, etc.)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <https://github.com/sanduni4/secure-ecommerce>
cd secure-ecommerce
````

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the backend folder with the following sample values:

```bash
PORT=3000
MONGO_URI=mongodb+srv://sanduni:sanduni@cluster0.q7hijnu.mongodb.net/
CLIENT_URL=http://localhost:5174

IDP_CLIENT_ID=Mln7y4HuJh0bZujbM009AzvNnuoOOTBi
IDP_CLIENT_SECRET=client_secret
IDP_ISSUER=https://idp-domain
IDP_CALLBACK_URL=http://localhost:5173/
SESSION_SECRET=HeiQWw9UpZEkl65imP0OgZXBUVzHbZF-jb-A-8X5Yryi5CucAiNWNEQIckc85Bx2
```

### 3. Frontend Setup

```bash
cd client
npm install
```

### 4. Run the Application

**Backend:**

```bash
cd server
node server.js
```

Backend runs at: [https://localhost:3000](https://localhost:3000)

**Frontend:**

```bash
cd client
npm run dev
```

Frontend runs at: [http://localhost:5174](http://localhost:5174)

---

## Database Setup

If using local MongoDB:

```bash
mongo
use secure
db.createCollection("orders")
```

---

## Security Considerations

* Parameterized queries with Mongoose to prevent NoSQL injection.
* Input sanitization to prevent XSS attacks.
* HTTPS enforced for secure communication.
* Tokens validated on the backend to prevent broken access control.
* Environment variables used for sensitive data, excluded from GitHub.
* CORS configured to allow only trusted origins.

---

## Usage

* Open the frontend in your browser.
* Click **Login** to authenticate via Auth0.
* View your profile information.
* Place orders and select delivery details.
* View your past orders.
* Logout securely through Auth0.

---

## Challenges & Learning

* Understanding and implementing OIDC authentication.
* Ensuring proper access control using access tokens.
* Mitigating OWASP Top 10 vulnerabilities.
* Managing frontend-backend communication securely.

---

## Links

* GitHub Repository: [https://github.com/sanduni4/secure-ecommerce]
* Blog Post:https://medium.com/@sanduniayeshika4/building-clothee-a-secure-e-commerce-web-application-8836e64d4ebf

