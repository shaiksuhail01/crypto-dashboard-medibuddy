import React from 'react';
import { useCryptoData } from './hooks/useCryptoData';
import { GlobalStats } from './components/dashboard/GlobalStats';
import { SearchBar } from './components/dashboard/SearchBar';
import { CoinTable } from './components/dashboard/CoinTable';
import { HighlightsSection } from './components/highlights/HighlightsSection';
import { CategoriesTable } from './components/categories/CategoriesTable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { Button } from './components/ui/Button';
import { RefreshCw, Settings } from 'lucide-react';

function App() {
  const {
    coins,
    globalData,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    refetch
  } = useCryptoData();

  if (error && coins.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Global Statistics */}
        <GlobalStats globalData={globalData} loading={loading} />

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center justify-between">
            <TabsList className="flex-1">
              <TabsTrigger value="all">
                <span className="flex items-center">
                  🟢 All
                </span>
              </TabsTrigger>
              <TabsTrigger value="highlights">
                <span className="flex items-center">
                  ⭐ Highlights
                </span>
              </TabsTrigger>
              <TabsTrigger value="categories">
                <span className="flex items-center">
                  🏷️ Categories
                </span>
              </TabsTrigger>
              <TabsTrigger value="robotics">
                <span className="flex items-center">
                  🤖 Robotics
                </span>
              </TabsTrigger>
              <TabsTrigger value="launchpad">
                <span className="flex items-center">
                  🔥 Launchpad
                </span>
              </TabsTrigger>
              <TabsTrigger value="binance-ido">
                <span className="flex items-center">
                  🔥 Binance Wallet IDO
                </span>
              </TabsTrigger>
              <TabsTrigger value="pow">
                <span className="flex items-center">
                  🔥 Proof of Work (PoW)
                </span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-4 ml-6">
              <Button
                onClick={refetch}
                variant="ghost"
                size="sm"
                disabled={loading}
                className="text-gray-600"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>

        
          <TabsContent value="all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search cryptocurrencies..."
                  className="max-w-md"
                />
              </div>
              
              <CoinTable
                coins={coins}
                loading={loading}
                onSort={setSortOrder}
                currentSort={sortOrder}
              />
            </div>
          </TabsContent>

          
          <TabsContent value="highlights">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Crypto Highlights
                </h2>
                <p className="text-gray-600">
                  Which cryptocurrencies are people more interested in? Track and discover the most interesting cryptocurrencies based on market and CoinGecko activity.
                </p>
              </div>
              <HighlightsSection />
            </div>
          </TabsContent>

          
          <TabsContent value="categories">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Cryptocurrency Categories
                </h2>
                <p className="text-gray-600">
                  Explore different cryptocurrency categories and their market performance.
                </p>
              </div>
              <CategoriesTable categories={categories} loading={loading} />
            </div>
          </TabsContent>

          {['robotics', 'launchpad', 'binance-ido', 'pow'].map(tab => (
            <TabsContent key={tab} value={tab}>
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')} data coming soon...
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  This category will be populated with relevant cryptocurrency data.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default App;