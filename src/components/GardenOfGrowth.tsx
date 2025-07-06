import React, { useState, useEffect } from 'react';
import { Sprout, Droplets, Coins, X, Clock, TrendingUp, Zap } from 'lucide-react';
import { GardenOfGrowth as GardenType } from '../types/game';

interface GardenOfGrowthProps {
  garden: GardenType;
  coins: number;
  onPlantSeed: () => boolean;
  onBuyWater: (hours: number) => boolean;
  onClose: () => void;
}

export const GardenOfGrowth: React.FC<GardenOfGrowthProps> = ({
  garden,
  coins,
  onPlantSeed,
  onBuyWater,
  onClose
}) => {
  const [selectedWaterHours, setSelectedWaterHours] = useState(24);

  const waterOptions = [
    { hours: 24, cost: 1000, label: '1 Day' },
    { hours: 72, cost: 2800, label: '3 Days' },
    { hours: 168, cost: 6500, label: '1 Week' },
    { hours: 720, cost: 25000, label: '1 Month' }
  ];

  const getGrowthStage = (cm: number) => {
    if (cm < 5) return { stage: 'Seedling', emoji: '🌱', color: 'text-green-300' };
    if (cm < 15) return { stage: 'Young Plant', emoji: '🌿', color: 'text-green-400' };
    if (cm < 30) return { stage: 'Growing Plant', emoji: '🪴', color: 'text-green-500' };
    if (cm < 50) return { stage: 'Mature Plant', emoji: '🌳', color: 'text-green-600' };
    if (cm < 75) return { stage: 'Large Tree', emoji: '🌲', color: 'text-emerald-500' };
    return { stage: 'Ancient Tree', emoji: '🌴', color: 'text-emerald-600' };
  };

  const currentStage = getGrowthStage(garden.growthCm);
  const isWaterLow = garden.waterHoursRemaining < 12;
  const canPlant = !garden.isPlanted && coins >= garden.seedCost;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-900 to-emerald-900 p-4 sm:p-6 rounded-lg border border-green-500/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Garden of Growth</h2>
              <p className="text-green-300 text-sm">Grow plants for permanent stat bonuses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!garden.isPlanted ? (
          /* Planting Section */
          <div className="text-center">
            <div className="bg-black/30 p-6 rounded-lg border border-green-500/30 mb-6">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-green-400 font-bold text-xl mb-2">Plant Your First Seed</h3>
              <p className="text-white mb-4">
                Plant a magical seed that grows even while you're offline!
              </p>
              
              <div className="bg-green-900/30 p-4 rounded-lg mb-4">
                <h4 className="text-green-300 font-semibold mb-2">How it works:</h4>
                <div className="text-sm text-gray-300 space-y-1 text-left">
                  <p>• Plant costs {garden.seedCost.toLocaleString()} coins (one-time)</p>
                  <p>• Every cm of growth = +5% bonus to ALL stats (ATK, DEF, HP)</p>
                  <p>• Grows automatically, even when offline</p>
                  <p>• Must keep watered to continue growing</p>
                  <p>• Water costs {garden.waterCost.toLocaleString()} coins per 24 hours</p>
                  <p>• Maximum growth: {garden.maxGrowthCm}cm (+{garden.maxGrowthCm * 5}% bonus!)</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Your coins: {coins.toLocaleString()}</span>
              </div>

              <button
                onClick={onPlantSeed}
                disabled={!canPlant}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  canPlant
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {canPlant ? `Plant Seed (${garden.seedCost.toLocaleString()} coins)` : 'Not enough coins'}
              </button>
            </div>
          </div>
        ) : (
          /* Garden Management Section */
          <div className="space-y-6">
            {/* Plant Status */}
            <div className="bg-black/30 p-4 rounded-lg border border-green-500/30">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{currentStage.emoji}</div>
                <h3 className={`font-bold text-xl ${currentStage.color}`}>{currentStage.stage}</h3>
                <p className="text-gray-300 text-sm">Growing since {new Date(garden.plantedAt!).toLocaleDateString()}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-900/30 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-sm">Growth</span>
                  </div>
                  <p className="text-white font-bold">{garden.growthCm.toFixed(1)}cm</p>
                  <p className="text-xs text-gray-300">Max: {garden.maxGrowthCm}cm</p>
                </div>

                <div className="bg-blue-900/30 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-semibold text-sm">Stat Bonus</span>
                  </div>
                  <p className="text-white font-bold">+{garden.totalGrowthBonus.toFixed(1)}%</p>
                  <p className="text-xs text-gray-300">All stats</p>
                </div>

                <div className={`p-3 rounded-lg text-center ${isWaterLow ? 'bg-red-900/30' : 'bg-blue-900/30'}`}>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Droplets className={`w-4 h-4 ${isWaterLow ? 'text-red-400' : 'text-blue-400'}`} />
                    <span className={`font-semibold text-sm ${isWaterLow ? 'text-red-400' : 'text-blue-400'}`}>Water</span>
                  </div>
                  <p className="text-white font-bold">{garden.waterHoursRemaining.toFixed(1)}h</p>
                  <p className="text-xs text-gray-300">Remaining</p>
                </div>
              </div>

              {/* Growth Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Growth Progress</span>
                  <span className="text-green-400">{((garden.growthCm / garden.maxGrowthCm) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((garden.growthCm / garden.maxGrowthCm) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {isWaterLow && (
                <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-500/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 font-semibold text-sm">Water Running Low!</span>
                  </div>
                  <p className="text-red-300 text-xs">Your plant will stop growing when water runs out.</p>
                </div>
              )}
            </div>

            {/* Water Purchase */}
            <div className="bg-black/30 p-4 rounded-lg border border-blue-500/30">
              <h3 className="text-blue-400 font-bold text-lg mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Buy Water
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {waterOptions.map((option) => (
                  <button
                    key={option.hours}
                    onClick={() => setSelectedWaterHours(option.hours)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedWaterHours === option.hours
                        ? 'border-blue-500 bg-blue-900/30'
                        : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-white font-semibold">{option.label}</p>
                      <p className="text-blue-400 text-sm">{option.cost.toLocaleString()} coins</p>
                      <p className="text-gray-400 text-xs">{option.hours} hours</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm">Your coins: {coins.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-semibold">
                    Cost: {waterOptions.find(w => w.hours === selectedWaterHours)?.cost.toLocaleString()} coins
                  </p>
                </div>
              </div>

              <button
                onClick={() => onBuyWater(selectedWaterHours)}
                disabled={coins < (waterOptions.find(w => w.hours === selectedWaterHours)?.cost || 0)}
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  coins >= (waterOptions.find(w => w.hours === selectedWaterHours)?.cost || 0)
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Buy Water ({waterOptions.find(w => w.hours === selectedWaterHours)?.label})
              </button>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>💡 Your plant grows in real-time, even when you're not playing!</p>
          <p>The Garden of Growth provides permanent stat bonuses that stack with research.</p>
        </div>
      </div>
    </div>
  );
};