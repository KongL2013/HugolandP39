import React, { useState } from 'react';
import { Weapon, Armor } from '../types/game';
import { Package, Coins, Gem, Trash2, TrendingUp, X, CheckSquare, Square } from 'lucide-react';
import { getRarityColor, getRarityBorder } from '../utils/gameUtils';

interface BulkActionsProps {
  weapons: Weapon[];
  armor: Armor[];
  gems: number;
  onBulkSell: (itemIds: string[], type: 'weapon' | 'armor') => void;
  onBulkUpgrade: (itemIds: string[], type: 'weapon' | 'armor') => void;
  onClose: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  weapons,
  armor,
  gems,
  onBulkSell,
  onBulkUpgrade,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'weapons' | 'armor'>('weapons');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [actionType, setActionType] = useState<'sell' | 'upgrade'>('sell');

  const currentItems = activeTab === 'weapons' ? weapons : armor;
  const selectedItemsArray = currentItems.filter(item => selectedItems.has(item.id));

  const toggleItemSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const selectAll = () => {
    setSelectedItems(new Set(currentItems.map(item => item.id)));
  };

  const selectNone = () => {
    setSelectedItems(new Set());
  };

  const selectByRarity = (rarity: string) => {
    const itemsOfRarity = currentItems.filter(item => item.rarity === rarity);
    setSelectedItems(new Set(itemsOfRarity.map(item => item.id)));
  };

  const getTotalValue = () => {
    if (actionType === 'sell') {
      return selectedItemsArray.reduce((total, item) => total + item.sellPrice, 0);
    } else {
      return selectedItemsArray.reduce((total, item) => total + item.upgradeCost, 0);
    }
  };

  const canPerformAction = () => {
    if (selectedItems.size === 0) return false;
    if (actionType === 'upgrade') {
      return gems >= getTotalValue();
    }
    return true;
  };

  const handleAction = () => {
    if (!canPerformAction()) return;
    
    const itemIds = Array.from(selectedItems);
    if (actionType === 'sell') {
      onBulkSell(itemIds, activeTab === 'weapons' ? 'weapon' : 'armor');
    } else {
      onBulkUpgrade(itemIds, activeTab === 'weapons' ? 'weapon' : 'armor');
    }
    
    setSelectedItems(new Set());
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-slate-900 p-4 sm:p-6 rounded-lg border border-gray-500/50 max-w-6xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Bulk Actions</h2>
              <p className="text-gray-300 text-sm">Manage multiple items at once</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'weapons', label: 'Weapons', count: weapons.length },
            { key: 'armor', label: 'Armor', count: armor.length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key as any);
                setSelectedItems(new Set());
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Action Type Selection */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActionType('sell')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              actionType === 'sell'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Coins className="w-4 h-4" />
            Bulk Sell
          </button>
          <button
            onClick={() => setActionType('upgrade')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              actionType === 'upgrade'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Bulk Upgrade
          </button>
        </div>

        {/* Selection Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={selectAll}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-500"
          >
            Select All
          </button>
          <button
            onClick={selectNone}
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500"
          >
            Select None
          </button>
          {['common', 'rare', 'epic', 'legendary', 'mythical'].map(rarity => (
            <button
              key={rarity}
              onClick={() => selectByRarity(rarity)}
              className={`px-3 py-1 rounded text-sm capitalize ${getRarityColor(rarity)} bg-black/30 hover:bg-black/50`}
            >
              {rarity}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6 max-h-96 overflow-y-auto">
          {currentItems.map((item) => {
            const isSelected = selectedItems.has(item.id);
            
            return (
              <div
                key={item.id}
                onClick={() => toggleItemSelection(item.id)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-900/30' 
                    : `${getRarityBorder(item.rarity)} bg-black/20 hover:bg-black/40`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`font-semibold text-sm ${getRarityColor(item.rarity)}`}>
                      {item.name}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-300 space-y-1">
                  <p>Level {item.level}</p>
                  <p>
                    {activeTab === 'weapons' 
                      ? `ATK: ${(item as Weapon).baseAtk + (item.level - 1) * 10}` 
                      : `DEF: ${(item as Armor).baseDef + (item.level - 1) * 5}`
                    }
                  </p>
                  <div className="flex justify-between">
                    <span className="text-yellow-400">Sell: {item.sellPrice}</span>
                    <span className="text-purple-400">Up: {item.upgradeCost}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Summary */}
        <div className="bg-black/30 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">
                Selected: {selectedItems.size} items
              </p>
              <p className="text-gray-300 text-sm">
                Total {actionType === 'sell' ? 'value' : 'cost'}: {getTotalValue().toLocaleString()} {actionType === 'sell' ? 'coins' : 'gems'}
              </p>
            </div>
            
            <button
              onClick={handleAction}
              disabled={!canPerformAction()}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                canPerformAction()
                  ? actionType === 'sell'
                    ? 'bg-red-600 text-white hover:bg-red-500'
                    : 'bg-purple-600 text-white hover:bg-purple-500'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {actionType === 'sell' ? 'Sell Selected' : 'Upgrade Selected'}
            </button>
          </div>
          
          {actionType === 'upgrade' && gems < getTotalValue() && selectedItems.size > 0 && (
            <p className="text-red-400 text-sm mt-2">
              Not enough gems! Need {getTotalValue() - gems} more gems.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};