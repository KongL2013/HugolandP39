// Colorblind-friendly color utilities
export const getColorblindFriendlyColors = (isColorblindMode: boolean) => {
  if (!isColorblindMode) {
    // Normal colors
    return {
      rarity: {
        common: 'text-gray-400',
        rare: 'text-blue-400',
        epic: 'text-purple-400',
        legendary: 'text-yellow-400',
        mythical: 'text-red-600'
      },
      rarityBorder: {
        common: 'border-gray-400',
        rare: 'border-blue-400',
        epic: 'border-purple-400',
        legendary: 'border-yellow-400',
        mythical: 'border-red-600'
      },
      rarityBg: {
        common: 'bg-gray-900/30',
        rare: 'bg-blue-900/30',
        epic: 'bg-purple-900/30',
        legendary: 'bg-yellow-900/30',
        mythical: 'bg-red-900/30'
      },
      health: {
        high: 'bg-green-500',
        medium: 'bg-yellow-500',
        low: 'bg-red-500'
      },
      ui: {
        success: 'text-green-400',
        warning: 'text-yellow-400',
        error: 'text-red-400',
        info: 'text-blue-400'
      }
    };
  } else {
    // Colorblind-friendly colors with high contrast and patterns
    return {
      rarity: {
        common: 'text-gray-300 font-normal',
        rare: 'text-cyan-300 font-medium',
        epic: 'text-indigo-300 font-semibold',
        legendary: 'text-amber-300 font-bold',
        mythical: 'text-pink-300 font-black'
      },
      rarityBorder: {
        common: 'border-gray-400 border-solid',
        rare: 'border-cyan-400 border-dashed',
        epic: 'border-indigo-400 border-dotted',
        legendary: 'border-amber-400 border-double',
        mythical: 'border-pink-400 border-4'
      },
      rarityBg: {
        common: 'bg-gray-800/40',
        rare: 'bg-cyan-900/40',
        epic: 'bg-indigo-900/40',
        legendary: 'bg-amber-900/40',
        mythical: 'bg-pink-900/40'
      },
      health: {
        high: 'bg-slate-400',
        medium: 'bg-slate-500',
        low: 'bg-slate-700'
      },
      ui: {
        success: 'text-slate-300',
        warning: 'text-slate-400',
        error: 'text-slate-500',
        info: 'text-slate-200'
      }
    };
  }
};

export const getRaritySymbol = (rarity: string, isColorblindMode: boolean): string => {
  if (!isColorblindMode) return '';
  
  const symbols = {
    common: '●',
    rare: '◆',
    epic: '▲',
    legendary: '★',
    mythical: '♦'
  };
  
  return symbols[rarity as keyof typeof symbols] || '';
};

export const getColorblindRarityClass = (rarity: string, type: 'text' | 'border' | 'bg', isColorblindMode: boolean): string => {
  const colors = getColorblindFriendlyColors(isColorblindMode);
  
  switch (type) {
    case 'text':
      return colors.rarity[rarity as keyof typeof colors.rarity] || colors.rarity.common;
    case 'border':
      return colors.rarityBorder[rarity as keyof typeof colors.rarityBorder] || colors.rarityBorder.common;
    case 'bg':
      return colors.rarityBg[rarity as keyof typeof colors.rarityBg] || colors.rarityBg.common;
    default:
      return '';
  }
};