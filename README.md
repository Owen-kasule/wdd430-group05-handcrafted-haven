# Handcrafted Haven - Group 05

<div align="center">
  <img src="https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=600&h=300&fit=crop" alt="Handcrafted Haven Logo" width="600" height="300">
</div>

## 📋 Project Summary

**Handcrafted Haven** is a collaborative project by Group 05 for WDD 430: Web Full-Stack Development, Spring 2025 (BYU-Idaho). Currently under development, the platform will enable artisans to showcase and sell their handmade items, connecting creators with customers who value unique, quality products. Features will include seller profiles, product listings, reviews, and responsive design.

The team is actively building the app with a focus on community, sustainability, and supporting local artisans.

---

## 🌟 Live Demo

🚀 **[Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven)**

_Demo URL will be available after deployment._

---

## 👥 Team Members

- **Owen Kasule Muhereza**
- **Godwin Obi Bassey**
- **Braxton Marshall Goode**
- **Desire Delmy Vargas Tinoco**
- **Issah Akuffo**

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 8+

### Setup Instructions

1. **Clone and Install:**

```bash
git clone https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven.git
cd wdd430-group05-handcrafted-haven
npm install
```

2. **Start Development:**

```bash
# Run all apps in development mode
npm run dev

# Or run specific app
npm run dev --filter=@handcrafted-haven/web
npm run dev --filter=@handcrafted-haven/api
```

3. **Build for Production:**

```bash
npm run build
npm run start
```

---

## 🏗️ Architecture & Technology Stack

This project uses a **Turborepo** monorepo structure for optimal code organization and development efficiency.

### 📦 Applications

- **`apps/web`**: **Next.js** frontend application (converted from React CRA)
- **`apps/api`**: **Express.js** REST API backend with TypeScript

### 🔧 Shared Packages

- **`packages/ui`**: Reusable React components library
- **`packages/types`**: TypeScript type definitions
- **`packages/utils`**: Shared utility functions and helpers
- **`packages/config`**: Configuration constants and settings

### �️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, CSS3
- **Backend**: Express.js, Node.js, TypeScript
- **Build Tools**: Turborepo, Next.js, TypeScript
- **Development**: Hot reload, Fast refresh, ESLint
- **Architecture**: Monorepo with shared packages

---

## 🎯 Features

### 🛍️ For Customers

- **Product Catalog**: Browse handcrafted items by category with advanced filtering
- **Product Details**: View detailed information, high-quality images, and specifications
- **Seller Profiles**: Learn about artisan sellers and their craft specialties
- **Product Reviews**: Read authentic reviews and submit your own feedback
- **Responsive Design**: Seamless experience on desktop, tablet, and mobile
- **Search & Filter**: Advanced search with category, price, and location filters

### 🎨 For Artisans

- **Seller Dashboard**: Manage products, orders, and customer communications
- **Product Management**: Easy upload with image galleries and descriptions
- **Order Tracking**: Monitor sales and customer interactions
- **Profile Customization**: Showcase your story and craft expertise

### 🔧 Technical Features

- **Monorepo Architecture**: Shared packages for better code organization
- **Type Safety**: Full TypeScript implementation across the entire codebase
- **Modern React**: Hooks, functional components, and Next.js optimizations
- **API Integration**: RESTful API with proper error handling and validation
- **Shared Components**: Reusable UI components for consistency
- **Centralized Configuration**: Single source of truth for app settings

---

## 📁 Project Structure

```
wdd430-group05-handcrafted-haven/
├── apps/
│   ├── web/                 # Next.js Frontend Application
│   │   ├── src/
│   │   │   ├── pages/       # Next.js pages (file-based routing)
│   │   │   │   ├── _app.js  # App wrapper with global styles
│   │   │   │   ├── index.js # Homepage
│   │   │   │   ├── about.js # About page
│   │   │   │   ├── product/[id].js # Dynamic product pages
│   │   │   │   └── seller/[id].js  # Dynamic seller pages
│   │   │   ├── components/  # React components
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── ProductCard.js
│   │   │   │   └── *.css files
│   │   │   └── styles/      # Global styles
│   │   ├── next.config.js   # Next.js configuration
│   │   ├── tsconfig.json    # TypeScript configuration
│   │   └── package.json     # Dependencies and scripts
│   └── api/                 # Express.js Backend
│       ├── src/
│       │   ├── routes/      # API route handlers
│       │   ├── data/        # Mock data and database
│       │   ├── middleware/  # Express middleware
│       │   └── index.ts     # Server entry point
│       └── package.json
├── packages/
│   ├── ui/                  # Shared React Components
│   │   ├── src/components/
│   │   └── package.json
│   ├── types/               # TypeScript Definitions
│   │   ├── src/index.ts
│   │   └── package.json
│   ├── utils/               # Shared Utilities
│   │   ├── src/index.ts
│   │   └── package.json
│   └── config/              # Configuration
│       ├── src/index.ts
│       └── package.json
├── turbo.json               # Turborepo configuration
├── package.json             # Root package.json
└── README.md               # This file
```

