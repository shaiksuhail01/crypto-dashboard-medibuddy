import React, { useState } from "react";
import { Category } from "../../types/crypto";
import {
  formatMarketCap,
  formatVolume,
  formatPercentage,
  getPercentageColor,
} from "../../utils/formatters";
import { TableSkeleton } from "../ui/Skeleton";
import { Pagination } from "../ui/Pagination";

interface CategoriesTableProps {
  categories: Category[];
  loading?: boolean;
  rowsPerPage?: number;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  loading,
  rowsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(categories.length / rowsPerPage);

  const paginatedCategories = categories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading) return <TableSkeleton />;

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-base">No categories data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          {/* Table Header */}
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 text-left">#</th>
              <th className="px-4 py-4 text-left">Category</th>
              <th className="px-4 py-4 text-left">Top Gainers</th>
              <th className="px-4 py-4 text-right">Market Cap</th>
              <th className="px-4 py-4 text-right">24h Change</th>
              <th className="px-4 py-4 text-right">24h Volume</th>
              <th className="px-4 py-4 text-right"># of Coins</th>
              <th className="px-4 py-4 text-right">Last Updated</th>
            </tr>
          </thead>

          
          <tbody>
            {paginatedCategories.map((cat, idx) => (
              <tr
                key={cat.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                <td className="px-4 py-4 text-gray-700">
                  {(currentPage - 1) * rowsPerPage + idx + 1}
                </td>

                <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {cat.name}
                </td>

                <td className="px-4 py-4 flex gap-2">
                  {cat.top_3_coins.length > 0 ? (
                    cat.top_3_coins.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`coin-${i}`}
                        className="w-6 h-6 rounded-full border border-gray-200"
                      />
                    ))
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>

                <td className="px-4 py-4 text-right font-semibold text-gray-900">
                  {formatMarketCap(cat.market_cap)}
                </td>

                <td
                  className={`px-4 py-4 text-right font-medium ${getPercentageColor(
                    cat.market_cap_change_24h
                  )}`}
                >
                  {formatPercentage(cat.market_cap_change_24h)}
                </td>

                <td className="px-4 py-4 text-right text-gray-700">
                  {formatVolume(cat.volume_24h)}
                </td>

                <td className="px-4 py-4 text-right text-gray-700">
                  {cat.top_3_coins.length}
                </td>

                <td className="px-4 py-4 text-right text-gray-500 text-sm">
                  {new Date(cat.updated_at).toLocaleString()}
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
