
import React from 'react';
import { ViewState } from '../types';
import { Search, ShoppingBag, User, PlusCircle, Download } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  cartCount: number;
  onInstallApp?: () => void;
  canInstall?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView, cartCount, onInstallApp, canInstall }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div 
        onClick={() => onChangeView('HOME')}
        className="cursor-pointer"
      >
        <Logo />
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <button 
          onClick={() => onChangeView('HOME')}
          className={`text-sm font-bold transition-colors ${currentView === 'HOME' ? 'text-primary-500' : 'text-secondary-500 hover:text-secondary-900'}`}
        >
          Home
        </button>
        <button 
          onClick={() => onChangeView('SEARCH')}
          className={`text-sm font-bold transition-colors ${currentView === 'SEARCH' ? 'text-primary-500' : 'text-secondary-500 hover:text-secondary-900'}`}
        >
          Shop
        </button>
        <button 
          onClick={() => onChangeView('SELL')}
          className={`text-sm font-bold transition-colors ${currentView === 'SELL' ? 'text-primary-500' : 'text-secondary-500 hover:text-secondary-900'}`}
        >
          Sell
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {canInstall && (
          <button 
            onClick={onInstallApp}
            className="hidden md:flex items-center space-x-2 bg-secondary-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-secondary-800 transition-all shadow-lg shadow-secondary-900/20"
          >
            <Download size={14} />
            <span>Install App</span>
          </button>
        )}
        
        <button 
          onClick={() => onChangeView('SEARCH')}
          className={`p-2 rounded-full transition-all ${currentView === 'SEARCH' ? 'bg-primary-50 text-primary-500' : 'text-secondary-400 hover:bg-gray-50 hover:text-secondary-900'}`}
        >
          <Search size={20} />
        </button>
        
        <button 
          onClick={() => onChangeView('CART')}
          className={`p-2 rounded-full transition-all relative ${currentView === 'CART' ? 'bg-primary-50 text-primary-500' : 'text-secondary-400 hover:bg-gray-50 hover:text-secondary-900'}`}
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => onChangeView('PROFILE')}
          className={`hidden md:flex p-2 rounded-full transition-all ${currentView === 'PROFILE' ? 'bg-primary-50 text-primary-500' : 'text-secondary-400 hover:bg-gray-50 hover:text-secondary-900'}`}
        >
          <User size={20} />
        </button>
        
        <button 
          onClick={() => onChangeView('SELL')}
          className="md:hidden p-2 text-primary-500"
        >
          <PlusCircle size={24} />
        </button>
      </div>
    </header>
  );
};
