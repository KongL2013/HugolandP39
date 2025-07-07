import { useState, useEffect, useCallback } from 'react';
import { GameState, Weapon, Armor, ChestReward, Enemy, Achievement, PlayerTag, DailyReward, MenuSkill, AdventureSkill, MerchantReward } from '../types/game';
import { generateWeapon, generateArmor, generateEnemy, getChestRarityWeights, generateRelicItem } from '../utils/gameUtils';
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
    atk: 25,
    def: 15,
    baseAtk: 25,
    baseDef: 15,
    baseHp: 100,
  },
  inventory: {
    weapons: [],
    armor: [],
    relics: [],
    currentWeapon: null,
    currentArmor: null,
    equippedRelics: [],
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
      mythical: 0,
    },
  },
  knowledgeStreak: {
    current: 0,
    best: 0,
    multiplier: 1,
  },
  gameMode: {
    current: 'normal',
    speedModeActive: false,
    survivalLives: 3,
    maxSurvivalLives: 3,
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
    revivals: 0,
  },
  cheats: {
    infiniteCoins: false,
    infiniteGems: false,
    obtainAnyItem: false,
  },
  mining: {
    totalGemsMined: 0,
    totalShinyGemsMined: 0,
  },
  yojefMarket: {
    items: [],
    lastRefresh: new Date(),
    nextRefresh: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
  },
  playerTags: initializePlayerTags(),
  dailyRewards: {
    lastClaimDate: null,
    currentStreak: 0,
    maxStreak: 0,
    availableReward: null,
    rewardHistory: [],
  },
  progression: {
    level: 1,
    experience: 0,
    experienceToNext: 100,
    skillPoints: 0,
    unlockedSkills: [],
    prestigeLevel: 0,
    prestigePoints: 0,
    masteryLevels: {},
  },
  offlineProgress: {
    lastSaveTime: new Date(),
    offlineCoins: 0,
    offlineGems: 0,
    offlineTime: 0,
    maxOfflineHours: 8,
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
    maxGrowthCm: 100,
  },
  settings: {
    colorblindMode: false,
    darkMode: true,
    language: 'en',
    notifications: true,
    snapToGrid: false,
    beautyMode: false,
  },
  hasUsedRevival: false,
  skills: {
    activeMenuSkill: null,
    lastRollTime: null,
    playTimeThisSession: 0,
    sessionStartTime: new Date(),
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
      fireballActive: false,
    },
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
      xpMultiplier: 1,
    },
  },
  multipliers: {
    coins: 1,
    gems: 1,
    atk: 1,
    def: 1,
    hp: 1,
  },
  merchant: {
    hugollandFragments: 0,
    totalFragmentsEarned: 0,
    lastFragmentZone: 0,
    showRewardModal: false,
    availableRewards: [],
  },
});

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load game state from storage
  useEffect(() => {
    const loadGameState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          
          // Convert date strings back to Date objects
          if (parsedState.statistics?.sessionStartTime) {
            parsedState.statistics.sessionStartTime = new Date(parsedState.statistics.sessionStartTime);
          }
          if (parsedState.offlineProgress?.lastSaveTime) {
            parsedState.offlineProgress.lastSaveTime = new Date(parsedState.offlineProgress.lastSaveTime);
          }
          if (parsedState.gardenOfGrowth?.plantedAt) {
            parsedState.gardenOfGrowth.plantedAt = new Date(parsedState.gardenOfGrowth.plantedAt);
          }
          if (parsedState.gardenOfGrowth?.lastWatered) {
            parsedState.gardenOfGrowth.lastWatered = new Date(parsedState.gardenOfGrowth.lastWatered);
          }
          if (parsedState.yojefMarket?.lastRefresh) {
            parsedState.yojefMarket.lastRefresh = new Date(parsedState.yojefMarket.lastRefresh);
          }
          if (parsedState.yojefMarket?.nextRefresh) {
            parsedState.yojefMarket.nextRefresh = new Date(parsedState.yojefMarket.nextRefresh);
          }
          if (parsedState.skills?.sessionStartTime) {
            parsedState.skills.sessionStartTime = new Date(parsedState.skills.sessionStartTime);
          }
          if (parsedState.skills?.lastRollTime) {
            parsedState.skills.lastRollTime = new Date(parsedState.skills.lastRollTime);
          }
          if (parsedState.skills?.activeMenuSkill?.activatedAt) {
            parsedState.skills.activeMenuSkill.activatedAt = new Date(parsedState.skills.activeMenuSkill.activatedAt);
          }
          if (parsedState.skills?.activeMenuSkill?.expiresAt) {
            parsedState.skills.activeMenuSkill.expiresAt = new Date(parsedState.skills.activeMenuSkill.expiresAt);
          }

          // Calculate offline progress
          const now = new Date();
          const lastSave = new Date(parsedState.offlineProgress.lastSaveTime);
          const offlineTimeSeconds = Math.floor((now.getTime() - lastSave.getTime()) / 1000);
          const maxOfflineSeconds = parsedState.offlineProgress.maxOfflineHours * 3600;
          const actualOfflineTime = Math.min(offlineTimeSeconds, maxOfflineSeconds);

          if (actualOfflineTime > 60) { // Only if offline for more than 1 minute
            const offlineCoinsPerSecond = parsedState.research.bonuses.coinMultiplier * 0.1;
            const offlineGemsPerSecond = parsedState.research.bonuses.gemMultiplier * 0.01;
            
            parsedState.offlineProgress.offlineTime = actualOfflineTime;
            parsedState.offlineProgress.offlineCoins = Math.floor(actualOfflineTime * offlineCoinsPerSecond);
            parsedState.offlineProgress.offlineGems = Math.floor(actualOfflineTime * offlineGemsPerSecond);
          }

          // Update garden growth
          if (parsedState.gardenOfGrowth.isPlanted && parsedState.gardenOfGrowth.waterHoursRemaining > 0) {
            const plantedAt = new Date(parsedState.gardenOfGrowth.plantedAt);
            const hoursGrown = Math.floor((now.getTime() - plantedAt.getTime()) / (1000 * 60 * 60));
            const waterHoursRemaining = Math.max(0, parsedState.gardenOfGrowth.waterHoursRemaining - hoursGrown);
            
            if (waterHoursRemaining > 0) {
              const growthRate = 0.5; // cm per hour
              const newGrowth = Math.min(
                parsedState.gardenOfGrowth.growthCm + (hoursGrown * growthRate),
                parsedState.gardenOfGrowth.maxGrowthCm
              );
              
              parsedState.gardenOfGrowth.growthCm = newGrowth;
              parsedState.gardenOfGrowth.totalGrowthBonus = newGrowth * 5; // 5% per cm
            }
            
            parsedState.gardenOfGrowth.waterHoursRemaining = waterHoursRemaining;
          }

          // Check if Yojef Market needs refresh
          const marketRefreshTime = new Date(parsedState.yojefMarket.nextRefresh);
          if (now >= marketRefreshTime) {
            // Refresh the market
            parsedState.yojefMarket.items = Array.from({ length: 3 }, () => generateRelicItem());
            parsedState.yojefMarket.lastRefresh = now;
            parsedState.yojefMarket.nextRefresh = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
          }

          // Check daily rewards
          const lastClaimDate = parsedState.dailyRewards.lastClaimDate ? new Date(parsedState.dailyRewards.lastClaimDate) : null;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (!lastClaimDate || lastClaimDate < today) {
            const daysSinceLastClaim = lastClaimDate ? Math.floor((today.getTime() - lastClaimDate.getTime()) / (1000 * 60 * 60 * 24)) : 1;
            
            if (daysSinceLastClaim === 1) {
              // Consecutive day
              parsedState.dailyRewards.currentStreak += 1;
            } else if (daysSinceLastClaim > 1) {
              // Streak broken
              parsedState.dailyRewards.currentStreak = 1;
            }
            
            parsedState.dailyRewards.maxStreak = Math.max(parsedState.dailyRewards.maxStreak, parsedState.dailyRewards.currentStreak);
            
            // Create available reward
            const day = Math.min(parsedState.dailyRewards.currentStreak, 5);
            parsedState.dailyRewards.availableReward = {
              day,
              coins: 50 + (day * 25),
              gems: 5 + Math.floor(day / 2),
              special: day === 5 ? 'Legendary Chest' : undefined,
              claimed: false,
            };
          }

          setGameState(parsedState);
        } else {
          const initialState = createInitialGameState();
          // Generate initial Yojef Market items
          initialState.yojefMarket.items = Array.from({ length: 3 }, () => generateRelicItem());
          setGameState(initialState);
        }
      } catch (error) {
        console.error('Error loading game state:', error);
        const initialState = createInitialGameState();
        initialState.yojefMarket.items = Array.from({ length: 3 }, () => generateRelicItem());
        setGameState(initialState);
      } finally {
        setIsLoading(false);
      }
    };

    loadGameState();
  }, []);

  // Save game state to storage
  const saveGameState = useCallback(async (state: GameState) => {
    try {
      // Update last save time
      state.offlineProgress.lastSaveTime = new Date();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, []);

  // Auto-save every 10 seconds
  useEffect(() => {
    if (!gameState) return;

    const interval = setInterval(() => {
      saveGameState(gameState);
    }, 10000);

    return () => clearInterval(interval);
  }, [gameState, saveGameState]);

  // Update Yojef Market timer - Fixed to properly reset when timer reaches 0
  useEffect(() => {
    if (!gameState) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        if (!prev) return prev;
        
        const now = new Date();
        const nextRefresh = new Date(prev.yojefMarket.nextRefresh);
        
        if (now >= nextRefresh) {
          return {
            ...prev,
            yojefMarket: {
              ...prev.yojefMarket,
              items: Array.from({ length: 3 }, () => generateRelicItem()),
              lastRefresh: now,
              nextRefresh: new Date(now.getTime() + 5 * 60 * 1000), // 5 minutes from now
            }
          };
        }
        
        return prev;
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [gameState]);

  const updateStats = useCallback((newStats: Partial<GameState['playerStats']>) => {
    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        playerStats: { ...prev.playerStats, ...newStats }
      };
    });
  }, []);

  const addToInventory = useCallback((item: Weapon | Armor) => {
    setGameState(prev => {
      if (!prev) return prev;

      const isWeapon = 'baseAtk' in item;
      const newInventory = { ...prev.inventory };
      
      if (isWeapon) {
        newInventory.weapons = [...prev.inventory.weapons, item as Weapon];
      } else {
        newInventory.armor = [...prev.inventory.armor, item as Armor];
      }

      // Update collection book
      const newCollectionBook = { ...prev.collectionBook };
      if (isWeapon) {
        if (!newCollectionBook.weapons[item.name]) {
          newCollectionBook.weapons[item.name] = true;
          newCollectionBook.totalWeaponsFound += 1;
          newCollectionBook.rarityStats[item.rarity] += 1;
        }
      } else {
        if (!newCollectionBook.armor[item.name]) {
          newCollectionBook.armor[item.name] = true;
          newCollectionBook.totalArmorFound += 1;
          newCollectionBook.rarityStats[item.rarity] += 1;
        }
      }

      return {
        ...prev,
        inventory: newInventory,
        collectionBook: newCollectionBook,
        statistics: {
          ...prev.statistics,
          itemsCollected: prev.statistics.itemsCollected + 1,
        },
      };
    });
  }, []);

  const equipWeapon = useCallback((weapon: Weapon) => {
    setGameState(prev => {
      if (!prev) return prev;
      
      const weaponAtk = weapon.baseAtk + (weapon.level - 1) * 10;
      const currentWeaponAtk = prev.inventory.currentWeapon ? 
        prev.inventory.currentWeapon.baseAtk + (prev.inventory.currentWeapon.level - 1) * 10 : 0;
      
      const atkDifference = weaponAtk - currentWeaponAtk;
      
      return {
        ...prev,
        inventory: {
          ...prev.inventory,
          currentWeapon: weapon,
        },
        playerStats: {
          ...prev.playerStats,
          atk: prev.playerStats.atk + atkDifference,
        },
      };
    });
  }, []);

  const equipArmor = useCallback((armor: Armor) => {
    setGameState(prev => {
      if (!prev) return prev;
      
      const armorDef = armor.baseDef + (armor.level - 1) * 5;
      const currentArmorDef = prev.inventory.currentArmor ? 
        prev.inventory.currentArmor.baseDef + (prev.inventory.currentArmor.level - 1) * 5 : 0;
      
      const defDifference = armorDef - currentArmorDef;
      
      return {
        ...prev,
        inventory: {
          ...prev.inventory,
          currentArmor: armor,
        },
        playerStats: {
          ...prev.playerStats,
          def: prev.playerStats.def + defDifference,
        },
      };
    });
  }, []);

  const upgradeWeapon = useCallback((weaponId: string) => {
    setGameState(prev => {
      if (!prev) return prev;
      
      const weapon = prev.inventory.weapons.find(w => w.id === weaponId);
      if (!weapon || prev.gems < weapon.upgradeCost) return prev;
      
      const upgradedWeapon = {
        ...weapon,
        level: weapon.level + 1,
        upgradeCost: Math.floor(weapon.upgradeCost * 1.5),
      };
      
      const newWeapons = prev.inventory.weapons.map(w => 
        w.id === weaponId ? upgradedWeapon : w
      );
      
      // Update current weapon if it's the one being upgraded
      const newCurrentWeapon = prev.inventory.currentWeapon?.id === weaponId ? 
        upgradedWeapon : prev.inventory.currentWeapon;
      
      // Update attack if current weapon was upgraded
      let newAtk = prev.playerStats.atk;
      if (prev.inventory.currentWeapon?.id === weaponId) {
        newAtk += 10; // Each level adds 10 attack
      }
      
      return {
        ...prev,
        gems: prev.gems - weapon.upgradeCost,
        inventory: {
          ...prev.inventory,
          weapons: newWeapons,
          currentWeapon: newCurrentWeapon,
        },
        playerStats: {
          ...prev.playerStats,
          atk: newAtk,
        },
        statistics: {
          ...prev.statistics,
          itemsUpgraded: prev.statistics.itemsUpgraded + 1,
        },
      };
    });
  }, []);

  const upgradeArmor = useCallback((armorId: string) => {
    setGameState(prev => {
      if (!prev) return prev;
      
      const armor = prev.inventory.armor.find(a => a.id === armorId);
      if (!armor || prev.gems < armor.upgradeCost) return prev;
      
      const upgradedArmor = {
        ...armor,
        level: armor.level + 1,
        upgradeCost: Math.floor(armor.upgradeCost * 1.5),
      };
      
      const newArmor = prev.inventory.armor.map(a => 
        a.id === armorId ? upgradedArmor : a
      );
      
      // Update current armor if it's the one being upgraded
      const newCurrentArmor = prev.inventory.currentArmor?.id === armorId ? 
        upgradedArmor : prev.inventory.currentArmor;
      
      // Update defense if current armor was upgraded
      let newDef = prev.playerStats.def;
      if (prev.inventory.currentArmor?.id === armorId) {
        newDef += 5; // Each level adds 5 defense
      }
      
      return {
        ...prev,
        gems: prev.gems - armor.upgradeCost,
        inventory: {
          ...prev.inventory,
          armor: newArmor,
          currentArmor: newCurrentArmor,
        },
        playerStats: {
          ...prev.playerStats,
          def: newDef,
        },
        statistics: {
          ...prev.statistics,
          itemsUpgraded: prev.statistics.itemsUpgraded + 1,
        },
      };
    });
  }, []);

  const sellWeapon = useCallback((weaponId: string) => {
    setGameState(prev => {
      if (!prev) return prev;
      
      const weapon = prev.inventory.weapons.find(w => w.id === weaponId);
      if (!weapon || prev.inventory.currentWeapon?.id === weaponId) return prev;
      
      const newWeapons = prev.inventory.weapons.filter(w => w.id !== weaponId);
      
      return {
        ...prev,
        coins: prev.coins + weapon.sellPrice,
        inventory: {
          ...prev.inventory,
          weapons: newWeapons,
        },
        statistics: {
          ...prev.statistics,
          itemsSold: prev.statistics.itemsSold + 1,
        },
      };
    });
  }, []);

  const sellArmor = useCallback((armorId: string) => {
    setGameState(prev => {
      if (!prev) return prev;
      
      const armor = prev.inventory.armor.find(a => a.id === armorId);
      if (!armor || prev.inventory.currentArmor?.id === armorId) return prev;
      
      const newArmor = prev.inventory.armor.filter(a => a.id !== armorId);
      
      return {
        ...prev,
        coins: prev.coins + armor.sellPrice,
        inventory: {
          ...prev.inventory,
          armor: newArmor,
        },
        statistics: {
          ...prev.statistics,
          itemsSold: prev.statistics.itemsSold + 1,
        },
      };
    });
  }, []);

  const openChest = useCallback((cost: number): ChestReward | null => {
    if (!gameState || gameState.coins < cost) return null;

    const weights = getChestRarityWeights(cost);
    const random = Math.random() * 100;
    
    let rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical' = 'common';
    let cumulative = 0;
    
    const rarities = ['common', 'rare', 'epic', 'legendary', 'mythical'] as const;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        rarity = rarities[i];
        break;
      }
    }

    // Check for enchanted items (5% chance)
    const isEnchanted = Math.random() < 0.05;
    
    // Generate items
    const items: (Weapon | Armor)[] = [];
    const itemCount = Math.random() < 0.3 ? 2 : 1; // 30% chance for 2 items
    
    for (let i = 0; i < itemCount; i++) {
      const isWeapon = Math.random() < 0.5;
      if (isWeapon) {
        items.push(generateWeapon(false, rarity, isEnchanted));
      } else {
        items.push(generateArmor(false, rarity, isEnchanted));
      }
    }

    const reward: ChestReward = {
      type: items[0] && 'baseAtk' in items[0] ? 'weapon' : 'armor',
      items,
    };

    setGameState(prev => {
      if (!prev) return prev;

      let newState = {
        ...prev,
        coins: prev.coins - cost,
        gems: prev.gems + Math.floor(Math.random() * 10) + 5, // Bonus gems
        statistics: {
          ...prev.statistics,
          chestsOpened: prev.statistics.chestsOpened + 1,
        },
      };

      // Add items to inventory
      items.forEach(item => {
        const isWeapon = 'baseAtk' in item;
        if (isWeapon) {
          newState.inventory.weapons.push(item as Weapon);
        } else {
          newState.inventory.armor.push(item as Armor);
        }

        // Update collection book
        if (isWeapon) {
          if (!newState.collectionBook.weapons[item.name]) {
            newState.collectionBook.weapons[item.name] = true;
            newState.collectionBook.totalWeaponsFound += 1;
            newState.collectionBook.rarityStats[item.rarity] += 1;
          }
        } else {
          if (!newState.collectionBook.armor[item.name]) {
            newState.collectionBook.armor[item.name] = true;
            newState.collectionBook.totalArmorFound += 1;
            newState.collectionBook.rarityStats[item.rarity] += 1;
          }
        }
      });

      return newState;
    });

    return reward;
  }, [gameState]);

  const purchaseMythical = useCallback((cost: number): boolean => {
    if (!gameState || gameState.coins < cost) return false;

    const mythicalWeapon = generateWeapon(false, 'mythical');
    const mythicalArmor = generateArmor(false, 'mythical');

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        coins: prev.coins - cost,
        inventory: {
          ...prev.inventory,
          weapons: [...prev.inventory.weapons, mythicalWeapon],
          armor: [...prev.inventory.armor, mythicalArmor],
        },
        collectionBook: {
          ...prev.collectionBook,
          weapons: {
            ...prev.collectionBook.weapons,
            [mythicalWeapon.name]: true,
          },
          armor: {
            ...prev.collectionBook.armor,
            [mythicalArmor.name]: true,
          },
          totalWeaponsFound: prev.collectionBook.totalWeaponsFound + 1,
          totalArmorFound: prev.collectionBook.totalArmorFound + 1,
          rarityStats: {
            ...prev.collectionBook.rarityStats,
            mythical: prev.collectionBook.rarityStats.mythical + 2,
          },
        },
        statistics: {
          ...prev.statistics,
          itemsCollected: prev.statistics.itemsCollected + 2,
        },
      };
    });

    return true;
  }, [gameState]);

  const generateAdventureSkills = useCallback((): AdventureSkill[] => {
    const allSkills: AdventureSkill[] = [
      {
        id: 'risker',
        name: 'Risker',
        description: 'Gain +50% HP but take +25% damage',
        type: 'risker'
      },
      {
        id: 'lightning_chain',
        name: 'Lightning Chain',
        description: 'Correct answers have 30% chance to deal double damage',
        type: 'lightning_chain'
      },
      {
        id: 'skip_card',
        name: 'Skip Card',
        description: 'Skip one question and automatically get it correct',
        type: 'skip_card'
      },
      {
        id: 'metal_shield',
        name: 'Metal Shield',
        description: 'Block the first enemy attack completely',
        type: 'metal_shield'
      },
      {
        id: 'truth_lies',
        name: 'Truth & Lies',
        description: 'Remove one wrong answer from multiple choice questions',
        type: 'truth_lies'
      },
      {
        id: 'ramp',
        name: 'Ramp',
        description: 'Each correct answer increases damage by 10% (stacks)',
        type: 'ramp'
      },
      {
        id: 'dodge',
        name: 'Dodge',
        description: 'First wrong answer deals no damage to you',
        type: 'dodge'
      },
      {
        id: 'berserker',
        name: 'Berserker',
        description: 'Deal +100% damage but take +50% damage',
        type: 'berserker'
      },
      {
        id: 'vampiric',
        name: 'Vampiric',
        description: 'Heal 25% of damage dealt to enemies',
        type: 'vampiric'
      },
      {
        id: 'phoenix',
        name: 'Phoenix',
        description: 'Revive once with 50% HP when defeated',
        type: 'phoenix'
      },
      {
        id: 'time_slow',
        name: 'Time Slow',
        description: 'Get +3 seconds for each question',
        type: 'time_slow'
      },
      {
        id: 'critical_strike',
        name: 'Critical Strike',
        description: '20% chance to deal triple damage',
        type: 'critical_strike'
      },
      {
        id: 'shield_wall',
        name: 'Shield Wall',
        description: 'Reduce all damage taken by 50%',
        type: 'shield_wall'
      },
      {
        id: 'poison_blade',
        name: 'Poison Blade',
        description: 'Attacks poison enemies for 3 turns',
        type: 'poison_blade'
      },
      {
        id: 'arcane_shield',
        name: 'Arcane Shield',
        description: 'Absorb first 100 damage taken',
        type: 'arcane_shield'
      },
      {
        id: 'battle_frenzy',
        name: 'Battle Frenzy',
        description: 'Each kill increases damage by 25%',
        type: 'battle_frenzy'
      },
      {
        id: 'elemental_mastery',
        name: 'Elemental Mastery',
        description: 'Deal bonus damage based on question category',
        type: 'elemental_mastery'
      },
      {
        id: 'shadow_step',
        name: 'Shadow Step',
        description: 'Avoid the next enemy attack completely',
        type: 'shadow_step'
      },
      {
        id: 'healing_aura',
        name: 'Healing Aura',
        description: 'Regenerate 10 HP after each correct answer',
        type: 'healing_aura'
      },
      {
        id: 'double_strike',
        name: 'Double Strike',
        description: 'Attack twice on correct answers',
        type: 'double_strike'
      },
      {
        id: 'mana_shield',
        name: 'Mana Shield',
        description: 'Convert 50% of damage to mana cost',
        type: 'mana_shield'
      },
      {
        id: 'berserk_rage',
        name: 'Berserk Rage',
        description: 'Damage increases as HP decreases',
        type: 'berserk_rage'
      },
      {
        id: 'divine_protection',
        name: 'Divine Protection',
        description: 'Survive one fatal blow with 1 HP',
        type: 'divine_protection'
      },
      {
        id: 'storm_call',
        name: 'Storm Call',
        description: 'Lightning strikes deal area damage',
        type: 'storm_call'
      },
      {
        id: 'blood_pact',
        name: 'Blood Pact',
        description: 'Sacrifice HP to deal massive damage',
        type: 'blood_pact'
      },
      {
        id: 'frost_armor',
        name: 'Frost Armor',
        description: 'Slow enemies and reduce damage taken',
        type: 'frost_armor'
      },
      {
        id: 'fireball',
        name: 'Fireball',
        description: 'Deal fire damage over time',
        type: 'fireball'
      }
    ];

    // Shuffle and return 3 random skills
    const shuffled = allSkills.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  const startCombat = useCallback(() => {
    if (!gameState) return;

    // Generate adventure skills for selection
    const availableSkills = generateAdventureSkills();

    setGameState(prev => {
      if (!prev) return prev;

      const enemy = generateEnemy(prev.zone);
      
      return {
        ...prev,
        currentEnemy: enemy,
        inCombat: true,
        combatLog: [`You encounter a ${enemy.name} in Zone ${prev.zone}!`],
        adventureSkills: {
          ...prev.adventureSkills,
          availableSkills,
          showSelectionModal: true,
          selectedSkill: null,
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
            fireballActive: false,
          },
        },
      };
    });
  }, [gameState, generateAdventureSkills]);

  // Fixed durability system - 50% more durable, proper damage tracking
  const reduceDurability = useCallback((item: Weapon | Armor, isWeapon: boolean, isCorrectAnswer: boolean) => {
    if (isCorrectAnswer && isWeapon) {
      // Weapon loses durability when dealing damage (correct answer)
      item.durability = Math.max(0, item.durability - 1); // Reduced from 2 to 1 (50% more durable)
    } else if (!isCorrectAnswer && !isWeapon) {
      // Armor loses durability when taking damage (wrong answer) - but by a lot more
      const durabilityLoss = Math.ceil(item.maxDurability * 0.1); // 10% of max durability
      item.durability = Math.max(0, item.durability - durabilityLoss);
    }
    // If no armor equipped and wrong answer, no durability loss
  }, []);

  const attack = useCallback((hit: boolean, category?: string) => {
    setGameState(prev => {
      if (!prev || !prev.currentEnemy) return prev;

      let newState = { ...prev };
      let damage = 0;
      let enemyDamage = 0;
      let logMessage = '';

      // Apply adventure skill effects
      const skillEffects = newState.adventureSkills.skillEffects;
      const selectedSkill = newState.adventureSkills.selectedSkill;

      if (hit) {
        // Player attacks enemy
        damage = Math.max(1, newState.playerStats.atk - newState.currentEnemy.def);

        // Apply adventure skill effects for correct answers
        if (selectedSkill) {
          switch (selectedSkill.type) {
            case 'risker':
              // No damage modification, just HP boost (applied elsewhere)
              break;
            case 'lightning_chain':
              if (Math.random() < 0.3) {
                damage *= 2;
                logMessage += ' ⚡ Lightning Chain activated! Double damage!';
              }
              break;
            case 'berserker':
              damage *= 2; // +100% damage
              break;
            case 'ramp':
              // Increase damage by 10% for each correct answer (implement counter)
              if (!newState.adventureSkills.skillEffects.rampActive) {
                newState.adventureSkills.skillEffects.rampActive = true;
                (newState as any).rampStacks = 1;
              } else {
                (newState as any).rampStacks = ((newState as any).rampStacks || 1) + 1;
              }
              damage = Math.floor(damage * (1 + ((newState as any).rampStacks * 0.1)));
              logMessage += ` 📈 Ramp: ${(newState as any).rampStacks} stacks (+${(newState as any).rampStacks * 10}% damage)`;
              break;
            case 'critical_strike':
              if (Math.random() < 0.2) {
                damage *= 3;
                logMessage += ' 💥 Critical Strike! Triple damage!';
              }
              break;
            case 'poison_blade':
              newState.currentEnemy.isPoisoned = true;
              newState.currentEnemy.poisonTurns = 3;
              logMessage += ' 🟢 Enemy poisoned for 3 turns!';
              break;
            case 'elemental_mastery':
              // Bonus damage based on category
              const categoryBonus = {
                'Math': 1.5,
                'Science': 1.3,
                'Geography': 1.2,
                'History': 1.4,
                'Literature': 1.3,
                'Art': 1.2,
                'Sports': 1.1,
                'Entertainment': 1.1,
                'Technology': 1.4,
                'Animals': 1.2,
                'Food': 1.1,
                'Music': 1.2,
                'Time': 1.1,
                'Body': 1.1
              };
              const bonus = categoryBonus[category as keyof typeof categoryBonus] || 1;
              damage = Math.floor(damage * bonus);
              if (bonus > 1) {
                logMessage += ` 🔥 Elemental Mastery: ${Math.round((bonus - 1) * 100)}% bonus damage!`;
              }
              break;
            case 'double_strike':
              damage *= 2; // Attack twice
              logMessage += ' ⚔️ Double Strike!';
              break;
            case 'berserk_rage':
              // Damage increases as HP decreases
              const hpPercent = newState.playerStats.hp / newState.playerStats.maxHp;
              const rageMultiplier = 1 + (1 - hpPercent);
              damage = Math.floor(damage * rageMultiplier);
              if (rageMultiplier > 1) {
                logMessage += ` 😡 Berserk Rage: +${Math.round((rageMultiplier - 1) * 100)}% damage!`;
              }
              break;
            case 'storm_call':
              damage = Math.floor(damage * 1.5); // Area damage effect
              logMessage += ' ⛈️ Storm Call: Lightning strikes!';
              break;
            case 'blood_pact':
              // Sacrifice HP for massive damage
              const hpSacrifice = Math.floor(newState.playerStats.hp * 0.1);
              newState.playerStats.hp = Math.max(1, newState.playerStats.hp - hpSacrifice);
              damage = Math.floor(damage * 2.5);
              logMessage += ` 🩸 Blood Pact: Sacrificed ${hpSacrifice} HP for massive damage!`;
              break;
            case 'fireball':
              // Deal fire damage over time
              damage = Math.floor(damage * 1.3);
              newState.currentEnemy.isPoisoned = true; // Reuse poison for fire DOT
              newState.currentEnemy.poisonTurns = 2;
              logMessage += ' 🔥 Fireball: Burning damage over time!';
              break;
          }
        }

        // Apply vampiric healing
        if (selectedSkill?.type === 'vampiric') {
          const healing = Math.floor(damage * 0.25);
          newState.playerStats.hp = Math.min(newState.playerStats.maxHp, newState.playerStats.hp + healing);
          logMessage += ` 🧛 Vampiric: Healed ${healing} HP!`;
        }

        // Apply healing aura
        if (selectedSkill?.type === 'healing_aura') {
          newState.playerStats.hp = Math.min(newState.playerStats.maxHp, newState.playerStats.hp + 10);
          logMessage += ' ✨ Healing Aura: +10 HP!';
        }

        // Apply battle frenzy
        if (selectedSkill?.type === 'battle_frenzy') {
          if (!newState.adventureSkills.skillEffects.battleFrenzyActive) {
            newState.adventureSkills.skillEffects.battleFrenzyActive = true;
            (newState as any).frenzyStacks = 0;
          }
        }

        newState.currentEnemy.hp -= damage;

        // Handle weapon durability for correct answers
        if (newState.inventory.currentWeapon) {
          reduceDurability(newState.inventory.currentWeapon, true, true);
          
          // Update weapon in inventory
          newState.inventory.weapons = newState.inventory.weapons.map(w => 
            w.id === newState.inventory.currentWeapon?.id ? newState.inventory.currentWeapon : w
          );
        }

        // Update knowledge streak
        newState.knowledgeStreak.current += 1;
        newState.knowledgeStreak.best = Math.max(newState.knowledgeStreak.best, newState.knowledgeStreak.current);
        newState.knowledgeStreak.multiplier = 1 + (newState.knowledgeStreak.current * 0.1);

        // Update statistics
        newState.statistics.correctAnswers += 1;
        newState.statistics.totalQuestionsAnswered += 1;
        newState.statistics.totalDamageDealt += damage;

        logMessage = `You deal ${damage} damage to the ${newState.currentEnemy.name}!${logMessage}`;
      } else {
        // Enemy attacks player (wrong answer)
        enemyDamage = Math.max(1, newState.currentEnemy.atk - newState.playerStats.def);

        // Apply adventure skill effects for wrong answers
        if (selectedSkill) {
          switch (selectedSkill.type) {
            case 'risker':
              enemyDamage = Math.floor(enemyDamage * 1.25); // +25% damage taken
              break;
            case 'berserker':
              enemyDamage = Math.floor(enemyDamage * 1.5); // +50% damage taken
              break;
            case 'dodge':
              if (!skillEffects.dodgeUsed) {
                enemyDamage = 0;
                newState.adventureSkills.skillEffects.dodgeUsed = true;
                logMessage += ' 🏃 Dodge activated! No damage taken!';
              }
              break;
            case 'metal_shield':
              if (!skillEffects.metalShieldUsed) {
                enemyDamage = 0;
                newState.adventureSkills.skillEffects.metalShieldUsed = true;
                logMessage += ' 🛡️ Metal Shield blocks the attack!';
              }
              break;
            case 'shield_wall':
              enemyDamage = Math.floor(enemyDamage * 0.5); // 50% damage reduction
              logMessage += ' 🛡️ Shield Wall: 50% damage reduction!';
              break;
            case 'arcane_shield':
              // Absorb first 100 damage
              if (!skillEffects.arcaneShieldUsed) {
                if (enemyDamage <= 100) {
                  enemyDamage = 0;
                  logMessage += ' 🔮 Arcane Shield absorbs all damage!';
                } else {
                  enemyDamage -= 100;
                  logMessage += ' 🔮 Arcane Shield absorbs 100 damage!';
                }
                newState.adventureSkills.skillEffects.arcaneShieldUsed = true;
              }
              break;
            case 'shadow_step':
              if (!skillEffects.shadowStepUsed) {
                enemyDamage = 0;
                newState.adventureSkills.skillEffects.shadowStepUsed = true;
                logMessage += ' 👤 Shadow Step: Attack avoided!';
              }
              break;
            case 'mana_shield':
              // Convert 50% of damage to mana cost (just reduce damage)
              enemyDamage = Math.floor(enemyDamage * 0.5);
              logMessage += ' 🔵 Mana Shield: 50% damage converted!';
              break;
            case 'frost_armor':
              enemyDamage = Math.floor(enemyDamage * 0.7); // 30% damage reduction
              logMessage += ' ❄️ Frost Armor: Damage reduced!';
              break;
            case 'divine_protection':
              if (!skillEffects.divineProtectionUsed && newState.playerStats.hp - enemyDamage <= 0) {
                newState.playerStats.hp = 1;
                enemyDamage = newState.playerStats.hp - 1;
                newState.adventureSkills.skillEffects.divineProtectionUsed = true;
                logMessage += ' ✨ Divine Protection: Survived with 1 HP!';
              }
              break;
          }
        }

        newState.playerStats.hp -= enemyDamage;

        // Handle armor durability for wrong answers - but only if armor is equipped
        if (newState.inventory.currentArmor) {
          reduceDurability(newState.inventory.currentArmor, false, false);
          
          // Update armor in inventory
          newState.inventory.armor = newState.inventory.armor.map(a => 
            a.id === newState.inventory.currentArmor?.id ? newState.inventory.currentArmor : a
          );
        }
        // If no armor equipped, no durability loss

        // Reset knowledge streak
        newState.knowledgeStreak.current = 0;
        newState.knowledgeStreak.multiplier = 1;

        // Update statistics
        newState.statistics.totalQuestionsAnswered += 1;
        newState.statistics.totalDamageTaken += enemyDamage;

        logMessage = `The ${newState.currentEnemy.name} attacks you for ${enemyDamage} damage!${logMessage}`;
      }

      // Handle poison damage
      if (newState.currentEnemy.isPoisoned && newState.currentEnemy.poisonTurns > 0) {
        const poisonDamage = Math.floor(newState.currentEnemy.maxHp * 0.1);
        newState.currentEnemy.hp -= poisonDamage;
        newState.currentEnemy.poisonTurns -= 1;
        logMessage += ` 🟢 Poison deals ${poisonDamage} damage!`;
        
        if (newState.currentEnemy.poisonTurns <= 0) {
          newState.currentEnemy.isPoisoned = false;
        }
      }

      // Check if enemy is defeated
      if (newState.currentEnemy.hp <= 0) {
        // Apply battle frenzy kill bonus
        if (selectedSkill?.type === 'battle_frenzy') {
          (newState as any).frenzyStacks = ((newState as any).frenzyStacks || 0) + 1;
          logMessage += ` 🔥 Battle Frenzy: +25% damage for next enemy!`;
        }

        // Calculate rewards
        const baseCoins = 10 + (newState.zone * 2);
        const baseGems = Math.floor(newState.zone / 5) + 1;
        
        let coinReward = Math.floor(baseCoins * newState.knowledgeStreak.multiplier);
        let gemReward = Math.floor(baseGems * newState.knowledgeStreak.multiplier);

        // Apply menu skill effects
        if (newState.skills.activeMenuSkill && new Date() < new Date(newState.skills.activeMenuSkill.expiresAt)) {
          switch (newState.skills.activeMenuSkill.type) {
            case 'coin_vacuum':
              coinReward += 15; // 15 free coins per victory
              break;
            case 'golden_touch':
              coinReward *= 2; // Double coins
              break;
            case 'coin_multiplier':
              coinReward *= 3; // 3x coins
              break;
            case 'gem_magnet':
              gemReward *= 3; // Triple gems
              break;
            case 'gem_multiplier':
              gemReward = Math.floor(gemReward * 2.5); // 2.5x gems
              break;
          }
        }

        newState.coins += coinReward;
        newState.gems += gemReward;
        newState.zone += 1;

        // Check for premium unlock
        if (newState.zone >= 50) {
          newState.isPremium = true;
        }

        // Check for item drops in zones 10+
        if (newState.zone >= 10 && Math.random() < 0.3) {
          const dropRarity = Math.random() < 0.1 ? 'epic' : Math.random() < 0.3 ? 'rare' : 'common';
          const isWeapon = Math.random() < 0.5;
          const droppedItem = isWeapon ? generateWeapon(false, dropRarity) : generateArmor(false, dropRarity);
          
          if (isWeapon) {
            newState.inventory.weapons.push(droppedItem as Weapon);
          } else {
            newState.inventory.armor.push(droppedItem as Armor);
          }
          
          logMessage += ` The enemy dropped a ${droppedItem.name}!`;
        }

        // Check for Hugoland Fragments (every 5 zones)
        if (newState.zone % 5 === 0) {
          newState.merchant.hugollandFragments += 1;
          newState.merchant.totalFragmentsEarned += 1;
          newState.merchant.lastFragmentZone = newState.zone;
          logMessage += ` 🧩 You found a Hugoland Fragment!`;
        }

        // Update statistics
        newState.statistics.totalVictories += 1;
        newState.statistics.zonesReached = Math.max(newState.statistics.zonesReached, newState.zone);
        newState.statistics.coinsEarned += coinReward;
        newState.statistics.gemsEarned += gemReward;

        logMessage += ` Victory! +${coinReward} coins, +${gemReward} gems. Advancing to Zone ${newState.zone}!`;

        // End combat
        newState.inCombat = false;
        newState.currentEnemy = null;
        newState.adventureSkills.selectedSkill = null;
        newState.adventureSkills.showSelectionModal = false;
      }

      // Check if player is defeated
      if (newState.playerStats.hp <= 0) {
        // Check for phoenix revival
        if (selectedSkill?.type === 'phoenix' && !skillEffects.phoenixUsed) {
          newState.playerStats.hp = Math.floor(newState.playerStats.maxHp * 0.5);
          newState.adventureSkills.skillEffects.phoenixUsed = true;
          logMessage += ' 🔥 Phoenix: Revived with 50% HP!';
        } else if (!newState.hasUsedRevival) {
          // Free revival
          newState.playerStats.hp = newState.playerStats.maxHp;
          newState.hasUsedRevival = true;
          logMessage += ' 💖 Free revival used! You are restored to full health!';
        } else {
          // Game over
          if (newState.gameMode.current === 'survival') {
            newState.gameMode.survivalLives -= 1;
            if (newState.gameMode.survivalLives <= 0) {
              logMessage += ' 💀 All lives lost! Game Over!';
            } else {
              newState.playerStats.hp = newState.playerStats.maxHp;
              logMessage += ` 💀 Life lost! ${newState.gameMode.survivalLives} lives remaining.`;
            }
          } else {
            logMessage += ' 💀 You have been defeated!';
          }
          
          newState.inCombat = false;
          newState.currentEnemy = null;
          newState.adventureSkills.selectedSkill = null;
          newState.adventureSkills.showSelectionModal = false;
          newState.statistics.totalDeaths += 1;
        }
      }

      // Add to combat log
      newState.combatLog = [...newState.combatLog.slice(-10), logMessage];

      return newState;
    });
  }, [reduceDurability]);

  const selectAdventureSkill = useCallback((skill: AdventureSkill) => {
    setGameState(prev => {
      if (!prev) return prev;

      let newState = { ...prev };

      // Apply skill effects
      switch (skill.type) {
        case 'risker':
          // +50% HP
          newState.playerStats.maxHp = Math.floor(newState.playerStats.maxHp * 1.5);
          newState.playerStats.hp = newState.playerStats.maxHp;
          break;
        case 'truth_lies':
          newState.adventureSkills.skillEffects.truthLiesActive = true;
          break;
        case 'time_slow':
          newState.adventureSkills.skillEffects.timeSlowActive = true;
          break;
      }

      return {
        ...newState,
        adventureSkills: {
          ...newState.adventureSkills,
          selectedSkill: skill,
          showSelectionModal: false,
        },
      };
    });
  }, []);

  const skipAdventureSkills = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        adventureSkills: {
          ...prev.adventureSkills,
          selectedSkill: null,
          showSelectionModal: false,
        },
      };
    });
  }, []);

  const useSkipCard = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        adventureSkills: {
          ...prev.adventureSkills,
          skillEffects: {
            ...prev.adventureSkills.skillEffects,
            skipCardUsed: true,
          },
        },
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    const initialState = createInitialGameState();
    initialState.yojefMarket.items = Array.from({ length: 3 }, () => generateRelicItem());
    setGameState(initialState);
    AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const setGameMode = useCallback((mode: 'normal' | 'blitz' | 'bloodlust' | 'survival') => {
    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        gameMode: {
          ...prev.gameMode,
          current: mode,
          survivalLives: mode === 'survival' ? 3 : prev.gameMode.survivalLives,
        },
      };
    });
  }, []);

  const toggleCheat = useCallback((cheat: keyof GameState['cheats']) => {
    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        cheats: {
          ...prev.cheats,
          [cheat]: !prev.cheats[cheat],
        },
      };
    });
  }, []);

  const generateCheatItem = useCallback(() => {
    if (!gameState?.cheats.obtainAnyItem) return;

    const mythicalWeapon = generateWeapon(false, 'mythical');
    addToInventory(mythicalWeapon);
  }, [gameState, addToInventory]);

  const mineGem = useCallback((x: number, y: number): { gems: number; shinyGems: number } | null => {
    if (!gameState) return null;

    const isShiny = Math.random() < 0.05; // 5% chance for shiny
    const gemsGained = isShiny ? 0 : 1;
    const shinyGemsGained = isShiny ? 1 : 0;

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        gems: prev.gems + gemsGained,
        shinyGems: prev.shinyGems + shinyGemsGained,
        mining: {
          totalGemsMined: prev.mining.totalGemsMined + gemsGained,
          totalShinyGemsMined: prev.mining.totalShinyGemsMined + shinyGemsGained,
        },
        statistics: {
          ...prev.statistics,
          gemsEarned: prev.statistics.gemsEarned + gemsGained,
          shinyGemsEarned: prev.statistics.shinyGemsEarned + shinyGemsGained,
        },
      };
    });

    return { gems: gemsGained, shinyGems: shinyGemsGained };
  }, [gameState]);

  const exchangeShinyGems = useCallback((amount: number): boolean => {
    if (!gameState || gameState.shinyGems < amount) return false;

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        shinyGems: prev.shinyGems - amount,
        gems: prev.gems + (amount * 10),
      };
    });

    return true;
  }, [gameState]);

  const discardItem = useCallback((itemId: string, type: 'weapon' | 'armor') => {
    setGameState(prev => {
      if (!prev) return prev;

      if (type === 'weapon') {
        return {
          ...prev,
          inventory: {
            ...prev.inventory,
            weapons: prev.inventory.weapons.filter(w => w.id !== itemId),
          },
        };
      } else {
        return {
          ...prev,
          inventory: {
            ...prev.inventory,
            armor: prev.inventory.armor.filter(a => a.id !== itemId),
          },
        };
      }
    });
  }, []);

  const purchaseRelic = useCallback((relicId: string): boolean => {
    if (!gameState) return false;

    const relic = gameState.yojefMarket.items.find(r => r.id === relicId);
    if (!relic || gameState.gems < relic.cost) return false;

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        gems: prev.gems - relic.cost,
        inventory: {
          ...prev.inventory,
          relics: [...prev.inventory.relics, relic],
        },
        yojefMarket: {
          ...prev.yojefMarket,
          items: prev.yojefMarket.items.filter(r => r.id !== relicId),
        },
      };
    });

    return true;
  }, [gameState]);

  const upgradeRelic = useCallback((relicId: string): boolean => {
    if (!gameState) return false;

    const relic = gameState.inventory.relics.find(r => r.id === relicId);
    if (!relic || gameState.gems < relic.upgradeCost) return false;

    setGameState(prev => {
      if (!prev) return prev;

      const upgradedRelic = {
        ...relic,
        level: relic.level + 1,
        baseAtk: relic.baseAtk ? relic.baseAtk + 22 : undefined,
        baseDef: relic.baseDef ? relic.baseDef + 15 : undefined,
        upgradeCost: Math.floor(relic.upgradeCost * 1.5),
      };

      return {
        ...prev,
        gems: prev.gems - relic.upgradeCost,
        inventory: {
          ...prev.inventory,
          relics: prev.inventory.relics.map(r => r.id === relicId ? upgradedRelic : r),
          equippedRelics: prev.inventory.equippedRelics.map(r => r.id === relicId ? upgradedRelic : r),
        },
      };
    });

    return true;
  }, [gameState]);

  const equipRelic = useCallback((relicId: string) => {
    setGameState(prev => {
      if (!prev) return prev;

      const relic = prev.inventory.relics.find(r => r.id === relicId);
      if (!relic) return prev;

      // Calculate stat bonuses
      const atkBonus = relic.baseAtk ? relic.baseAtk + (relic.level - 1) * 22 : 0;
      const defBonus = relic.baseDef ? relic.baseDef + (relic.level - 1) * 15 : 0;

      return {
        ...prev,
        inventory: {
          ...prev.inventory,
          equippedRelics: [...prev.inventory.equippedRelics, relic],
        },
        playerStats: {
          ...prev.playerStats,
          atk: prev.playerStats.atk + atkBonus,
          def: prev.playerStats.def + defBonus,
        },
      };
    });
  }, []);

  const unequipRelic = useCallback((relicId: string) => {
    setGameState(prev => {
      if (!prev) return prev;

      const relic = prev.inventory.equippedRelics.find(r => r.id === relicId);
      if (!relic) return prev;

      // Calculate stat bonuses to remove
      const atkBonus = relic.baseAtk ? relic.baseAtk + (relic.level - 1) * 22 : 0;
      const defBonus = relic.baseDef ? relic.baseDef + (relic.level - 1) * 15 : 0;

      return {
        ...prev,
        inventory: {
          ...prev.inventory,
          equippedRelics: prev.inventory.equippedRelics.filter(r => r.id !== relicId),
        },
        playerStats: {
          ...prev.playerStats,
          atk: prev.playerStats.atk - atkBonus,
          def: prev.playerStats.def - defBonus,
        },
      };
    });
  }, []);

  const sellRelic = useCallback((relicId: string) => {
    setGameState(prev => {
      if (!prev) return prev;

      const relic = prev.inventory.relics.find(r => r.id === relicId);
      if (!relic) return prev;

      const sellPrice = Math.floor(relic.cost * 0.5);

      return {
        ...prev,
        gems: prev.gems + sellPrice,
        inventory: {
          ...prev.inventory,
          relics: prev.inventory.relics.filter(r => r.id !== relicId),
        },
      };
    });
  }, []);

  const claimDailyReward = useCallback((): boolean => {
    if (!gameState?.dailyRewards.availableReward) return false;

    const reward = gameState.dailyRewards.availableReward;

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        coins: prev.coins + reward.coins,
        gems: prev.gems + reward.gems,
        dailyRewards: {
          ...prev.dailyRewards,
          lastClaimDate: new Date(),
          availableReward: null,
          rewardHistory: [...prev.dailyRewards.rewardHistory, { ...reward, claimed: true, claimDate: new Date() }],
        },
      };
    });

    return true;
  }, [gameState]);

  const upgradeSkill = useCallback((skillId: string): boolean => {
    if (!gameState) return false;

    const skillCosts = {
      'combat_mastery': 1,
      'knowledge_boost': 2,
      'treasure_hunter': 2,
      'durability_expert': 3,
      'streak_master': 3,
      'health_regeneration': 4,
    };

    const cost = skillCosts[skillId as keyof typeof skillCosts] || 1;
    if (gameState.progression.skillPoints < cost) return false;

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        progression: {
          ...prev.progression,
          skillPoints: prev.progression.skillPoints - cost,
          unlockedSkills: [...prev.progression.unlockedSkills, skillId],
        },
      };
    });

    return true;
  }, [gameState]);

  const prestige = useCallback(): boolean => {
    if (!gameState || gameState.progression.level < 50) return false;

    const prestigeReward = Math.floor(gameState.progression.level / 10);

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        progression: {
          level: 1,
          experience: 0,
          experienceToNext: 100,
          skillPoints: 0,
          unlockedSkills: [],
          prestigeLevel: prev.progression.prestigeLevel + 1,
          prestigePoints: prev.progression.prestigePoints + prestigeReward,
          masteryLevels: prev.progression.masteryLevels,
        },
        playerStats: {
          ...prev.playerStats,
          hp: 100,
          maxHp: 100,
          atk: 25,
          def: 15,
        },
        zone: 1,
      };
    });

    return true;
  }, [gameState]);

  const claimOfflineRewards = useCallback(() => {
    if (!gameState) return;

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        coins: prev.coins + prev.offlineProgress.offlineCoins,
        gems: prev.gems + prev.offlineProgress.offlineGems,
        offlineProgress: {
          ...prev.offlineProgress,
          offlineCoins: 0,
          offlineGems: 0,
          offlineTime: 0,
        },
      };
    });
  }, [gameState]);

  const bulkSell = useCallback((itemIds: string[], type: 'weapon' | 'armor') => {
    setGameState(prev => {
      if (!prev) return prev;

      let totalValue = 0;
      let newInventory = { ...prev.inventory };

      if (type === 'weapon') {
        const itemsToSell = prev.inventory.weapons.filter(w => itemIds.includes(w.id));
        totalValue = itemsToSell.reduce((sum, item) => sum + item.sellPrice, 0);
        newInventory.weapons = prev.inventory.weapons.filter(w => !itemIds.includes(w.id));
      } else {
        const itemsToSell = prev.inventory.armor.filter(a => itemIds.includes(a.id));
        totalValue = itemsToSell.reduce((sum, item) => sum + item.sellPrice, 0);
        newInventory.armor = prev.inventory.armor.filter(a => !itemIds.includes(a.id));
      }

      return {
        ...prev,
        coins: prev.coins + totalValue,
        inventory: newInventory,
        statistics: {
          ...prev.statistics,
          itemsSold: prev.statistics.itemsSold + itemIds.length,
        },
      };
    });
  }, []);

  const bulkUpgrade = useCallback((itemIds: string[], type: 'weapon' | 'armor') => {
    setGameState(prev => {
      if (!prev) return prev;

      let totalCost = 0;
      let newInventory = { ...prev.inventory };

      if (type === 'weapon') {
        const itemsToUpgrade = prev.inventory.weapons.filter(w => itemIds.includes(w.id));
        totalCost = itemsToUpgrade.reduce((sum, item) => sum + item.upgradeCost, 0);
        
        if (prev.gems < totalCost) return prev;

        newInventory.weapons = prev.inventory.weapons.map(w => {
          if (itemIds.includes(w.id)) {
            return {
              ...w,
              level: w.level + 1,
              upgradeCost: Math.floor(w.upgradeCost * 1.5),
            };
          }
          return w;
        });
      } else {
        const itemsToUpgrade = prev.inventory.armor.filter(a => itemIds.includes(a.id));
        totalCost = itemsToUpgrade.reduce((sum, item) => sum + item.upgradeCost, 0);
        
        if (prev.gems < totalCost) return prev;

        newInventory.armor = prev.inventory.armor.map(a => {
          if (itemIds.includes(a.id)) {
            return {
              ...a,
              level: a.level + 1,
              upgradeCost: Math.floor(a.upgradeCost * 1.5),
            };
          }
          return a;
        });
      }

      return {
        ...prev,
        gems: prev.gems - totalCost,
        inventory: newInventory,
        statistics: {
          ...prev.statistics,
          itemsUpgraded: prev.statistics.itemsUpgraded + itemIds.length,
        },
      };
    });
  }, []);

  const plantSeed = useCallback((): boolean => {
    if (!gameState || gameState.coins < gameState.gardenOfGrowth.seedCost || gameState.gardenOfGrowth.isPlanted) {
      return false;
    }

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        coins: prev.coins - prev.gardenOfGrowth.seedCost,
        gardenOfGrowth: {
          ...prev.gardenOfGrowth,
          isPlanted: true,
          plantedAt: new Date(),
          lastWatered: new Date(),
          waterHoursRemaining: 24, // Start with 24 hours of water
        },
      };
    });

    return true;
  }, [gameState]);

  const buyWater = useCallback((hours: number): boolean => {
    if (!gameState || !gameState.gardenOfGrowth.isPlanted) return false;

    const cost = Math.floor((hours / 24) * gameState.gardenOfGrowth.waterCost);
    if (gameState.coins < cost) return false;

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        coins: prev.coins - cost,
        gardenOfGrowth: {
          ...prev.gardenOfGrowth,
          waterHoursRemaining: prev.gardenOfGrowth.waterHoursRemaining + hours,
          lastWatered: new Date(),
        },
      };
    });

    return true;
  }, [gameState]);

  const updateSettings = useCallback((newSettings: Partial<GameState['settings']>) => {
    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        settings: {
          ...prev.settings,
          ...newSettings,
        },
      };
    });
  }, []);

  const addCoins = useCallback((amount: number) => {
    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        coins: prev.coins + amount,
      };
    });
  }, []);

  const addGems = useCallback((amount: number) => {
    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        gems: prev.gems + amount,
      };
    });
  }, []);

  const teleportToZone = useCallback((zone: number) => {
    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        zone: Math.max(1, zone),
        statistics: {
          ...prev.statistics,
          zonesReached: Math.max(prev.statistics.zonesReached, zone),
        },
      };
    });
  }, []);

  const setExperience = useCallback((xp: number) => {
    setGameState(prev => {
      if (!prev) return prev;

      let newLevel = 1;
      let remainingXp = xp;
      let xpToNext = 100;

      while (remainingXp >= xpToNext) {
        remainingXp -= xpToNext;
        newLevel++;
        xpToNext = newLevel * 100;
      }

      return {
        ...prev,
        progression: {
          ...prev.progression,
          level: newLevel,
          experience: remainingXp,
          experienceToNext: xpToNext,
          skillPoints: prev.progression.skillPoints + (newLevel - prev.progression.level),
        },
      };
    });
  }, []);

  const rollSkill = useCallback((): boolean => {
    if (!gameState || gameState.coins < 100) return false;

    // Generate all possible menu skills
    const allMenuSkills = [
      { type: 'coin_vacuum', name: 'Coin Vacuum', description: 'Get 15 free coins per minute of play time', duration: 60 },
      { type: 'treasurer', name: 'Treasurer', description: 'Guarantees next chest opened is epic or better', duration: 1 },
      { type: 'xp_surge', name: 'XP Surge', description: 'Gives 300% XP gains for 24 hours', duration: 24 },
      { type: 'luck_gem', name: 'Luck Gem', description: 'All gems mined for 1 hour are shiny gems', duration: 1 },
      { type: 'enchanter', name: 'Enchanter', description: 'Epic+ drops have 80% chance to be enchanted', duration: 12 },
      { type: 'time_warp', name: 'Time Warp', description: 'Get 50% more time to answer questions for 12 hours', duration: 12 },
      { type: 'golden_touch', name: 'Golden Touch', description: 'All coin rewards are doubled for 8 hours', duration: 8 },
      { type: 'knowledge_boost', name: 'Knowledge Boost', description: 'Knowledge streaks build 50% faster for 24 hours', duration: 24 },
      { type: 'durability_master', name: 'Durability Master', description: 'Items lose no durability for 6 hours', duration: 6 },
      { type: 'relic_finder', name: 'Relic Finder', description: 'Next 3 Yojef Market refreshes have guaranteed legendary relics', duration: 1 },
      { type: 'stat_amplifier', name: 'Stat Amplifier', description: 'All stats (ATK, DEF, HP) increased by 50% for 4 hours', duration: 4 },
      { type: 'question_master', name: 'Question Master', description: 'See question category and difficulty before answering for 2 hours', duration: 2 },
      { type: 'gem_magnet', name: 'Gem Magnet', description: 'Triple gem rewards from all sources for 3 hours', duration: 3 },
      { type: 'streak_guardian', name: 'Streak Guardian', description: 'Knowledge streak cannot be broken for 1 hour', duration: 1 },
      { type: 'revival_blessing', name: 'Revival Blessing', description: 'Gain 3 extra revival chances for this session', duration: 1 },
      { type: 'zone_skipper', name: 'Zone Skipper', description: 'Skip directly to zone +5 without fighting', duration: 1 },
      { type: 'item_duplicator', name: 'Item Duplicator', description: 'Next item found is automatically duplicated', duration: 1 },
      { type: 'research_accelerator', name: 'Research Accelerator', description: 'Research costs 50% less for 6 hours', duration: 6 },
      { type: 'garden_booster', name: 'Garden Booster', description: 'Garden grows 5x faster for 2 hours', duration: 2 },
      { type: 'market_refresh', name: 'Market Refresh', description: 'Instantly refresh Yojef Market with premium items', duration: 1 },
      { type: 'coin_multiplier', name: 'Coin Multiplier', description: 'All coin gains are multiplied by 3x for 4 hours', duration: 4 },
      { type: 'gem_multiplier', name: 'Gem Multiplier', description: 'All gem gains are multiplied by 2.5x for 3 hours', duration: 3 },
      { type: 'xp_multiplier', name: 'XP Multiplier', description: 'All experience gains are multiplied by 4x for 2 hours', duration: 2 },
      { type: 'damage_boost', name: 'Damage Boost', description: 'Deal 100% more damage in combat for 5 hours', duration: 5 },
      { type: 'defense_boost', name: 'Defense Boost', description: 'Take 75% less damage in combat for 6 hours', duration: 6 },
      { type: 'health_boost', name: 'Health Boost', description: 'Maximum health increased by 200% for 8 hours', duration: 8 },
      { type: 'speed_boost', name: 'Speed Boost', description: 'Answer time increased by 100% for 3 hours', duration: 3 },
      { type: 'luck_boost', name: 'Luck Boost', description: 'All random events have 50% better outcomes for 4 hours', duration: 4 },
      { type: 'magic_shield', name: 'Magic Shield', description: 'Immune to all negative effects for 2 hours', duration: 2 },
      { type: 'auto_heal', name: 'Auto Heal', description: 'Automatically heal 25% HP every minute for 1 hour', duration: 1 }
    ];

    // Pick a random skill
    const randomSkill = allMenuSkills[Math.floor(Math.random() * allMenuSkills.length)];
    const now = new Date();
    const expiresAt = new Date(now.getTime() + randomSkill.duration * 60 * 60 * 1000);

    const newMenuSkill: MenuSkill = {
      id: Math.random().toString(36).substr(2, 9),
      name: randomSkill.name,
      description: randomSkill.description,
      duration: randomSkill.duration,
      activatedAt: now,
      expiresAt: expiresAt,
      type: randomSkill.type as any,
    };

    setGameState(prev => {
      if (!prev) return prev;

      let newState = {
        ...prev,
        coins: prev.coins - 100,
        skills: {
          ...prev.skills,
          activeMenuSkill: newMenuSkill,
          lastRollTime: now,
        },
      };

      // Apply immediate effects
      switch (randomSkill.type) {
        case 'stat_amplifier':
          newState.playerStats.atk = Math.floor(newState.playerStats.atk * 1.5);
          newState.playerStats.def = Math.floor(newState.playerStats.def * 1.5);
          newState.playerStats.maxHp = Math.floor(newState.playerStats.maxHp * 1.5);
          newState.playerStats.hp = newState.playerStats.maxHp;
          break;
        case 'health_boost':
          newState.playerStats.maxHp = Math.floor(newState.playerStats.maxHp * 3); // 200% increase
          newState.playerStats.hp = newState.playerStats.maxHp;
          break;
        case 'zone_skipper':
          newState.zone += 5;
          break;
        case 'market_refresh':
          newState.yojefMarket.items = Array.from({ length: 3 }, () => generateRelicItem());
          newState.yojefMarket.lastRefresh = now;
          newState.yojefMarket.nextRefresh = new Date(now.getTime() + 5 * 60 * 1000);
          break;
        case 'revival_blessing':
          newState.hasUsedRevival = false; // Reset revival
          break;
      }

      return newState;
    });

    return true;
  }, [gameState]);

  const spendFragments = useCallback((): boolean => {
    if (!gameState || gameState.merchant.hugollandFragments < 5) return false;

    // Generate 3 random rewards
    const rewardTypes = ['item', 'coins', 'gems', 'xp', 'health', 'attack', 'skill'];
    const rewards: MerchantReward[] = [];

    for (let i = 0; i < 3; i++) {
      const type = rewardTypes[Math.floor(Math.random() * rewardTypes.length)] as any;
      let reward: MerchantReward;

      switch (type) {
        case 'item':
          const isWeapon = Math.random() < 0.5;
          const rarity = Math.random() < 0.5 ? 'legendary' : 'mythical';
          const item = isWeapon ? generateWeapon(false, rarity, true) : generateArmor(false, rarity, true);
          reward = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'item',
            name: `${item.name}`,
            description: `A powerful ${rarity} ${isWeapon ? 'weapon' : 'armor'}`,
            icon: isWeapon ? '⚔️' : '🛡️',
            item,
          };
          break;
        case 'coins':
          const coinAmount = 5000 + Math.floor(Math.random() * 10000);
          reward = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'coins',
            name: 'Coin Treasure',
            description: `A large sum of coins`,
            icon: '💰',
            coins: coinAmount,
          };
          break;
        case 'gems':
          const gemAmount = 500 + Math.floor(Math.random() * 1000);
          reward = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'gems',
            name: 'Gem Collection',
            description: `A collection of precious gems`,
            icon: '💎',
            gems: gemAmount,
          };
          break;
        case 'xp':
          const xpAmount = 1000 + Math.floor(Math.random() * 2000);
          reward = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'xp',
            name: 'Experience Tome',
            description: `A tome filled with knowledge`,
            icon: '📚',
            xp: xpAmount,
          };
          break;
        case 'health':
          reward = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'health',
            name: 'Vitality Boost',
            description: `Permanently increase max health`,
            icon: '❤️',
            healthMultiplier: 1.5,
          };
          break;
        case 'attack':
          reward = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'attack',
            name: 'Strength Boost',
            description: `Permanently increase attack power`,
            icon: '⚔️',
            attackMultiplier: 1.3,
          };
          break;
        default:
          // Generate a free menu skill
          const skillTypes = ['coin_vacuum', 'xp_surge', 'golden_touch', 'gem_magnet'];
          const skillType = skillTypes[Math.floor(Math.random() * skillTypes.length)];
          const now = new Date();
          const skill: MenuSkill = {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Free Menu Skill',
            description: 'A powerful temporary ability',
            duration: 24,
            activatedAt: now,
            expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
            type: skillType as any,
          };
          reward = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'skill',
            name: 'Menu Skill',
            description: `A powerful temporary ability`,
            icon: '✨',
            skill,
          };
          break;
      }

      rewards.push(reward);
    }

    setGameState(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        merchant: {
          ...prev.merchant,
          hugollandFragments: prev.merchant.hugollandFragments - 5,
          showRewardModal: true,
          availableRewards: rewards,
        },
      };
    });

    return true;
  }, [gameState]);

  const selectMerchantReward = useCallback((reward: MerchantReward) => {
    setGameState(prev => {
      if (!prev) return prev;

      let newState = {
        ...prev,
        merchant: {
          ...prev.merchant,
          showRewardModal: false,
          availableRewards: [],
        },
      };

      // Apply reward
      switch (reward.type) {
        case 'item':
          if (reward.item) {
            const isWeapon = 'baseAtk' in reward.item;
            if (isWeapon) {
              newState.inventory.weapons.push(reward.item as Weapon);
            } else {
              newState.inventory.armor.push(reward.item as Armor);
            }
          }
          break;
        case 'coins':
          newState.coins += reward.coins || 0;
          break;
        case 'gems':
          newState.gems += reward.gems || 0;
          break;
        case 'xp':
          // Add experience
          const xp = reward.xp || 0;
          let newLevel = newState.progression.level;
          let remainingXp = newState.progression.experience + xp;
          let xpToNext = newState.progression.experienceToNext;

          while (remainingXp >= xpToNext) {
            remainingXp -= xpToNext;
            newLevel++;
            xpToNext = newLevel * 100;
          }

          newState.progression = {
            ...newState.progression,
            level: newLevel,
            experience: remainingXp,
            experienceToNext: xpToNext,
            skillPoints: newState.progression.skillPoints + (newLevel - newState.progression.level),
          };
          break;
        case 'health':
          newState.playerStats.maxHp = Math.floor(newState.playerStats.maxHp * (reward.healthMultiplier || 1));
          newState.playerStats.hp = newState.playerStats.maxHp;
          break;
        case 'attack':
          newState.playerStats.atk = Math.floor(newState.playerStats.atk * (reward.attackMultiplier || 1));
          break;
        case 'skill':
          if (reward.skill) {
            newState.skills.activeMenuSkill = reward.skill;
          }
          break;
      }

      return newState;
    });
  }, []);

  return {
    gameState,
    isLoading,
    updateStats,
    addToInventory,
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
    spendFragments,
    selectMerchantReward,
  };
};

export default useGameState;