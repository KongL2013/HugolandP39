import { Achievement, GameState } from '../types/game';

export const achievementDefinitions: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  // Basic Progression
  {
    id: 'first_victory',
    name: 'First Victory',
    description: 'Win your first battle',
    icon: '🏆',
    maxProgress: 1,
    reward: { coins: 50, gems: 5 }
  },
  {
    id: 'zone_master_10',
    name: 'Zone Explorer',
    description: 'Reach Zone 10',
    icon: '🗺️',
    maxProgress: 10,
    reward: { coins: 200, gems: 10 }
  },
  {
    id: 'zone_master_25',
    name: 'Zone Conqueror',
    description: 'Reach Zone 25',
    icon: '⚔️',
    maxProgress: 25,
    reward: { coins: 500, gems: 25 }
  },
  {
    id: 'zone_master_50',
    name: 'Zone Legend',
    description: 'Reach Zone 50 and unlock Premium',
    icon: '👑',
    maxProgress: 50,
    reward: { coins: 1000, gems: 50, special: 'Premium Access' }
  },
  {
    id: 'zone_master_100',
    name: 'Zone Master',
    description: 'Reach Zone 100',
    icon: '🏔️',
    maxProgress: 100,
    reward: { coins: 2000, gems: 100 }
  },
  {
    id: 'zone_master_250',
    name: 'Zone Overlord',
    description: 'Reach Zone 250',
    icon: '🌋',
    maxProgress: 250,
    reward: { coins: 5000, gems: 250 }
  },
  {
    id: 'zone_master_500',
    name: 'Zone God',
    description: 'Reach Zone 500',
    icon: '🌌',
    maxProgress: 500,
    reward: { coins: 10000, gems: 500 }
  },

  // Collection Achievements
  {
    id: 'collector_25',
    name: 'Item Collector',
    description: 'Collect 25 different items',
    icon: '📦',
    maxProgress: 25,
    reward: { coins: 300, gems: 15 }
  },
  {
    id: 'collector_50',
    name: 'Master Collector',
    description: 'Collect 50 different items',
    icon: '🎒',
    maxProgress: 50,
    reward: { coins: 750, gems: 35 }
  },
  {
    id: 'collector_100',
    name: 'Legendary Collector',
    description: 'Collect 100 different items',
    icon: '🏛️',
    maxProgress: 100,
    reward: { coins: 1500, gems: 75 }
  },

  // Research Achievements
  {
    id: 'scholar_tier_5',
    name: 'Scholar',
    description: 'Reach Research Level 5',
    icon: '🧠',
    maxProgress: 5,
    reward: { coins: 400, gems: 20 }
  },
  {
    id: 'scholar_tier_10',
    name: 'Master Scholar',
    description: 'Reach Research Level 10',
    icon: '📚',
    maxProgress: 10,
    reward: { coins: 800, gems: 40 }
  },
  {
    id: 'scholar_tier_25',
    name: 'Grand Scholar',
    description: 'Reach Research Level 25',
    icon: '🎓',
    maxProgress: 25,
    reward: { coins: 2000, gems: 100 }
  },
  {
    id: 'scholar_tier_50',
    name: 'Sage',
    description: 'Reach Research Level 50',
    icon: '🔮',
    maxProgress: 50,
    reward: { coins: 5000, gems: 250 }
  },

  // Knowledge Streak Achievements
  {
    id: 'streak_master_10',
    name: 'Knowledge Streak',
    description: 'Get 10 correct answers in a row',
    icon: '🔥',
    maxProgress: 10,
    reward: { coins: 250, gems: 12 }
  },
  {
    id: 'streak_master_25',
    name: 'Genius Streak',
    description: 'Get 25 correct answers in a row',
    icon: '⚡',
    maxProgress: 25,
    reward: { coins: 600, gems: 30 }
  },
  {
    id: 'streak_master_50',
    name: 'Mastermind Streak',
    description: 'Get 50 correct answers in a row',
    icon: '🌟',
    maxProgress: 50,
    reward: { coins: 1500, gems: 75 }
  },
  {
    id: 'streak_master_100',
    name: 'Legendary Streak',
    description: 'Get 100 correct answers in a row',
    icon: '💫',
    maxProgress: 100,
    reward: { coins: 3000, gems: 150 }
  },

  // Wealth Achievements
  {
    id: 'wealthy_1000',
    name: 'Coin Collector',
    description: 'Earn 1000 total coins',
    icon: '💰',
    maxProgress: 1000,
    reward: { gems: 20 }
  },
  {
    id: 'wealthy_10000',
    name: 'Rich Adventurer',
    description: 'Earn 10,000 total coins',
    icon: '💎',
    maxProgress: 10000,
    reward: { gems: 50 }
  },
  {
    id: 'wealthy_100000',
    name: 'Wealthy Merchant',
    description: 'Earn 100,000 total coins',
    icon: '🏦',
    maxProgress: 100000,
    reward: { gems: 200 }
  },
  {
    id: 'wealthy_1000000',
    name: 'Millionaire',
    description: 'Earn 1,000,000 total coins',
    icon: '💸',
    maxProgress: 1000000,
    reward: { gems: 1000 }
  },

  // Gem Achievements
  {
    id: 'gem_collector_100',
    name: 'Gem Collector',
    description: 'Earn 100 total gems',
    icon: '💎',
    maxProgress: 100,
    reward: { coins: 500 }
  },
  {
    id: 'gem_collector_1000',
    name: 'Gem Master',
    description: 'Earn 1000 total gems',
    icon: '💍',
    maxProgress: 1000,
    reward: { coins: 2000 }
  },
  {
    id: 'gem_collector_10000',
    name: 'Gem Lord',
    description: 'Earn 10,000 total gems',
    icon: '👑',
    maxProgress: 10000,
    reward: { coins: 10000 }
  },

  // Chest Opening Achievements
  {
    id: 'chest_opener_10',
    name: 'Treasure Hunter',
    description: 'Open 10 chests',
    icon: '🗝️',
    maxProgress: 10,
    reward: { coins: 200, gems: 10 }
  },
  {
    id: 'chest_opener_50',
    name: 'Chest Master',
    description: 'Open 50 chests',
    icon: '📦',
    maxProgress: 50,
    reward: { coins: 1000, gems: 50 }
  },
  {
    id: 'chest_opener_100',
    name: 'Vault Breaker',
    description: 'Open 100 chests',
    icon: '🏛️',
    maxProgress: 100,
    reward: { coins: 2500, gems: 125 }
  },

  // Accuracy Achievements
  {
    id: 'accuracy_master_90',
    name: 'Perfect Scholar',
    description: 'Maintain 90% accuracy over 50 questions',
    icon: '🎯',
    maxProgress: 50,
    reward: { coins: 500, gems: 25 }
  },
  {
    id: 'accuracy_master_95',
    name: 'Precision Master',
    description: 'Maintain 95% accuracy over 100 questions',
    icon: '🏹',
    maxProgress: 100,
    reward: { coins: 1500, gems: 75 }
  },

  // Rarity Achievements
  {
    id: 'legendary_finder',
    name: 'Legendary Hunter',
    description: 'Find your first Legendary item',
    icon: '✨',
    maxProgress: 1,
    reward: { coins: 300, gems: 15 }
  },
  {
    id: 'mythical_finder',
    name: 'Mythical Seeker',
    description: 'Find your first Mythical item',
    icon: '🌟',
    maxProgress: 1,
    reward: { coins: 500, gems: 25 }
  },
  {
    id: 'legendary_collector_10',
    name: 'Legendary Collector',
    description: 'Find 10 Legendary items',
    icon: '⭐',
    maxProgress: 10,
    reward: { coins: 2000, gems: 100 }
  },
  {
    id: 'mythical_collector_5',
    name: 'Mythical Collector',
    description: 'Find 5 Mythical items',
    icon: '🌠',
    maxProgress: 5,
    reward: { coins: 3000, gems: 150 }
  },

  // Combat Achievements
  {
    id: 'warrior_100',
    name: 'Warrior',
    description: 'Win 100 battles',
    icon: '⚔️',
    maxProgress: 100,
    reward: { coins: 1000, gems: 50 }
  },
  {
    id: 'warrior_500',
    name: 'Battle Master',
    description: 'Win 500 battles',
    icon: '🛡️',
    maxProgress: 500,
    reward: { coins: 3000, gems: 150 }
  },
  {
    id: 'warrior_1000',
    name: 'War Hero',
    description: 'Win 1000 battles',
    icon: '🏆',
    maxProgress: 1000,
    reward: { coins: 5000, gems: 250 }
  },

  // Mining Achievements
  {
    id: 'miner_100',
    name: 'Gem Miner',
    description: 'Mine 100 gems',
    icon: '⛏️',
    maxProgress: 100,
    reward: { coins: 500, gems: 25 }
  },
  {
    id: 'miner_1000',
    name: 'Master Miner',
    description: 'Mine 1000 gems',
    icon: '💎',
    maxProgress: 1000,
    reward: { coins: 2000, gems: 100 }
  },
  {
    id: 'shiny_hunter_10',
    name: 'Shiny Hunter',
    description: 'Find 10 shiny gems',
    icon: '✨',
    maxProgress: 10,
    reward: { coins: 1000, gems: 50 }
  },
  {
    id: 'shiny_hunter_100',
    name: 'Shiny Master',
    description: 'Find 100 shiny gems',
    icon: '🌟',
    maxProgress: 100,
    reward: { coins: 5000, gems: 250 }
  },

  // Special Achievements
  {
    id: 'enchanted_finder_10',
    name: 'Enchanted Finder',
    description: 'Find 10 enchanted items',
    icon: '🔮',
    maxProgress: 10,
    reward: { coins: 1500, gems: 75 }
  },
  {
    id: 'relic_seeker_5',
    name: 'Relic Seeker',
    description: 'Own 5 relic items',
    icon: '🏺',
    maxProgress: 5,
    reward: { coins: 2000, gems: 100 }
  },
  {
    id: 'knowledge_master_1000',
    name: 'Knowledge Master',
    description: 'Answer 1000 questions correctly',
    icon: '🧠',
    maxProgress: 1000,
    reward: { coins: 3000, gems: 150 }
  },
  {
    id: 'knowledge_master_10000',
    name: 'Knowledge God',
    description: 'Answer 10,000 questions correctly',
    icon: '🎓',
    maxProgress: 10000,
    reward: { coins: 10000, gems: 500 }
  },

  // Time-based Achievements
  {
    id: 'daily_player_7',
    name: 'Weekly Player',
    description: 'Play for 7 consecutive days',
    icon: '📅',
    maxProgress: 7,
    reward: { coins: 1000, gems: 50 }
  },
  {
    id: 'daily_player_30',
    name: 'Monthly Player',
    description: 'Play for 30 consecutive days',
    icon: '🗓️',
    maxProgress: 30,
    reward: { coins: 5000, gems: 250 }
  },

  // Garden Achievements
  {
    id: 'gardener_first',
    name: 'First Gardener',
    description: 'Plant your first seed',
    icon: '🌱',
    maxProgress: 1,
    reward: { coins: 500, gems: 25 }
  },
  {
    id: 'gardener_master',
    name: 'Master Gardener',
    description: 'Grow your plant to 50cm',
    icon: '🌳',
    maxProgress: 50,
    reward: { coins: 2000, gems: 100 }
  },
  {
    id: 'gardener_legend',
    name: 'Legendary Gardener',
    description: 'Grow your plant to maximum size',
    icon: '🌲',
    maxProgress: 100,
    reward: { coins: 5000, gems: 250 }
  }
];

