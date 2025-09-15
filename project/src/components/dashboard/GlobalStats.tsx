import React from "react";
import { GlobalMarketData } from "../../types/crypto";
import {
  formatLargeNumber,
  formatPercentage,
  getPercentageColor,
} from "../../utils/formatters";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";

interface GlobalStatsProps {
  globalData: GlobalMarketData | null;
  loading: boolean;
}

export const GlobalStats: React.FC<GlobalStatsProps> = ({
  globalData,
  loading,
}) => {
  if (loading || !globalData) {
    return (
      <div className="mb-8">
        <div className="mb-6">
          <Skeleton className="w-64 h-8 mb-2" />
          <Skeleton className="w-96 h-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    );
  }

  const { data } = globalData;
  const marketCap = data.total_market_cap.usd;
  const volume24h = data.total_volume.usd;
  const marketCapChange = data.market_cap_change_percentage_24h_usd;

  return (
    <div className="mb-8">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cryptocurrency Market Overview
        </h1>
        <p className="text-gray-600">
          The global crypto market cap is{" "}
          <span className="font-semibold text-gray-900">
            ${formatLargeNumber(marketCap)}
          </span>
          , a{" "}
          <span
            className={`font-semibold ${getPercentageColor(marketCapChange)}`}
          >
            {formatPercentage(marketCapChange)}
          </span>{" "}
          change in the last 24h.{" "}
          <button className="text-blue-600 hover:text-blue-800 underline">
            Read more
          </button>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Market Cap
            </CardTitle>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                marketCapChange >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {marketCapChange >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              ${formatLargeNumber(marketCap)}
            </p>
            <p
              className={`text-sm mt-1 ${getPercentageColor(
                marketCapChange
              )}`}
            >
              {formatPercentage(marketCapChange)} (24h)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              24h Trading Volume
            </CardTitle>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              ${formatLargeNumber(volume24h)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Across all cryptocurrencies
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
