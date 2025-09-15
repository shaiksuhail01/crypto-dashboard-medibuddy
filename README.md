# Crypto Dashboard - CoinGecko Integration

A modern, production-ready cryptocurrency dashboard built with React, TypeScript, and Tailwind CSS. This application provides real-time market data, trending cryptocurrencies, and comprehensive market analysis using the CoinGecko API.

## 🚀 Features

### Core Functionality
- **Real-time Market Data**: Live cryptocurrency prices, market caps, and trading volumes
- **Comprehensive Coin Table**: Sortable columns with market rank, price changes, and 7-day sparkline charts
- **Search & Filter**: Debounced search functionality with client-side filtering
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Highlights Section
- 🔥 **Trending Coins**: Most searched cryptocurrencies on CoinGecko
- 🚀 **Top Gainers**: Best performing coins in the last 24 hours
- 🚨 **Top Losers**: Worst performing coins in the last 24 hours
- ✨ **New Coins**: Recently added cryptocurrencies
- 👀 **Most Viewed**: Popular cryptocurrencies by user interest
- 🥤 **Highest Volume**: Cryptocurrencies with highest trading volume

### Categories
- 📊 **Market Categories**: Cryptocurrency categories with market data
- 🏷️ **Category Performance**: 24h changes and market capitalization by category

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **API**: CoinGecko API v3
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect, custom hooks)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Tabs.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── Skeleton.tsx
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── GlobalStats.tsx
│   │   ├── CoinTable.tsx
│   │   └── SearchBar.tsx
│   ├── highlights/         # Highlights section components
│   │   ├── HighlightsSection.tsx
│   │   └── HighlightCard.tsx
│   └── categories/         # Categories section components
│       └── CategoriesTable.tsx
├── hooks/                  # Custom React hooks
│   ├── useCryptoData.ts
│   └── useHighlights.ts
├── services/               # API services
│   └── cryptoApi.ts
├── types/                  # TypeScript type definitions
│   └── crypto.ts
├── utils/                  # Utility functions
│   └── formatters.ts
└── App.tsx                # Main application component
```

## 🎨 Design Patterns Used

### 1. **Service Layer Pattern**
- `CryptoApiService`: Centralized API communication with error handling and rate limiting
- Environment-driven configuration for API endpoints and keys

### 2. **Custom Hooks Pattern**
- `useCryptoData`: Main data fetching hook with search, sort, and pagination
- `useHighlights`: Specialized hook for highlights data with separate error states

### 3. **Component Composition Pattern**
- Reusable UI components (`Card`, `Button`, `Tabs`) with consistent props interface
- Compound components like `Card` with `CardHeader`, `CardContent`, and `CardTitle`

### 4. **Error Boundary Pattern**
- Comprehensive error handling at component and service levels
- User-friendly error messages with retry functionality

### 5. **Loading State Pattern**
- Skeleton components for better perceived performance
- Progressive loading with individual component loading states

### 6. **Adapter Pattern**
- Data transformation utilities in `formatters.ts`
- Type-safe conversion between API responses and UI models

## 🚦 UX States & Resilience

### Loading States
- **Global Loading**: Full-page spinner for initial data load
- **Skeleton Loading**: Component-level skeletons for better UX
- **Button Loading**: Individual action feedback

### Error States
- **Network Errors**: Retry mechanisms with exponential backoff
- **Rate Limiting**: User-friendly messages for API limits
- **Empty States**: Clear messaging when no data is available

### Performance Optimizations
- **Debounced Search**: 300ms delay to reduce API calls
- **Memoized Calculations**: Cached computed values for formatting
- **Lazy Loading**: Progressive data loading for better initial performance

## 📡 API Integration

### Endpoints Used
- `GET /coins/markets` - Market data with pagination and sorting
- `GET /global` - Global cryptocurrency statistics
- `GET /search/trending` - Trending cryptocurrencies
- `GET /coins/categories` - Cryptocurrency categories

### Features
- **Rate Limit Handling**: Automatic retry with proper error messages
- **Caching Strategy**: 30-second intervals for global data, 60 seconds for highlights
- **Error Recovery**: Graceful degradation when endpoints are unavailable

## 🎯 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Add your CoinGecko API key to `.env`:
   ```
   VITE_COINGECKO_API_KEY=your_api_key_here
   ```

4. **Get CoinGecko API Key** (Optional but recommended)
   - Visit [CoinGecko API Documentation](https://docs.coingecko.com/docs/setting-up-your-api-key)
   - Sign up for a free account
   - Generate your API key
   - Add it to your `.env` file

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables
- `VITE_COINGECKO_API_KEY`: Your CoinGecko API key (optional for basic usage)
- `VITE_API_BASE_URL`: API base URL (defaults to CoinGecko v3)


## 📈 Performance Considerations

- **Bundle Size**: Optimized imports and tree shaking
- **API Calls**: Debounced search and cached responses
- **Rendering**: Virtualized lists for large datasets (ready for implementation)
- **Images**: Lazy loading for coin icons with error fallbacks

## 🔮 Future Improvements

1. **Real-time Updates**: WebSocket integration for live price updates
2. **Advanced Charting**: Interactive price charts with TradingView integration
3. **Portfolio Tracking**: Personal portfolio management features
4. **Notifications**: Price alerts and news updates
5. **Advanced Filtering**: More sophisticated search and filter options
6. **Offline Support**: Service worker for offline data access
7. **Performance**: Virtual scrolling for large datasets
8. **Accessibility**: Enhanced keyboard navigation and screen reader support


## 📝 Assumptions & Limitations

### Assumptions
- CoinGecko API availability and rate limits
- USD as the primary currency for all calculations
- Modern browser support (ES2020+)

### Current Limitations
- No real-time price updates (polling-based)
- Limited to CoinGecko's free tier rate limits
- Some highlight categories depend on additional API endpoints not available in free tier
- Client-side filtering only (no server-side search)

---

Built with ❤️ using React, TypeScript, and the CoinGecko API.
