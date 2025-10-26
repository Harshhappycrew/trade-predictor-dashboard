# QuantEdge Deployment Guide

## 🚀 Deployment Options

QuantEdge can be deployed in several ways depending on your needs and infrastructure.

## 1. Local Development Deployment

### Quick Start
```bash
chmod +x setup.sh
./setup.sh
```

Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 2. Docker Deployment (Recommended)

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Build and Run
```bash
# Build containers
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Custom Configuration
Create `.env` file:
```env
DATABASE_URL=sqlite+aiosqlite:///./data/quantedge.db
VITE_API_URL=http://localhost:8000
INITIAL_CAPITAL=1000000
CURRENCY=INR
CURRENCY_SYMBOL=₹
STOCK_EXCHANGE=NSE
```

## 3. Cloud Deployment

### AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Open ports: 80, 443, 8000

2. **Install Docker**
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

3. **Clone and Deploy**
```bash
git clone <your-repo>
cd Trading_Prediction_webApp
./setup.sh
```

4. **Configure Nginx (Optional)**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api {
        proxy_pass http://localhost:8000;
    }
}
```

### Google Cloud Platform (GCP)

1. **Create Compute Engine Instance**
   - Ubuntu 22.04
   - n1-standard-2
   - Allow HTTP/HTTPS traffic

2. **Deploy with Docker**
```bash
# Same as AWS steps above
```

### Azure VM

1. **Create Ubuntu VM**
   - Standard B2s or larger
   - Ubuntu 22.04 LTS

2. **Follow Docker deployment steps**

## 4. Kubernetes Deployment

### Create Kubernetes Manifests

**backend-deployment.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: quantedge-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: quantedge-backend
  template:
    metadata:
      labels:
        app: quantedge-backend
    spec:
      containers:
      - name: backend
        image: quantedge-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          value: "sqlite+aiosqlite:///./data/quantedge.db"
        volumeMounts:
        - name: data
          mountPath: /app/data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: quantedge-data
```

**frontend-deployment.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: quantedge-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: quantedge-frontend
  template:
    metadata:
      labels:
        app: quantedge-frontend
    spec:
      containers:
      - name: frontend
        image: quantedge-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: VITE_API_URL
          value: "http://quantedge-backend:8000"
```

Deploy:
```bash
kubectl apply -f k8s/
```

## 5. Heroku Deployment

### Prepare for Heroku

**Procfile**
```
web: cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**heroku.yml**
```yaml
build:
  docker:
    web: backend/Dockerfile
```

### Deploy
```bash
heroku login
heroku create quantedge-app
heroku stack:set container
git push heroku main
```

## 6. Production Considerations

### Database
For production, migrate from SQLite to PostgreSQL:

```env
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/quantedge
```

Update `requirements.txt`:
```
asyncpg
psycopg2-binary
```

### Security
1. **Enable HTTPS**
2. **Add Authentication**
3. **Set CORS properly**
4. **Use secrets management**
5. **Enable rate limiting**

### Monitoring
1. **Application Logs**: Use ELK Stack or CloudWatch
2. **Metrics**: Prometheus + Grafana
3. **Error Tracking**: Sentry
4. **Uptime Monitoring**: UptimeRobot

### Performance
1. **Enable Redis caching**
2. **Use CDN for static assets**
3. **Optimize database queries**
4. **Enable gzip compression**
5. **Use async workers for ML tasks**

## 7. Continuous Deployment

### GitHub Actions

**.github/workflows/deploy.yml**
```yaml
name: Deploy QuantEdge

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Build Docker images
      run: |
        docker-compose build
    
    - name: Run tests
      run: |
        docker-compose run backend pytest
    
    - name: Deploy to production
      run: |
        # Add your deployment commands
```

## 8. Health Checks

Monitor these endpoints:
- `GET /api/health` - Backend health
- `GET /` - Frontend health

Example monitoring script:
```bash
#!/bin/bash
curl -f http://localhost:8000/api/health || exit 1
curl -f http://localhost:3000 || exit 1
```

## 9. Backup Strategy

### Database Backup
```bash
# Backup
sqlite3 data/quantedge.db .dump > backup.sql

# Restore
sqlite3 data/quantedge.db < backup.sql
```

### Automated Backups
```bash
#!/bin/bash
# Add to crontab: 0 2 * * * /path/to/backup.sh

DATE=$(date +%Y%m%d)
sqlite3 data/quantedge.db .dump > backups/quantedge_$DATE.sql
```

## 10. Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx/HAProxy)
- Multiple backend instances
- Shared database (PostgreSQL)
- Redis for session/cache

### Vertical Scaling
- Increase CPU/RAM
- Optimize ML models
- Use GPU for training
- Database indexing

## 📧 Support

For deployment issues, please open a GitHub issue.

---

**Note**: This is a simulation tool. Ensure proper testing before any production deployment.
