import React, { useState } from 'react';
import { Inventory as InventoryType, Weapon, Armor, RelicItem } from '../types/game';
import { Sword, Shield, Gem, Star, Coins, Sparkles } from 'lucide-react';
import { getRarityColor, getRarityBorder, getRarityGlow } from '../utils/gameUtils';

interface InventoryProps {
  inventory: InventoryType;
  gems: number;
  onEquipWeapon: (weapon: Weapon) => void;
  onEquipArmor: (armor: Armor) => void;
  onUpgradeWeapon: (weaponId: string) => void;
  onUpgradeArmor: (armorId: string) => void;
  onSellWeapon: (weaponId: string) => void;
  onSellArmor: (armorId: string) => void;
  onUpgradeRelic: (relicId: string) => void;
  onEquipRelic: (relicId: string) => void;
  onUnequipRelic: (relicId: string) => void;
  onSellRelic: (relicId: string) => void;
}

export const Inventory: React.FC<InventoryProps> = ({
  inventory,
  gems,
  onEquipWeapon,
  onEquipArmor,
  onUpgradeWeapon,
  onUpgradeArmor,
  onSellWeapon,
  onSellArmor,
  onUpgradeRelic,
  onEquipRelic,
  onUnequipRelic,
  onSellRelic,
}) => {
  const [activeTab, setActiveTab] = useState<'weapons' | 'armor' | 'relics'>('weapons');

  const getDurabilityColor = (durability: number, maxDurability: number) => {
    const percentage = durability / maxDurability;
    if (percentage > 0.7) return 'text-green-400';
    if (percentage > 0.3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDurabilityBarColor = (durability: number, maxDurability: number) => {
    const percentage = durability / maxDurability;
    if (percentage > 0.7) return 'bg-green-500';
    if (percentage > 0.3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderEquippedSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="bg-black/30 p-3 sm:p-4 rounded-xl border border-orange-500/50">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
          <Sword className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
          Equipped Weapon
        </h3>
        {inventory.currentWeapon ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className={`font-semibold text-sm sm:text-base ${getRarityColor(inventory.currentWeapon.rarity)}`}>
                {inventory.currentWeapon.name}
              </p>
              {inventory.currentWeapon.isChroma && (
                <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
              )}
              {inventory.currentWeapon.isEnchanted && (
                <Star className="w-4 h-4 text-cyan-400 animate-pulse" />
              )}
            </div>
            <p className="text-white text-sm sm:text-base">ATK: {inventory.currentWeapon.baseAtk + (inventory.currentWeapon.level - 1) * 10}</p>
            <p className="text-gray-300 text-xs sm:text-sm">Level {inventory.currentWeapon.level}</p>
            
            {/* Durability */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">Durability</span>
                <span className={getDurabilityColor(inventory.currentWeapon.durability, inventory.currentWeapon.maxDurability)}>
                  {inventory.currentWeapon.durability}/{inventory.currentWeapon.maxDurability}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getDurabilityBarColor(inventory.currentWeapon.durability, inventory.currentWeapon.maxDurability)}`}
                  style={{ width: `${(inventory.currentWeapon.durability / inventory.currentWeapon.maxDurability) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No weapon equipped</p>
        )}
      </div>

      <div className="bg-black/30 p-3 sm:p-4 rounded-xl border border-blue-500/30">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          Equipped Armor
        </h3>
        {inventory.currentArmor ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className={`font-semibold text-sm sm:text-base ${getRarityColor(inventory.currentArmor.rarity)}`}>
                {inventory.currentArmor.name}
              </p>
              {inventory.currentArmor.isChroma && (
                <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
              )}
              {inventory.currentArmor.isEnchanted && (
                <Star className="w-4 h-4 text-cyan-400 animate-pulse" />
              )}
            </div>
            <p className="text-white text-sm sm:text-base">DEF: {inventory.currentArmor.baseDef + (inventory.currentArmor.level - 1) * 5}</p>
            <p className="text-gray-300 text-xs sm:text-sm">Level {inventory.currentArmor.level}</p>
            
            {/* Durability */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">Durability</span>
                <span className={getDurabilityColor(inventory.currentArmor.durability, inventory.currentArmor.maxDurability)}>
                  {inventory.currentArmor.durability}/{inventory.currentArmor.maxDurability}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getDurabilityBarColor(inventory.currentArmor.durability, inventory.currentArmor.maxDurability)}`}
                  style={{ width: `${(inventory.currentArmor.durability / inventory.currentArmor.maxDurability) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No armor equipped</p>
        )}
      </div>
    </div>
  );

  const renderItemGrid = (items: (Weapon | Armor)[], type: 'weapon' | 'armor') => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 max-h-64 sm:max-h-80 overflow-y-auto">
      {items.map((item) => (
        <div 
          key={item.id} 
          className={`bg-black/40 p-3 sm:p-4 rounded-lg border-2 ${getRarityBorder(item.rarity)} ${getRarityGlow(item.rarity)} ${item.isChroma ? 'animate-pulse' : ''}`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className={`font-semibold text-sm sm:text-base truncate ${getRarityColor(item.rarity)}`}>
                  {item.name}
                </p>
                {item.isChroma && (
                  <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
                )}
                {item.isEnchanted && (
                  <Star className="w-4 h-4 text-cyan-400 animate-pulse" />
                )}
              </div>
              <p className="text-white text-sm sm:text-base mb-1">
                {type === 'weapon' ? `ATK: ${(item as Weapon).baseAtk + (item.level - 1) * 10}` : `DEF: ${(item as Armor).baseDef + (item.level - 1) * 5}`}
              </p>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-300 mb-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                Level {item.level}
              </div>
              
              {/* Durability */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Durability</span>
                  <span className={getDurabilityColor(item.durability, item.maxDurability)}>
                    {item.durability}/{item.maxDurability}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${getDurabilityBarColor(item.durability, item.maxDurability)}`}
                    style={{ width: `${(item.durability / item.maxDurability) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-xs sm:text-sm text-yellow-400">
                <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
                Sell: {item.sellPrice}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={() => type === 'weapon' ? onEquipWeapon(item as Weapon) : onEquipArmor(item as Armor)}
              disabled={(type === 'weapon' ? inventory.currentWeapon?.id : inventory.currentArmor?.id) === item.id}
              className={`px-3 py-2 text-sm rounded font-semibold transition-all ${
                (type === 'weapon' ? inventory.currentWeapon?.id : inventory.currentArmor?.id) === item.id
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : type === 'weapon' ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {(type === 'weapon' ? inventory.currentWeapon?.id : inventory.currentArmor?.id) === item.id ? 'Equipped' : 'Equip'}
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={() => type === 'weapon' ? onUpgradeWeapon(item.id) : onUpgradeArmor(item.id)}
                disabled={gems < item.upgradeCost}
                className={`flex-1 px-2 py-1 text-xs rounded font-semibold transition-all flex items-center gap-1 justify-center ${
                  gems >= item.upgradeCost
                    ? 'bg-purple-600 text-white hover:bg-purple-500'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Gem className="w-3 h-3" />
                {item.upgradeCost}
              </button>
              
              <button
                onClick={() => type === 'weapon' ? onSellWeapon(item.id) : onSellArmor(item.id)}
                disabled={(type === 'weapon' ? inventory.currentWeapon?.id : inventory.currentArmor?.id) === item.id}
                className={`flex-1 px-2 py-1 text-xs rounded font-semibold transition-all ${
                  (type === 'weapon' ? inventory.currentWeapon?.id : inventory.currentArmor?.id) === item.id
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-500'
                }`}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRelicGrid = () => (
    <div className="space-y-4">
      {/* Absorbed Relics Power Display */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4 rounded-lg border border-indigo-500/50">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
          Absorbed Relic Power ({inventory.equippedRelics.length} relics)
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-black/30 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sword className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-semibold text-sm">Total ATK</span>
            </div>
            <p className="text-white font-bold text-lg">
              +{inventory.equippedRelics
                .filter(r => r.type === 'weapon')
                .reduce((total, relic) => total + (relic.baseAtk! + (relic.level - 1) * 22), 0)}
            </p>
          </div>
          <div className="text-center bg-black/30 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm">Total DEF</span>
            </div>
            <p className="text-white font-bold text-lg">
              +{inventory.equippedRelics
                .filter(r => r.type === 'armor')
                .reduce((total, relic) => total + (relic.baseDef! + (relic.level - 1) * 15), 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Equipped Relics */}
      {inventory.equippedRelics.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
            Equipped Relics (Power Absorbed)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 max-h-64 overflow-y-auto">
            {inventory.equippedRelics.map((relic) => (
              <div key={relic.id} className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-3 sm:p-4 rounded-lg border-2 border-indigo-500/50">
                <div className="flex items-center gap-2 mb-2">
                  {relic.type === 'weapon' ? (
                    <Sword className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Shield className="w-4 h-4 text-blue-400" />
                  )}
                  <h4 className="text-white font-bold text-sm">{relic.name}</h4>
                </div>
                <p className="text-gray-300 text-xs mb-2">{relic.description}</p>
                <p className="text-white text-sm mb-2">
                  {relic.type === 'weapon' ? `ATK: ${relic.baseAtk! + (relic.level - 1) * 22}` : `DEF: ${relic.baseDef! + (relic.level - 1) * 15}`}
                </p>
                <p className="text-gray-300 text-xs mb-3">Level {relic.level}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpgradeRelic(relic.id)}
                    disabled={gems < relic.upgradeCost}
                    className={`flex-1 px-2 py-1 text-xs rounded font-semibold transition-all flex items-center gap-1 justify-center ${
                      gems >= relic.upgradeCost
                        ? 'bg-purple-600 text-white hover:bg-purple-500'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Gem className="w-3 h-3" />
                    {relic.upgradeCost}
                  </button>
                  <button
                    onClick={() => onUnequipRelic(relic.id)}
                    className="flex-1 px-2 py-1 text-xs rounded font-semibold bg-red-600 text-white hover:bg-red-500 transition-all"
                  >
                    Unequip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unequipped Relics */}
      {inventory.relics.filter(r => !inventory.equippedRelics.some(er => er.id === r.id)).length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            Unequipped Relics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {inventory.relics.filter(r => !inventory.equippedRelics.some(er => er.id === r.id)).map((relic) => (
              <div key={relic.id} className="bg-black/40 p-3 sm:p-4 rounded-lg border border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  {relic.type === 'weapon' ? (
                    <Sword className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Shield className="w-4 h-4 text-blue-400" />
                  )}
                  <h4 className="text-white font-bold text-sm">{relic.name}</h4>
                </div>
                <p className="text-gray-300 text-xs mb-2">{relic.description}</p>
                <p className="text-white text-sm mb-2">
                  {relic.type === 'weapon' ? `ATK: ${relic.baseAtk! + (relic.level - 1) * 22}` : `DEF: ${relic.baseDef! + (relic.level - 1) * 15}`}
                </p>
                <p className="text-gray-300 text-xs mb-3">Level {relic.level}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => onEquipRelic(relic.id)}
                    className="flex-1 px-2 py-1 text-xs rounded font-semibold transition-all bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    Equip & Absorb
                  </button>
                  <button
                    onClick={() => onSellRelic(relic.id)}
                    className="flex-1 px-2 py-1 text-xs rounded font-semibold bg-red-600 text-white hover:bg-red-500 transition-all"
                  >
                    Destroy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 sm:p-6 rounded-lg shadow-2xl">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Inventory</h2>
        <div className="flex items-center justify-center gap-2 text-purple-300">
          <Gem className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold text-sm sm:text-base">{gems} Gems</span>
        </div>
      </div>

      {/* Currently Equipped */}
      {renderEquippedSection()}

      {/* Tab Navigation - Mobile responsive */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'weapons', label: 'Weapons', count: inventory.weapons.length, icon: Sword },
          { key: 'armor', label: 'Armor', count: inventory.armor.length, icon: Shield },
          { key: 'relics', label: 'Relics', count: inventory.relics.length, icon: Shield }
        ].map(({ key, label, count, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === key
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
            <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'weapons' && (
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
            <Sword className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            Weapons ({inventory.weapons.length})
          </h3>
          {inventory.weapons.length > 0 ? (
            renderItemGrid(inventory.weapons, 'weapon')
          ) : (
            <div className="text-center py-8">
              <Sword className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No weapons found</p>
              <p className="text-gray-500 text-sm">Open chests to find weapons!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'armor' && (
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            Armor ({inventory.armor.length})
          </h3>
          {inventory.armor.length > 0 ? (
            renderItemGrid(inventory.armor, 'armor')
          ) : (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No armor found</p>
              <p className="text-gray-500 text-sm">Open chests to find armor!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'relics' && (
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
            Ancient Relics ({inventory.relics.length})
          </h3>
          {inventory.relics.length > 0 ? (
            renderRelicGrid()
          ) : (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No relics found</p>
              <p className="text-gray-500 text-sm">Visit the Yojef Market to find ancient relics!</p>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="mt-6 text-center">
        <div className="bg-black/30 p-3 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-300 mb-2">
            💡 <strong>Features:</strong>
          </p>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• <strong>Enchanted Items:</strong> 5% chance from chests, double ATK/DEF</p>
            <p>• <strong>Relics:</strong> Powerful ancient items - equip unlimited relics to absorb their power!</p>
            <p>• <strong>Durability:</strong> Items lose durability in combat and become less effective</p>
          </div>
        </div>
      </div>
    </div>
  );
};