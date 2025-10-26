#!/bin/bash

echo "========================================="
echo "QuantEdge Trading Simulator Setup"
echo "========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✓ Docker and Docker Compose found"

# Create necessary directories
echo "Creating directory structure..."
mkdir -p backend/data/raw
mkdir -p backend/data/processed
mkdir -p backend/data/models
mkdir -p backend/logs

echo "✓ Directories created"

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file with Indian stock market configuration..."
    cat > .env << EOF
# QuantEdge Configuration - Indian Stock Market (NSE)
DATABASE_URL=sqlite+aiosqlite:///./data/quantedge.db
VITE_API_URL=http://localhost:8000

# Trading Configuration (Indian Market)
INITIAL_CAPITAL=1000000
CURRENCY=INR
CURRENCY_SYMBOL=₹
STOCK_EXCHANGE=NSE

# Default NSE Stocks
DEFAULT_STOCKS=RELIANCE.NS,TCS.NS,HDFCBANK.NS,INFY.NS,HINDUNILVR.NS,ICICIBANK.NS,BHARTIARTL.NS,ITC.NS,SBIN.NS,KOTAKBANK.NS

# ML Model Configuration
LSTM_SEQUENCE_LENGTH=15
LSTM_EPOCHS=50
RL_EPISODES=1000

# Risk Management
MAX_POSITION_SIZE=0.1
STOP_LOSS_PERCENTAGE=0.05
COMMISSION_RATE=0.001
EOF
    echo "✓ .env file created with NSE configuration"
    echo "  Configured for Indian stocks with INR ₹1,000,000 capital"
else
    echo "✓ .env file already exists"
fi

# Build and start containers
echo "Building Docker containers..."
docker-compose build

echo "Starting QuantEdge services..."
docker-compose up -d

echo ""
echo "========================================="
echo "✓ QuantEdge Setup Complete!"
echo "========================================="
echo ""
echo "Services are starting up..."
echo "  - Backend API: http://localhost:8000"
echo "  - Frontend Dashboard: http://localhost:3000"
echo "  - API Documentation: http://localhost:8000/docs"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop services:"
echo "  docker-compose down"
echo ""
echo "Happy trading! 📈"
