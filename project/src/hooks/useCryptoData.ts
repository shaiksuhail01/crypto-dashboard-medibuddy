import { useState, useEffect, useCallback } from 'react';
import { Coin, GlobalMarketData, Category, SortOption } from '../types/crypto';
import { cryptoApi } from '../services/cryptoApi';

const INITIAL_ROWS = 10;

export const useCryptoData = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalMarketData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('market_cap_desc');
  const [currency, setCurrency] = useState('usd');

  const fetchCoinsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const coinsData = await cryptoApi.getCoinsMarket(currentPage, 50, sortOrder, searchTerm, currency);
      setCoins(coinsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch coins data');
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOrder, searchTerm, currency]);

  const fetchGlobalData = useCallback(async () => {
    try {
      const data = await cryptoApi.getGlobalMarketData(currency);
      setGlobalData(data);
    } catch (err) {
      console.error('Failed to fetch global data:', err);
    }
  }, [currency]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await cryptoApi.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    }
  }, []);

  
  const trending: Coin[] = [...coins]
    .sort((a, b) => (b.market_cap || 0) - (a.market_cap || 0))
    .slice(0, INITIAL_ROWS);

  const topGainers: Coin[] = [...coins]
    .filter(c => c.price_change_percentage_24h != null)
    .sort((a, b) => (b.price_change_percentage_24h! - a.price_change_percentage_24h!))
    .slice(0, INITIAL_ROWS);

  const topLosers: Coin[] = [...coins]
    .filter(c => c.price_change_percentage_24h != null)
    .sort((a, b) => (a.price_change_percentage_24h! - b.price_change_percentage_24h!))
    .slice(0, INITIAL_ROWS);

  const highestVolume: Coin[] = [...coins]
    .sort((a, b) => (b.total_volume || 0) - (a.total_volume || 0))
    .slice(0, INITIAL_ROWS);

  const newCoins: Coin[] = [...coins]
    .sort((a, b) => (b.market_cap_rank || 0) - (a.market_cap_rank || 0))
    .slice(0, INITIAL_ROWS);

  useEffect(() => {
    fetchCoinsData();
    fetchCategories();
    fetchGlobalData();
  }, [fetchCoinsData, fetchCategories, fetchGlobalData]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchGlobalData();
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchGlobalData]);

  const refetch = useCallback(() => {
    fetchCoinsData();
    fetchGlobalData();
    fetchCategories();
  }, [fetchCoinsData, fetchGlobalData, fetchCategories]);

  return {
    coins,
    globalData,
    trending,
    topGainers,
    topLosers,
    newCoins,
    highestVolume,
    categories,
    loading,
    error,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    currency,
    setCurrency,
    refetch,
  };
};
