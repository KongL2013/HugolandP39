import React from 'react';
import { X, Play, Package, Shield, Brain, Trophy, Book, BarChart3 } from 'lucide-react';

interface TutorialProps {
  onClose: () => void;
}

export const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-4 sm:p-6 rounded-lg border border-purple-500/50 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-bold text-lg sm:text-xl">🏰 Welcome to Hugoland! 🗡️</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-purple-400 font-bold text-lg mb-3">🎮 What is Hugoland?</h3>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Hugoland is a fantasy adventure game where knowledge is your greatest weapon! Answer trivia questions 
              correctly to defeat enemies, earn rewards, and progress through increasingly challenging zones.
            </p>
          </div>

          {/* Game Basics */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-green-400 font-bold text-lg mb-3">⚔️ Combat System</h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-white">• Answer trivia questions to attack enemies</p>
              <p className="text-white">• Correct answers deal damage, wrong answers let enemies attack you</p>
              <p className="text-white">• You have limited time to answer each question</p>
              <p className="text-white">• Defeat enemies to earn coins, gems, and advance to the next zone</p>
            </div>
          </div>

          {/* Navigation Guide */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold text-lg mb-3">🧭 Navigation Guide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Hero - Start adventures & view stats</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">Research - Upgrade your abilities</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-sm">Shop - Buy treasure chests</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Inventory - Manage equipment</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-yellow-400 font-bold text-lg mb-3">📊 Quick Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-sm">Achievements - Track progress</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-indigo-400" />
                <span className="text-white text-sm">Collection - Items discovered</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Statistics - Performance data</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-orange-400 font-bold text-lg mb-3">💡 Pro Tips</h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-white">• 🔥 Build knowledge streaks for bonus rewards</p>
              <p className="text-white">• 💎 Use gems to upgrade your equipment</p>
              <p className="text-white">• 🧠 Invest in research for permanent stat boosts</p>
              <p className="text-white">• 🎮 Try different game modes for unique challenges</p>
              <p className="text-white">• 👑 Reach Zone 50 to unlock Premium features</p>
            </div>
          </div>

          {/* Game Modes */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-red-400 font-bold text-lg mb-3">🎯 Game Modes</h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-white">• <span className="text-blue-400">Normal</span> - Standard gameplay (5 seconds per question)</p>
              <p className="text-white">• <span className="text-yellow-400">Blitz</span> - Fast-paced with bonus rewards (3 seconds)</p>
              <p className="text-white">• <span className="text-red-400">Bloodlust</span> - High risk, high reward combat</p>
              <p className="text-white">• <span className="text-purple-400">Crazy Person</span> - Extreme difficulty for massive rewards</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-200"
          >
            Start Your Adventure! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};