# QuantEdge: AI-Powered Trading Simulator

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.9+-green.svg)](https://python.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)](https://typescriptlang.org)
[![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)](https://docker.com)

A production-ready, full-stack AI-powered quantitative trading simulator that predicts stock price movements using machine learning and executes simulated trades in real-time. Built with Python FastAPI backend and React TypeScript frontend.

## ✨ Highlights

🎯 **Portfolio Project** - Designed for showcasing technical skills  
🤖 **ML-Powered** - LSTM + Reinforcement Learning trading strategies  
📊 **Real-time Dashboard** - Beautiful, responsive React interface  
🐳 **Docker Ready** - One-command deployment  
🧪 **Well-Tested** - Comprehensive test coverage  
📚 **Fully Documented** - Clear architecture and API docs  

## 🚀 Features

### Machine Learning
- **LSTM Neural Network**: Time-series price forecasting with 15-day windows
- **Reinforcement Learning**: PPO agent for optimal buy/sell/hold decisions
- **Technical Indicators**: RSI, MACD, Bollinger Bands, Moving Averages
- **Ensemble Predictions**: Combined ML models for higher accuracy

### Trading Engine
- **Real-time Simulation**: Execute trades based on ML predictions
- **Risk Management**: Position sizing, stop-loss, take-profit levels
- **Backtesting**: Historical performance testing with commission/slippage
- **Portfolio Tracking**: Real-time P&L, positions, and metrics

### Dashboard
- **Live Metrics**: Portfolio value, Sharpe ratio, win rate, drawdown
- **Interactive Charts**: Portfolio performance, price predictions, confidence intervals
- **Trading Signals**: AI-driven BUY/SELL/HOLD recommendations
- **Trade History**: Complete transaction log with P&L tracking

### Technology Stack
- **Backend**: Python 3.9+, FastAPI, SQLAlchemy, TensorFlow, Stable-Baselines3
- **Frontend**: React 18, TypeScript, Tailwind CSS, Recharts, Shadcn/ui
- **Database**: SQLite (dev), PostgreSQL-ready for production
- **Deployment**: Docker, Docker Compose, Cloud-ready

## 📋 Requirements

- **Docker & Docker Compose** (recommended) - Version 20.10+
- **OR** Manual setup:
  - Python 3.9+
  - Node.js 18+
  - npm or yarn

## 🏃 Quick Start (Docker - Recommended)

### One-Command Setup

```bash
chmod +x setup.sh
./setup.sh
```

This will:
1. Create necessary directories
2. Set up environment configuration
3. Build Docker containers
4. Start all services

### Access the Application

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Managing Services

```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Rebuild after code changes
docker-compose up -d --build
```

## 💻 Manual Setup (Without Docker)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create directories
mkdir -p data/raw data/processed data/models logs

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL=sqlite+aiosqlite:///./data/quantedge.db
VITE_API_URL=http://localhost:8000
INITIAL_CAPITAL=100000
```

## 📁 Project Structure

```
QuantEdge/
├── backend/                     # Python FastAPI Backend
│   ├── app/
│   │   ├── main.py             # FastAPI application entry point
│   │   ├── api/                # REST API endpoints
│   │   │   ├── health.py       # Health check endpoints
│   │   │   ├── trading.py      # Trading operations
│   │   │   ├── portfolio.py    # Portfolio management
│   │   │   ├── ml.py           # ML predictions & signals
│   │   │   └── data.py         # Data fetching & sync
│   │   ├── models/             # SQLAlchemy database models
│   │   │   ├── stock_data.py   # Stock prices & indicators
│   │   │   ├── trades.py       # Trade records & orders
│   │   │   └── portfolio.py    # Portfolio state & snapshots
│   │   ├── ml/                 # Machine Learning models
│   │   │   ├── lstm_predictor.py  # LSTM price prediction
│   │   │   └── rl_agent.py     # RL trading agent (PPO)
│   │   ├── trading/            # Trading engine
│   │   │   └── engine.py       # Trade execution & simulation
│   │   ├── data/               # Data collection
│   │   │   └── collector.py    # Stock data fetching (yfinance)
│   │   └── database/           # Database management
│   │       └── init_db.py      # DB initialization & schema
│   ├── tests/                  # Backend tests
│   │   ├── test_api.py
│   │   ├── test_trading_engine.py
│   │   └── conftest.py
│   ├── data/                   # Local data storage
│   │   ├── raw/                # Downloaded stock data
│   │   ├── processed/          # Processed features
│   │   └── models/             # Trained ML models
│   ├── logs/                   # Application logs
│   ├── requirements.txt
│   ├── Dockerfile
│   └── pytest.ini
│
├── frontend/                   # React TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   │   ├── MetricsGrid.tsx
│   │   │   │   ├── PortfolioChart.tsx
│   │   │   │   ├── PriceChart.tsx
│   │   │   │   ├── SignalIndicator.tsx
│   │   │   │   ├── PositionsTable.tsx
│   │   │   │   └── TradeHistory.tsx
│   │   │   └── ui/             # Reusable UI components (Shadcn)
│   │   ├── pages/
│   │   │   ├── Index.tsx       # Main dashboard page
│   │   │   └── NotFound.tsx
│   │   ├── services/
│   │   │   └── api.ts          # Backend API client
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/
│   │   │   └── utils.ts        # Utility functions
│   │   ├── index.css           # Global styles & design system
│   │   └── main.tsx            # App entry point
│   ├── public/                 # Static assets
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── Version-1/                  # Original frontend version (preserved)
├── scripts/                    # Utility scripts
│   ├── generate-icons.mjs      # Icon generation
│   └── sync-version1-icons.mjs # Icon sync utility
├── test_2/                     # Test assets
│
├── docker-compose.yml          # Docker orchestration
├── setup.sh                    # One-command setup script
├── .env.example                # Environment variables template
├── README.md                   # This file
├── ARCHITECTURE.md             # System architecture docs
├── DEPLOYMENT.md               # Deployment guide
├── CONTRIBUTING.md             # Contribution guidelines
└── LICENSE                     # Apache 2.0 License
```

## 🔧 API Endpoints

### Health & Status
- `GET /api/health` - Health check
- `GET /api/status` - System status

### Trading
- `POST /api/trading/orders` - Create trading order
- `GET /api/trading/trades` - Get trade history
- `GET /api/trading/orders` - Get order history

### Portfolio
- `GET /api/portfolio/positions` - Current positions
- `GET /api/portfolio/performance` - Performance history
- `GET /api/portfolio/metrics` - Portfolio metrics

### Machine Learning
- `GET /api/ml/predictions/{symbol}` - Get predictions
- `GET /api/ml/signals` - Current trading signals
- `POST /api/ml/train/{model_type}` - Train ML model

### Data
- `GET /api/data/price/{symbol}` - Historical prices
- `POST /api/data/sync/{symbol}` - Sync stock data
- `GET /api/data/symbols` - Available symbols

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📊 Machine Learning Models

### LSTM Price Predictor
- **Input**: 15-day window of OHLCV + technical indicators
- **Output**: Next-day price prediction with confidence
- **Architecture**: Stacked LSTM with dropout layers

### RL Trading Agent
- **Algorithm**: PPO (Proximal Policy Optimization)
- **Actions**: BUY, SELL, HOLD
- **Reward**: Risk-adjusted portfolio returns

## 📈 Performance Metrics

The dashboard displays:
- Total P&L and percentage returns
- Sharpe Ratio (risk-adjusted returns)
- Sortino Ratio (downside risk)
- Maximum Drawdown
- Win Rate
- Active positions count

## 🔒 Risk Management

- Position sizing based on portfolio value
- Stop-loss and take-profit levels
- Maximum drawdown limits
- Commission and slippage simulation (0.1%)

## 🛠️ Development

### Adding New Symbols

Edit `backend/app/data/collector.py`:

```python
self.symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "YOUR_SYMBOL"]
```

### Training ML Models

```bash
# Access backend container
docker-compose exec backend python

# Run training script
from app.data.collector import DataCollector
from app.ml.lstm_predictor import LSTMPredictor

# Fetch data
collector = DataCollector()
data = collector.fetch_all_symbols()

# Train LSTM
predictor = LSTMPredictor()
# ... training code
```

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
pytest

# With coverage report
pytest --cov=app --cov-report=html
```

### Frontend Tests
```bash
cd frontend
npm test

# Watch mode
npm test -- --watch
```

## 📚 Documentation

- **[Architecture Guide](ARCHITECTURE.md)** - System architecture and design
- **[Deployment Guide](DEPLOYMENT.md)** - Cloud deployment instructions  
- **[Contributing](CONTRIBUTING.md)** - How to contribute
- **[API Documentation](http://localhost:8000/docs)** - Interactive API docs (when running)

## 🎯 Use Cases

This project demonstrates:
- ✅ Full-stack development (Python + React + TypeScript)
- ✅ Machine Learning integration (LSTM + RL)
- ✅ API design with FastAPI
- ✅ Modern frontend with React & Tailwind
- ✅ Database modeling with SQLAlchemy
- ✅ Docker containerization
- ✅ Testing & CI/CD practices
- ✅ Clean architecture & code organization

## 🤝 Contributing

This is primarily a portfolio project, but contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Educational Purpose Only**: This is a simulation tool for learning and portfolio demonstration. Do not use for actual trading without:
- Proper risk assessment
- Regulatory compliance
- Extensive backtesting
- Professional financial advice

## 🙏 Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)
- ML with [TensorFlow](https://tensorflow.org/) & [Stable-Baselines3](https://stable-baselines3.readthedocs.io/)

## 📧 Contact

For questions, suggestions, or collaboration opportunities:
- Open an issue on GitHub
- Connect via GitHub profile

---

**Built with ❤️ as a portfolio project showcasing modern full-stack development**