---

## 🔌 API Endpoints

### Products

- `GET /api/products` - Get all products with optional filtering
- `GET /api/products/:id` - Get specific product details
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products` - Create new product (sellers only)
- `PUT /api/products/:id` - Update product (sellers only)
- `DELETE /api/products/:id` - Delete product (sellers only)

### Sellers

- `GET /api/sellers` - Get all sellers with pagination
- `GET /api/sellers/:id` - Get seller profile details
- `GET /api/sellers/:id/products` - Get seller's products
- `POST /api/sellers` - Register new seller
- `PUT /api/sellers/:id` - Update seller profile

### Reviews

- `GET /api/reviews` - Get all reviews with filtering
- `POST /api/reviews` - Submit new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

---

## 🛠️ Development Commands

### Development

```bash
# Start all apps in development mode
npm run dev

# Start specific applications
npm run dev --filter=@handcrafted-haven/web    # Frontend only
npm run dev --filter=@handcrafted-haven/api    # Backend only

# Alternative individual commands
npm run dev:web             # Start Next.js frontend
npm run dev:api             # Start Express backend
```

### Building

```bash
# Build all packages and apps
npm run build

# Build specific applications
npm run build --filter=@handcrafted-haven/web  # Frontend only
npm run build --filter=@handcrafted-haven/api  # Backend only

# Alternative individual commands
npm run build:web           # Build Next.js frontend
npm run build:api           # Build Express backend
```

### Testing & Quality

```bash
# Run all tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check

# Fix linting issues
npm run lint:fix
```

### Utilities

```bash
# Clean all build artifacts
npm run clean

# Reset all node_modules
npm run clean:modules

# Install dependencies with ignore scripts (if needed)
npm install --ignore-scripts
```

---

## 🚀 Deployment

### Vercel (Recommended for Frontend)

```bash
# Deploy to Vercel
vercel

# Or use the deploy button above
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

---

## 📝 Course Requirements (WDD 430)

This project fulfills the following course requirements:

✅ **Modern React Application**: Built with Next.js 14 and React 18  
✅ **Component Architecture**: Reusable components in shared UI package  
✅ **Routing**: File-based routing with Next.js (converted from React Router)  
✅ **State Management**: React hooks and context for state management  
✅ **API Integration**: RESTful API with Express.js backend  
✅ **TypeScript**: Full type safety across the entire monorepo  
✅ **Responsive Design**: Mobile-first CSS with modern design principles  
✅ **Monorepo Architecture**: Turborepo for efficient code organization  
✅ **Build Tools**: Modern build pipeline with Next.js and TypeScript  
✅ **Development Workflow**: Hot reload, fast refresh, and developer experience

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add meaningful comments and documentation
- Follow the existing file structure

---

## 📊 Project Status

- 🚧 **In Development** - Active development in progress
- ✅ **Frontend**: Next.js conversion complete
- ✅ **Backend**: Express API implemented
- ✅ **Shared Packages**: Core utilities and types
- 🔄 **Testing**: Unit and integration tests in progress
- 📋 **Documentation**: API documentation in progress

---

## 🔗 Links

- **🏠 [Project Repository](https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven)**
- **📚 [Course Website](https://byui.instructure.com/courses/wdd430)**
- **🎯 [Project Board](https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven/projects)**
- **📖 [Documentation](https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven/wiki)**

---

## � License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **WDD 430 Instructors** - For guidance and support throughout the course
- **BYU-Idaho** - For providing the educational framework
- **Open Source Community** - For the amazing tools and libraries used
- **Unsplash Contributors** - For the beautiful images used in the project

---

<div align="center">
  <p>Built with ❤️ by WDD 430 Group 05</p>
  <p>© 2025 Handcrafted Haven. All rights reserved.</p>
</div>
