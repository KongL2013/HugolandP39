import { PlayerTag, GameState } from '../types/game';

export const tagDefinitions: Omit<PlayerTag, 'unlocked' | 'unlockedAt'>[] = [
  // Zone-based tags
  {
    id: 'zone_explorer',
    name: 'Zone Explorer',
    description: 'Reach Zone 25',
    icon: '🗺️',
    color: 'text-green-400'
  },
  {
    id: 'zone_master',
    name: 'Zone Master',
    description: 'Reach Zone 100',
    icon: '🏔️',
    color: 'text-blue-400'
  },
  {
    id: 'zone_legend',
    name: 'Zone Legend',
    description: 'Reach Zone 250',
    icon: '🌋',
    color: 'text-red-400'
  },
  {
    id: 'zone_god',
    name: 'Zone God',
    description: 'Reach Zone 500',
    icon: '🌌',
    color: 'text-purple-400'
  },

  // Wealth tags
  {
    id: 'coin_collector',
    name: 'Coin Collector',
    description: 'Earn 10,000 total coins',
    icon: '💰',
    color: 'text-yellow-400'
  },
  {
    id: 'gem_collector',
    name: 'Gem Collector',
    description: 'Earn 1,000 total gems',
    icon: '💎',
    color: 'text-purple-400'
  },
  {
    id: 'millionaire',
    name: 'Millionaire',
    description: 'Earn 1,000,000 total coins',
    icon: '💸',
    color: 'text-green-400'
  },

  // Knowledge tags
  {
    id: 'knowledge_master',
    name: 'Knowledge Master',
    description: 'Answer 1,000 questions correctly',
    icon: '🧠',
    color: 'text-blue-400'
  },
  {
    id: 'knowledge_god',
    name: 'Knowledge God',
    description: 'Answer 10,000 questions correctly',
    icon: '🎓',
    color: 'text-indigo-400'
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Get 50 correct answers in a row',
    icon: '🔥',
    color: 'text-orange-400'
  },
  {
    id: 'streak_legend',
    name: 'Streak Legend',
    description: 'Get 100 correct answers in a row',
    icon: '💫',
    color: 'text-yellow-400'
  },

  // Combat tags
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'Win 500 battles',
    icon: '⚔️',
    color: 'text-red-400'
  },
  {
    id: 'war_hero',
    name: 'War Hero',
    description: 'Win 1,000 battles',
    icon: '🏆',
    color: 'text-gold-400'
  },

  // Collection tags
  {
    id: 'collector',
    name: 'Collector',
    description: 'Collect 50 different items',
    icon: '📦',
    color: 'text-cyan-400'
  },
  {
    id: 'legendary_collector',
    name: 'Legendary Collector',
    description: 'Find 10 Legendary items',
    icon: '⭐',
    color: 'text-yellow-400'
  },
  {
    id: 'mythical_seeker',
    name: 'Mythical Seeker',
    description: 'Find 5 Mythical items',
    icon: '🌠',
    color: 'text-pink-400'
  },

  // Mining tags
  {
    id: 'miner',
    name: 'Miner',
    description: 'Mine 1,000 gems',
    icon: '⛏️',
    color: 'text-gray-400'
  },
  {
    id: 'shiny_hunter',
    name: 'Shiny Hunter',
    description: 'Find 100 shiny gems',
    icon: '✨',
    color: 'text-yellow-400'
  },

  // Special tags
  {
    id: 'enchanted_finder',
    name: 'Enchanted Finder',
    description: 'Find 10 enchanted items',
    icon: '🔮',
    color: 'text-cyan-400'
  },
  {
    id: 'relic_seeker',
    name: 'Relic Seeker',
    description: 'Own 5 relic items',
    icon: '🏺',
    color: 'text-orange-400'
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Reach Research Level 25',
    icon: '📚',
    color: 'text-blue-400'
  },
  {
    id: 'sage',
    name: 'Sage',
    description: 'Reach Research Level 50',
    icon: '🔮',
    color: 'text-purple-400'
  },

  // Garden tags
  {
    id: 'gardener',
    name: 'Gardener',
    description: 'Plant your first seed',
    icon: '🌱',
    color: 'text-green-400'
  },
  {
    id: 'master_gardener',
    name: 'Master Gardener',
    description: 'Grow your plant to 50cm',
    icon: '🌳',
    color: 'text-green-500'
  },
  {
    id: 'legendary_gardener',
    name: 'Legendary Gardener',
    description: 'Grow your plant to maximum size',
    icon: '🌲',
    color: 'text-emerald-400'
  },

  // Premium tags
  {
    id: 'premium_member',
    name: 'Premium Member',
    description: 'Unlock Premium status',
    icon: '👑',
    color: 'text-yellow-400'
  },

  // Accuracy tags
  {
    id: 'precision_master',
    name: 'Precision Master',
    description: 'Maintain 95% accuracy over 100 questions',
    icon: '🎯',
    color: 'text-red-400'
  },

  // Time-based tags
  {
    id: 'dedicated_player',
    name: 'Dedicated Player',
    description: 'Play for 30 consecutive days',
    icon: '🗓️',
    color: 'text-blue-400'
  }
];

