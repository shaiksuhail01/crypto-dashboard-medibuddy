import React, { useState } from "react";
import { Coin } from "../../types/crypto";
import { useCryptoData } from "../../hooks/useCryptoData";
import {
  formatPrice,
  formatVolume,
  formatPercentage,
  getPercentageColor,
} from "../../utils/formatters";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { AlertCircle } from "lucide-react";

interface HighlightCardProps {
  title: string;
  icon: React.ReactNode;
  coins: Coin[];
  loading: boolean;
  error: string | null;
  type: "price" | "volume";
  onRetry: () => void;
}

const INITIAL_ROWS = 10;

export const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  icon,
  coins,
  loading,
  error,
  type,
  onRetry,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { currency } = useCryptoData();

  const visibleCoins = expanded ? coins : coins.slice(0, INITIAL_ROWS);
  const showViewMore = coins.length > INITIAL_ROWS;

  return (
    <Card className="rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <CardHeader className="flex items-center gap-2 font-semibold text-lg text-gray-800">
        <span className="text-xl">{icon}</span>
        {title}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        
        {loading && (
          <div className="space-y-3">
            {[...Array(INITIAL_ROWS)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        )}

        
        {error && (
          <div className="flex flex-col items-center text-red-500 text-sm py-4">
            <AlertCircle className="w-6 h-6 mb-1" />
            <p>{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 text-blue-600 hover:text-blue-800 underline"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && coins.length > 0 && (
          <>
            <div
              className={`transition-all ${
                expanded ? "max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" : ""
              }`}
            >
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 px-3">Coin</th>
                    {type === "price" && (
                      <>
                        <th className="py-2 px-3">
                          Price ({currency.toUpperCase()})
                        </th>
                        <th className="py-2 px-3">24h</th>
                      </>
                    )}
                    {type === "volume" && (
                      <th className="py-2 px-3">
                        Volume ({currency.toUpperCase()})
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {visibleCoins.map((coin, i) => (
                    <tr
                      key={coin.id}
                      className={`border-b last:border-0 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="py-2 px-3 flex items-center gap-2">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-6 h-6 rounded-full border bg-gray-50"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span className="font-medium text-gray-800">
                          {coin.symbol.toUpperCase()}
                        </span>
                      </td>

                      {type === "price" && (
                        <>
                          <td className="py-2 px-3 font-medium text-gray-700">
                            {formatPrice(coin.current_price)}
                          </td>
                          <td
                            className={`py-2 px-3 font-medium ${getPercentageColor(
                              coin.price_change_percentage_24h
                            )}`}
                          >
                            {formatPercentage(coin.price_change_percentage_24h)}
                          </td>
                        </>
                      )}

                      {type === "volume" && (
                        <td className="py-2 px-3 font-medium text-gray-700">
                          {formatVolume(coin.total_volume!)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            {showViewMore && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {expanded ? "Show Less" : "View More"}
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && coins.length === 0 && (
          <p className="text-gray-500 text-center py-4">No data available</p>
        )}
      </CardContent>
    </Card>
  );
};
