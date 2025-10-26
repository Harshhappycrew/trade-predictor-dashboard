# QuantEdge Frontend

Modern React + TypeScript dashboard for the QuantEdge AI Trading Simulator.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Shadcn/ui** - Component library
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── MetricsGrid.tsx
│   │   ├── PortfolioChart.tsx
│   │   ├── PriceChart.tsx
│   │   ├── SignalIndicator.tsx
│   │   ├── PositionsTable.tsx
│   │   └── TradeHistory.tsx
│   └── ui/                 # Reusable UI components
├── services/
│   └── api.ts             # Backend API client
├── hooks/                 # Custom React hooks
├── pages/
│   └── Index.tsx          # Main dashboard page
├── lib/
│   └── utils.ts           # Utility functions
├── index.css              # Global styles & design system
└── main.tsx               # App entry point
```

## 🎨 Design System

### Color Tokens
All colors are defined as HSL CSS variables in `index.css`:
- `--primary` - Primary brand color
- `--secondary` - Secondary accent
- `--success` - Success states
- `--destructive` - Error/warning states
- `--background` - Page background
- `--foreground` - Text color

### Components
Built with Shadcn/ui for consistency:
- Button
- Card
- Table
- Badge
- Progress
- ScrollArea
- Separator
- And more...

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Start Dev Server
```bash
npm run dev
```

Access at: http://localhost:3000

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔌 API Integration

The frontend connects to the backend via `src/services/api.ts`:

```typescript
import { api } from '@/services/api';

// Fetch portfolio positions
const positions = await api.getPositions();

// Get ML signals
const signals = await api.getSignals();

// Create order
await api.createOrder({
  symbol: 'AAPL',
  side: 'BUY',
  quantity: 10
});
```

### Environment Variables
Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

## 📊 Dashboard Components

### MetricsGrid
Displays key performance metrics:
- Total P&L
- Sharpe Ratio
- Win Rate
- Max Drawdown
- Active Positions
- Sortino Ratio

### PortfolioChart
Portfolio value over time with benchmark comparison.

### PriceChart
Stock price predictions with confidence intervals.

### SignalIndicator
Real-time ML trading signals (BUY/SELL/HOLD).

### PositionsTable
Current portfolio positions with P&L.

### TradeHistory
Recent trade execution log.

## 🎯 Key Features

- **Real-time Updates**: WebSocket support (can be added)
- **Responsive Design**: Mobile-friendly interface
- **Dark Mode**: Built-in dark theme
- **Interactive Charts**: Recharts with tooltips
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized with React.memo and useMemo

## 🧪 Testing

```bash
npm test
```

## 📦 Building & Deployment

### Docker
```bash
docker build -t quantedge-frontend .
docker run -p 3000:3000 quantedge-frontend
```

### Static Export
```bash
npm run build
# Serve dist/ folder with any static host
```

## 🔧 Configuration

### Vite Config
Modify `vite.config.ts` for:
- Build options
- Plugin configuration
- Proxy settings

### Tailwind Config
Customize `tailwind.config.ts` for:
- Theme extension
- Custom colors
- Animations
- Plugins

## 🎨 Adding New Components

1. Create component in `src/components/`
2. Use design system tokens
3. Add TypeScript types
4. Export from component

Example:
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Component</CardTitle>
      </CardHeader>
      <CardContent>
        Content here
      </CardContent>
    </Card>
  );
};
```

## 📝 Code Style

- Use TypeScript for all files
- Follow React best practices
- Use semantic HTML
- Prefer composition over inheritance
- Keep components small and focused

## 🚀 Performance Tips

- Lazy load routes with `React.lazy()`
- Memoize expensive calculations
- Use React.memo for pure components
- Optimize re-renders
- Code split with dynamic imports

## 📧 Support

For issues or questions, open a GitHub issue.
