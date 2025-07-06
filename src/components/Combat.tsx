import React, { useState, useEffect } from 'react';
import { Enemy } from '../types/game';
import { Sword, Shield, Heart, Brain, Clock, Zap, Skull, Flame, RotateCcw, SkipForward } from 'lucide-react';
import { TriviaQuestion, getQuestionByZone, checkAnswer } from '../utils/triviaQuestions';

interface CombatProps {
  enemy: Enemy;
  playerStats: {
    hp: number;
    maxHp: number;
    atk: number;
    def: number;
  };
  onAttack: (hit: boolean, category?: string) => void;
  combatLog: string[];
  gameMode: {
    current: 'normal' | 'blitz' | 'bloodlust' | 'survival';
    speedModeActive: boolean;
    survivalLives: number;
    maxSurvivalLives: number;
  };
  knowledgeStreak: {
    current: number;
    best: number;
    multiplier: number;
  };
  hasUsedRevival?: boolean;
  adventureSkills?: {
    selectedSkill: any;
    skillEffects: {
      skipCardUsed: boolean;
      metalShieldUsed: boolean;
      dodgeUsed: boolean;
      truthLiesActive: boolean;
      lightningChainActive: boolean;
      rampActive: boolean;
    };
  };
  onUseSkipCard?: () => void;
}

