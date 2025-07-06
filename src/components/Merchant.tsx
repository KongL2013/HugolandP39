import React from 'react';
import { MerchantSystem, MerchantReward } from '../types/game';
import { Package, Coins, Gem, Star, X, Heart, Sword, Sparkles, BookOpen, Zap } from 'lucide-react';
import { getRarityColor, getRarityBorder } from '../utils/gameUtils';

interface MerchantProps {
  merchant: MerchantSystem;
  onSpendFragments: () => boolean;
  onSelectReward: (reward: MerchantReward) => void;
  onClose?: () => void;
}

export const Merchant: React.FC<MerchantProps> = ({
  merchant,
  onSpendFragments,
  onSelectReward,
  onClose
}) => {
  const handleSpendFragments = () => {
    const success = onSpendFragments();
    if (!success) {
      alert('You need 5 Hugoland Fragments to make a purchase!');
    }
  };

  const getRewardIcon = (reward: MerchantReward) => {
    switch (reward.type) {
      case 'item':
        if (reward.item && 'baseAtk' in reward.item) return <Sword className="w-8 h-8 text-orange-400" />;
        if (reward.item && 'baseDef' in reward.item) return <Package className="w-8 h-8 text-blue-400" />;
        return <Star className="w-8 h-8 text-purple-400" />;
      case 'coins':
        return <Coins className="w-8 h-8 text-yellow-400" />;
      case 'gems':
        return <Gem className="w-8 h-8 text-purple-400" />;
      case 'xp':
        return <BookOpen className="w-8 h-8 text-blue-400" />;
      case 'health':
        return <Heart className="w-8 h-8 text-red-400" />;
      case 'attack':
        return <Sword className="w-8 h-8 text-orange-400" />;
      case 'skill':
        return <Sparkles className="w-8 h-8 text-cyan-400" />;
      default:
        return <Star className="w-8 h-8 text-gray-400" />;
    }
  };

  const getRewardValue = (reward: MerchantReward) => {
    switch (reward.type) {
      case 'coins':
        return `${reward.coins?.toLocaleString()} Coins`;
      case 'gems':
        return `${reward.gems?.toLocaleString()} Gems`;
      case 'xp':
        return `${reward.xp?.toLocaleString()} XP`;
      case 'health':
        return `${reward.healthMultiplier}x Health`;
      case 'attack':
        return `${reward.attackMultiplier}x Attack`;
      case 'skill':
        return reward.skill?.name || 'Menu Skill';
      case 'item':
        if (reward.item) {
          if ('baseAtk' in reward.item) {
            return `ATK: ${reward.item.baseAtk}`;
          } else if ('baseDef' in reward.item) {
            return `DEF: ${reward.item.baseDef}`;
          } else {
            return 'Ancient Relic';
          }
        }
        return 'Unknown Item';
      default:
        return '';
    }
  };

  // Reward Selection Modal
  if (merchant.showRewardModal && merchant.availableRewards.length > 0) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-4 sm:p-6 rounded-lg border border-purple-500/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <h2 className="text-white font-bold text-xl sm:text-2xl mb-2">🎁 Choose Your Reward!</h2>
            <p className="text-purple-300 text-sm sm:text-base">Select one of these three powerful rewards</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {merchant.availableRewards.map((reward, index) => (
              <button
                key={reward.id}
                onClick={() => onSelectReward(reward)}
                className="bg-black/30 p-4 sm:p-6 rounded-lg border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-200 hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {getRewardIcon(reward)}
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">{reward.name}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-3">{reward.description}</p>
                  
                  {reward.type === 'item' && reward.item && (
                    <div className={`p-2 rounded border ${getRarityBorder((reward.item as any).rarity || 'legendary')} mb-3`}>
                      <p className={`font-semibold text-sm ${getRarityColor((reward.item as any).rarity || 'legendary')}`}>
                        {reward.item.name}
                      </p>
                      {(reward.item as any).isEnchanted && (
                        <p className="text-cyan-400 text-xs">✨ Enchanted</p>
                      )}
                    </div>
                  )}
                  
                  <div className="bg-purple-900/30 p-2 rounded-lg">
                    <p className="text-purple-300 font-semibold text-sm sm:text-base">
                      {getRewardValue(reward)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-6 text-xs sm:text-sm text-gray-400">
            <p>💡 Choose wisely - you can only select one reward!</p>
          </div>
        </div>
      </div>
    );
  }

  // Main Merchant Interface
  return (
    <div className="bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 p-4 sm:p-6 rounded-lg shadow-2xl">
      {onClose && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">🏪 Merchant</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="text-center mb-6">
        {!onClose && (
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">🏪 Merchant</h2>
        )}
        <p className="text-orange-300 text-sm sm:text-base mb-4">
          Trade Hugoland Fragments for powerful rewards!
        </p>
        
        {/* Fragment Display */}
        <div className="bg-black/30 p-4 sm:p-6 rounded-lg border border-orange-500/50 mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-3xl sm:text-4xl">🧩</div>
            <div>
              <h3 className="text-white font-bold text-lg sm:text-xl">Hugoland Fragments</h3>
              <p className="text-orange-300 text-sm">Earned every 5 zones</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center bg-black/20 p-3 rounded-lg">
              <p className="text-orange-400 font-semibold text-sm">Current</p>
              <p className="text-white text-2xl sm:text-3xl font-bold">{merchant.hugollandFragments}/5</p>
            </div>
            <div className="text-center bg-black/20 p-3 rounded-lg">
              <p className="text-yellow-400 font-semibold text-sm">Total Earned</p>
              <p className="text-white text-2xl sm:text-3xl font-bold">{merchant.totalFragmentsEarned}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(merchant.hugollandFragments / 5) * 100}%` }}
              />
            </div>
            <p className="text-center text-gray-300 text-xs sm:text-sm mt-2">
              {5 - merchant.hugollandFragments} more fragments needed
            </p>
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handleSpendFragments}
          disabled={merchant.hugollandFragments < 5}
          className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-white transition-all duration-300 transform flex items-center gap-3 justify-center text-base sm:text-lg shadow-lg ${
            merchant.hugollandFragments >= 5
              ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 hover:scale-105 shadow-orange-500/25'
              : 'bg-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          <Package className="w-5 h-5 sm:w-6 sm:h-6" />
          {merchant.hugollandFragments >= 5 ? 'Trade 5 Fragments' : 'Need More Fragments'}
        </button>

        {/* Info Section */}
        <div className="mt-6 bg-black/30 p-4 rounded-lg border border-yellow-500/30">
          <h3 className="text-yellow-400 font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Available Rewards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-400" />
              <span>Legendary/Mythical Items</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-400" />
              <span>Ancient Relics</span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>Large Coin Rewards</span>
            </div>
            <div className="flex items-center gap-2">
              <Gem className="w-4 h-4 text-purple-400" />
              <span>Gem Collections</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Experience Tomes</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Permanent Stat Boosts</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Free Menu Skills</span>
            </div>
          </div>
        </div>

        {/* How to Get Fragments */}
        <div className="mt-4 text-center text-xs sm:text-sm text-gray-400">
          <p>💡 Earn 1 Hugoland Fragment every 5 zones you complete!</p>
          <p>Next fragment at zone: {Math.ceil((merchant.lastFragmentZone + 1) / 5) * 5}</p>
        </div>
      </div>
    </div>
  );
};