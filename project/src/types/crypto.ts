export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap?: number;
  market_cap_rank?: number;
  fully_diluted_valuation?: number | null;
  total_volume?: number;
  high_24h?: number | null;
  low_24h?: number | null;
  price_change_24h?: number | null;
  price_change_percentage_24h?: number | null;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  market_cap_change_24h?: number | null;
  market_cap_change_percentage_24h?: number | null;
  circulating_supply?: number | null;
  total_supply?: number | null;
  max_supply?: number | null;
  ath?: number | null;
  ath_change_percentage?: number | null;
  ath_date?: string;
  atl?: number | null;
  atl_change_percentage?: number | null;
  atl_date?: string;
  roi?: any;
  last_updated?: string;
}

export interface GlobalMarketData {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    market_cap_percentage: { [key: string]: number };
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}

export interface TrendingResponse {
  coins: TrendingCoin[];
  nfts: any[];
  categories: any[];
}

export interface Category {
  id: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number;
  content: string;
  top_3_coins: string[]; // URLs of top coins
  volume_24h: number;
  updated_at: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export type SortOption =
  | 'market_cap_desc'
  | 'market_cap_asc'
  | 'volume_desc'
  | 'volume_asc'
  | 'id_asc'
  | 'id_desc'
  | 'price_desc'
  | 'price_asc'
  | 'percent_change_24h_desc'
  | 'percent_change_24h_asc';

export interface HighlightCard {
  title: string;
  icon: string;
  coins: Coin[];
  loading: boolean;
  error: string | null;
}
