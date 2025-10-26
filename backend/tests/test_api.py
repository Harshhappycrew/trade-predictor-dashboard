"""
API endpoint tests
"""
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health_check():
    """Test health check endpoint"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data

@pytest.mark.asyncio
async def test_get_positions():
    """Test get positions endpoint"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/portfolio/positions")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

@pytest.mark.asyncio
async def test_get_metrics():
    """Test get portfolio metrics endpoint"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/portfolio/metrics")
        assert response.status_code == 200
        data = response.json()
        assert "total_value" in data
        assert "cash_balance" in data

@pytest.mark.asyncio
async def test_get_signals():
    """Test get ML signals endpoint"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/ml/signals")
        assert response.status_code == 200
        data = response.json()
        assert "signals" in data
        assert isinstance(data["signals"], list)
