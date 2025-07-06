import React, { useState } from 'react';
import { Achievement } from '../types/game';
import { Trophy, Lock, Star, Gift, X } from 'lucide-react';

interface AchievementsProps {
  achievements: Achievement[];
  onClose: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-4 sm:p-6 rounded-lg border border-purple-500/50 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Achievements</h2>
              <p className="text-purple-300 text-sm">
                {unlockedCount}/{totalCount} Unlocked ({Math.round((unlockedCount / totalCount) * 100)}%)
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

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'all', label: 'All', count: totalCount },
            { key: 'unlocked', label: 'Unlocked', count: unlockedCount },
            { key: 'locked', label: 'Locked', count: totalCount - unlockedCount }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                filter === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                  : 'bg-gray-800/50 border-gray-600/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-2xl sm:text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-sm sm:text-base ${
                      achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </h3>
                    {achievement.unlocked && (
                      <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                    )}
                  </div>
                  <p className={`text-xs sm:text-sm mb-2 ${
                    achievement.unlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={achievement.unlocked ? 'text-green-400' : 'text-gray-400'}>
                        Progress: {achievement.progress}/{achievement.maxProgress}
                      </span>
                      <span className={achievement.unlocked ? 'text-green-400' : 'text-gray-400'}>
                        {Math.round((achievement.progress / achievement.maxProgress) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-green-500 to-green-400' 
                            : 'bg-gradient-to-r from-gray-600 to-gray-500'
                        }`}
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Rewards */}
                  {achievement.reward && (
                    <div className="flex items-center gap-2 text-xs">
                      <Gift className="w-3 h-3 text-purple-400" />
                      <div className="flex gap-2">
                        {achievement.reward.coins && (
                          <span className="text-yellow-400">+{achievement.reward.coins} coins</span>
                        )}
                        {achievement.reward.gems && (
                          <span className="text-purple-400">+{achievement.reward.gems} gems</span>
                        )}
                        {achievement.reward.special && (
                          <span className="text-pink-400">{achievement.reward.special}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Unlock Date */}
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-8">
            <Lock className="w-12 h-12 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400">No achievements in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};