
import React from 'react';
import { Crown } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'comic';
  text?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'default', text = 'TAJ' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Crown 
          size={variant === 'comic' ? 40 : 24} 
          className="text-primary-500 transform -rotate-12 drop-shadow-sm" 
          fill="currentColor"
          fillOpacity={0.2}
        />
        {variant === 'comic' && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </div>
      <span className={`font-comic text-secondary-900 tracking-tight ${variant === 'comic' ? 'text-4xl' : 'text-2xl'}`}>
        {text}
      </span>
    </div>
  );
};
