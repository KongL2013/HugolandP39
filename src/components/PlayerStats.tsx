import React from 'react';
import { PlayerTag } from '../types/game';
import { Heart, Sword, Shield, MapPin, Coins, Gem, Sparkles, TrendingUp } from 'lucide-react';

interface PlayerStatsProps {
  playerStats: {
    hp: number;
    maxHp: number;
    atk: number;
    def: number;
  };
  zone: number;
  coins: number;
  gems: number;
  shinyGems: number;
  playerTags: PlayerTag[];
  progression: {
    level: number;
    experience: number;
    experienceToNext: number;
    skillPoints: number;
  };
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ 
  playerStats, 
  zone, 
  coins, 
  gems, 
  shinyGems, 
  playerTags,
  progression
}) => {
  const unlockedTags = playerTags.filter(tag => tag.unlocked);

  return (
    <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-black/80 p-6 rounded-xl shadow-2xl border border-slate-600/50 backdrop-blur-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Hero Status</h2>
      
      {/* Player Tags */}
      {unlockedTags.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold text-sm mb-3">Player Tags</h3>
          <div className="flex flex-wrap gap-2">
            {unlockedTags.map((tag) => (
              <div
                key={tag.id}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${tag.color} bg-black/30 border border-current/30 backdrop-blur-sm`}
              >
                {tag.icon} {tag.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Character Level */}
        <div className="bg-black/30 p-4 rounded-xl border border-indigo-500/30">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span className="text-white font-semibold">Character Level</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-indigo-400 font-bold text-2xl">Lv.{progression.level}</span>
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(progression.experience / progression.experienceToNext) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-300 mt-2">
                {progression.experience}/{progression.experienceToNext} XP
              </p>
            </div>
            <span className="text-yellow-400 font-semibold bg-black/30 px-3 py-1 rounded-lg">
              SP: {progression.skillPoints}
            </span>
          </div>
        </div>
        
        {/* Health */}
        <div className="bg-black/30 p-4 rounded-xl border border-red-500/30">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-white font-semibold">Health</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-400 h-4 rounded-full transition-all duration-300"
              style={{ width: `${(playerStats.hp / playerStats.maxHp) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2 text-center font-semibold">
            {playerStats.hp}/{playerStats.maxHp}
          </p>
        </div>

        {/* Combat Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-xl border border-orange-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Sword className="w-4 h-4 text-orange-400" />
              <span className="text-white font-semibold text-sm">Attack</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{playerStats.atk}</p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-xl border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-white font-semibold text-sm">Defense</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{playerStats.def}</p>
          </div>
        </div>

        {/* Zone */}
        <div className="bg-black/30 p-4 rounded-xl border border-green-500/30">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">Current Zone</span>
          </div>
          <p className="text-3xl font-bold text-green-400 text-center">{zone}</p>
          {zone >= 10 && (
            <p className="text-xs text-green-300 mt-2 text-center bg-green-900/30 py-1 px-2 rounded-lg">
              Enemies can drop items!
            </p>
          )}
        </div>

        {/* Resources */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-black/30 p-3 rounded-xl border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-semibold text-xs">Coins</span>
            </div>
            <p className="text-lg font-bold text-yellow-400 text-center">{coins.toLocaleString()}</p>
          </div>
          
          <div className="bg-black/30 p-3 rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Gem className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold text-xs">Gems</span>
            </div>
            <p className="text-lg font-bold text-purple-400 text-center">{gems.toLocaleString()}</p>
          </div>

          <div className="bg-black/30 p-3 rounded-xl border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-semibold text-xs">Shiny</span>
            </div>
            <p className="text-lg font-bold text-yellow-400 text-center">{shinyGems.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};