export const checkAchievements = (gameState: GameState): Achievement[] => {
  const newUnlocks: Achievement[] = [];
  
  achievementDefinitions.forEach(def => {
    const existing = gameState.achievements.find(a => a.id === def.id);
    if (existing?.unlocked) return;

    let progress = 0;
    let shouldUnlock = false;

    switch (def.id) {
      case 'first_victory':
        progress = gameState.zone > 1 ? 1 : 0;
        shouldUnlock = progress >= 1;
        break;
      case 'zone_master_10':
        progress = Math.min(gameState.zone, 10);
        shouldUnlock = gameState.zone >= 10;
        break;
      case 'zone_master_25':
        progress = Math.min(gameState.zone, 25);
        shouldUnlock = gameState.zone >= 25;
        break;
      case 'zone_master_50':
        progress = Math.min(gameState.zone, 50);
        shouldUnlock = gameState.zone >= 50;
        break;
      case 'zone_master_100':
        progress = Math.min(gameState.zone, 100);
        shouldUnlock = gameState.zone >= 100;
        break;
      case 'zone_master_250':
        progress = Math.min(gameState.zone, 250);
        shouldUnlock = gameState.zone >= 250;
        break;
      case 'zone_master_500':
        progress = Math.min(gameState.zone, 500);
        shouldUnlock = gameState.zone >= 500;
        break;
      case 'collector_25':
        progress = Math.min(gameState.collectionBook.totalWeaponsFound + gameState.collectionBook.totalArmorFound, 25);
        shouldUnlock = progress >= 25;
        break;
      case 'collector_50':
        progress = Math.min(gameState.collectionBook.totalWeaponsFound + gameState.collectionBook.totalArmorFound, 50);
        shouldUnlock = progress >= 50;
        break;
      case 'collector_100':
        progress = Math.min(gameState.collectionBook.totalWeaponsFound + gameState.collectionBook.totalArmorFound, 100);
        shouldUnlock = progress >= 100;
        break;
      case 'scholar_tier_5':
        progress = Math.min(gameState.research.level, 5);
        shouldUnlock = gameState.research.level >= 5;
        break;
      case 'scholar_tier_10':
        progress = Math.min(gameState.research.level, 10);
        shouldUnlock = gameState.research.level >= 10;
        break;
      case 'scholar_tier_25':
        progress = Math.min(gameState.research.level, 25);
        shouldUnlock = gameState.research.level >= 25;
        break;
      case 'scholar_tier_50':
        progress = Math.min(gameState.research.level, 50);
        shouldUnlock = gameState.research.level >= 50;
        break;
      case 'streak_master_10':
        progress = Math.min(gameState.knowledgeStreak.best, 10);
        shouldUnlock = gameState.knowledgeStreak.best >= 10;
        break;
      case 'streak_master_25':
        progress = Math.min(gameState.knowledgeStreak.best, 25);
        shouldUnlock = gameState.knowledgeStreak.best >= 25;
        break;
      case 'streak_master_50':
        progress = Math.min(gameState.knowledgeStreak.best, 50);
        shouldUnlock = gameState.knowledgeStreak.best >= 50;
        break;
      case 'streak_master_100':
        progress = Math.min(gameState.knowledgeStreak.best, 100);
        shouldUnlock = gameState.knowledgeStreak.best >= 100;
        break;
      case 'wealthy_1000':
        progress = Math.min(gameState.statistics.coinsEarned, 1000);
        shouldUnlock = gameState.statistics.coinsEarned >= 1000;
        break;
      case 'wealthy_10000':
        progress = Math.min(gameState.statistics.coinsEarned, 10000);
        shouldUnlock = gameState.statistics.coinsEarned >= 10000;
        break;
      case 'wealthy_100000':
        progress = Math.min(gameState.statistics.coinsEarned, 100000);
        shouldUnlock = gameState.statistics.coinsEarned >= 100000;
        break;
      case 'wealthy_1000000':
        progress = Math.min(gameState.statistics.coinsEarned, 1000000);
        shouldUnlock = gameState.statistics.coinsEarned >= 1000000;
        break;
      case 'gem_collector_100':
        progress = Math.min(gameState.statistics.gemsEarned, 100);
        shouldUnlock = gameState.statistics.gemsEarned >= 100;
        break;
      case 'gem_collector_1000':
        progress = Math.min(gameState.statistics.gemsEarned, 1000);
        shouldUnlock = gameState.statistics.gemsEarned >= 1000;
        break;
      case 'gem_collector_10000':
        progress = Math.min(gameState.statistics.gemsEarned, 10000);
        shouldUnlock = gameState.statistics.gemsEarned >= 10000;
        break;
      case 'chest_opener_10':
        progress = Math.min(gameState.statistics.chestsOpened, 10);
        shouldUnlock = gameState.statistics.chestsOpened >= 10;
        break;
      case 'chest_opener_50':
        progress = Math.min(gameState.statistics.chestsOpened, 50);
        shouldUnlock = gameState.statistics.chestsOpened >= 50;
        break;
      case 'chest_opener_100':
        progress = Math.min(gameState.statistics.chestsOpened, 100);
        shouldUnlock = gameState.statistics.chestsOpened >= 100;
        break;
      case 'accuracy_master_90':
        const totalAnswered90 = gameState.statistics.totalQuestionsAnswered;
        if (totalAnswered90 >= 50) {
          const accuracy90 = gameState.statistics.correctAnswers / totalAnswered90;
          progress = accuracy90 >= 0.9 ? 50 : 0;
          shouldUnlock = accuracy90 >= 0.9;
        }
        break;
      case 'accuracy_master_95':
        const totalAnswered95 = gameState.statistics.totalQuestionsAnswered;
        if (totalAnswered95 >= 100) {
          const accuracy95 = gameState.statistics.correctAnswers / totalAnswered95;
          progress = accuracy95 >= 0.95 ? 100 : 0;
          shouldUnlock = accuracy95 >= 0.95;
        }
        break;
      case 'legendary_finder':
        progress = gameState.collectionBook.rarityStats.legendary > 0 ? 1 : 0;
        shouldUnlock = progress >= 1;
        break;
      case 'mythical_finder':
        progress = gameState.collectionBook.rarityStats.mythical > 0 ? 1 : 0;
        shouldUnlock = progress >= 1;
        break;
      case 'legendary_collector_10':
        progress = Math.min(gameState.collectionBook.rarityStats.legendary, 10);
        shouldUnlock = gameState.collectionBook.rarityStats.legendary >= 10;
        break;
      case 'mythical_collector_5':
        progress = Math.min(gameState.collectionBook.rarityStats.mythical, 5);
        shouldUnlock = gameState.collectionBook.rarityStats.mythical >= 5;
        break;
      case 'warrior_100':
        progress = Math.min(gameState.statistics.totalVictories, 100);
        shouldUnlock = gameState.statistics.totalVictories >= 100;
        break;
      case 'warrior_500':
        progress = Math.min(gameState.statistics.totalVictories, 500);
        shouldUnlock = gameState.statistics.totalVictories >= 500;
        break;
      case 'warrior_1000':
        progress = Math.min(gameState.statistics.totalVictories, 1000);
        shouldUnlock = gameState.statistics.totalVictories >= 1000;
        break;
      case 'miner_100':
        progress = Math.min(gameState.mining.totalGemsMined, 100);
        shouldUnlock = gameState.mining.totalGemsMined >= 100;
        break;
      case 'miner_1000':
        progress = Math.min(gameState.mining.totalGemsMined, 1000);
        shouldUnlock = gameState.mining.totalGemsMined >= 1000;
        break;
      case 'shiny_hunter_10':
        progress = Math.min(gameState.mining.totalShinyGemsMined, 10);
        shouldUnlock = gameState.mining.totalShinyGemsMined >= 10;
        break;
      case 'shiny_hunter_100':
        progress = Math.min(gameState.mining.totalShinyGemsMined, 100);
        shouldUnlock = gameState.mining.totalShinyGemsMined >= 100;
        break;
      case 'enchanted_finder_10':
        const enchantedCount = [...gameState.inventory.weapons, ...gameState.inventory.armor]
          .filter(item => item.isEnchanted).length;
        progress = Math.min(enchantedCount, 10);
        shouldUnlock = enchantedCount >= 10;
        break;
      case 'relic_seeker_5':
        progress = Math.min(gameState.inventory.relics.length, 5);
        shouldUnlock = gameState.inventory.relics.length >= 5;
        break;
      case 'knowledge_master_1000':
        progress = Math.min(gameState.statistics.correctAnswers, 1000);
        shouldUnlock = gameState.statistics.correctAnswers >= 1000;
        break;
      case 'knowledge_master_10000':
        progress = Math.min(gameState.statistics.correctAnswers, 10000);
        shouldUnlock = gameState.statistics.correctAnswers >= 10000;
        break;
      case 'gardener_first':
        progress = gameState.gardenOfGrowth.isPlanted ? 1 : 0;
        shouldUnlock = gameState.gardenOfGrowth.isPlanted;
        break;
      case 'gardener_master':
        progress = Math.min(gameState.gardenOfGrowth.growthCm, 50);
        shouldUnlock = gameState.gardenOfGrowth.growthCm >= 50;
        break;
      case 'gardener_legend':
        progress = Math.min(gameState.gardenOfGrowth.growthCm, 100);
        shouldUnlock = gameState.gardenOfGrowth.growthCm >= 100;
        break;
    }

    if (shouldUnlock && !existing?.unlocked) {
      newUnlocks.push({
        ...def,
        unlocked: true,
        unlockedAt: new Date(),
        progress: def.maxProgress
      });
    } else if (existing) {
      existing.progress = progress;
    }
  });

  return newUnlocks;
};

export const initializeAchievements = (): Achievement[] => {
  return achievementDefinitions.map(def => ({
    ...def,
    unlocked: false,
    progress: 0
  }));
};