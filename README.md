# Handcrafted Haven - Group 05

[Handcrafted Haven Logo](https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=800&h=200&fit=crop)

## Project Summary
Handcrafted Haven is a collaborative project by Group 05 for WDD 430: Web Full-Stack Development, Spring 2025. The platform enables artisans to showcase and sell their handmade items, connecting creators with customers who value unique, quality products.

## Group Members:
- Owen Kasule Muhereza
- Godwin Obi Bassey
- Braxton Marshall Goode
- Desire Delmy Vargas Tinoco
- Issah Akuffo

## Project Repository:
[Handcrafted Haven GitHub Repository](https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven)

## Live Demo:
**[Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven)**

---

## 🚀 Quick Start (3 Steps)

### **IMPORTANT: You MUST install dependencies first!**

```bash
# 1. Clone the repository
git clone https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven.git
cd wdd430-group05-handcrafted-haven

# 2. Install dependencies (REQUIRED - DON'T SKIP THIS!)
npm install

# 3. Start development servers
npm run dev
```

# Handcrafted Haven - Monorepo

A modern e-commerce platform connecting artisans with customers worldwide, built with React, Express, and TypeScript in a Turborepo monorepo architecture.

## 🏗️ Architecture

This project uses a **Turborepo** monorepo structure with the following organization:

### 📦 Apps
- **`apps/web`**: React frontend application
- **`apps/api`**: Express.js REST API backend

### 🔧 Packages
- **`packages/ui`**: Shared React components
- **`packages/types`**: TypeScript type definitions
- **`packages/utils`**: Utility functions and helpers
- **`packages/config`**: Configuration constants and settings

## 🚀 Getting Started

### Quick Setup
For detailed setup instructions and troubleshooting, see **[SETUP.md](SETUP.md)**.

```bash
# Automated setup (recommended)
./setup.sh

# Manual setup
npm install --legacy-peer-deps
npm run build
npm run dev
```

### Access URLs
- **Web App**: http://localhost:3000
- **API Server**: http://localhost:3002

### Development
```bash
# Run all apps in development mode
npm run dev

# Run specific app
npm run dev --filter=@handcrafted-haven/web
npm run dev --filter=@handcrafted-haven/api
```

### Production
```bash
# Build for production
npm run build

# Start apps
npm run start
```

## 🎯 Features

### Customer Features
- **Product Catalog**: Browse handcrafted items by category
- **Product Details**: View detailed product information, images, and specifications
- **Seller Profiles**: Learn about artisan sellers and their specialties
- **Product Reviews**: Read and submit product reviews
- **Responsive Design**: Optimized for desktop and mobile devices

### Technical Features
- **Monorepo Architecture**: Shared packages for better code organization
- **TypeScript**: Full type safety across the entire codebase
- **React 19**: Modern React with hooks and functional components
- **Express API**: RESTful API with proper error handling
- **Shared UI Components**: Reusable React components
- **Type-Safe Utilities**: Shared utility functions with TypeScript
- **Centralized Configuration**: Single source of truth for app settings

## 📁 Project Structure

```
├── apps/
│   ├── web/                 # React frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── App.js
│   │   └── package.json
│   └── api/                 # Express backend
│       ├── src/
│       │   ├── routes/
│       │   ├── data/
│       │   └── index.ts
│       └── package.json
├── packages/
│   ├── ui/                  # Shared React components
│   │   ├── src/components/
│   │   └── package.json
│   ├── types/               # TypeScript definitions
│   │   ├── src/index.ts
│   │   └── package.json
│   ├── utils/               # Utility functions
│   │   ├── src/index.ts
│   │   └── package.json
│   └── config/              # Configuration
│       ├── src/index.ts
│       └── package.json
├── turbo.json               # Turborepo configuration
└── package.json             # Root package.json
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/:id/reviews` - Get product reviews

### Sellers
- `GET /api/sellers` - Get all sellers
- `GET /api/sellers/:id` - Get seller by ID
- `GET /api/sellers/:id/products` - Get seller's products

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start all apps in development
npm run dev:web          # Start web app only
npm run dev:api          # Start API only

# Building
npm run build            # Build all packages and apps
npm run build:web        # Build web app only
npm run build:api        # Build API only

# Testing
npm run test             # Run all tests
npm run lint             # Lint all packages
npm run type-check       # Type check all packages

# Utilities
npm run clean            # Clean all build artifacts
```

## 🌟 Key Technologies

- **Frontend**: React 19, React Router, CSS3
- **Backend**: Express.js, Node.js, TypeScript
- **Build Tools**: Turborepo, TypeScript
- **Development**: Nodemon, React Scripts

## 📝 Course Requirements (WDD 430)

This project fulfills the following course requirements:

✅ **React Application**: Modern React with functional components and hooks  
✅ **Routing**: Client-side routing with React Router  
✅ **Component Architecture**: Reusable components in shared UI package  
✅ **State Management**: Local state management with React hooks  
✅ **API Integration**: REST API with Express.js backend  
✅ **TypeScript**: Full type safety across monorepo  
✅ **Responsive Design**: Mobile-first CSS design  
✅ **Modern Architecture**: Turborepo monorepo structure  

## 📄 License

This project is licensed under the MIT License.
