import React from 'react';
import { Statistics as StatisticsType } from '../types/game';
import { BarChart3, Clock, Target, Coins, Gem, Package, X, TrendingUp } from 'lucide-react';

interface StatisticsProps {
  statistics: StatisticsType;
  onClose: () => void;
}

export const Statistics: React.FC<StatisticsProps> = ({ statistics, onClose }) => {
  const accuracy = statistics.totalQuestionsAnswered > 0 
    ? (statistics.correctAnswers / statistics.totalQuestionsAnswered) * 100 
    : 0;

  const playTimeHours = Math.floor(statistics.totalPlayTime / 3600);
  const playTimeMinutes = Math.floor((statistics.totalPlayTime % 3600) / 60);

  const categoryAccuracies = Object.entries(statistics.accuracyByCategory).map(
    ([category, data]) => ({
      category,
      accuracy: data.total > 0 ? (data.correct / data.total) * 100 : 0,
      total: data.total,
      correct: data.correct
    })
  ).sort((a, b) => b.accuracy - a.accuracy);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-gray-900 p-4 sm:p-6 rounded-lg border border-slate-500/50 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Statistics Dashboard</h2>
              <p className="text-slate-300 text-sm">Your adventure progress</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-black/30 p-4 rounded-lg border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold text-sm">Overall Accuracy</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{accuracy.toFixed(1)}%</p>
            <p className="text-xs text-gray-400">
              {statistics.correctAnswers}/{statistics.totalQuestionsAnswered} correct
            </p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold text-sm">Zones Reached</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{statistics.zonesReached}</p>
            <p className="text-xs text-gray-400">Highest zone</p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold text-sm">Coins Earned</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{statistics.coinsEarned.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Total lifetime</p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold text-sm">Play Time</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">
              {playTimeHours}h {playTimeMinutes}m
            </p>
            <p className="text-xs text-gray-400">Total time played</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Gem className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold text-sm">Gems Earned</span>
            </div>
            <p className="text-xl font-bold text-purple-400">{statistics.gemsEarned}</p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-orange-400" />
              <span className="text-white font-semibold text-sm">Items Collected</span>
            </div>
            <p className="text-xl font-bold text-orange-400">{statistics.itemsCollected}</p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold text-sm">Chests Opened</span>
            </div>
            <p className="text-xl font-bold text-green-400">{statistics.chestsOpened}</p>
          </div>
        </div>

        {/* Category Accuracy */}
        <div className="bg-black/30 p-4 rounded-lg">
          <h3 className="text-white font-bold text-lg mb-4">Accuracy by Category</h3>
          {categoryAccuracies.length > 0 ? (
            <div className="space-y-3">
              {categoryAccuracies.map(({ category, accuracy, total, correct }) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium text-sm">{category}</span>
                      <span className="text-gray-300 text-sm">
                        {correct}/{total} ({accuracy.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          accuracy >= 80 ? 'bg-green-500' :
                          accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.max(accuracy, 5)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              No category data available yet. Answer some questions to see your performance!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};