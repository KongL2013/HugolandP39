import React, { useState } from 'react';
import { ProgressionSystem } from '../types/game';
import { Star, TrendingUp, Award, Crown, X, Brain, Sword, Shield, Heart, Zap } from 'lucide-react';

interface ProgressionPanelProps {
  progression: ProgressionSystem;
  onUpgradeSkill: (skillId: string) => boolean;
  onPrestige: () => boolean;
  onClose: () => void;
}

export const ProgressionPanel: React.FC<ProgressionPanelProps> = ({
  progression,
  onUpgradeSkill,
  onPrestige,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'prestige' | 'mastery'>('skills');

  const skills = [
    {
      id: 'combat_mastery',
      name: 'Combat Mastery',
      description: '+5% ATK and DEF per level',
      icon: Sword,
      color: 'text-red-400',
      maxLevel: 10,
      cost: 1
    },
    {
      id: 'knowledge_boost',
      name: 'Knowledge Boost',
      description: '+10% experience gain per level',
      icon: Brain,
      color: 'text-blue-400',
      maxLevel: 5,
      cost: 2
    },
    {
      id: 'treasure_hunter',
      name: 'Treasure Hunter',
      description: '+15% coin and gem rewards per level',
      icon: Star,
      color: 'text-yellow-400',
      maxLevel: 8,
      cost: 2
    },
    {
      id: 'durability_expert',
      name: 'Durability Expert',
      description: 'Items lose durability 20% slower per level',
      icon: Shield,
      color: 'text-green-400',
      maxLevel: 5,
      cost: 3
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Knowledge streaks build 25% faster per level',
      icon: Zap,
      color: 'text-purple-400',
      maxLevel: 4,
      cost: 3
    },
    {
      id: 'health_regeneration',
      name: 'Health Regeneration',
      description: 'Restore 10% HP after each victory per level',
      icon: Heart,
      color: 'text-pink-400',
      maxLevel: 3,
      cost: 4
    }
  ];

  const getSkillLevel = (skillId: string): number => {
    return progression.unlockedSkills.filter(s => s === skillId).length;
  };

  const canUpgradeSkill = (skill: any): boolean => {
    const currentLevel = getSkillLevel(skill.id);
    return currentLevel < skill.maxLevel && progression.skillPoints >= skill.cost;
  };

  const canPrestige = progression.level >= 50;
  const prestigeReward = Math.floor(progression.level / 10);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-4 sm:p-6 rounded-lg border border-indigo-500/50 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Progression System</h2>
              <p className="text-indigo-300 text-sm">
                Level {progression.level} | {progression.experience}/{progression.experienceToNext} XP
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

        {/* Experience Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(progression.experience / progression.experienceToNext) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-300 mt-1">
            <span>Level {progression.level}</span>
            <span>Skill Points: {progression.skillPoints}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'skills', label: 'Skills', icon: Star },
            { key: 'prestige', label: 'Prestige', icon: Crown },
            { key: 'mastery', label: 'Mastery', icon: Award }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => {
              const Icon = skill.icon;
              const currentLevel = getSkillLevel(skill.id);
              const canUpgrade = canUpgradeSkill(skill);

              return (
                <div
                  key={skill.id}
                  className="bg-black/30 p-4 rounded-lg border border-gray-600/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-6 h-6 ${skill.color}`} />
                    <div>
                      <h3 className="text-white font-bold">{skill.name}</h3>
                      <p className="text-gray-300 text-sm">{skill.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-300 text-sm">
                      Level {currentLevel}/{skill.maxLevel}
                    </span>
                    <span className="text-yellow-400 text-sm">
                      Cost: {skill.cost} SP
                    </span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full transition-all ${skill.color.replace('text-', 'bg-')}`}
                      style={{ width: `${(currentLevel / skill.maxLevel) * 100}%` }}
                    />
                  </div>

                  <button
                    onClick={() => onUpgradeSkill(skill.id)}
                    disabled={!canUpgrade}
                    className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                      canUpgrade
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {currentLevel >= skill.maxLevel ? 'Maxed' : 'Upgrade'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'prestige' && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 p-6 rounded-lg border border-yellow-500/50 mb-6">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-yellow-400 font-bold text-xl mb-2">Prestige System</h3>
              <p className="text-white mb-4">
                Reset your level to gain permanent bonuses and prestige points
              </p>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-300">Current Prestige Level: {progression.prestigeLevel}</p>
                <p className="text-gray-300">Prestige Points: {progression.prestigePoints}</p>
                <p className="text-yellow-300">Next Prestige Reward: +{prestigeReward} Prestige Points</p>
              </div>

              <button
                onClick={onPrestige}
                disabled={!canPrestige}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  canPrestige
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-500 hover:to-orange-500'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {canPrestige ? 'Prestige Now!' : `Reach Level 50 to Prestige (Level ${progression.level})`}
              </button>
            </div>

            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="text-white font-bold mb-3">Prestige Benefits</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• +5% experience gain per prestige level</p>
                <p>• +10% coin and gem rewards per prestige level</p>
                <p>• Unlock exclusive prestige skills</p>
                <p>• Keep all achievements and collection progress</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mastery' && (
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Category Mastery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(progression.masteryLevels).map(([category, level]) => (
                <div
                  key={category}
                  className="bg-black/30 p-4 rounded-lg border border-gray-600/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{category}</h4>
                    <span className="text-yellow-400 font-bold">Level {level}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((level / 10) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    +{level * 5}% accuracy bonus in {category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};