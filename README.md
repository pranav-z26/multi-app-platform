# Multi-App Platform with Shared Authentication (MERN)

A distributed micro-frontend and micro-service architecture demonstrating a secure **Single Sign-On (SSO)** flow across multiple subdomains, fully containerized with Docker and validated via GitHub Actions CI pipeline.

This project showcases practical solutions to real-world challenges: cross-domain session management, stateless token verification, and containerized local development at scale.

## Architecture Overview

The project is structured as a **Client/Server** monorepo to maintain clear service boundaries while sharing a unified deployment strategy and CI/CD pipeline:

### **Frontend (./client)**
* **main-app** (Port 3000): Central authentication portal where users log in and sign up (`app.myplatform.local`).
* **dashboard-app** (Port 4000): Analytics dashboard for authenticated users displaying key metrics (`dashboard.myplatform.local`).
* **store-app** (Port 5000): E-commerce catalog with shopping cart, product filtering, and INR currency support (`store.myplatform.local`).

### **Backend (./server)**
* **auth-service** (Port 3001): Centralized user registration, login, session management, and JWT token generation.
* **dashboard-service** (Port 3002): Protected API endpoint serving analytics data, requires valid JWT from auth-service.
* **store-service** (Port 3003): Product catalog API with localized INR pricing and inventory management.

---

## Authentication & SSO Strategy

**Approach: Cross-Subdomain HttpOnly Cookies with Shared Secret Verification**

1. **Token Issuance:** When a user logs in, the `auth-service` validates credentials, generates a JWT, and sets it as an HttpOnly cookie.
2. **Domain Scoping:** The cookie is set with `Domain=.myplatform.local`, allowing the browser to automatically include it when navigating between any subdomain (dashboard, store, main).
3. **Stateless Verification:** Rather than each service calling auth-service to verify tokens, we use a **Shared Secret** approach. Each microservice cryptographically verifies the JWT independently using the same secret key.
4. **User Session Persistence:** Once authenticated, users can seamlessly navigate across all three apps without re-logging in.

---

## Security Implementation

* **HttpOnly & Secure Flags:** Cookies are marked as `HttpOnly` and `Secure`, preventing XSS attacks and ensuring they're only transmitted over HTTPS in production.
* **CORS Management:** Strict CORS configuration limits requests to trusted origins only, preventing unauthorized cross-origin access.
* **Environment Isolation:** All sensitive data (MongoDB connection strings, JWT secrets, API keys) are stored in secure `.env` files and never hardcoded into the codebase.
* **Token Expiration:** JWTs include an expiration time (currently 1 hour) to minimize the window of exposure if a token is compromised.
* **Password Hashing:** User passwords are hashed using bcrypt before storage in the database.

---

## DevOps & Tooling

* **Docker Compose:** All 6 services are containerized with `docker-compose.yml`. A single `docker compose up --build` command spins up the entire stack with proper networking and environment configuration.
* **GitHub Actions CI:** Automated pipeline using a **Matrix Strategy** to build and validate all 6 applications in parallel on every push—ensures code quality and catches integration issues early.
* **Tailwind CSS:** Modern utility-first CSS framework for responsive, high-performance UI design consistent across all frontend apps.

---

## Getting Started

### 1. Update Your Hosts File

Since SSO relies on subdomains, map the local domains by adding this line to your `hosts` file:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`  

127.0.0.1  app.myplatform.local dashboard.myplatform.local store.myplatform.local

### 2. Start with Docker

Ensure Docker Desktop is running, then from the root directory:
docker compose up --build

This will:
- Build all 6 microservices
- Start MongoDB and expose it on `localhost:27017`
- Bring up all frontend and backend services
- Make them accessible via their respective subdomains

### 3. Access the Apps

Open your browser and navigate to:
- `http://app.myplatform.local:3000` — Main app (login/signup)
- `http://dashboard.myplatform.local:4000` — Dashboard (requires login)
- `http://store.myplatform.local:5000` — Store (requires login)

---

## Future Roadmap (If I had more time...)

* **API Gateway (Nginx/Traefik):** Implement a reverse proxy at the top level to handle all routing centrally, allowing services to run on standard HTTP/HTTPS ports (80/443) without port numbers in URLs.

* **Shared Component Library:** Extract common UI components (buttons, forms, modals) into a shared React package and publish it to npm or a private registry. This ensures a consistent design system across all three apps and reduces code duplication.

* **Rate Limiting & Throttling:** Add middleware to rate-limit API endpoints and prevent brute-force attacks on login and registration endpoints.