export const Combat: React.FC<CombatProps> = ({ 
  enemy, 
  playerStats, 
  onAttack, 
  combatLog, 
  gameMode,
  knowledgeStreak,
  hasUsedRevival = false,
  adventureSkills,
  onUseSkipCard
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [reorderedWords, setReorderedWords] = useState<string[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);

  // Increased time limits to make the game easier
  const questionTime = (gameMode.current === 'blitz' || gameMode.current === 'bloodlust') ? 5 : 8;

  useEffect(() => {
    let question = getQuestionByZone(enemy.zone);
    
    // Apply truth and lies skill effect
    if (adventureSkills?.skillEffects.truthLiesActive && question.type === 'multiple-choice' && question.options) {
      const correctIndex = question.correctAnswer as number;
      const wrongIndices = question.options.map((_, index) => index).filter(i => i !== correctIndex);
      const indexToRemove = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
      
      const newOptions = question.options.filter((_, index) => index !== indexToRemove);
      const newCorrectAnswer = correctIndex > indexToRemove ? correctIndex - 1 : correctIndex;
      
      question = {
        ...question,
        options: newOptions,
        correctAnswer: newCorrectAnswer
      };
    }
    
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setTypedAnswer('');
    setSliderValue(question.sliderRange?.min || 0);
    setReorderedWords(question.wordsToReorder || []);
    setTimeLeft(questionTime);
    setShowResult(false);
    setLastAnswerCorrect(null);
  }, [enemy, questionTime, adventureSkills?.skillEffects.truthLiesActive]);

  useEffect(() => {
    if (!currentQuestion || isAnswering || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, isAnswering, showResult]);

  const handleAnswer = (answerIndex: number | null) => {
    if (isAnswering || !currentQuestion) return;

    setIsAnswering(true);
    
    let userAnswer: string | number | number[];
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        setSelectedAnswer(answerIndex);
        userAnswer = answerIndex ?? -1;
        break;
      case 'slider':
        userAnswer = sliderValue;
        break;
      case 'reorder-words':
        userAnswer = reorderedWords.map(word => 
          currentQuestion.wordsToReorder!.indexOf(word)
        );
        break;
      default:
        userAnswer = typedAnswer;
    }

    const isCorrect = checkAnswer(currentQuestion, userAnswer);
    setLastAnswerCorrect(isCorrect);
    setShowResult(true);

    setTimeout(() => {
      onAttack(isCorrect, currentQuestion.category);
      
      const newQuestion = getQuestionByZone(enemy.zone);
      setCurrentQuestion(newQuestion);
      setSelectedAnswer(null);
      setTypedAnswer('');
      setSliderValue(newQuestion.sliderRange?.min || 0);
      setReorderedWords(newQuestion.wordsToReorder || []);
      setIsAnswering(false);
      setTimeLeft(questionTime);
      setShowResult(false);
      setLastAnswerCorrect(null);
    }, 2000);
  };

  const handleSkipCard = () => {
    if (onUseSkipCard && adventureSkills?.selectedSkill?.type === 'skip_card' && !adventureSkills.skillEffects.skipCardUsed) {
      onUseSkipCard();
      // Automatically answer correctly
      handleAnswer(currentQuestion?.correctAnswer as number);
    }
  };

  const moveWord = (fromIndex: number, toIndex: number) => {
    const newWords = [...reorderedWords];
    const [movedWord] = newWords.splice(fromIndex, 1);
    newWords.splice(toIndex, 0, movedWord);
    setReorderedWords(newWords);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBorder = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'border-green-400';
      case 'medium': return 'border-yellow-400';
      case 'hard': return 'border-red-400';
      default: return 'border-gray-400';
    }
  };

  const getModeIcon = () => {
    switch (gameMode.current) {
      case 'blitz': return <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />;
      case 'bloodlust': return <Sword className="w-5 h-5 text-red-400 animate-pulse" />;
      case 'survival': return <Shield className="w-5 h-5 text-green-400 animate-pulse" />;
      default: return <Clock className="w-5 h-5 text-blue-400" />;
    }
  };

  const getModeColor = () => {
    switch (gameMode.current) {
      case 'blitz': return 'bg-yellow-600';
      case 'bloodlust': return 'bg-red-600';
      case 'survival': return 'bg-green-600';
      default: return 'bg-blue-600';
    }
  };

  if (!currentQuestion) {
    return (
      <div className="bg-gradient-to-br from-red-900/80 via-purple-900/80 to-black/80 p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-red-500/50">
        <div className="text-center py-8">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full mb-4"></div>
          <p className="text-white text-lg">Loading question...</p>
        </div>
      </div>
    );
  }

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options?.map((option, index) => {
              let buttonClass = 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 typing-interface';
              
              if (showResult) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass = 'bg-green-600 text-white border border-green-500';
                } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                  buttonClass = 'bg-red-600 text-white border border-red-500';
                } else {
                  buttonClass = 'bg-gray-600 text-gray-400 border border-gray-600';
                }
              } else if (selectedAnswer === index) {
                buttonClass = 'bg-blue-600 text-white border border-blue-500';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswering || showResult}
                  className={`p-4 rounded-lg font-semibold transition-all duration-200 text-left ${buttonClass} ${
                    !isAnswering && !showResult ? 'hover:scale-102 transform' : 'cursor-not-allowed'
                  }`}
                >
                  <span className="font-bold mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-white text-2xl font-bold">{sliderValue}</span>
            </div>
            <input
              type="range"
              min={currentQuestion.sliderRange?.min || 0}
              max={currentQuestion.sliderRange?.max || 100}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              disabled={isAnswering || showResult}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider typing-interface"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{currentQuestion.sliderRange?.min || 0}</span>
              <span>{currentQuestion.sliderRange?.max || 100}</span>
            </div>
            <button
              onClick={() => handleAnswer(null)}
              disabled={isAnswering || showResult}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 text-lg ${
                !isAnswering && !showResult
                  ? 'bg-purple-600 text-white hover:bg-purple-500 transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          </div>
        );

      case 'reorder-words':
        return (
          <div className="space-y-4">
            {currentQuestion.hint && (
              <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/50">
                <p className="text-blue-300 text-sm">💡 Hint: {currentQuestion.hint}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-2 justify-center">
              {reorderedWords.map((word, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                    moveWord(fromIndex, index);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-move hover:bg-purple-500 transition-colors typing-interface"
                >
                  {word}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleAnswer(null)}
              disabled={isAnswering || showResult}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 text-lg ${
                !isAnswering && !showResult
                  ? 'bg-purple-600 text-white hover:bg-purple-500 transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Order
            </button>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isAnswering && !showResult && handleAnswer(null)}
              disabled={isAnswering || showResult}
              placeholder="Type your answer here..."
              className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none text-lg typing-interface"
            />
            <button
              onClick={() => handleAnswer(null)}
              disabled={isAnswering || showResult || !typedAnswer.trim()}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 text-lg ${
                !isAnswering && !showResult && typedAnswer.trim()
                  ? 'bg-purple-600 text-white hover:bg-purple-500 transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-900/80 via-purple-900/80 to-black/80 p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-red-500/50">
      {/* Question Section - Moved to top */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <h3 className="text-white font-semibold text-lg">Knowledge Challenge</h3>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className={`font-bold text-lg px-3 py-1 rounded-lg ${
              timeLeft <= 3 
                ? 'text-red-400 animate-pulse bg-red-900/30' 
                : 'text-yellow-400 bg-yellow-900/30'
            }`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-black/50 p-6 rounded-xl border-2 ${getDifficultyBorder(currentQuestion.difficulty)} mb-4`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400 bg-black/30 px-3 py-1 rounded-lg">{currentQuestion.category}</span>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${getDifficultyColor(currentQuestion.difficulty)} bg-black/30 px-3 py-1 rounded-lg`}>
                {currentQuestion.difficulty.toUpperCase()}
              </span>
              <span className="text-xs text-purple-400 bg-black/30 px-3 py-1 rounded-lg">
                {currentQuestion.type === 'multiple-choice' ? 'Multiple Choice' : 
                 currentQuestion.type === 'slider' ? 'Slider' :
                 currentQuestion.type === 'reorder-words' ? 'Reorder Words' :
                 'Type Answer'}
              </span>
            </div>
          </div>
          <p className="text-white font-semibold text-lg sm:text-xl mb-6 leading-relaxed text-center">
            {currentQuestion.question}
          </p>

          {/* Answer Input */}
          {renderQuestionInput()}

          {/* Skip Card Button */}
          {adventureSkills?.selectedSkill?.type === 'skip_card' && !adventureSkills.skillEffects.skipCardUsed && (
            <div className="mt-4">
              <button
                onClick={handleSkipCard}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all flex items-center gap-2 justify-center"
              >
                <SkipForward className="w-4 h-4" />
                Use Skip Card
              </button>
            </div>
          )}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className={`text-center p-4 rounded-xl ${
            lastAnswerCorrect 
              ? 'bg-green-900/50 border border-green-500' 
              : 'bg-red-900/50 border border-red-500'
          }`}>
            <p className={`font-bold text-lg ${
              lastAnswerCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {lastAnswerCorrect 
                ? '🎉 Correct! You deal damage!' 
                : '❌ Wrong! The enemy attacks you!'}
            </p>
            {!lastAnswerCorrect && (
              <p className="text-gray-300 text-sm mt-2">
                Correct answer: {currentQuestion.type === 'multiple-choice' 
                  ? `${String.fromCharCode(65 + (currentQuestion.correctAnswer as number))}. ${currentQuestion.options?.[currentQuestion.correctAnswer as number]}`
                  : currentQuestion.correctAnswer
                }
              </p>
            )}
          </div>
        )}
      </div>

      {/* Combat Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Combat - Zone {enemy.zone}</h2>
          {getModeIcon()}
        </div>
        <p className="text-red-300 text-xl font-semibold">{enemy.name}</p>
        
        {/* Game Mode Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <span className={`px-3 py-1 rounded-lg ${getModeColor()} text-white font-semibold text-sm`}>
            {gameMode.current.toUpperCase()} MODE
            {gameMode.current === 'survival' && ` (+100% rewards)`}
          </span>
          
          {knowledgeStreak.current > 0 && (
            <span className="text-yellow-300 flex items-center gap-2 bg-yellow-900/30 px-3 py-1 rounded-lg">
              🔥 {knowledgeStreak.current} Streak ({Math.round((knowledgeStreak.multiplier - 1) * 100)}% bonus)
            </span>
          )}

          {!hasUsedRevival && (
            <span className="text-green-300 flex items-center gap-2 bg-green-900/30 px-3 py-1 rounded-lg">
              <RotateCcw className="w-4 h-4" />
              Revival Available
            </span>
          )}

          {/* Adventure Skill Display */}
          {adventureSkills?.selectedSkill && (
            <span className="text-purple-300 flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-lg">
              <Zap className="w-4 h-4" />
              {adventureSkills.selectedSkill.name}
            </span>
          )}
        </div>
      </div>

      {/* Health Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-black/40 p-4 rounded-xl border border-green-500/30">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-white font-semibold">You</span>
            {!hasUsedRevival && (
              <span className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded-full">
                💖 Revival Ready
              </span>
            )}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-400 h-4 rounded-full transition-all duration-300"
              style={{ width: `${(playerStats.hp / playerStats.maxHp) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2 text-center">{playerStats.hp}/{playerStats.maxHp}</p>
          <div className="flex justify-center gap-4 mt-3 text-sm">
            <span className="text-orange-400 flex items-center gap-1">
              <Sword className="w-4 h-4" />
              {playerStats.atk}
            </span>
            <span className="text-blue-400 flex items-center gap-1">
              <Shield className="w-4 h-4" />
              {playerStats.def}
            </span>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-red-500/30">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-white font-semibold">{enemy.name}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-400 h-4 rounded-full transition-all duration-300"
              style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2 text-center">{enemy.hp}/{enemy.maxHp}</p>
          <div className="flex justify-center gap-4 mt-3 text-sm">
            <span className="text-orange-400 flex items-center gap-1">
              <Sword className="w-4 h-4" />
              {enemy.atk}
            </span>
            <span className="text-blue-400 flex items-center gap-1">
              <Shield className="w-4 h-4" />
              {enemy.def}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 space-y-2">
        <p className="text-sm text-gray-300">
          Answer correctly to <span className="text-green-400 font-semibold">deal damage</span>!
        </p>
        <p className={`text-sm font-semibold ${
          gameMode.current === 'blitz' || gameMode.current === 'bloodlust' ? 'text-yellow-400' : 'text-blue-400'
        }`}>
          ⏰ You have {questionTime} seconds to answer!
        </p>
        {!hasUsedRevival && (
          <p className="text-green-400 text-sm font-semibold">
            💖 Don't worry - you get one free revival if you die!
          </p>
        )}
      </div>

      {/* Combat Log */}
      <div className="bg-black/50 rounded-xl p-4 max-h-40 overflow-y-auto border border-gray-600/50 mt-6">
        <h4 className="text-white font-semibold mb-3 text-lg">Combat Log</h4>
        <div className="space-y-2">
          {combatLog.slice(-6).map((log, index) => (
            <p key={index} className="text-sm text-gray-300 leading-relaxed">
              {log}
            </p>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};