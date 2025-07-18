# Handcrafted Haven - Setup Instructions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (we recommend using the version specified in `.nvmrc`)
- npm 9+ (comes with Node.js)

### Automated Setup (Recommended)
```bash
# Clone the repository
git clone https://github.com/Owen-kasule/wdd430-group05-handcrafted-haven.git
cd wdd430-group05-handcrafted-haven

# Run the setup script
./setup.sh
```

### Manual Setup
If the automated setup doesn't work, follow these steps:

1. **Install global dependencies (if needed):**
   ```bash
   sudo npm install -g napi-postinstall
   ```

2. **Clean and install dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

3. **Build all packages:**
   ```bash
   npx turbo build
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Commands

```bash
# Development
npm run dev        # Start both API and web app
npm run dev:all    # Start all packages including UI

# Building
npm run build      # Build all packages
npm run clean      # Clean build artifacts

# Testing & Quality
npm run test       # Run tests
npm run lint       # Run linting
npm run format     # Format code with Prettier
npm run type-check # TypeScript type checking
```

## 🌐 Access URLs

- **Web App**: http://localhost:3000
- **API Server**: http://localhost:3002
- **API Health Check**: http://localhost:3002/health

## 📦 Package Structure

```
apps/
├── api/          # Express.js API server
└── web/          # Next.js frontend application

packages/
├── types/        # Shared TypeScript interfaces
├── ui/           # Shared UI components (JavaScript)
├── utils/        # Shared utility functions
└── config/       # Configuration constants
```

## 🔧 Troubleshooting

### Common Issues

1. **unrs-resolver permission error:**
   ```bash
   sudo npm install -g napi-postinstall
   ```

2. **Next.js command not found:**
   ```bash
   npm install next@14.2.3 --workspace=apps/web
   ```

3. **TypeScript compilation errors:**
   ```bash
   npx turbo build --filter=@handcrafted-haven/types
   ```

4. **Port already in use:**
   - Web app will automatically use port 3001 if 3000 is busy
   - API server uses port 3002 by default

### Development Workflow

1. **Start with a clean installation:**
   ```bash
   ./setup.sh
   ```

2. **Make your changes in the appropriate package**

3. **Test your changes:**
   ```bash
   npm run build
   npm run dev
   ```

4. **Before committing:**
   ```bash
   npm run lint
   npm run format
   npm run type-check
   ```

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly using `npm run dev`
4. Run `npm run build` to ensure everything compiles
5. Submit a pull request

## 📞 Support

If you encounter issues not covered here, check:
- `DEVELOPMENT_STATUS.md` for current known issues
- `CLEANUP_SUMMARY.md` for recent changes
- Create an issue in the repository

## 🏗️ Architecture Notes

- **Monorepo**: Uses Turbo for build orchestration
- **TypeScript**: All packages except UI use TypeScript
- **UI Package**: Uses JavaScript with TypeScript definitions
- **Build System**: Turbo handles dependencies and caching
- **Development**: Hot reload enabled for both API and web app
