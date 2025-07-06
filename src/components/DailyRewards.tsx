import React, { useState } from 'react';
import { DailyRewards as DailyRewardsType, DailyReward } from '../types/game';
import { Gift, Calendar, Coins, Gem, Star, X, Clock } from 'lucide-react';

interface DailyRewardsProps {
  dailyRewards: DailyRewardsType;
  onClaimReward: () => boolean;
  onClose: () => void;
}

export const DailyRewards: React.FC<DailyRewardsProps> = ({
  dailyRewards,
  onClaimReward,
  onClose
}) => {
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    setClaiming(true);
    const success = onClaimReward();
    if (success) {
      setTimeout(() => {
        setClaiming(false);
        onClose();
      }, 2000);
    } else {
      setClaiming(false);
    }
  };

  const getDayReward = (day: number): DailyReward => {
    const baseCoins = 50 + (day * 25);
    const baseGems = 5 + Math.floor(day / 2);
    
    return {
      day,
      coins: baseCoins,
      gems: baseGems,
      special: day === 7 ? 'Legendary Chest' : day === 14 ? 'Mythical Item' : undefined,
      claimed: false
    };
  };

  const canClaim = dailyRewards.availableReward !== null;
  const nextRewardIn = dailyRewards.lastClaimDate 
    ? Math.max(0, 24 - Math.floor((Date.now() - new Date(dailyRewards.lastClaimDate).getTime()) / (1000 * 60 * 60)))
    : 0;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-900 to-emerald-900 p-4 sm:p-6 rounded-lg border border-green-500/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Daily Rewards</h2>
              <p className="text-green-300 text-sm">
                Streak: {dailyRewards.currentStreak} days (Best: {dailyRewards.maxStreak})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Reward */}
        {canClaim && dailyRewards.availableReward && (
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 p-4 rounded-lg border border-yellow-500/50 mb-6">
            <div className="text-center">
              <h3 className="text-yellow-400 font-bold text-lg mb-3">
                🎉 Day {dailyRewards.availableReward.day} Reward Available!
              </h3>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-yellow-300">
                  <Coins className="w-5 h-5" />
                  <span className="font-semibold">{dailyRewards.availableReward.coins} Coins</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Gem className="w-5 h-5" />
                  <span className="font-semibold">{dailyRewards.availableReward.gems} Gems</span>
                </div>
                {dailyRewards.availableReward.special && (
                  <div className="flex items-center gap-2 text-pink-300">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">{dailyRewards.availableReward.special}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleClaim}
                disabled={claiming}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  claiming
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 hover:scale-105'
                }`}
              >
                {claiming ? 'Claiming...' : 'Claim Reward!'}
              </button>
            </div>
          </div>
        )}

        {/* Next Reward Timer */}
        {!canClaim && nextRewardIn > 0 && (
          <div className="bg-black/30 p-4 rounded-lg border border-gray-600/50 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Next reward in:</span>
            </div>
            <p className="text-blue-400 font-bold text-xl">{nextRewardIn} hours</p>
          </div>
        )}

        {/* Reward Calendar */}
        <div className="bg-black/30 p-4 rounded-lg">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Reward Calendar
          </h3>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 14 }, (_, i) => {
              const day = i + 1;
              const reward = getDayReward(day);
              const isClaimed = dailyRewards.rewardHistory.some(r => r.day === day && r.claimed);
              const isCurrent = dailyRewards.availableReward?.day === day;
              const isUpcoming = day <= dailyRewards.currentStreak + 1;

              return (
                <div
                  key={day}
                  className={`p-2 rounded-lg border-2 text-center ${
                    isClaimed
                      ? 'bg-green-900/50 border-green-500/50'
                      : isCurrent
                      ? 'bg-yellow-900/50 border-yellow-500/50 animate-pulse'
                      : isUpcoming
                      ? 'bg-blue-900/50 border-blue-500/50'
                      : 'bg-gray-800/50 border-gray-600/50'
                  }`}
                >
                  <div className="text-white font-bold text-sm mb-1">Day {day}</div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-center gap-1 text-yellow-400">
                      <Coins className="w-3 h-3" />
                      <span>{reward.coins}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-purple-400">
                      <Gem className="w-3 h-3" />
                      <span>{reward.gems}</span>
                    </div>
                    {reward.special && (
                      <div className="text-pink-400 font-bold text-xs">
                        {reward.special}
                      </div>
                    )}
                  </div>
                  {isClaimed && (
                    <div className="text-green-400 text-xs mt-1">✓ Claimed</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Login daily to maintain your streak and earn better rewards!</p>
          <p>Missing a day will reset your streak to 0.</p>
        </div>
      </div>
    </div>
  );
};