export const checkPlayerTags = (gameState: GameState): PlayerTag[] => {
  const newUnlocks: PlayerTag[] = [];
  
  tagDefinitions.forEach(def => {
    const existing = gameState.playerTags.find(t => t.id === def.id);
    if (existing?.unlocked) return;

    let shouldUnlock = false;

    switch (def.id) {
      case 'zone_explorer':
        shouldUnlock = gameState.zone >= 25;
        break;
      case 'zone_master':
        shouldUnlock = gameState.zone >= 100;
        break;
      case 'zone_legend':
        shouldUnlock = gameState.zone >= 250;
        break;
      case 'zone_god':
        shouldUnlock = gameState.zone >= 500;
        break;
      case 'coin_collector':
        shouldUnlock = gameState.statistics.coinsEarned >= 10000;
        break;
      case 'gem_collector':
        shouldUnlock = gameState.statistics.gemsEarned >= 1000;
        break;
      case 'millionaire':
        shouldUnlock = gameState.statistics.coinsEarned >= 1000000;
        break;
      case 'knowledge_master':
        shouldUnlock = gameState.statistics.correctAnswers >= 1000;
        break;
      case 'knowledge_god':
        shouldUnlock = gameState.statistics.correctAnswers >= 10000;
        break;
      case 'streak_master':
        shouldUnlock = gameState.knowledgeStreak.best >= 50;
        break;
      case 'streak_legend':
        shouldUnlock = gameState.knowledgeStreak.best >= 100;
        break;
      case 'warrior':
        shouldUnlock = gameState.statistics.totalVictories >= 500;
        break;
      case 'war_hero':
        shouldUnlock = gameState.statistics.totalVictories >= 1000;
        break;
      case 'collector':
        shouldUnlock = (gameState.collectionBook.totalWeaponsFound + gameState.collectionBook.totalArmorFound) >= 50;
        break;
      case 'legendary_collector':
        shouldUnlock = gameState.collectionBook.rarityStats.legendary >= 10;
        break;
      case 'mythical_seeker':
        shouldUnlock = gameState.collectionBook.rarityStats.mythical >= 5;
        break;
      case 'miner':
        shouldUnlock = gameState.mining.totalGemsMined >= 1000;
        break;
      case 'shiny_hunter':
        shouldUnlock = gameState.mining.totalShinyGemsMined >= 100;
        break;
      case 'enchanted_finder':
        const enchantedCount = [...gameState.inventory.weapons, ...gameState.inventory.armor]
          .filter(item => item.isEnchanted).length;
        shouldUnlock = enchantedCount >= 10;
        break;
      case 'relic_seeker':
        shouldUnlock = gameState.inventory.relics.length >= 5;
        break;
      case 'scholar':
        shouldUnlock = gameState.research.level >= 25;
        break;
      case 'sage':
        shouldUnlock = gameState.research.level >= 50;
        break;
      case 'gardener':
        shouldUnlock = gameState.gardenOfGrowth.isPlanted;
        break;
      case 'master_gardener':
        shouldUnlock = gameState.gardenOfGrowth.growthCm >= 50;
        break;
      case 'legendary_gardener':
        shouldUnlock = gameState.gardenOfGrowth.growthCm >= 100;
        break;
      case 'premium_member':
        shouldUnlock = gameState.isPremium;
        break;
      case 'precision_master':
        const totalAnswered = gameState.statistics.totalQuestionsAnswered;
        if (totalAnswered >= 100) {
          const accuracy = gameState.statistics.correctAnswers / totalAnswered;
          shouldUnlock = accuracy >= 0.95;
        }
        break;
    }

    if (shouldUnlock && !existing?.unlocked) {
      newUnlocks.push({
        ...def,
        unlocked: true,
        unlockedAt: new Date()
      });
    }
  });

  return newUnlocks;
};

export const initializePlayerTags = (): PlayerTag[] => {
  return tagDefinitions.map(def => ({
    ...def,
    unlocked: false
  }));
};