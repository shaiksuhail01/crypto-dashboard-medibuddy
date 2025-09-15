// src/services/cryptoApi.ts
import { Coin, GlobalMarketData, TrendingResponse, Category, SortOption } from '../types/crypto';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

class CryptoApiService {
  private async makeRequest<T>(endpoint: string, params?: URLSearchParams): Promise<T> {
    const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    let url = `${base}${endpoint}`;
    if (params) url += `?${params.toString()}`;
    if (API_KEY) url += `${params ? '&' : '?'}x_cg_demo_api_key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 429) throw new Error('Rate limit exceeded. Please try again later.');
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getCoinsMarket(
    page: number = 1,
    perPage: number = 50,
    order: SortOption = 'market_cap_desc',
    search?: string,
    vsCurrency: string = 'usd' // dynamic currency
  ): Promise<Coin[]> {
    const params = new URLSearchParams({
      vs_currency: vsCurrency,
      order,
      per_page: perPage.toString(),
      page: page.toString(),
      sparkline: 'true',
      price_change_percentage: '1h,24h,7d',
    });

    const allCoins = await this.makeRequest<Coin[]>('/coins/markets', params);

    if (search) {
      return allCoins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    return allCoins;
  }

  async getGlobalMarketData(vsCurrency: string = 'usd'): Promise<GlobalMarketData> {
    return this.makeRequest<GlobalMarketData>(`/global`);
  }

  async getTrendingCoins(): Promise<TrendingResponse> {
    return this.makeRequest<TrendingResponse>('/search/trending');
  }

  async getCategories(): Promise<Category[]> {
    return this.makeRequest<Category[]>('/coins/categories');
  }

  async getTopGainers(vsCurrency: string = 'usd'): Promise<Coin[]> {
    const data = await this.getCoinsMarket(1, 250, 'market_cap_desc', undefined, vsCurrency);
    return data.filter((coin) => coin.price_change_percentage_24h != null)
      .sort((a, b) => (b.price_change_percentage_24h! - a.price_change_percentage_24h!));
  }

  async getTopLosers(vsCurrency: string = 'usd'): Promise<Coin[]> {
    const data = await this.getCoinsMarket(1, 250, 'market_cap_desc', undefined, vsCurrency);
    return data.filter((coin) => coin.price_change_percentage_24h != null)
      .sort((a, b) => (a.price_change_percentage_24h! - b.price_change_percentage_24h!));
  }

  async getHighestVolume(vsCurrency: string = 'usd'): Promise<Coin[]> {
    const data = await this.getCoinsMarket(1, 250, 'volume_desc', undefined, vsCurrency);
    return data.filter(c => c.total_volume != null)
      .sort((a, b) => (b.total_volume! - a.total_volume!));
  }

  async getNewCoins(vsCurrency: string = 'usd'): Promise<Coin[]> {
    const data = await this.getCoinsMarket(1, 250, 'market_cap_asc', undefined, vsCurrency);
    return data.filter(c => c.market_cap_rank != null)
      .sort((a, b) => (a.market_cap_rank! - b.market_cap_rank!));
  }
}

export const cryptoApi = new CryptoApiService();
