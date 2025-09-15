import React from 'react';
import { HighlightCard } from './HighlightCard';
import { useHighlights } from '../../hooks/useHighlights';

export const HighlightsSection: React.FC = () => {
  const { topGainers, topLosers, highestVolume, newCoins, trending, loading, error, refetch } =
    useHighlights();

  const highlights = [
    { title: 'Trending Coins', icon: '🔥', coins: trending, type: 'price' as const },
    { title: 'Top Gainers', icon: '🚀', coins: topGainers, type: 'price' as const },
    { title: 'Top Losers', icon: '🚨', coins: topLosers, type: 'price' as const },
    { title: 'New Coins', icon: '✨', coins: newCoins, type: 'price' as const },
    { title: 'Most Viewed', icon: '👀', coins: trending, type: 'price' as const }, 
    { title: 'Highest Volume', icon: '🥤', coins: highestVolume, type: 'volume' as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {highlights.map(({ title, icon, coins, type }) => (
        <HighlightCard
          key={title}
          title={title}
          icon={icon}
          coins={coins}
          type={type}
          loading={loading}
          error={error}
          onRetry={refetch}
        />
      ))}
    </div>
  );
};
