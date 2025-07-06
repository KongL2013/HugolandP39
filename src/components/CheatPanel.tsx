import React from 'react';
import { CheatSettings } from '../types/game';
import { X, Coins, Gem, Package, ToggleLeft, ToggleRight } from 'lucide-react';

interface CheatPanelProps {
  cheats: CheatSettings;
  onToggleCheat: (cheat: keyof CheatSettings) => void;
  onClose: () => void;
}

export const CheatPanel: React.FC<CheatPanelProps> = ({ cheats, onToggleCheat, onClose }) => {
  const cheatList = [
    {
      key: 'infiniteCoins' as keyof CheatSettings,
      name: 'Infinite Coins',
      description: 'Never run out of coins',
      icon: Coins,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/30',
      borderColor: 'border-yellow-500/50'
    },
    {
      key: 'infiniteGems' as keyof CheatSettings,
      name: 'Infinite Gems',
      description: 'Unlimited gems for upgrades',
      icon: Gem,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/30',
      borderColor: 'border-purple-500/50'
    },
    {
      key: 'obtainAnyItem' as keyof CheatSettings,
      name: 'Obtain ANY Item',
      description: 'Get any item you want',
      icon: Package,
      color: 'text-green-400',
      bgColor: 'bg-green-900/30',
      borderColor: 'border-green-500/50'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-red-900 via-black to-purple-900 p-4 sm:p-6 rounded-lg border-2 border-red-500/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl shadow-red-500/20">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔓</div>
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Secret Cheat Panel</h2>
              <p className="text-red-300 text-sm">Developer Tools - Use Responsibly</p>
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
            <span className="text-red-400 font-bold">⚠️ CHEAT WARNING ⚠️</span>
          </div>
          <div className="text-red-300 text-sm space-y-1">
            <p>• These cheats are for testing and fun purposes</p>
            <p>• Using cheats may affect game balance</p>
            <p>• Cheats can be toggled on/off at any time</p>
            <p>• Your progress is still saved normally</p>
          </div>
        </div>

        {/* Cheat Toggles */}
        <div className="space-y-4">
          {cheatList.map((cheat) => {
            const Icon = cheat.icon;
            const isActive = cheats[cheat.key];
            const ToggleIcon = isActive ? ToggleRight : ToggleLeft;

            return (
              <div
                key={cheat.key}
                className={`p-4 rounded-lg border ${cheat.borderColor} ${cheat.bgColor} transition-all duration-200 ${
                  isActive ? 'shadow-lg' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${cheat.color}`} />
                    <div>
                      <h3 className={`font-bold text-base ${cheat.color}`}>
                        {cheat.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {cheat.description}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onToggleCheat(cheat.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-green-600 text-white hover:bg-green-500'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    <ToggleIcon className="w-5 h-5" />
                    <span className="text-sm">
                      {isActive ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
                
                {isActive && (
                  <div className="mt-2 text-xs text-green-400 font-semibold">
                    ✅ Cheat Active
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-6">
          <p>Secret cheat panel accessed via footer.</p>
          <p>Remember: The real treasure is the knowledge you gain along the way! 🧠✨</p>
        </div>
      </div>
    </div>
  );
};