import React, { useState } from 'react';
import { Code, Coins, Gem, MapPin, TrendingUp, X, Lock, Unlock } from 'lucide-react';

interface DevToolsProps {
  onAddCoins: (amount: number) => void;
  onAddGems: (amount: number) => void;
  onTeleportToZone: (zone: number) => void;
  onSetExperience: (xp: number) => void;
  onClose: () => void;
}

export const DevTools: React.FC<DevToolsProps> = ({
  onAddCoins,
  onAddGems,
  onTeleportToZone,
  onSetExperience,
  onClose
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [gemAmount, setGemAmount] = useState('');
  const [zoneNumber, setZoneNumber] = useState('');
  const [xpAmount, setXpAmount] = useState('');

  const SECRET_CODE = 'Backspace209';

  const handleCodeSubmit = () => {
    if (secretCode === SECRET_CODE) {
      setIsUnlocked(true);
      setSecretCode('');
    } else {
      alert('Invalid secret code!');
      setSecretCode('');
    }
  };

  const handleAddCoins = () => {
    const amount = parseInt(coinAmount);
    if (!isNaN(amount) && amount > 0) {
      onAddCoins(amount);
      setCoinAmount('');
    }
  };

  const handleAddGems = () => {
    const amount = parseInt(gemAmount);
    if (!isNaN(amount) && amount > 0) {
      onAddGems(amount);
      setGemAmount('');
    }
  };

  const handleTeleport = () => {
    const zone = parseInt(zoneNumber);
    if (!isNaN(zone) && zone > 0) {
      onTeleportToZone(zone);
      setZoneNumber('');
    }
  };

  const handleSetXP = () => {
    const xp = parseInt(xpAmount);
    if (!isNaN(xp) && xp >= 0) {
      onSetExperience(xp);
      setXpAmount('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-slate-900 p-4 sm:p-6 rounded-lg border border-gray-500/50 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Developer Tools</h2>
              <p className="text-gray-300 text-sm">Debug and testing utilities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          /* Secret Code Entry */
          <div className="text-center">
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50 mb-6">
              <Lock className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h3 className="text-red-400 font-bold text-lg mb-2">Access Restricted</h3>
              <p className="text-gray-300 text-sm mb-4">
                Enter the secret developer code to access debugging tools
              </p>
              
              <div className="space-y-3">
                <input
                  type="password"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
                  placeholder="Enter secret code..."
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                />
                <button
                  onClick={handleCodeSubmit}
                  className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors font-semibold"
                >
                  Unlock Developer Tools
                </button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>⚠️ Developer tools are for testing purposes only</p>
              <p>Contact the development team for access</p>
            </div>
          </div>
        ) : (
          /* Developer Tools Interface */
          <div>
            <div className="bg-green-900/30 p-3 rounded-lg border border-green-500/50 mb-6 text-center">
              <Unlock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-green-400 font-bold">Developer Access Granted</h3>
              <p className="text-gray-300 text-sm">Use these tools responsibly</p>
            </div>

            <div className="space-y-4">
              {/* Add Coins */}
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-white font-semibold">Add Coins</h4>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={coinAmount}
                    onChange={(e) => setCoinAmount(e.target.value)}
                    placeholder="Amount..."
                    className="flex-1 p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleAddCoins}
                    disabled={!coinAmount}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Add Gems */}
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gem className="w-5 h-5 text-purple-400" />
                  <h4 className="text-white font-semibold">Add Gems</h4>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={gemAmount}
                    onChange={(e) => setGemAmount(e.target.value)}
                    placeholder="Amount..."
                    className="flex-1 p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleAddGems}
                    disabled={!gemAmount}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Teleport to Zone */}
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <h4 className="text-white font-semibold">Teleport to Zone</h4>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={zoneNumber}
                    onChange={(e) => setZoneNumber(e.target.value)}
                    placeholder="Zone number..."
                    className="flex-1 p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-green-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleTeleport}
                    disabled={!zoneNumber}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Go
                  </button>
                </div>
              </div>

              {/* Set Experience */}
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <h4 className="text-white font-semibold">Set Experience</h4>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={xpAmount}
                    onChange={(e) => setXpAmount(e.target.value)}
                    placeholder="XP amount..."
                    className="flex-1 p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleSetXP}
                    disabled={!xpAmount}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-6 bg-orange-900/30 p-3 rounded-lg border border-orange-500/50">
              <p className="text-orange-300 text-xs text-center">
                ⚠️ These tools modify game state directly. Use for testing only.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};