import React, { useState } from 'react';
import { Multipliers } from '../types/game';
import { Skull, Coins, X, TrendingUp, AlertTriangle, Gem, Sword, Shield, Heart } from 'lucide-react';

interface PokyegMarketProps {
  coins: number;
  gems: number;
  multipliers: Multipliers;
  onPurchaseMultiplier: (type: keyof Multipliers, cost: { coins: number; gems: number }) => boolean;
  onClose: () => void;
}

export const PokyegMarket: React.FC<PokyegMarketProps> = ({ 
  coins, 
  gems,
  multipliers,
  onPurchaseMultiplier, 
  onClose 
}) => {
  const [selectedMultiplier, setSelectedMultiplier] = useState<keyof Multipliers | null>(null);

  const multiplierOffers = [
    {
      type: 'coins' as keyof Multipliers,
      name: 'Coin Multiplier',
      description: 'Increase coin rewards permanently',
      icon: Coins,
      color: 'yellow',
      currentLevel: multipliers.coins,
      cost: { coins: Math.floor(1000 * Math.pow(1.5, multipliers.coins - 1)), gems: Math.floor(50 * Math.pow(1.3, multipliers.coins - 1)) }
    },
    {
      type: 'gems' as keyof Multipliers,
      name: 'Gem Multiplier',
      description: 'Increase gem rewards permanently',
      icon: Gem,
      color: 'purple',
      currentLevel: multipliers.gems,
      cost: { coins: Math.floor(2000 * Math.pow(1.6, multipliers.gems - 1)), gems: Math.floor(100 * Math.pow(1.4, multipliers.gems - 1)) }
    },
    {
      type: 'atk' as keyof Multipliers,
      name: 'Attack Multiplier',
      description: 'Increase attack power permanently',
      icon: Sword,
      color: 'red',
      currentLevel: multipliers.atk,
      cost: { coins: Math.floor(5000 * Math.pow(2, multipliers.atk - 1)), gems: Math.floor(250 * Math.pow(1.5, multipliers.atk - 1)) }
    },
    {
      type: 'def' as keyof Multipliers,
      name: 'Defense Multiplier',
      description: 'Increase defense permanently',
      icon: Shield,
      color: 'blue',
      currentLevel: multipliers.def,
      cost: { coins: Math.floor(5000 * Math.pow(2, multipliers.def - 1)), gems: Math.floor(250 * Math.pow(1.5, multipliers.def - 1)) }
    },
    {
      type: 'hp' as keyof Multipliers,
      name: 'Health Multiplier',
      description: 'Increase max health permanently',
      icon: Heart,
      color: 'green',
      currentLevel: multipliers.hp,
      cost: { coins: Math.floor(7500 * Math.pow(2.2, multipliers.hp - 1)), gems: Math.floor(375 * Math.pow(1.6, multipliers.hp - 1)) }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: {
        border: 'border-yellow-500/50',
        bg: 'bg-yellow-900/20',
        text: 'text-yellow-400',
        button: 'bg-yellow-600 hover:bg-yellow-500'
      },
      purple: {
        border: 'border-purple-500/50',
        bg: 'bg-purple-900/20',
        text: 'text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-500'
      },
      red: {
        border: 'border-red-500/50',
        bg: 'bg-red-900/20',
        text: 'text-red-400',
        button: 'bg-red-600 hover:bg-red-500'
      },
      blue: {
        border: 'border-blue-500/50',
        bg: 'bg-blue-900/20',
        text: 'text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-500'
      },
      green: {
        border: 'border-green-500/50',
        bg: 'bg-green-900/20',
        text: 'text-green-400',
        button: 'bg-green-600 hover:bg-green-500'
      }
    };
    return colors[color as keyof typeof colors];
  };

  const handlePurchase = (type: keyof Multipliers, cost: { coins: number; gems: number }) => {
    const success = onPurchaseMultiplier(type, cost);
    if (success) {
      setSelectedMultiplier(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-red-900/80 via-black/80 to-purple-900/80 p-4 sm:p-6 rounded-lg border-2 border-red-500/50 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl shadow-red-500/20">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 animate-pulse" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">🏴‍☠️ Pokyeg Market</h2>
              <p className="text-red-300 text-sm">Permanent Power Multipliers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-900/50 border border-red-500/50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-bold">⚠️ PERMANENT UPGRADES ⚠️</span>
          </div>
          <div className="text-red-300 text-sm space-y-1">
            <p>• These multipliers are permanent and stack</p>
            <p>• Costs increase exponentially with each purchase</p>
            <p>• All sales are final - choose wisely</p>
            <p>• Effects apply to ALL future rewards and stats</p>
          </div>
        </div>

        {/* Current Resources */}
        <div className="bg-black/30 p-3 rounded-lg mb-6">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{coins.toLocaleString()} Coins</span>
            </div>
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">{gems.toLocaleString()} Gems</span>
            </div>
          </div>
        </div>

        {/* Multiplier Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {multiplierOffers.map((offer) => {
            const colorClasses = getColorClasses(offer.color);
            const Icon = offer.icon;
            const canAfford = coins >= offer.cost.coins && gems >= offer.cost.gems;

            return (
              <div
                key={offer.type}
                className={`p-4 rounded-lg border-2 transition-all ${colorClasses.border} ${colorClasses.bg}`}
              >
                <div className="text-center mb-4">
                  <Icon className={`w-12 h-12 mx-auto mb-3 ${colorClasses.text}`} />
                  <h3 className={`font-bold text-lg ${colorClasses.text}`}>
                    {offer.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2">
                    {offer.description}
                  </p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="text-center">
                    <p className="text-white font-semibold">
                      Current Level: {offer.currentLevel.toFixed(1)}x
                    </p>
                    <p className={`text-sm ${colorClasses.text}`}>
                      Next Level: {(offer.currentLevel + 0.1).toFixed(1)}x
                    </p>
                  </div>
                  
                  <div className="bg-black/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-yellow-400">Cost:</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Coins className="w-3 h-3 text-yellow-400" />
                      <span className="text-white">{offer.cost.coins.toLocaleString()}</span>
                      <Gem className="w-3 h-3 text-purple-400 ml-2" />
                      <span className="text-white">{offer.cost.gems.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(offer.type, offer.cost)}
                  disabled={!canAfford}
                  className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                    canAfford
                      ? `${colorClasses.button} text-white hover:scale-105 shadow-lg`
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Purchase Upgrade' : 'Insufficient Resources'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>The Pokyeg Market: Where power has a price.</p>
          <p>Invest wisely in your eternal progression.</p>
        </div>
      </div>
    </div>
  );
};