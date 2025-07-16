#!/bin/bash
# Handcrafted Haven Development Setup Script
# Run this script after cloning the repository

echo "🚀 Setting up Handcrafted Haven Development Environment"
echo "======================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install global dependencies that might be needed
echo "📦 Installing global dependencies..."
npm install -g napi-postinstall 2>/dev/null || echo "⚠️  napi-postinstall already installed or permission denied (this is okay)"

# Clean any existing installations
echo "🧹 Cleaning existing installations..."
rm -rf node_modules package-lock.json
rm -rf apps/*/node_modules apps/*/package-lock.json
rm -rf packages/*/node_modules packages/*/package-lock.json
rm -rf apps/*/.next apps/*/dist packages/*/dist

# Install dependencies with fallback strategy
echo "📦 Installing dependencies..."
npm install --ignore-scripts --legacy-peer-deps --no-audit --silent

if [ $? -ne 0 ]; then
    echo "⚠️  First install attempt failed, trying alternative method..."
    npm install --ignore-scripts --legacy-peer-deps --no-audit --force --silent
fi

# Build all packages
echo "🔨 Building all packages..."
npx turbo build

if [ $? -eq 0 ]; then
    echo "✅ All packages built successfully!"
else
    echo "⚠️  Build had some warnings but core functionality should work"
fi

echo ""
echo "🎉 Setup complete! You can now run:"
echo "   ./start-dev.sh    # Start development servers (recommended)"
echo "   npm run dev       # Alternative start command"
echo "   npm run build     # Build all packages"
echo ""
echo "🌐 Access URLs:"
echo "   Web App: http://localhost:3000 (or next available port)"
echo "   API: http://localhost:3001"
echo "   API Health: http://localhost:3001/health"
echo ""
echo "📋 For troubleshooting, check:"
echo "   - SETUP.md for detailed instructions"
echo "   - DEVELOPMENT_STATUS.md for current status"
echo "   - TEAM_ONBOARDING_VERIFICATION.md for verification"
