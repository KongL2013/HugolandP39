import React from 'react';
import { OfflineProgress as OfflineProgressType } from '../types/game';
import { Clock, Coins, Gem, X } from 'lucide-react';

interface OfflineProgressProps {
  offlineProgress: OfflineProgressType;
  onClaimOfflineRewards: () => void;
  onClose: () => void;
}

export const OfflineProgress: React.FC<OfflineProgressProps> = ({
  offlineProgress,
  onClaimOfflineRewards,
  onClose
}) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const hasRewards = offlineProgress.offlineCoins > 0 || offlineProgress.offlineGems > 0;

  if (!hasRewards) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-lg border border-blue-500/50 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-white font-bold text-xl">Welcome Back!</h2>
              <p className="text-blue-300 text-sm">You were away for {formatTime(offlineProgress.offlineTime)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-black/30 p-4 rounded-lg mb-6">
          <h3 className="text-white font-bold text-lg mb-4 text-center">
            🎉 Offline Rewards Earned!
          </h3>
          
          <div className="space-y-3">
            {offlineProgress.offlineCoins > 0 && (
              <div className="flex items-center justify-between bg-yellow-900/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">Coins</span>
                </div>
                <span className="text-yellow-400 font-bold text-lg">
                  +{offlineProgress.offlineCoins.toLocaleString()}
                </span>
              </div>
            )}
            
            {offlineProgress.offlineGems > 0 && (
              <div className="flex items-center justify-between bg-purple-900/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gem className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">Gems</span>
                </div>
                <span className="text-purple-400 font-bold text-lg">
                  +{offlineProgress.offlineGems.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            onClaimOfflineRewards();
            onClose();
          }}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all"
        >
          Claim Rewards!
        </button>

        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Offline progress is calculated based on your research levels</p>
          <p>Maximum offline time: {offlineProgress.maxOfflineHours} hours</p>
        </div>
      </div>
    </div>
  );
};