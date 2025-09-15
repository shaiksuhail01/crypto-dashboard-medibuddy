import { useMemo } from 'react';
import { Coin, Category } from '../types/crypto';
import { useCryptoData } from './useCryptoData';

interface HighlightData {
  topGainers: Coin[];
  topLosers: Coin[];
  highestVolume: Coin[];
  trending: Coin[];
  newCoins: Coin[];
  topCategories: Category[];
  loading: boolean;
  error: string | null;
}

export const useHighlights = (): HighlightData & {
  refetch: () => void;
  getAll: (type: keyof HighlightData) => Coin[] | Category[];
} => {
  const { coins, categories, loading, error, refetch } = useCryptoData();

  // Sort coins
  const allGainers = useMemo(() =>
    [...coins]
      .filter(c => c.price_change_percentage_24h != null)
      .sort((a, b) => (b.price_change_percentage_24h! - a.price_change_percentage_24h!)),
    [coins]
  );

  const allLosers = useMemo(() =>
    [...coins]
      .filter(c => c.price_change_percentage_24h != null)
      .sort((a, b) => (a.price_change_percentage_24h! - b.price_change_percentage_24h!)),
    [coins]
  );

  const allVolume = useMemo(() =>
    [...coins]
      .filter(c => c.total_volume != null)
      .sort((a, b) => (b.total_volume! - a.total_volume!)),
    [coins]
  );

  const allNewCoins = useMemo(() =>
    [...coins]
      .filter(c => c.market_cap_rank != null)
      .sort((a, b) => (a.market_cap_rank! - b.market_cap_rank!)),
    [coins]
  );

  const trendingCoins = allGainers;


  const normalizedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      top_3_coins: cat.top_3_coins ?? [],
      market_cap_change_24h: cat.market_cap_change_24h ?? 0,
      updated_at: cat.updated_at ?? new Date().toISOString(),
      volume_24h: cat.volume_24h ?? 0
    }));
  }, [categories]);

  const getAll = (type: keyof HighlightData) => {
    switch (type) {
      case 'topGainers': return allGainers;
      case 'topLosers': return allLosers;
      case 'highestVolume': return allVolume;
      case 'newCoins': return allNewCoins;
      case 'trending': return trendingCoins;
      case 'topCategories': return normalizedCategories;
      default: return [];
    }
  };

  return {
    topGainers: allGainers,
    topLosers: allLosers,
    highestVolume: allVolume,
    trending: trendingCoins,
    newCoins: allNewCoins,
    topCategories: normalizedCategories,
    loading,
    error,
    refetch,
    getAll
  };
};
