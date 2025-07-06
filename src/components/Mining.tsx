import React, { useState, useEffect } from 'react';
import { Mining as MiningType } from '../types/game';
import { Gem, Sparkles, X } from 'lucide-react';

interface MiningProps {
  mining: MiningType;
  gems: number;
  shinyGems: number;
  onMineGem: (x: number, y: number) => { gems: number; shinyGems: number } | null;
  onExchangeShinyGems: (amount: number) => boolean;
}

export const Mining: React.FC<MiningProps> = ({ 
  mining, 
  gems, 
  shinyGems, 
  onMineGem, 
  onExchangeShinyGems 
}) => {
  const [gemNode, setGemNode] = useState<{ isShiny: boolean } | null>(null);
  const [showShop, setShowShop] = useState(false);

  // Generate new gem node when component mounts or after mining
  useEffect(() => {
    if (!gemNode) {
      const isShiny = Math.random() < 0.05; // 5% chance for shiny gem
      setGemNode({ isShiny });
    }
  }, [gemNode]);

  const handleCellClick = () => {
    if (!gemNode) return;

    // Mine the gem
    const result = onMineGem(0, 0);
    if (result) {
      // Remove the current node
      setGemNode(null);
      
      // Generate a new node after a short delay
      setTimeout(() => {
        const isShiny = Math.random() < 0.05;
        setGemNode({ isShiny });
      }, 500);
    }
  };

  const handleExchange = (amount: number) => {
    const success = onExchangeShinyGems(amount);
    if (!success) {
      alert('Not enough shiny gems!');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl">
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Gem Mining</h2>
        </div>
        <p className="text-gray-300 text-sm sm:text-base">Click the gem node to mine it!</p>
        
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-2 text-purple-300">
            <Gem className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">{gems} Gems</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-300">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">{shinyGems} Shiny</span>
          </div>
        </div>
      </div>

      {/* Single Mining Node */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-white font-semibold mb-3 text-center text-sm sm:text-base">Mining Node</h3>
        <div className="flex justify-center">
          <div
            onClick={handleCellClick}
            className={`w-24 h-24 sm:w-32 sm:h-32 border-4 rounded-xl transition-all duration-200 relative overflow-hidden ${
              gemNode
                ? gemNode.isShiny
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-900 to-orange-900 hover:from-yellow-800 hover:to-orange-800 shadow-lg shadow-yellow-500/50 animate-pulse cursor-pointer'
                  : 'border-purple-400 bg-gradient-to-br from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 shadow-lg shadow-purple-500/30 cursor-pointer'
                : 'border-gray-600 bg-gray-800 hover:bg-gray-700 cursor-pointer'
            }`}
          >
            {gemNode && (
              <div className="absolute inset-0 flex items-center justify-center">
                {gemNode.isShiny ? (
                  <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 animate-bounce" />
                ) : (
                  <Gem className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" />
                )}
              </div>
            )}
            {!gemNode && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs sm:text-sm mt-3 space-y-1">
          <p>💎 Purple gems = 1 gem | ✨ Golden gems = 1 shiny gem (5% chance)</p>
          <p>Click to mine! New gems appear automatically.</p>
          {!gemNode && <p className="text-yellow-400">Generating new gem node...</p>}
        </div>
      </div>

      {/* Mining Stats */}
      <div className="bg-black/30 p-4 rounded-lg mb-4">
        <h3 className="text-white font-semibold mb-3 text-center">Mining Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-purple-400 font-semibold">Total Gems Mined</p>
            <p className="text-white text-xl font-bold">{mining.totalGemsMined}</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-400 font-semibold">Shiny Gems Found</p>
            <p className="text-white text-xl font-bold">{mining.totalShinyGemsMined}</p>
          </div>
        </div>
      </div>

      {/* Exchange Shop Button */}
      <div className="text-center">
        <button
          onClick={() => setShowShop(true)}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 flex items-center gap-2 mx-auto text-sm sm:text-base"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          Shiny Exchange
        </button>
      </div>

      {/* Exchange Shop Modal */}
      {showShop && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-yellow-900 to-orange-900 p-4 sm:p-6 rounded-lg border border-yellow-500/50 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                <div>
                  <h2 className="text-white font-bold text-lg sm:text-xl">Shiny Exchange</h2>
                  <p className="text-yellow-300 text-sm">Convert shiny gems to regular gems</p>
                </div>
              </div>
              <button
                onClick={() => setShowShop(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <span className="text-white font-bold text-lg">Exchange Rate</span>
                  </div>
                  <p className="text-yellow-300 text-xl font-bold">1 Shiny Gem = 10 Regular Gems</p>
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-white">You have: <span className="font-bold text-yellow-400">{shinyGems}</span> shiny gems</p>
                </div>

                <div className="space-y-3">
                  {[1, 5, 10].map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleExchange(amount)}
                      disabled={shinyGems < amount}
                      className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                        shinyGems >= amount
                          ? 'bg-yellow-600 text-white hover:bg-yellow-500'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Exchange {amount} Shiny → {amount * 10} Gems
                    </button>
                  ))}
                  
                  {shinyGems > 0 && (
                    <button
                      onClick={() => handleExchange(shinyGems)}
                      className="w-full py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all text-sm"
                    >
                      Exchange All ({shinyGems} → {shinyGems * 10} Gems)
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-yellow-300 text-xs">
                ✨ Shiny gems are rare and valuable! Use them wisely.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};