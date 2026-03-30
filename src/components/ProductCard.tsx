
import React from 'react';
import { Wig } from '../types';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  wig: Wig;
  onClick: (wig: Wig) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ wig, onClick }) => {
  return (
    <div 
      onClick={() => onClick(wig)}
      className="group bg-white rounded-2xl p-2 pb-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer relative"
    >
      <div className="aspect-[4/5] bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
        <img 
          src={wig.images[0]} 
          alt={wig.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2 z-10">
          <button className="p-2 bg-white/80 backdrop-blur-md rounded-full text-secondary-400 hover:text-primary-500 transition-colors shadow-sm">
            <Heart size={16} />
          </button>
        </div>
        {wig.originalPrice && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">SALE</span>
          </div>
        )}
      </div>
      
      <div className="px-2">
        <h3 className="text-sm font-bold text-secondary-900 truncate mb-1">{wig.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-primary-600 font-black text-lg">EGP {wig.price.toLocaleString()}</span>
            {wig.originalPrice && (
              <span className="text-secondary-400 text-xs line-through">EGP {wig.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="p-2 bg-secondary-50 text-secondary-400 rounded-lg group-hover:bg-primary-500 group-hover:text-white transition-all">
            <ShoppingBag size={16} />
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-[10px] bg-gray-100 text-secondary-500 px-2 py-0.5 rounded-full font-medium">{wig.condition}</span>
          <span className="text-[10px] bg-gray-100 text-secondary-500 px-2 py-0.5 rounded-full font-medium">{wig.length}</span>
        </div>
      </div>
    </div>
  );
};
