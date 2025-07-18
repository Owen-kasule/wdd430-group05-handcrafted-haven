#!/bin/bash

# Handcrafted Haven Development Server Startup Script
# This script starts both the API server and Next.js web app

echo "🚀 Starting Handcrafted Haven Development Environment"
echo "==============================================="

# Change to the project directory
cd "$(dirname "$0")"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies not found. Run './setup.sh' first."
    exit 1
fi

# Start both API and web app using turbo
echo "🔧 Starting API server and Web app..."
echo "⚡ Using Turbo for optimal performance..."
npx turbo dev --filter=@handcrafted-haven/web --filter=@handcrafted-haven/api --parallel

echo ""
echo "✅ Development servers started successfully!"
echo "🌐 Web App: http://localhost:3000 (or next available port)"
echo "🔗 API Server: http://localhost:3001"
echo "📋 API Health Check: http://localhost:3001/health"
echo ""
echo "💡 Press Ctrl+C to stop both servers"
