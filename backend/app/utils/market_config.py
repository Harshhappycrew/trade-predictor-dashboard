"""
Market Configuration and Utilities for Indian Stock Market
"""
import os
from datetime import datetime, time
from typing import Dict, List
import pytz

class MarketConfig:
    """Market-specific configuration"""
    
    @staticmethod
    def get_exchange() -> str:
        """Get configured stock exchange"""
        return os.getenv("STOCK_EXCHANGE", "NSE")
    
    @staticmethod
    def get_currency() -> str:
        """Get market currency"""
        return os.getenv("CURRENCY", "INR")
    
    @staticmethod
    def get_currency_symbol() -> str:
        """Get currency symbol"""
        return os.getenv("CURRENCY_SYMBOL", "₹")
    
    @staticmethod
    def get_default_stocks() -> List[str]:
        """Get default stock symbols for the exchange"""
        exchange = MarketConfig.get_exchange()
        
        if exchange == "NSE":
            return [
                "RELIANCE.NS",    # Reliance Industries
                "TCS.NS",         # Tata Consultancy Services
                "HDFCBANK.NS",    # HDFC Bank
                "INFY.NS",        # Infosys
                "HINDUNILVR.NS",  # Hindustan Unilever
                "ICICIBANK.NS",   # ICICI Bank
                "BHARTIARTL.NS",  # Bharti Airtel
                "ITC.NS",         # ITC Limited
                "SBIN.NS",        # State Bank of India
                "KOTAKBANK.NS"    # Kotak Mahindra Bank
            ]
        else:
            # US market defaults
            return ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"]
    
    @staticmethod
    def get_market_hours() -> Dict[str, time]:
        """Get market trading hours"""
        exchange = MarketConfig.get_exchange()
        
        if exchange == "NSE":
            # NSE trading hours: 9:15 AM - 3:30 PM IST
            return {
                "open": time(9, 15),
                "close": time(15, 30)
            }
        else:
            # US market hours: 9:30 AM - 4:00 PM EST
            return {
                "open": time(9, 30),
                "close": time(16, 0)
            }
    
    @staticmethod
    def is_market_open(dt: datetime = None) -> bool:
        """Check if market is currently open"""
        if dt is None:
            dt = datetime.now()
        
        exchange = MarketConfig.get_exchange()
        market_hours = MarketConfig.get_market_hours()
        
        # Get timezone
        if exchange == "NSE":
            tz = pytz.timezone("Asia/Kolkata")
        else:
            tz = pytz.timezone("America/New_York")
        
        # Convert to market timezone
        if dt.tzinfo is None:
            dt = tz.localize(dt)
        else:
            dt = dt.astimezone(tz)
        
        # Check if weekday
        if dt.weekday() >= 5:  # Saturday = 5, Sunday = 6
            return False
        
        # Check if within trading hours
        current_time = dt.time()
        return market_hours["open"] <= current_time <= market_hours["close"]
    
    @staticmethod
    def format_currency(amount: float, include_symbol: bool = True) -> str:
        """Format amount in market currency"""
        currency_symbol = MarketConfig.get_currency_symbol()
        currency = MarketConfig.get_currency()
        
        # Format based on currency
        if currency == "INR":
            # Indian number system (lakhs, crores)
            formatted = f"{amount:,.2f}"
            if include_symbol:
                return f"{currency_symbol}{formatted}"
            return formatted
        else:
            # Western number system
            formatted = f"{amount:,.2f}"
            if include_symbol:
                return f"{currency_symbol}{formatted}"
            return formatted
    
    @staticmethod
    def get_stock_display_name(symbol: str) -> str:
        """Get display name for stock symbol"""
        # Remove exchange suffix for display
        if symbol.endswith(".NS") or symbol.endswith(".BO"):
            return symbol[:-3]
        return symbol
