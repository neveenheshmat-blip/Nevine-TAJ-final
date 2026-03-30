
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'comic';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'default' }) => {
  if (variant === 'comic') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative">
          <div className="w-12 h-12 bg-primary-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg border-2 border-secondary-900">
            <span className="text-white font-black text-2xl -rotate-12">T</span>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-secondary-900 animate-pulse"></div>
        </div>
        <span className="ml-3 font-black text-3xl tracking-tighter text-secondary-900">TAJ</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <span className="font-black text-2xl tracking-tighter text-secondary-900">TAJ</span>
      <div className="w-2 h-2 bg-primary-500 rounded-full ml-1 mt-2"></div>
    </div>
  );
};
