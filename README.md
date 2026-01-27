# Theo's MERN Portfolio

Full-stack portfolio website built with React, Node.js, Express, and MongoDB.

## 🚀 Deployment Guide

### Prerequisites

- Node.js installed
- Firebase account (for frontend)
- Render account (for backend)
- MongoDB Atlas cluster

### 1. Repository Setup

The project structure is organized for easy deployment:

- `client/`: React Frontend (Vite)
- `server/`: Node.js Backend

### 2. Backend Deployment (Render)

1. Push this repository to GitHub.
2. Log in to [Render](https://render.com).
3. Click "New +" -> "Blueprint".
4. Connect your GitHub repository.
5. Render will detect `render.yaml` and set up the service.
6. **Important**: Go to the "Environment" tab of your new service and add your `MONGO_URI` secret.
7. The backend URL will be provided by Render (e.g., `https://theo-portfolio-api.onrender.com`).

### 3. Frontend Deployment (Firebase)

1. Install Firebase tools: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize in root: `firebase init hosting`
   - Choose "Use an existing project" or "Create a new project".
   - **Public directory**: `client/dist` (This is crucial!)
   - **Configure as single-page app**: Yes
   - **Set up automatic builds and deploys with GitHub**: Optional (Yes recommended)
4. Create Production Environment Variable:
   - Create a file `client/.env.production`
   - Add: `VITE_API_BASE_URL=https://your-render-backend-url.onrender.com`
   - (Replace with your actual Render URL)
5. Build and Deploy:
   - Run: `cd client && npm install && npm run build`
   - Run (from root): `firebase deploy --only hosting`

### 4. Local Development

1. **Server**:
   ```bash
   cd server
   cp .env.example .env # (Create .env and add MONGO_URI)
   npm install
   npm run dev
   ```
2. **Client**:
   ```bash
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```
