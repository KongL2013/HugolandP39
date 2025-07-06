import React from 'react';
import { Coins, Gem, Sword, Shield, Heart, Brain, Package, Pickaxe } from 'lucide-react';

export const FloatingIcons: React.FC = () => {
  const icons = [
    { Icon: Coins, color: 'text-yellow-400', delay: '0s', position: { top: '10%', left: '5%' } },
    { Icon: Gem, color: 'text-purple-400', delay: '1s', position: { top: '20%', right: '10%' } },
    { Icon: Sword, color: 'text-orange-400', delay: '2s', position: { top: '60%', left: '8%' } },
    { Icon: Shield, color: 'text-blue-400', delay: '3s', position: { bottom: '15%', right: '5%' } },
    { Icon: Heart, color: 'text-red-400', delay: '4s', position: { top: '40%', left: '15%' } },
    { Icon: Brain, color: 'text-indigo-400', delay: '5s', position: { top: '70%', right: '15%' } },
    { Icon: Package, color: 'text-green-400', delay: '6s', position: { bottom: '40%', left: '3%' } },
    { Icon: Pickaxe, color: 'text-amber-400', delay: '7s', position: { top: '80%', right: '8%' } },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map(({ Icon, color, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${color} opacity-10`}
          style={{
            ...position,
            animation: `float 6s ease-in-out infinite`,
            animationDelay: delay,
          }}
        >
          <Icon className="w-8 h-8 sm:w-12 sm:h-12" />
        </div>
      ))}
      
      {/* Chess Knight for fun */}
      <div
        className="absolute text-slate-400 opacity-5"
        style={{
          top: '30%',
          right: '20%',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s',
        }}
      >
        <span className="text-6xl">♞</span>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
};