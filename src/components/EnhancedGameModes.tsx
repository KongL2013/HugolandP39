import React from 'react';
import { GameMode } from '../types/game';
import { Zap, Heart, Clock, X, Sword, Shield } from 'lucide-react';

interface EnhancedGameModesProps {
  currentMode: GameMode;
  onSelectMode: (mode: 'normal' | 'blitz' | 'bloodlust' | 'survival') => void;
  onClose: () => void;
}

export const EnhancedGameModes: React.FC<EnhancedGameModesProps> = ({ 
  currentMode, 
  onSelectMode, 
  onClose 
}) => {
  const modes = [
    {
      id: 'normal' as const,
      name: 'Normal',
      description: 'Standard gameplay with 8 seconds per question',
      icon: Clock,
      color: 'blue',
      features: ['8 seconds per question', 'Standard rewards', 'Normal health restoration']
    },
    {
      id: 'blitz' as const,
      name: 'Blitz',
      description: 'Fast-paced action with 5 seconds per question',
      icon: Zap,
      color: 'yellow',
      features: ['5 seconds per question', '+25% coin rewards', '+10% gem rewards', 'Quick thinking required!']
    },
    {
      id: 'bloodlust' as const,
      name: 'Bloodlust',
      description: 'High risk, high reward combat mode',
      icon: Sword,
      color: 'red',
      features: ['5 seconds per question', '+100% ATK', '-50% DEF', '-50% HP']
    },
    {
      id: 'survival' as const,
      name: 'Survival',
      description: 'Limited lives with double rewards',
      icon: Shield,
      color: 'green',
      features: ['3 lives total', 'No health restoration', 'Increasing difficulty', '+100% rewards (2x multiplier)']
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: {
        border: isSelected ? 'border-blue-500' : 'border-blue-500/30',
        bg: isSelected ? 'bg-blue-900/50' : 'bg-blue-900/20',
        text: 'text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-500'
      },
      yellow: {
        border: isSelected ? 'border-yellow-500' : 'border-yellow-500/30',
        bg: isSelected ? 'bg-yellow-900/50' : 'bg-yellow-900/20',
        text: 'text-yellow-400',
        button: 'bg-yellow-600 hover:bg-yellow-500'
      },
      red: {
        border: isSelected ? 'border-red-500' : 'border-red-500/30',
        bg: isSelected ? 'bg-red-900/50' : 'bg-red-900/20',
        text: 'text-red-400',
        button: 'bg-red-600 hover:bg-red-500'
      },
      green: {
        border: isSelected ? 'border-green-500' : 'border-green-500/30',
        bg: isSelected ? 'bg-green-900/50' : 'bg-green-900/20',
        text: 'text-green-400',
        button: 'bg-green-600 hover:bg-green-500'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-slate-900 p-4 sm:p-6 rounded-lg border border-gray-500/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-white font-bold text-lg sm:text-xl">Game Modes</h2>
            <p className="text-gray-300 text-sm">Choose your adventure style</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modes.map((mode) => {
            const isSelected = currentMode.current === mode.id;
            const colorClasses = getColorClasses(mode.color, isSelected);
            const Icon = mode.icon;

            return (
              <div
                key={mode.id}
                className={`p-4 rounded-lg border-2 transition-all ${colorClasses.border} ${colorClasses.bg}`}
              >
                <div className="text-center mb-4">
                  <Icon className={`w-12 h-12 mx-auto mb-3 ${colorClasses.text}`} />
                  <h3 className={`font-bold text-lg ${colorClasses.text}`}>
                    {mode.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2">
                    {mode.description}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  {mode.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${colorClasses.text.replace('text-', 'bg-')}`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelectMode(mode.id)}
                  disabled={isSelected}
                  className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                    isSelected
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : `${colorClasses.button} text-white hover:scale-105`
                  }`}
                >
                  {isSelected ? 'Current Mode' : 'Select Mode'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Current Mode Info */}
        <div className="mt-6 p-3 sm:p-4 bg-gray-800/50 border border-gray-600/50 rounded-lg">
          <p className="text-gray-300 text-sm sm:text-base text-center">
            Current Mode: <span className="font-bold text-white">{modes.find(m => m.id === currentMode.current)?.name}</span>
          </p>
          {currentMode.current === 'survival' && (
            <p className="text-center text-sm text-red-400 mt-1">
              Lives remaining: {currentMode.survivalLives}/{currentMode.maxSurvivalLives}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};