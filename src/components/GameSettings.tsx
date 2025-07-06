import React from 'react';
import { Settings, X, Eye, Moon, Sun, Globe, Bell, BellOff, Grid3X3, Sparkles } from 'lucide-react';
import { GameSettings as SettingsType } from '../types/game';
import { getTranslation, t } from '../utils/translations';

interface GameSettingsProps {
  settings: SettingsType;
  onUpdateSettings: (settings: Partial<SettingsType>) => void;
  onClose: () => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({
  settings,
  onUpdateSettings,
  onClose
}) => {
  const translation = getTranslation(settings.language);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const toggleSetting = (key: keyof SettingsType) => {
    onUpdateSettings({ [key]: !settings[key] });
  };

  const updateLanguage = (language: SettingsType['language']) => {
    onUpdateSettings({ language });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className={`bg-gradient-to-br ${settings.darkMode ? 'from-gray-900 to-slate-900' : 'from-gray-100 to-white'} p-4 sm:p-6 rounded-lg border ${settings.darkMode ? 'border-gray-500/50' : 'border-gray-300'} max-w-2xl w-full max-h-[80vh] overflow-y-auto ${settings.snapToGrid ? 'snap-to-grid' : ''} ${settings.beautyMode ? 'beauty-mode' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Settings className={`w-6 h-6 sm:w-8 sm:h-8 ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <div>
              <h2 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-bold text-lg sm:text-xl`}>
                {translation.settings.title}
              </h2>
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                {translation.settings.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`${settings.darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors beautiful-button`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Visual Settings */}
          <div className={`${settings.darkMode ? 'bg-black/30' : 'bg-gray-50'} p-4 rounded-lg border ${settings.darkMode ? 'border-gray-600/50' : 'border-gray-200'} ${settings.beautyMode ? 'glass-effect' : ''}`}>
            <h3 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-bold text-lg mb-4`}>
              {translation.settings.visual}
            </h3>
            
            <div className="space-y-4">
              {/* Colorblind Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className={`w-5 h-5 ${settings.colorblindMode ? 'text-blue-400' : settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div>
                    <p className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                      {translation.settings.colorblind}
                    </p>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {translation.settings.colorblindDesc}
                    </p>
                    {settings.colorblindMode && (
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="text-gray-300 font-normal">Common ●</span>
                        <span className="text-cyan-300 font-medium">Rare ◆</span>
                        <span className="text-indigo-300 font-semibold">Epic ▲</span>
                        <span className="text-amber-300 font-bold">Legendary ★</span>
                        <span className="text-pink-300 font-black">Mythical ♦</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('colorblindMode')}
                  className={`w-12 h-6 rounded-full transition-all beautiful-toggle ${
                    settings.colorblindMode ? 'bg-blue-500' : settings.darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.colorblindMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.darkMode ? (
                    <Moon className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <p className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                      {translation.settings.darkMode}
                    </p>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {translation.settings.darkModeDesc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('darkMode')}
                  className={`w-12 h-6 rounded-full transition-all beautiful-toggle ${
                    settings.darkMode ? 'bg-indigo-500' : 'bg-yellow-500'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Snap to Grid */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Grid3X3 className={`w-5 h-5 ${settings.snapToGrid ? 'text-green-400' : settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div>
                    <p className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                      Snap to Grid
                    </p>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      Align UI elements to a grid for precise positioning
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('snapToGrid')}
                  className={`w-12 h-6 rounded-full transition-all beautiful-toggle ${
                    settings.snapToGrid ? 'bg-green-500' : settings.darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.snapToGrid ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Beauty Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className={`w-5 h-5 ${settings.beautyMode ? 'text-pink-400' : settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div>
                    <p className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                      Beauty Mode
                    </p>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      Enhanced visual effects and animations for a stunning experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('beautyMode')}
                  className={`w-12 h-6 rounded-full transition-all beautiful-toggle ${
                    settings.beautyMode ? 'bg-pink-500' : settings.darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.beautyMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.notifications ? (
                    <Bell className="w-5 h-5 text-blue-400" />
                  ) : (
                    <BellOff className={`w-5 h-5 ${settings.darkMode ? 'text-red-400' : 'text-red-500'}`} />
                  )}
                  <div>
                    <p className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                      {translation.settings.notifications}
                    </p>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {translation.settings.notificationsDesc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('notifications')}
                  className={`w-12 h-6 rounded-full transition-all beautiful-toggle ${
                    settings.notifications ? 'bg-blue-500' : settings.darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className={`${settings.darkMode ? 'bg-black/30' : 'bg-gray-50'} p-4 rounded-lg border ${settings.darkMode ? 'border-gray-600/50' : 'border-gray-200'} ${settings.beautyMode ? 'glass-effect' : ''}`}>
            <h3 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-bold text-lg mb-4 flex items-center gap-2`}>
              <Globe className="w-5 h-5 text-green-400" />
              {translation.settings.language}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => updateLanguage(lang.code as SettingsType['language'])}
                  className={`p-3 rounded-lg border-2 transition-all text-left beautiful-button ${
                    settings.language === lang.code
                      ? 'border-green-500 bg-green-900/30'
                      : settings.darkMode 
                        ? 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <p className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold text-sm`}>
                        {lang.name}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className={`mt-3 p-3 ${settings.darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} rounded-lg border ${settings.darkMode ? 'border-yellow-500/30' : 'border-yellow-200'}`}>
              <p className={`${settings.darkMode ? 'text-yellow-300' : 'text-yellow-700'} text-sm`}>
                {translation.settings.languageNote}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>{translation.settings.autoSaved}</p>
        </div>
      </div>
    </div>
  );
};