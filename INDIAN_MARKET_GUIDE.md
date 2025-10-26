# Indian Stock Market Configuration Guide

This guide explains how QuantEdge is configured for the Indian stock market (NSE) and how to use it.

## 🇮🇳 NSE Configuration

QuantEdge is pre-configured for the **National Stock Exchange (NSE)** of India with the following defaults:

### Default Settings

- **Exchange**: NSE (National Stock Exchange of India)
- **Currency**: INR (Indian Rupee - ₹)
- **Initial Capital**: ₹10,00,000 (10 Lakhs)
- **Trading Hours**: 9:15 AM - 3:30 PM IST
- **Commission**: 0.1% per trade

### Top NSE Stocks Included

The application comes pre-configured with these major Indian stocks:

1. **RELIANCE.NS** - Reliance Industries Limited
2. **TCS.NS** - Tata Consultancy Services
3. **HDFCBANK.NS** - HDFC Bank Limited
4. **INFY.NS** - Infosys Limited
5. **HINDUNILVR.NS** - Hindustan Unilever Limited
6. **ICICIBANK.NS** - ICICI Bank Limited
7. **BHARTIARTL.NS** - Bharti Airtel Limited
8. **ITC.NS** - ITC Limited
9. **SBIN.NS** - State Bank of India
10. **KOTAKBANK.NS** - Kotak Mahindra Bank Limited

## 📊 Stock Symbol Format

For NSE stocks, use the following format:
```
[SYMBOL].NS
```

Examples:
- `RELIANCE.NS` for Reliance Industries
- `TCS.NS` for Tata Consultancy Services
- `INFY.NS` for Infosys

For BSE (Bombay Stock Exchange) stocks, use:
```
[SYMBOL].BO
```

## 🔧 Configuration Files

### .env File

Your `.env` file should contain:

```env
# Trading Configuration (Indian Market)
INITIAL_CAPITAL=1000000
CURRENCY=INR
CURRENCY_SYMBOL=₹
STOCK_EXCHANGE=NSE

# Default NSE Stocks
DEFAULT_STOCKS=RELIANCE.NS,TCS.NS,HDFCBANK.NS,INFY.NS,HINDUNILVR.NS,ICICIBANK.NS,BHARTIARTL.NS,ITC.NS,SBIN.NS,KOTAKBANK.NS

# Market Hours (IST)
MARKET_OPEN_HOUR=9
MARKET_OPEN_MINUTE=15
MARKET_CLOSE_HOUR=15
MARKET_CLOSE_MINUTE=30
```

### Data Collector Configuration

The `DataCollector` class in `backend/app/data/collector.py` automatically:
- Fetches data from yfinance for NSE stocks
- Adds technical indicators
- Handles INR currency data
- Respects NSE market hours

## 📈 Adding More NSE Stocks

### Method 1: Via Environment Variable

Edit your `.env` file:

```env
DEFAULT_STOCKS=RELIANCE.NS,TCS.NS,YOUR_STOCK.NS
```

### Method 2: Via Code

Edit `backend/app/data/collector.py`:

```python
def __init__(self, symbols: list = None, exchange: str = "NSE"):
    if exchange == "NSE":
        self.symbols = [
            "RELIANCE.NS",
            "TCS.NS",
            "YOUR_STOCK.NS",  # Add your stock here
        ]
```

## 🔄 Switching to US Market

To switch from NSE to US market, update your `.env` file:

```env
# Trading Configuration (US Market)
INITIAL_CAPITAL=100000
CURRENCY=USD
CURRENCY_SYMBOL=$
STOCK_EXCHANGE=US

# Default US Stocks
DEFAULT_STOCKS=AAPL,GOOGL,MSFT,TSLA,AMZN

# Market Hours (EST)
MARKET_OPEN_HOUR=9
MARKET_OPEN_MINUTE=30
MARKET_CLOSE_HOUR=16
MARKET_CLOSE_MINUTE=0
```

Then restart the application:
```bash
docker-compose restart
```

## 💰 Currency Display

The application automatically formats currency based on your configuration:

- **INR**: `₹1,00,000.00` (Indian number system)
- **USD**: `$100,000.00` (Western number system)

Currency symbols and formatting are handled by the `MarketConfig` utility class in `backend/app/utils/market_config.py`.

## 🕒 Market Hours

The application respects NSE trading hours:

- **Regular Trading**: 9:15 AM - 3:30 PM IST
- **Weekends**: Market closed
- **Holidays**: Not automatically detected (manual configuration needed)

## 📊 Technical Indicators

All technical indicators work the same for NSE stocks:

- RSI (Relative Strength Index)
- MACD (Moving Average Convergence Divergence)
- Bollinger Bands
- SMA 20 & 50 (Simple Moving Averages)

## 🔍 Data Sources

The application uses **yfinance** library which provides:
- Historical OHLCV data for NSE stocks
- Real-time price updates
- Corporate actions data
- Technical indicators support

## ⚠️ Important Notes

1. **Data Availability**: NSE data on yfinance may have a 15-minute delay for free users
2. **Holidays**: NSE holidays are not automatically detected
3. **Currency Conversion**: All prices are in INR; no automatic conversion
4. **Simulation Only**: This is a paper trading simulator, not for real trading
5. **Data Quality**: Historical data quality depends on yfinance availability

## 🚀 Quick Start for NSE Trading

1. Run setup script (automatically configures for NSE):
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. Access the dashboard:
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs

3. The system will:
   - Initialize with ₹10,00,000 capital
   - Load top 10 NSE stocks
   - Start ML model training
   - Begin portfolio simulation

## 📚 API Endpoints

All API endpoints support NSE stocks:

```bash
# Get NSE stock prices
GET /api/data/price/RELIANCE.NS

# Create order for NSE stock
POST /api/trading/orders
{
  "symbol": "TCS.NS",
  "action": "BUY",
  "quantity": 10
}

# Get portfolio metrics (in INR)
GET /api/portfolio/metrics
```

## 🤝 Contributing NSE Features

If you want to add NSE-specific features:

1. Market-specific indicators
2. NSE holiday calendar
3. Sector-specific analysis
4. More NSE stocks

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📞 Support

For NSE-specific issues:
- Check yfinance documentation for symbol formats
- Verify stock symbols on [NSE India website](https://www.nseindia.com)
- Ensure proper `.NS` suffix for NSE stocks

---

**Happy Trading with NSE! 🇮🇳 📈**
