# QuantEdge Architecture

## 🏗️ System Overview

QuantEdge is a full-stack AI trading simulator built with a modern microservices-inspired architecture.

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │   Charts     │  │   Controls   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │ REST API / WebSocket
┌────────────────────────────┴────────────────────────────────┐
│                    Backend (FastAPI)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   API Layer  │  │  ML Engine   │  │Trading Engine│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Data Layer   │  │  Portfolio   │  │ Risk Manager │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────┐
│                    Data Layer (SQLite)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Stock Prices │  │    Trades    │  │  Positions   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Component Architecture

### Frontend Architecture

```
src/
├── components/
│   ├── dashboard/          # Dashboard components
│   │   ├── MetricsGrid     # Performance metrics
│   │   ├── PortfolioChart  # Portfolio visualization
│   │   ├── PriceChart      # Price predictions
│   │   ├── SignalIndicator # ML signals
│   │   ├── PositionsTable  # Current positions
│   │   └── TradeHistory    # Trade log
│   └── ui/                 # Reusable UI components
├── services/
│   └── api.ts             # Backend API client
├── hooks/                 # Custom React hooks
├── pages/
│   └── Index.tsx          # Main dashboard page
└── types/                 # TypeScript definitions
```

### Backend Architecture

```
backend/app/
├── api/                   # REST API endpoints
│   ├── health.py          # Health checks
│   ├── trading.py         # Trading operations
│   ├── portfolio.py       # Portfolio management
│   ├── ml.py              # ML predictions
│   └── data.py            # Data operations
├── models/                # Database models
│   ├── stock_data.py      # Stock price data
│   ├── trades.py          # Trade records
│   └── portfolio.py       # Portfolio state
├── ml/                    # Machine Learning
│   ├── lstm_predictor.py  # LSTM price prediction
│   └── rl_agent.py        # RL trading agent
├── trading/               # Trading engine
│   └── engine.py          # Trade execution
├── data/                  # Data collection
│   └── collector.py       # Stock data fetching
└── database/              # Database management
    └── init_db.py         # DB initialization
```

## 🔄 Data Flow

### 1. Data Collection
```
External API (yfinance)
    ↓
DataCollector
    ↓ (fetch OHLCV data)
Technical Indicators
    ↓ (RSI, MACD, etc.)
SQLite Database
```

### 2. ML Prediction Pipeline
```
Historical Data
    ↓
LSTM Predictor ──→ Price Predictions
    ↓
RL Agent ──────→ Trading Signals
    ↓
Ensemble Decision
    ↓
Trading Engine
```

### 3. Trade Execution
```
Trading Signal
    ↓
Risk Management
    ↓
Position Sizing
    ↓
Order Creation
    ↓
Portfolio Update
    ↓
Performance Metrics
```

## 🧠 ML Architecture

### LSTM Predictor
- **Input**: 15-day window of OHLCV + 10 technical indicators
- **Architecture**: 
  - LSTM(50) → Dropout(0.2)
  - LSTM(50) → Dropout(0.2)
  - Dense(25, relu)
  - Dense(1)
- **Output**: Next-day price prediction with confidence bounds

### RL Trading Agent
- **Algorithm**: PPO (Proximal Policy Optimization)
- **State Space**: Portfolio state + market indicators (15 features)
- **Action Space**: Discrete(3) - BUY, HOLD, SELL
- **Reward**: Risk-adjusted portfolio returns
- **Policy Network**: MLP with 2 hidden layers

## 🔒 Security Architecture

- API authentication (optional, can be added)
- Input validation on all endpoints
- SQL injection prevention (SQLAlchemy ORM)
- Rate limiting (can be added)
- Environment-based configuration

## 📊 Database Schema

### StockPrice
```sql
CREATE TABLE stock_price (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10),
    timestamp DATETIME,
    open FLOAT,
    high FLOAT,
    low FLOAT,
    close FLOAT,
    volume INTEGER,
    rsi FLOAT,
    macd FLOAT,
    signal_line FLOAT,
    bb_upper FLOAT,
    bb_lower FLOAT,
    sma_20 FLOAT,
    sma_50 FLOAT
);
```

### Trade
```sql
CREATE TABLE trade (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10),
    side VARCHAR(10),
    quantity INTEGER,
    price FLOAT,
    commission FLOAT,
    pnl FLOAT,
    timestamp DATETIME
);
```

### Position
```sql
CREATE TABLE position (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10),
    quantity INTEGER,
    avg_entry_price FLOAT,
    current_price FLOAT,
    unrealized_pnl FLOAT,
    stop_loss FLOAT,
    take_profit FLOAT
);
```

## 🚀 Deployment Architecture

### Docker Compose Setup
```
┌─────────────────────┐
│   Frontend (React)  │
│   Port: 3000        │
└──────────┬──────────┘
           │
┌──────────┴──────────┐
│  Backend (FastAPI)  │
│   Port: 8000        │
└──────────┬──────────┘
           │
┌──────────┴──────────┐
│  SQLite Database    │
│  Volume Mount       │
└─────────────────────┘
```

## 🔄 Development Workflow

1. **Local Development**
   - Backend: `uvicorn app.main:app --reload`
   - Frontend: `npm run dev`

2. **Docker Development**
   - `docker-compose up --build`

3. **Testing**
   - Backend: `pytest`
   - Frontend: `npm test`

4. **CI/CD** (can be added)
   - GitHub Actions for automated testing
   - Docker image building
   - Deployment automation

## 📈 Scalability Considerations

### Current (MVP)
- Single-instance application
- SQLite database
- Local file storage

### Future Enhancements
- PostgreSQL for production
- Redis for caching
- Celery for background tasks
- WebSocket for real-time updates
- Kubernetes deployment
- Multi-symbol parallel processing

## 🔍 Monitoring & Logging

- **Backend Logging**: Loguru for structured logging
- **Error Tracking**: Can add Sentry integration
- **Metrics**: Can add Prometheus metrics
- **Health Checks**: `/api/health` endpoint

## 🧪 Testing Strategy

- **Unit Tests**: Individual components
- **Integration Tests**: API endpoints
- **E2E Tests**: Full trading workflows
- **Performance Tests**: ML model inference
- **Load Tests**: API stress testing

---

This architecture is designed to be:
- 🎯 **Modular**: Easy to extend and maintain
- 🚀 **Scalable**: Can grow with requirements
- 🔒 **Secure**: Following security best practices
- 📊 **Observable**: Easy to monitor and debug
- 🧪 **Testable**: Comprehensive test coverage
