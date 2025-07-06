import React, { useState } from 'react';
import { CollectionBook as CollectionBookType, Weapon, Armor } from '../types/game';
import { Book, Sword, Shield, Star, X, Trophy } from 'lucide-react';
import { getRarityColor, getRarityBorder } from '../utils/gameUtils';

interface CollectionBookProps {
  collectionBook: CollectionBookType;
  allWeapons: Weapon[];
  allArmor: Armor[];
  onClose: () => void;
}

export const CollectionBook: React.FC<CollectionBookProps> = ({ 
  collectionBook, 
  allWeapons, 
  allArmor, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'weapons' | 'armor' | 'stats'>('weapons');

  const discoveredWeapons = allWeapons.filter(weapon => 
    collectionBook.weapons[weapon.name] || false
  );
  
  const discoveredArmor = allArmor.filter(armor => 
    collectionBook.armor[armor.name] || false
  );

  const totalItems = collectionBook.totalWeaponsFound + collectionBook.totalArmorFound;
  const totalRarityItems = Object.values(collectionBook.rarityStats).reduce((a, b) => a + b, 0);

  const renderRarityStats = () => (
    <div className="space-y-4">
      <h3 className="text-white font-bold text-lg mb-4">Collection Statistics</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Total Items</h4>
          <p className="text-2xl font-bold text-green-400">{totalItems}</p>
          <div className="text-sm text-gray-300 mt-1">
            <p>Weapons: {collectionBook.totalWeaponsFound}</p>
            <p>Armor: {collectionBook.totalArmorFound}</p>
          </div>
        </div>

        <div className="bg-black/30 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Completion Rate</h4>
          <p className="text-2xl font-bold text-blue-400">
            {totalItems > 0 ? Math.round((totalRarityItems / totalItems) * 100) : 0}%
          </p>
          <p className="text-sm text-gray-300 mt-1">Items catalogued</p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded-lg">
        <h4 className="text-white font-semibold mb-3">Rarity Distribution</h4>
        <div className="space-y-2">
          {Object.entries(collectionBook.rarityStats).map(([rarity, count]) => (
            <div key={rarity} className="flex items-center justify-between">
              <span className={`font-semibold capitalize ${getRarityColor(rarity)}`}>
                {rarity}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getRarityColor(rarity).replace('text-', 'bg-')}`}
                    style={{ 
                      width: `${totalRarityItems > 0 ? (count / totalRarityItems) * 100 : 0}%` 
                    }}
                  />
                </div>
                <span className="text-white text-sm w-8 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderItemGrid = (items: (Weapon | Armor)[], type: 'weapon' | 'armor') => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className={`p-3 rounded-lg border-2 ${getRarityBorder(item.rarity)} bg-black/40`}
        >
          <div className="flex items-center gap-2 mb-2">
            {type === 'weapon' ? (
              <Sword className="w-4 h-4 text-orange-400" />
            ) : (
              <Shield className="w-4 h-4 text-blue-400" />
            )}
            <h4 className={`font-semibold text-sm ${getRarityColor(item.rarity)}`}>
              {item.name}
            </h4>
          </div>
          <div className="text-xs text-gray-300 space-y-1">
            <p className="capitalize">{item.rarity} Rarity</p>
            <p>
              {type === 'weapon' 
                ? `ATK: ${(item as Weapon).baseAtk}` 
                : `DEF: ${(item as Armor).baseDef}`
              }
            </p>
            {item.isChroma && (
              <p className="text-red-400 font-semibold">✨ Chroma Variant</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-4 sm:p-6 rounded-lg border border-indigo-500/50 max-w-6xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Book className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Collection Book</h2>
              <p className="text-indigo-300 text-sm">
                {totalItems} items discovered
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

        {/* Tab Navigation - Mobile responsive */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'weapons', label: 'Weapons', count: discoveredWeapons.length, icon: Sword },
            { key: 'armor', label: 'Armor', count: discoveredArmor.length, icon: Shield },
            { key: 'stats', label: 'Statistics', icon: Trophy }
          ].map(({ key, label, count, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
              {count !== undefined && (
                <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'weapons' && (
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Discovered Weapons ({discoveredWeapons.length})
              </h3>
              {discoveredWeapons.length > 0 ? (
                renderItemGrid(discoveredWeapons, 'weapon')
              ) : (
                <div className="text-center py-12">
                  <Sword className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No weapons discovered yet</p>
                  <p className="text-gray-500 text-sm">Open chests to find new weapons!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'armor' && (
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Discovered Armor ({discoveredArmor.length})
              </h3>
              {discoveredArmor.length > 0 ? (
                renderItemGrid(discoveredArmor, 'armor')
              ) : (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No armor discovered yet</p>
                  <p className="text-gray-500 text-sm">Open chests to find new armor!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && renderRarityStats()}
        </div>
      </div>
    </div>
  );
};