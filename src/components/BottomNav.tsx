
import React from 'react';
import { ViewState } from '../types';
import { Home, Search, PlusCircle, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView, cartCount }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex items-center justify-between z-50">
      <button 
        onClick={() => onChangeView('HOME')}
        className={`flex flex-col items-center space-y-1 transition-all ${currentView === 'HOME' ? 'text-primary-500' : 'text-secondary-400 hover:text-secondary-900'}`}
      >
        <Home size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
      </button>

      <button 
        onClick={() => onChangeView('SEARCH')}
        className={`flex flex-col items-center space-y-1 transition-all ${currentView === 'SEARCH' ? 'text-primary-500' : 'text-secondary-400 hover:text-secondary-900'}`}
      >
        <Search size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Shop</span>
      </button>

      <button 
        onClick={() => onChangeView('SELL')}
        className={`flex flex-col items-center space-y-1 transition-all ${currentView === 'SELL' ? 'text-primary-500' : 'text-secondary-400 hover:text-secondary-900'}`}
      >
        <div className="p-3 bg-primary-500 text-white rounded-full -mt-10 shadow-lg shadow-primary-500/30 border-4 border-white">
          <PlusCircle size={28} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-tighter">Sell</span>
      </button>

      <button 
        onClick={() => onChangeView('CART')}
        className={`flex flex-col items-center space-y-1 transition-all relative ${currentView === 'CART' ? 'text-primary-500' : 'text-secondary-400 hover:text-secondary-900'}`}
      >
        <ShoppingBag size={24} />
        {cartCount > 0 && (
          <span className="absolute top-0 right-1 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-bold uppercase tracking-tighter">Cart</span>
      </button>

      <button 
        onClick={() => onChangeView('PROFILE')}
        className={`flex flex-col items-center space-y-1 transition-all ${currentView === 'PROFILE' ? 'text-primary-500' : 'text-secondary-400 hover:text-secondary-900'}`}
      >
        <User size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
      </button>
    </nav>
  );
};
