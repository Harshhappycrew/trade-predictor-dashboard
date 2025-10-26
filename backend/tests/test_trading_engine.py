"""
Trading engine tests
"""
import pytest
from app.trading.engine import TradingEngine

def test_engine_initialization():
    """Test trading engine initialization"""
    engine = TradingEngine(initial_capital=100000.0)
    assert engine.cash_balance == 100000.0
    assert len(engine.positions) == 0

def test_buy_position():
    """Test buying a position"""
    engine = TradingEngine(initial_capital=100000.0)
    
    # Simulate buying 10 shares at $100 each
    result = engine.execute_trade("AAPL", "BUY", 10, 100.0)
    
    assert result["status"] == "success"
    assert engine.cash_balance < 100000.0  # Cash reduced
    assert "AAPL" in engine.positions
    assert engine.positions["AAPL"]["quantity"] == 10

def test_sell_position():
    """Test selling a position"""
    engine = TradingEngine(initial_capital=100000.0)
    
    # Buy first
    engine.execute_trade("AAPL", "BUY", 10, 100.0)
    
    # Then sell
    result = engine.execute_trade("AAPL", "SELL", 10, 110.0)
    
    assert result["status"] == "success"
    assert engine.positions.get("AAPL", {}).get("quantity", 0) == 0
    # Should have profit (sold at higher price)
    assert engine.cash_balance > 100000.0 - (10 * 100 * 0.001)  # Accounting for commission

def test_insufficient_funds():
    """Test buying with insufficient funds"""
    engine = TradingEngine(initial_capital=100.0)
    
    # Try to buy 10 shares at $100 each (need $1000)
    result = engine.execute_trade("AAPL", "BUY", 10, 100.0)
    
    assert result["status"] == "error"
    assert "insufficient" in result["message"].lower()

def test_portfolio_value():
    """Test portfolio value calculation"""
    engine = TradingEngine(initial_capital=100000.0)
    
    # Buy some positions
    engine.execute_trade("AAPL", "BUY", 10, 100.0)
    engine.execute_trade("GOOGL", "BUY", 5, 200.0)
    
    # Calculate portfolio value with current prices
    current_prices = {"AAPL": 110.0, "GOOGL": 210.0}
    portfolio_value = engine.calculate_portfolio_value(current_prices)
    
    # Should be cash + position values
    expected = engine.cash_balance + (10 * 110.0) + (5 * 210.0)
    assert abs(portfolio_value - expected) < 0.01

def test_commission_calculation():
    """Test commission is properly calculated"""
    engine = TradingEngine(initial_capital=100000.0)
    
    initial_cash = engine.cash_balance
    trade_value = 10 * 100.0  # 10 shares at $100
    commission = trade_value * 0.001  # 0.1% commission
    
    engine.execute_trade("AAPL", "BUY", 10, 100.0)
    
    # Cash should be reduced by trade value + commission
    expected_cash = initial_cash - trade_value - commission
    assert abs(engine.cash_balance - expected_cash) < 0.01
