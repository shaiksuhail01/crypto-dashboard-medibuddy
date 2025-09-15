import React, { useState } from "react";
import { Coin, SortOption } from "../../types/crypto";
import {
  formatPrice,
  formatMarketCap,
  formatVolume,
  formatPercentage,
  getPercentageColor,
} from "../../utils/formatters";
import {
  Star,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/Button";
import { TableSkeleton } from "../ui/Skeleton";
import { Pagination } from "../ui/Pagination";

interface CoinTableProps {
  coins: Coin[];
  loading?: boolean;
  onSort?: (sort: SortOption) => void;
  currentSort?: string;
  rowsPerPage?: number;
}

export const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  loading = false,
  onSort,
  currentSort = "",
  rowsPerPage = 10,
}) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(coins.length / rowsPerPage);

  const paginatedCoins = coins.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleFavorite = (coinId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(coinId)) newFavorites.delete(coinId);
    else newFavorites.add(coinId);
    setFavorites(newFavorites);
  };

  const renderSparkline = (sparkline?: { price: number[] }) => {
    if (!sparkline?.price?.length)
      return <div className="w-32 h-12 bg-gray-100 rounded" />;

    const prices = sparkline.price;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;

    if (range === 0) return <div className="w-32 h-12 bg-gray-100 rounded" />;

    const isPositive = prices[prices.length - 1] >= prices[0];
    const points = prices
      .map((price, index) => {
        const x = (index / (prices.length - 1)) * 128;
        const y = 48 - ((price - min) / range) * 48;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width="128" height="48" className="overflow-visible">
        <polyline
          fill="none"
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth="1.5"
          points={points}
        />
      </svg>
    );
  };

  const getSortIcon = (column: string) => {
    const isActive = currentSort.includes(column);
    const isDesc = currentSort.endsWith("_desc");
    if (!isActive) return null;
    return isDesc ? (
      <ChevronDown className="w-4 h-4 ml-1" />
    ) : (
      <ChevronUp className="w-4 h-4 ml-1" />
    );
  };

  const handleSort = (column: string) => {
    if (!onSort) return;
    const currentDirection = currentSort.endsWith("_desc") ? "desc" : "asc";
    const isCurrentColumn = currentSort.includes(column);
    let newSort: SortOption;
    if (isCurrentColumn) {
      newSort = (currentDirection === "desc"
        ? `${column}_asc`
        : `${column}_desc`) as SortOption;
    } else {
      newSort = `${column}_desc` as SortOption;
    }
    onSort(newSort);
  };

  if (loading) return <TableSkeleton />;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
    
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("market_cap_rank")}
                  className="flex items-center hover:text-gray-800 transition-colors"
                >
                  # {getSortIcon("market_cap_rank")}
                </button>
              </th>
              <th className="px-4 py-3 text-left">Coin</th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("current_price")}
                  className="flex items-center ml-auto hover:text-gray-800 transition-colors"
                >
                  Price {getSortIcon("current_price")}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("price_change_percentage_1h")}
                  className="flex items-center ml-auto hover:text-gray-800 transition-colors"
                >
                  1h {getSortIcon("price_change_percentage_1h")}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("price_change_percentage_24h")}
                  className="flex items-center ml-auto hover:text-gray-800 transition-colors"
                >
                  24h {getSortIcon("price_change_percentage_24h")}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("price_change_percentage_7d")}
                  className="flex items-center ml-auto hover:text-gray-800 transition-colors"
                >
                  7d {getSortIcon("price_change_percentage_7d")}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("total_volume")}
                  className="flex items-center ml-auto hover:text-gray-800 transition-colors"
                >
                  24h Volume {getSortIcon("total_volume")}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("market_cap")}
                  className="flex items-center ml-auto hover:text-gray-800 transition-colors"
                >
                  Market Cap {getSortIcon("market_cap")}
                </button>
              </th>
              <th className="px-4 py-3 text-center">Last 7 Days</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

    
          <tbody className="divide-y divide-gray-200">
            {paginatedCoins.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(coin.id);
                      }}
                      className="mr-2 p-1 rounded hover:bg-gray-100"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          favorites.has(coin.id)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-400 hover:text-yellow-400"
                        } transition-colors`}
                      />
                    </button>
                    <span className="text-gray-900 font-medium">
                      {coin.market_cap_rank}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full mr-3 border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {coin.name}
                      </div>
                      <div className="text-xs text-gray-500 uppercase">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  {formatPrice(coin.current_price)}
                </td>

                <td
                  className={`px-4 py-3 text-right font-medium ${getPercentageColor(
                    coin.price_change_percentage_1h_in_currency
                  )}`}
                >
                  {formatPercentage(coin.price_change_percentage_1h_in_currency)}
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end">
                    {coin.price_change_percentage_24h != null &&
                      (coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      ))}
                    <span
                      className={`font-medium ${getPercentageColor(
                        coin.price_change_percentage_24h
                      )}`}
                    >
                      {formatPercentage(coin.price_change_percentage_24h)}
                    </span>
                  </div>
                </td>

                <td
                  className={`px-4 py-3 text-right font-medium ${getPercentageColor(
                    coin.price_change_percentage_7d_in_currency
                  )}`}
                >
                  {formatPercentage(coin.price_change_percentage_7d_in_currency)}
                </td>

                <td className="px-4 py-3 text-right text-gray-700">
                  {formatVolume(coin.total_volume)}
                </td>

                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  {formatMarketCap(coin.market_cap)}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">
                    {renderSparkline(coin.sparkline_in_7d)}
                  </div>
                </td>

                <td className="px-4 py-3 text-center">
                  <Button size="sm" variant="success">
                    Buy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
