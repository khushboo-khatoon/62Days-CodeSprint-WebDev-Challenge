import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTrading } from '../../context/TradingContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { holdings, marketIndices, stocks } = useTrading();

  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalInvestment = holdings.reduce((sum, holding) => sum + (holding.quantity * holding.averagePrice), 0);
  const totalGainLoss = totalPortfolioValue - totalInvestment;
  const gainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const topGainers = stocks.filter(stock => stock.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent).slice(0, 5);
  const topLosers = stocks.filter(stock => stock.changePercent < 0).sort((a, b) => a.changePercent - b.changePercent).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good morning, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's your portfolio overview</p>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {marketIndices.map((index) => (
          <div key={index.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{index.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {index.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${index.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
                </p>
                <p className={`text-sm ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(user?.balance || 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPortfolioValue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Investment</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvestment)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-600" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total P&L</p>
              <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalGainLoss)}
              </p>
              <p className={`text-sm ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Gainers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              Top Gainers
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topGainers.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{stock.symbol}</p>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{stock.price.toFixed(2)}</p>
                    <p className="text-sm text-green-600">+{stock.changePercent.toFixed(2)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
              Top Losers
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topLosers.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{stock.symbol}</p>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{stock.price.toFixed(2)}</p>
                    <p className="text-sm text-red-600">{stock.changePercent.toFixed(2)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Holdings */}
      {holdings.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Eye className="h-5 w-5 text-gray-600 mr-2" />
              Recent Holdings
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {holdings.slice(0, 5).map((holding) => (
                <div key={holding.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{holding.symbol}</p>
                    <p className="text-sm text-gray-600">{holding.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(holding.totalValue)}</p>
                    <p className={`text-sm ${holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;