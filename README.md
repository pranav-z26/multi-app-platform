# Multi-App Platform with Shared Authentication (MERN)

A full-stack MERN app with implementation of **Single Sign-On (SSO)** across multiple subdomains. Everything's containerized with Docker and has automated tests via GitHub Actions.

## Architecture Overview

It's organized as a **Client/Server** monorepo, with three frontend apps and three backend services:

### **Frontend**
* **main-app** (Port 3000): The login and auth portal (`app.myplatform.local`)
* **dashboard-app** (Port 4000): Analytics dashboard (`dashboard.myplatform.local`)
* **store-app** (Port 5000): Simple e-commerce store with shopping cart (`store.myplatform.local`)

### **Backend**
* **auth-service** (Port 3001): Handles user registration and issues JWTs
* **dashboard-service** (Port 3002): Serves analytics data (protected)
* **store-service** (Port 3003): Product catalog API with INR pricing

---

## Authentication & SSO Strategy

We use **HttpOnly Cookies** scoped to the `.myplatform.local` domain with a Shared Secret verification strategy:

1. User logs in → `auth-service` generates a JWT and sets it as an HttpOnly cookie
2. Browser automatically sends the cookie to any subdomain under `.myplatform.local`
3. Each service (Dashboard, Store) verifies the JWT directly using a shared secret, no extra calls to auth-service needed

---

## Tech Stack

* **Docker Compose:** Spin up all 6 services locally with one command
* **GitHub Actions:** Runs builds on every push, testing all apps in parallel (I have used matrix)
* **Tailwind CSS:** Consistent styling across all frontends

---

## Getting Started

### 1. Update Your Hosts File

Add this line to local `hosts` file so the browser knows where to find the subdomains:

127.0.0.1  app.myplatform.local dashboard.myplatform.local store.myplatform.local

### 2. Start Everything with Docker

In the root directory:

docker compose up --build