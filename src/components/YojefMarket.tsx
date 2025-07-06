import React, { useState, useEffect } from 'react';
import { RelicItem } from '../types/game';
import { Package, Gem, X, Clock, Sword, Shield } from 'lucide-react';

interface YojefMarketProps {
  relicItems: RelicItem[];
  gems: number;
  equippedRelicsCount: number;
  onPurchaseRelic: (relicId: string) => boolean;
  onClose: () => void;
  nextRefresh: Date;
}

export const YojefMarket: React.FC<YojefMarketProps> = ({
  relicItems,
  gems,
  equippedRelicsCount,
  onPurchaseRelic,
  onClose,
  nextRefresh
}) => {
  const [selectedRelic, setSelectedRelic] = useState<RelicItem | null>(null);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(0);

  // Update countdown every second using device time
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const refreshTime = new Date(nextRefresh).getTime();
      const timeDiff = Math.max(0, refreshTime - now);
      setTimeUntilRefresh(timeDiff);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextRefresh]);

  const minutesLeft = Math.floor(timeUntilRefresh / 60000);
  const secondsLeft = Math.floor((timeUntilRefresh % 60000) / 1000);

  const handlePurchase = (relic: RelicItem) => {
    const success = onPurchaseRelic(relic.id);
    if (success) {
      setSelectedRelic(null);
    } else {
      alert('Not enough gems!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4 sm:p-6 rounded-lg border-2 border-indigo-500/50 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">🏺 Yojef Market</h2>
              <p className="text-indigo-300 text-sm">Ancient Relics & Artifacts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Market Info */}
        <div className="bg-black/30 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">Your Gems: {gems}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">
                Refresh: {minutesLeft}m {secondsLeft}s
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              Equipped Relics: {equippedRelicsCount} | 
              <span className="text-green-400 ml-1">Unlimited relics can be equipped!</span>
            </p>
            <p className="text-blue-400 text-xs mt-1">
              ⏰ Market refreshes every 5 minutes with new relics!
            </p>
          </div>
        </div>

        {/* Relic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relicItems.map((relic) => (
            <div
              key={relic.id}
              className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-4 rounded-lg border-2 border-indigo-500/30 hover:border-indigo-400/50 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                {relic.type === 'weapon' ? (
                  <Sword className="w-5 h-5 text-orange-400" />
                ) : (
                  <Shield className="w-5 h-5 text-blue-400" />
                )}
                <h3 className="text-white font-bold text-sm">{relic.name}</h3>
              </div>
              
              <p className="text-gray-300 text-xs mb-3">{relic.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white capitalize">{relic.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Power:</span>
                  <span className="text-white">
                    {relic.type === 'weapon' ? `${relic.baseAtk} ATK` : `${relic.baseDef} DEF`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-white">{relic.level}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-purple-400">
                  <Gem className="w-4 h-4" />
                  <span className="font-bold">{relic.cost}</span>
                </div>
                <span className="text-xs text-gray-400">
                  Upgrade: {relic.upgradeCost} gems
                </span>
              </div>

              <button
                onClick={() => handlePurchase(relic)}
                disabled={gems < relic.cost}
                className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                  gems >= relic.cost
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {gems >= relic.cost 
                  ? 'Purchase & Absorb Power' 
                  : 'Not Enough Gems'
                }
              </button>
            </div>
          ))}
        </div>

        {relicItems.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No relics available</p>
            <p className="text-gray-500 text-sm">Check back after the refresh!</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>The Yojef Market deals in ancient artifacts of immense power.</p>
          <p>These relics cannot be found in regular chests and hold secrets from forgotten ages.</p>
          <p className="text-yellow-400 mt-2">🕐 Refreshes every 5 minutes with new inventory!</p>
          <p className="text-green-400 mt-1">💪 Equip unlimited relics to absorb their combined power!</p>
        </div>
      </div>
    </div>
  );
};