import { useState, useEffect, useCallback } from 'react';
import { GameState, Weapon, Armor, Enemy, ChestReward, Achievement, PlayerTag, DailyReward, MenuSkill, AdventureSkill } from '../types/game';
import { generateWeapon, generateArmor, generateEnemy, getChestRarityWeights, generateRelicItem, generateMythicalWeapon, generateMythicalArmor } from '../utils/gameUtils';
import { checkAchievements, initializeAchievements } from '../utils/achievements';
import { checkPlayerTags, initializePlayerTags } from '../utils/playerTags';
import AsyncStorage from '../utils/storage';

const STORAGE_KEY = 'hugoland_game_state';

const createInitialGameState = (): GameState => ({
  coins: 500,
  gems: 50,
  shinyGems: 0,
  zone: 1,
  playerStats: {
    hp: 100,
    maxHp: 100,
    atk: 20,
    def: 10,
    baseAtk: 20,
    baseDef: 10,
    baseHp: 100
  },
  inventory: {
    weapons: [],
    armor: [],
    relics: [],
    currentWeapon: null,
    currentArmor: null,
    equippedRelics: []
  },
  currentEnemy: null,
  inCombat: false,
  combatLog: [],
  isPremium: false,
  achievements: initializeAchievements(),
  collectionBook: {
    weapons: {},
    armor: {},
    totalWeaponsFound: 0,
    totalArmorFound: 0,
    rarityStats: {
      common: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
      mythical: 0
    }
  },
  knowledgeStreak: {
    current: 0,
    best: 0,
    multiplier: 1
  },
  gameMode: {
    current: 'normal',
    speedModeActive: false,
    survivalLives: 3,
    maxSurvivalLives: 3
  },
  statistics: {
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    totalPlayTime: 0,
    zonesReached: 1,
    itemsCollected: 0,
    coinsEarned: 0,
    gemsEarned: 0,
    shinyGemsEarned: 0,
    chestsOpened: 0,
    accuracyByCategory: {},
    sessionStartTime: new Date(),
    totalDeaths: 0,
    totalVictories: 0,
    longestStreak: 0,
    fastestVictory: 0,
    totalDamageDealt: 0,
    totalDamageTaken: 0,
    itemsUpgraded: 0,
    itemsSold: 0,
    totalResearchSpent: 0,
    averageAccuracy: 0,
    revivals: 0
  },
  cheats: {
    infiniteCoins: false,
    infiniteGems: false,
    obtainAnyItem: false
  },
  mining: {
    totalGemsMined: 0,
    totalShinyGemsMined: 0
  },
  yojefMarket: {
    items: [],
    lastRefresh: new Date(),
    nextRefresh: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
  },
  playerTags: initializePlayerTags(),
  dailyRewards: {
    lastClaimDate: null,
    currentStreak: 0,
    maxStreak: 0,
    availableReward: null,
    rewardHistory: []
  },
  progression: {
    level: 1,
    experience: 0,
    experienceToNext: 100,
    skillPoints: 0,
    unlockedSkills: [],
    prestigeLevel: 0,
    prestigePoints: 0,
    masteryLevels: {}
  },
  offlineProgress: {
    lastSaveTime: new Date(),
    offlineCoins: 0,
    offlineGems: 0,
    offlineTime: 0,
    maxOfflineHours: 24
  },
  gardenOfGrowth: {
    isPlanted: false,
    plantedAt: null,
    lastWatered: null,
    waterHoursRemaining: 0,
    growthCm: 0,
    totalGrowthBonus: 0,
    seedCost: 1000,
    waterCost: 1000,
    maxGrowthCm: 100
  },
  settings: {
    colorblindMode: false,
    darkMode: true,
    language: 'en',
    notifications: true,
    snapToGrid: false,
    beautyMode: false
  },
  hasUsedRevival: false,
  skills: {
    activeMenuSkill: null,
    lastRollTime: null,
    playTimeThisSession: 0,
    sessionStartTime: new Date()
  },
  adventureSkills: {
    selectedSkill: null,
    availableSkills: [],
    showSelectionModal: false,
    skillEffects: {
      skipCardUsed: false,
      metalShieldUsed: false,
      dodgeUsed: false,
      truthLiesActive: false,
      lightningChainActive: false,
      rampActive: false,
      berserkerActive: false,
      vampiricActive: false,
      phoenixUsed: false,
      timeSlowActive: false,
      criticalStrikeActive: false,
      shieldWallActive: false,
      poisonBladeActive: false,
      arcaneShieldActive: false,
      battleFrenzyActive: false,
      elementalMasteryActive: false,
      shadowStepUsed: false,
      healingAuraActive: false,
      doubleStrikeActive: false,
      manaShieldActive: false,
      berserkRageActive: false,
      divineProtectionUsed: false,
      stormCallActive: false,
      bloodPactActive: false,
      frostArmorActive: false,
      fireballActive: false
    }
  },
  research: {
    level: 1,
    experience: 0,
    experienceToNext: 100,
    totalSpent: 0,
    bonuses: {
      atk: 0,
      def: 0,
      hp: 0,
      coinMultiplier: 1,
      gemMultiplier: 1,
      xpMultiplier: 1
    }
  },
  multipliers: {
    coins: 1,
    gems: 1,
    atk: 1,
    def: 1,
    hp: 1
  }
});

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate total player stats including equipment and bonuses
  const calculatePlayerStats = useCallback((state: GameState) => {
    let totalAtk = state.playerStats.baseAtk;
    let totalDef = state.playerStats.baseDef;
    let totalHp = state.playerStats.baseHp;

    // Add weapon attack
    if (state.inventory.currentWeapon) {
      const weaponAtk = state.inventory.currentWeapon.baseAtk + (state.inventory.currentWeapon.level - 1) * 10;
      // Apply durability penalty (items lose effectiveness as durability decreases)
      const durabilityMultiplier = state.inventory.currentWeapon.durability / state.inventory.currentWeapon.maxDurability;
      totalAtk += Math.floor(weaponAtk * durabilityMultiplier);
    }

    // Add armor defense
    if (state.inventory.currentArmor) {
      const armorDef = state.inventory.currentArmor.baseDef + (state.inventory.currentArmor.level - 1) * 5;
      // Apply durability penalty
      const durabilityMultiplier = state.inventory.currentArmor.durability / state.inventory.currentArmor.maxDurability;
      totalDef += Math.floor(armorDef * durabilityMultiplier);
    }

    // Add relic bonuses
    state.inventory.equippedRelics.forEach(relic => {
      if (relic.type === 'weapon' && relic.baseAtk) {
        totalAtk += relic.baseAtk + (relic.level - 1) * 22;
      } else if (relic.type === 'armor' && relic.baseDef) {
        totalDef += relic.baseDef + (relic.level - 1) * 15;
      }
    });

    // Add research bonuses
    totalAtk += state.research.bonuses.atk;
    totalDef += state.research.bonuses.def;
    totalHp += state.research.bonuses.hp;

    // Add garden bonuses
    const gardenBonus = state.gardenOfGrowth.totalGrowthBonus / 100;
    totalAtk = Math.floor(totalAtk * (1 + gardenBonus));
    totalDef = Math.floor(totalDef * (1 + gardenBonus));
    totalHp = Math.floor(totalHp * (1 + gardenBonus));

    // Apply multipliers
    totalAtk = Math.floor(totalAtk * state.multipliers.atk);
    totalDef = Math.floor(totalDef * state.multipliers.def);
    totalHp = Math.floor(totalHp * state.multipliers.hp);

    return {
      ...state.playerStats,
      atk: totalAtk,
      def: totalDef,
      maxHp: totalHp,
      hp: Math.min(state.playerStats.hp, totalHp) // Don't exceed new max HP
    };
  }, []);

  // Reduce item durability during combat
  const reduceDurability = useCallback((state: GameState, amount: number = 1): GameState => {
    let newState = { ...state };

    // Reduce weapon durability
    if (newState.inventory.currentWeapon && newState.inventory.currentWeapon.durability > 0) {
      const weaponIndex = newState.inventory.weapons.findIndex(w => w.id === newState.inventory.currentWeapon!.id);
      if (weaponIndex !== -1) {
        const updatedWeapons = [...newState.inventory.weapons];
        updatedWeapons[weaponIndex] = {
          ...updatedWeapons[weaponIndex],
          durability: Math.max(0, updatedWeapons[weaponIndex].durability - amount)
        };
        
        newState = {
          ...newState,
          inventory: {
            ...newState.inventory,
            weapons: updatedWeapons,
            currentWeapon: updatedWeapons[weaponIndex]
          }
        };
      }
    }

    // Reduce armor durability
    if (newState.inventory.currentArmor && newState.inventory.currentArmor.durability > 0) {
      const armorIndex = newState.inventory.armor.findIndex(a => a.id === newState.inventory.currentArmor!.id);
      if (armorIndex !== -1) {
        const updatedArmor = [...newState.inventory.armor];
        updatedArmor[armorIndex] = {
          ...updatedArmor[armorIndex],
          durability: Math.max(0, updatedArmor[armorIndex].durability - amount)
        };
        
        newState = {
          ...newState,
          inventory: {
            ...newState.inventory,
            armor: updatedArmor,
            currentArmor: updatedArmor[armorIndex]
          }
        };
      }
    }

    return newState;
  }, []);

  // Load game state from storage
  useEffect(() => {
    const loadGameState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          // Ensure all required properties exist
          const completeState = {
            ...createInitialGameState(),
            ...parsedState,
            // Ensure dates are properly parsed
            statistics: {
              ...createInitialGameState().statistics,
              ...parsedState.statistics,
              sessionStartTime: new Date(parsedState.statistics?.sessionStartTime || Date.now())
            },
            offlineProgress: {
              ...createInitialGameState().offlineProgress,
              ...parsedState.offlineProgress,
              lastSaveTime: new Date(parsedState.offlineProgress?.lastSaveTime || Date.now())
            }
          };
          
          // Recalculate player stats with equipment
          const stateWithStats = {
            ...completeState,
            playerStats: calculatePlayerStats(completeState)
          };
          
          setGameState(stateWithStats);
        } else {
          setGameState(createInitialGameState());
        }
      } catch (error) {
        console.error('Error loading game state:', error);
        setGameState(createInitialGameState());
      } finally {
        setIsLoading(false);
      }
    };

    loadGameState();
  }, [calculatePlayerStats]);

  // Save game state to storage
  const saveGameState = useCallback(async (state: GameState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, []);

  // Auto-save when game state changes
  useEffect(() => {
    if (gameState && !isLoading) {
      saveGameState(gameState);
    }
  }, [gameState, isLoading, saveGameState]);

  const updateGameState = useCallback((updater: (state: GameState) => GameState) => {
    setGameState(prevState => {
      if (!prevState) return null;
      const newState = updater(prevState);
      // Recalculate player stats after any state change
      return {
        ...newState,
        playerStats: calculatePlayerStats(newState)
      };
    });
  }, [calculatePlayerStats]);

  // Equipment functions
  const equipWeapon = useCallback((weapon: Weapon) => {
    updateGameState(state => ({
      ...state,
      inventory: {
        ...state.inventory,
        currentWeapon: weapon
      }
    }));
  }, [updateGameState]);

  const equipArmor = useCallback((armor: Armor) => {
    updateGameState(state => ({
      ...state,
      inventory: {
        ...state.inventory,
        currentArmor: armor
      }
    }));
  }, [updateGameState]);

  const upgradeWeapon = useCallback((weaponId: string) => {
    updateGameState(state => {
      const weapon = state.inventory.weapons.find(w => w.id === weaponId);
      if (!weapon || state.gems < weapon.upgradeCost) return state;
      
      const weaponIndex = state.inventory.weapons.findIndex(w => w.id === weaponId);
      if (weaponIndex === -1) return state;

      const updatedWeapons = [...state.inventory.weapons];
      updatedWeapons[weaponIndex] = {
        ...updatedWeapons[weaponIndex],
        level: updatedWeapons[weaponIndex].level + 1,
        upgradeCost: Math.floor(updatedWeapons[weaponIndex].upgradeCost * 1.5)
      };

      // Update current weapon if it's the one being upgraded
      const newCurrentWeapon = state.inventory.currentWeapon?.id === weaponId 
        ? updatedWeapons[weaponIndex] 
        : state.inventory.currentWeapon;

      return {
        ...state,
        gems: state.gems - weapon.upgradeCost,
        inventory: {
          ...state.inventory,
          weapons: updatedWeapons,
          currentWeapon: newCurrentWeapon
        }
      };
    });
  }, [updateGameState]);

  const upgradeArmor = useCallback((armorId: string) => {
    updateGameState(state => {
      const armor = state.inventory.armor.find(a => a.id === armorId);
      if (!armor || state.gems < armor.upgradeCost) return state;
      
      const armorIndex = state.inventory.armor.findIndex(a => a.id === armorId);
      if (armorIndex === -1) return state;

      const updatedArmor = [...state.inventory.armor];
      updatedArmor[armorIndex] = {
        ...updatedArmor[armorIndex],
        level: updatedArmor[armorIndex].level + 1,
        upgradeCost: Math.floor(updatedArmor[armorIndex].upgradeCost * 1.5)
      };

      // Update current armor if it's the one being upgraded
      const newCurrentArmor = state.inventory.currentArmor?.id === armorId 
        ? updatedArmor[armorIndex] 
        : state.inventory.currentArmor;

      return {
        ...state,
        gems: state.gems - armor.upgradeCost,
        inventory: {
          ...state.inventory,
          armor: updatedArmor,
          currentArmor: newCurrentArmor
        }
      };
    });
  }, [updateGameState]);

  const sellWeapon = useCallback((weaponId: string) => {
    updateGameState(state => {
      const weapon = state.inventory.weapons.find(w => w.id === weaponId);
      if (!weapon || weapon.id === state.inventory.currentWeapon?.id) return state;

      return {
        ...state,
        coins: state.coins + weapon.sellPrice,
        inventory: {
          ...state.inventory,
          weapons: state.inventory.weapons.filter(w => w.id !== weaponId)
        }
      };
    });
  }, [updateGameState]);

  const sellArmor = useCallback((armorId: string) => {
    updateGameState(state => {
      const armor = state.inventory.armor.find(a => a.id === armorId);
      if (!armor || armor.id === state.inventory.currentArmor?.id) return state;

      return {
        ...state,
        coins: state.coins + armor.sellPrice,
        inventory: {
          ...state.inventory,
          armor: state.inventory.armor.filter(a => a.id !== armorId)
        }
      };
    });
  }, [updateGameState]);

  // Shop functions
  const openChest = useCallback((cost: number): ChestReward | null => {
    if (!gameState || gameState.coins < cost) return null;

    const weights = getChestRarityWeights(cost);
    const random = Math.random() * 100;
    let rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical' = 'common';
    let cumulative = 0;

    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        rarity = ['common', 'rare', 'epic', 'legendary', 'mythical'][i] as any;
        break;
      }
    }

    const isWeapon = Math.random() < 0.5;
    const item = isWeapon ? generateWeapon(false, rarity) : generateArmor(false, rarity);

    updateGameState(state => ({
      ...state,
      coins: state.coins - cost,
      gems: state.gems + Math.floor(Math.random() * 10) + 5,
      inventory: {
        ...state.inventory,
        weapons: isWeapon ? [...state.inventory.weapons, item as Weapon] : state.inventory.weapons,
        armor: !isWeapon ? [...state.inventory.armor, item as Armor] : state.inventory.armor
      },
      statistics: {
        ...state.statistics,
        chestsOpened: state.statistics.chestsOpened + 1
      }
    }));

    return {
      type: isWeapon ? 'weapon' : 'armor',
      items: [item]
    };
  }, [gameState, updateGameState]);

  const purchaseMythical = useCallback((cost: number): boolean => {
    if (!gameState || gameState.coins < cost) return false;

    const isWeapon = Math.random() < 0.5;
    const item = isWeapon ? generateMythicalWeapon() : generateMythicalArmor();

    updateGameState(state => ({
      ...state,
      coins: state.coins - cost,
      inventory: {
        ...state.inventory,
        weapons: isWeapon ? [...state.inventory.weapons, item as Weapon] : state.inventory.weapons,
        armor: !isWeapon ? [...state.inventory.armor, item as Armor] : state.inventory.armor
      }
    }));

    return true;
  }, [gameState, updateGameState]);

  // Combat functions
  const startCombat = useCallback(() => {
    if (!gameState) return;

    const enemy = generateEnemy(gameState.zone);
    
    updateGameState(state => ({
      ...state,
      currentEnemy: enemy,
      inCombat: true,
      combatLog: [`You encounter ${enemy.name} in Zone ${enemy.zone}!`]
    }));
  }, [gameState, updateGameState]);

  const attack = useCallback((hit: boolean, category?: string) => {
    if (!gameState || !gameState.currentEnemy) return;

    updateGameState(state => {
      if (!state.currentEnemy) return state;

      let newState = { ...state };
      const enemy = { ...state.currentEnemy };
      let combatLog = [...state.combatLog];

      if (hit) {
        // Player hits enemy - reduce equipment durability
        newState = reduceDurability(newState, 1);
        
        // Calculate damage with current stats (including equipment bonuses)
        const playerStats = calculatePlayerStats(newState);
        const damage = Math.max(1, playerStats.atk - enemy.def);
        enemy.hp = Math.max(0, enemy.hp - damage);
        combatLog.push(`You deal ${damage} damage to ${enemy.name}!`);

        // Update knowledge streak
        newState.knowledgeStreak = {
          ...state.knowledgeStreak,
          current: state.knowledgeStreak.current + 1,
          best: Math.max(state.knowledgeStreak.best, state.knowledgeStreak.current + 1),
          multiplier: 1 + (state.knowledgeStreak.current + 1) * 0.1
        };

        // Update statistics
        newState.statistics = {
          ...state.statistics,
          correctAnswers: state.statistics.correctAnswers + 1,
          totalQuestionsAnswered: state.statistics.totalQuestionsAnswered + 1
        };

        if (category) {
          const categoryStats = state.statistics.accuracyByCategory[category] || { correct: 0, total: 0 };
          newState.statistics.accuracyByCategory = {
            ...state.statistics.accuracyByCategory,
            [category]: {
              correct: categoryStats.correct + 1,
              total: categoryStats.total + 1
            }
          };
        }

        if (enemy.hp <= 0) {
          // Enemy defeated
          combatLog.push(`${enemy.name} is defeated!`);
          const coinReward = Math.floor((10 + state.zone * 5) * state.knowledgeStreak.multiplier);
          const gemReward = Math.floor((1 + Math.floor(state.zone / 5)) * state.knowledgeStreak.multiplier);
          
          newState = {
            ...newState,
            coins: state.coins + coinReward,
            gems: state.gems + gemReward,
            zone: state.zone + 1,
            currentEnemy: null,
            inCombat: false,
            isPremium: state.zone + 1 >= 50,
            statistics: {
              ...newState.statistics,
              totalVictories: state.statistics.totalVictories + 1,
              coinsEarned: state.statistics.coinsEarned + coinReward,
              gemsEarned: state.statistics.gemsEarned + gemReward,
              zonesReached: Math.max(state.statistics.zonesReached, state.zone + 1)
            }
          };
          
          combatLog.push(`You earned ${coinReward} coins and ${gemReward} gems!`);
        }
      } else {
        // Player misses, enemy attacks - reduce equipment durability from taking damage
        newState = reduceDurability(newState, 2); // More durability loss when taking damage
        
        const damage = Math.max(1, enemy.atk - newState.playerStats.def);
        newState.playerStats = {
          ...newState.playerStats,
          hp: Math.max(0, newState.playerStats.hp - damage)
        };
        combatLog.push(`${enemy.name} deals ${damage} damage to you!`);

        // Reset knowledge streak
        newState.knowledgeStreak = {
          ...state.knowledgeStreak,
          current: 0,
          multiplier: 1
        };

        // Update statistics
        newState.statistics = {
          ...state.statistics,
          totalQuestionsAnswered: state.statistics.totalQuestionsAnswered + 1
        };

        if (category) {
          const categoryStats = state.statistics.accuracyByCategory[category] || { correct: 0, total: 0 };
          newState.statistics.accuracyByCategory = {
            ...state.statistics.accuracyByCategory,
            [category]: {
              correct: categoryStats.correct,
              total: categoryStats.total + 1
            }
          };
        }

        if (newState.playerStats.hp <= 0) {
          combatLog.push('You have been defeated!');
          newState = {
            ...newState,
            currentEnemy: null,
            inCombat: false,
            statistics: {
              ...newState.statistics,
              totalDeaths: state.statistics.totalDeaths + 1
            }
          };
        }
      }

      return {
        ...newState,
        currentEnemy: enemy.hp > 0 ? enemy : null,
        combatLog
      };
    });
  }, [gameState, updateGameState, reduceDurability, calculatePlayerStats]);

  // Game management functions
  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  const setGameMode = useCallback((mode: 'normal' | 'blitz' | 'bloodlust' | 'survival') => {
    updateGameState(state => ({
      ...state,
      gameMode: {
        ...state.gameMode,
        current: mode,
        survivalLives: mode === 'survival' ? 3 : state.gameMode.survivalLives
      }
    }));
  }, [updateGameState]);

  // Cheat functions
  const toggleCheat = useCallback((cheat: keyof typeof gameState.cheats) => {
    if (!gameState) return;
    
    updateGameState(state => ({
      ...state,
      cheats: {
        ...state.cheats,
        [cheat]: !state.cheats[cheat]
      }
    }));
  }, [gameState, updateGameState]);

  const generateCheatItem = useCallback(() => {
    // Implementation for cheat item generation
  }, []);

  // Mining functions
  const mineGem = useCallback((x: number, y: number) => {
    const isShiny = Math.random() < 0.05;
    const gemsFound = isShiny ? 0 : 1;
    const shinyGemsFound = isShiny ? 1 : 0;

    updateGameState(state => ({
      ...state,
      gems: state.gems + gemsFound,
      shinyGems: state.shinyGems + shinyGemsFound,
      mining: {
        totalGemsMined: state.mining.totalGemsMined + gemsFound,
        totalShinyGemsMined: state.mining.totalShinyGemsMined + shinyGemsFound
      }
    }));

    return { gems: gemsFound, shinyGems: shinyGemsFound };
  }, [updateGameState]);

  const exchangeShinyGems = useCallback((amount: number): boolean => {
    if (!gameState || gameState.shinyGems < amount) return false;

    updateGameState(state => ({
      ...state,
      shinyGems: state.shinyGems - amount,
      gems: state.gems + (amount * 10)
    }));

    return true;
  }, [gameState, updateGameState]);

  // Utility functions
  const discardItem = useCallback((itemId: string, type: 'weapon' | 'armor') => {
    updateGameState(state => ({
      ...state,
      inventory: {
        ...state.inventory,
        weapons: type === 'weapon' ? state.inventory.weapons.filter(w => w.id !== itemId) : state.inventory.weapons,
        armor: type === 'armor' ? state.inventory.armor.filter(a => a.id !== itemId) : state.inventory.armor
      }
    }));
  }, [updateGameState]);

  // Relic functions
  const purchaseRelic = useCallback((relicId: string): boolean => {
    if (!gameState) return false;
    
    const relic = gameState.yojefMarket.items.find(item => item.id === relicId);
    if (!relic || gameState.gems < relic.cost) return false;

    updateGameState(state => ({
      ...state,
      gems: state.gems - relic.cost,
      inventory: {
        ...state.inventory,
        relics: [...state.inventory.relics, relic],
        equippedRelics: [...state.inventory.equippedRelics, relic]
      },
      yojefMarket: {
        ...state.yojefMarket,
        items: state.yojefMarket.items.filter(item => item.id !== relicId)
      }
    }));

    return true;
  }, [gameState, updateGameState]);

  const upgradeRelic = useCallback((relicId: string) => {
    updateGameState(state => {
      const relicIndex = state.inventory.equippedRelics.findIndex(r => r.id === relicId);
      if (relicIndex === -1 || state.gems < state.inventory.equippedRelics[relicIndex].upgradeCost) return state;

      const updatedRelics = [...state.inventory.equippedRelics];
      const relic = updatedRelics[relicIndex];
      
      updatedRelics[relicIndex] = {
        ...relic,
        level: relic.level + 1,
        baseAtk: relic.baseAtk ? relic.baseAtk + 22 : undefined,
        baseDef: relic.baseDef ? relic.baseDef + 15 : undefined,
        upgradeCost: Math.floor(relic.upgradeCost * 1.5)
      };

      return {
        ...state,
        gems: state.gems - relic.upgradeCost,
        inventory: {
          ...state.inventory,
          equippedRelics: updatedRelics
        }
      };
    });
  }, [updateGameState]);

  const equipRelic = useCallback((relicId: string) => {
    updateGameState(state => {
      const relic = state.inventory.relics.find(r => r.id === relicId);
      if (!relic) return state;

      return {
        ...state,
        inventory: {
          ...state.inventory,
          equippedRelics: [...state.inventory.equippedRelics, relic]
        }
      };
    });
  }, [updateGameState]);

  const unequipRelic = useCallback((relicId: string) => {
    updateGameState(state => ({
      ...state,
      inventory: {
        ...state.inventory,
        equippedRelics: state.inventory.equippedRelics.filter(r => r.id !== relicId)
      }
    }));
  }, [updateGameState]);

  const sellRelic = useCallback((relicId: string) => {
    updateGameState(state => {
      const relic = state.inventory.relics.find(r => r.id === relicId);
      if (!relic) return state;

      return {
        ...state,
        gems: state.gems + Math.floor(relic.cost * 0.5),
        inventory: {
          ...state.inventory,
          relics: state.inventory.relics.filter(r => r.id !== relicId)
        }
      };
    });
  }, [updateGameState]);

  // Daily rewards
  const claimDailyReward = useCallback((): boolean => {
    if (!gameState?.dailyRewards.availableReward) return false;

    const reward = gameState.dailyRewards.availableReward;
    
    updateGameState(state => ({
      ...state,
      coins: state.coins + reward.coins,
      gems: state.gems + reward.gems,
      dailyRewards: {
        ...state.dailyRewards,
        availableReward: null,
        lastClaimDate: new Date(),
        rewardHistory: [...state.dailyRewards.rewardHistory, { ...reward, claimed: true, claimDate: new Date() }]
      }
    }));

    return true;
  }, [gameState, updateGameState]);

  // Progression functions
  const upgradeSkill = useCallback((skillId: string): boolean => {
    if (!gameState || gameState.progression.skillPoints < 1) return false;

    updateGameState(state => ({
      ...state,
      progression: {
        ...state.progression,
        skillPoints: state.progression.skillPoints - 1,
        unlockedSkills: [...state.progression.unlockedSkills, skillId]
      }
    }));

    return true;
  }, [gameState, updateGameState]);

  const prestige = useCallback((): boolean => {
    if (!gameState || gameState.progression.level < 50) return false;

    const prestigePoints = Math.floor(gameState.progression.level / 10);
    
    updateGameState(state => ({
      ...state,
      progression: {
        ...state.progression,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        prestigeLevel: state.progression.prestigeLevel + 1,
        prestigePoints: state.progression.prestigePoints + prestigePoints
      }
    }));

    return true;
  }, [gameState, updateGameState]);

  // Offline progress
  const claimOfflineRewards = useCallback(() => {
    updateGameState(state => ({
      ...state,
      coins: state.coins + state.offlineProgress.offlineCoins,
      gems: state.gems + state.offlineProgress.offlineGems,
      offlineProgress: {
        ...state.offlineProgress,
        offlineCoins: 0,
        offlineGems: 0,
        offlineTime: 0
      }
    }));
  }, [updateGameState]);

  // Bulk actions
  const bulkSell = useCallback((itemIds: string[], type: 'weapon' | 'armor') => {
    updateGameState(state => {
      let totalValue = 0;
      let newWeapons = [...state.inventory.weapons];
      let newArmor = [...state.inventory.armor];

      if (type === 'weapon') {
        itemIds.forEach(id => {
          const weapon = newWeapons.find(w => w.id === id);
          if (weapon && weapon.id !== state.inventory.currentWeapon?.id) {
            totalValue += weapon.sellPrice;
            newWeapons = newWeapons.filter(w => w.id !== id);
          }
        });
      } else {
        itemIds.forEach(id => {
          const armor = newArmor.find(a => a.id === id);
          if (armor && armor.id !== state.inventory.currentArmor?.id) {
            totalValue += armor.sellPrice;
            newArmor = newArmor.filter(a => a.id !== id);
          }
        });
      }

      return {
        ...state,
        coins: state.coins + totalValue,
        inventory: {
          ...state.inventory,
          weapons: newWeapons,
          armor: newArmor
        }
      };
    });
  }, [updateGameState]);

  const bulkUpgrade = useCallback((itemIds: string[], type: 'weapon' | 'armor') => {
    updateGameState(state => {
      let totalCost = 0;
      let newWeapons = [...state.inventory.weapons];
      let newArmor = [...state.inventory.armor];

      if (type === 'weapon') {
        itemIds.forEach(id => {
          const weaponIndex = newWeapons.findIndex(w => w.id === id);
          if (weaponIndex !== -1) {
            totalCost += newWeapons[weaponIndex].upgradeCost;
            newWeapons[weaponIndex] = {
              ...newWeapons[weaponIndex],
              level: newWeapons[weaponIndex].level + 1,
              upgradeCost: Math.floor(newWeapons[weaponIndex].upgradeCost * 1.5)
            };
          }
        });
      } else {
        itemIds.forEach(id => {
          const armorIndex = newArmor.findIndex(a => a.id === id);
          if (armorIndex !== -1) {
            totalCost += newArmor[armorIndex].upgradeCost;
            newArmor[armorIndex] = {
              ...newArmor[armorIndex],
              level: newArmor[armorIndex].level + 1,
              upgradeCost: Math.floor(newArmor[armorIndex].upgradeCost * 1.5)
            };
          }
        });
      }

      if (state.gems < totalCost) return state;

      // Update current weapon/armor if they were upgraded
      const newCurrentWeapon = state.inventory.currentWeapon 
        ? newWeapons.find(w => w.id === state.inventory.currentWeapon!.id) || state.inventory.currentWeapon
        : null;
      
      const newCurrentArmor = state.inventory.currentArmor 
        ? newArmor.find(a => a.id === state.inventory.currentArmor!.id) || state.inventory.currentArmor
        : null;

      return {
        ...state,
        gems: state.gems - totalCost,
        inventory: {
          ...state.inventory,
          weapons: newWeapons,
          armor: newArmor,
          currentWeapon: newCurrentWeapon,
          currentArmor: newCurrentArmor
        }
      };
    });
  }, [updateGameState]);

  // Garden functions
  const plantSeed = useCallback((): boolean => {
    if (!gameState || gameState.coins < gameState.gardenOfGrowth.seedCost || gameState.gardenOfGrowth.isPlanted) {
      return false;
    }

    updateGameState(state => ({
      ...state,
      coins: state.coins - state.gardenOfGrowth.seedCost,
      gardenOfGrowth: {
        ...state.gardenOfGrowth,
        isPlanted: true,
        plantedAt: new Date(),
        lastWatered: new Date(),
        waterHoursRemaining: 24
      }
    }));

    return true;
  }, [gameState, updateGameState]);

  const buyWater = useCallback((hours: number): boolean => {
    if (!gameState || gameState.coins < gameState.gardenOfGrowth.waterCost) {
      return false;
    }

    updateGameState(state => ({
      ...state,
      coins: state.coins - state.gardenOfGrowth.waterCost,
      gardenOfGrowth: {
        ...state.gardenOfGrowth,
        waterHoursRemaining: state.gardenOfGrowth.waterHoursRemaining + hours,
        lastWatered: new Date()
      }
    }));

    return true;
  }, [gameState, updateGameState]);

  // Settings
  const updateSettings = useCallback((newSettings: Partial<typeof gameState.settings>) => {
    updateGameState(state => ({
      ...state,
      settings: {
        ...state.settings,
        ...newSettings
      }
    }));
  }, [updateGameState]);

  // Dev tools
  const addCoins = useCallback((amount: number) => {
    updateGameState(state => ({
      ...state,
      coins: state.coins + amount
    }));
  }, [updateGameState]);

  const addGems = useCallback((amount: number) => {
    updateGameState(state => ({
      ...state,
      gems: state.gems + amount
    }));
  }, [updateGameState]);

  const teleportToZone = useCallback((zone: number) => {
    updateGameState(state => ({
      ...state,
      zone: Math.max(1, zone)
    }));
  }, [updateGameState]);

  const setExperience = useCallback((xp: number) => {
    updateGameState(state => ({
      ...state,
      progression: {
        ...state.progression,
        experience: Math.max(0, xp)
      }
    }));
  }, [updateGameState]);

  // Skills
  const rollSkill = useCallback((): boolean => {
    if (!gameState || gameState.coins < 100) return false;

    // Generate random skill
    const skillTypes = [
      'coin_vacuum', 'treasurer', 'xp_surge', 'luck_gem', 'enchanter',
      'time_warp', 'golden_touch', 'knowledge_boost', 'durability_master',
      'relic_finder', 'stat_amplifier', 'question_master', 'gem_magnet',
      'streak_guardian', 'revival_blessing', 'zone_skipper', 'item_duplicator',
      'research_accelerator', 'garden_booster', 'market_refresh'
    ];

    const randomType = skillTypes[Math.floor(Math.random() * skillTypes.length)] as MenuSkill['type'];
    const duration = Math.floor(Math.random() * 8) + 1; // 1-8 hours
    const now = new Date();
    const expiresAt = new Date(now.getTime() + duration * 60 * 60 * 1000);

    const newSkill: MenuSkill = {
      id: Math.random().toString(36).substr(2, 9),
      name: randomType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: `A powerful skill that lasts ${duration} hours`,
      duration,
      activatedAt: now,
      expiresAt,
      type: randomType
    };

    updateGameState(state => ({
      ...state,
      coins: state.coins - 100,
      skills: {
        ...state.skills,
        activeMenuSkill: newSkill,
        lastRollTime: now
      }
    }));

    return true;
  }, [gameState, updateGameState]);

  // Adventure skills
  const selectAdventureSkill = useCallback((skill: AdventureSkill) => {
    updateGameState(state => ({
      ...state,
      adventureSkills: {
        ...state.adventureSkills,
        selectedSkill: skill,
        showSelectionModal: false
      }
    }));
  }, [updateGameState]);

  const skipAdventureSkills = useCallback(() => {
    updateGameState(state => ({
      ...state,
      adventureSkills: {
        ...state.adventureSkills,
        selectedSkill: null,
        showSelectionModal: false
      }
    }));
  }, [updateGameState]);

  const useSkipCard = useCallback(() => {
    updateGameState(state => ({
      ...state,
      adventureSkills: {
        ...state.adventureSkills,
        skillEffects: {
          ...state.adventureSkills.skillEffects,
          skipCardUsed: true
        }
      }
    }));
  }, [updateGameState]);

  return {
    gameState,
    isLoading,
    equipWeapon,
    equipArmor,
    upgradeWeapon,
    upgradeArmor,
    sellWeapon,
    sellArmor,
    openChest,
    purchaseMythical,
    startCombat,
    attack,
    resetGame,
    setGameMode,
    toggleCheat,
    generateCheatItem,
    mineGem,
    exchangeShinyGems,
    discardItem,
    purchaseRelic,
    upgradeRelic,
    equipRelic,
    unequipRelic,
    sellRelic,
    claimDailyReward,
    upgradeSkill,
    prestige,
    claimOfflineRewards,
    bulkSell,
    bulkUpgrade,
    plantSeed,
    buyWater,
    updateSettings,
    addCoins,
    addGems,
    teleportToZone,
    setExperience,
    rollSkill,
    selectAdventureSkill,
    skipAdventureSkills,
    useSkipCard,
  };
};

export default useGameState;