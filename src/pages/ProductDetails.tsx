
import React, { useState } from 'react';
import { Wig } from '../types';
import { ChevronLeft, Share2, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface ProductDetailsProps {
  wig: Wig;
  onBack: () => void;
  onAddToCart: (wig: Wig) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ wig, onBack, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-24 animate-fade-in">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between md:hidden">
        <button onClick={onBack} className="p-2 -ml-2 text-secondary-900">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-secondary-400">
            <Share2 size={20} />
          </button>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 transition-colors ${isLiked ? 'text-primary-500' : 'text-secondary-400'}`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto md:pt-12 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-gray-100 md:rounded-3xl overflow-hidden relative group">
            <img 
              src={wig.images[activeImage]} 
              alt={wig.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {wig.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {wig.images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all ${activeImage === i ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                  ></div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex space-x-4 px-6 md:px-0 overflow-x-auto no-scrollbar">
            {wig.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`View ${i + 1}`} referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-6 md:px-0 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-primary-50 text-primary-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{wig.type}</span>
              <span className="bg-gray-100 text-secondary-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{wig.condition}</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-secondary-900 leading-tight">{wig.title}</h1>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-black text-primary-600">EGP {wig.price.toLocaleString()}</span>
              {wig.originalPrice && (
                <span className="text-xl text-secondary-400 line-through">EGP {wig.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
            <div className="space-y-1">
              <p className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Length</p>
              <p className="font-bold text-secondary-900">{wig.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Color</p>
              <p className="font-bold text-secondary-900">{wig.color}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Texture</p>
              <p className="font-bold text-secondary-900">{wig.texture || 'Natural'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Seller</p>
              <p className="font-bold text-secondary-900 underline decoration-primary-500 underline-offset-4 cursor-pointer">@sarah_j</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-secondary-900">Description</h3>
            <p className="text-secondary-600 leading-relaxed text-sm md:text-base">
              {wig.description}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3 text-secondary-600">
              <ShieldCheck size={20} className="text-green-500" />
              <span className="text-sm">TAJ Buyer Protection Guaranteed</span>
            </div>
            <div className="flex items-center space-x-3 text-secondary-600">
              <Truck size={20} className="text-blue-500" />
              <span className="text-sm">Ships in 2-3 business days</span>
            </div>
            <div className="flex items-center space-x-3 text-secondary-600">
              <RotateCcw size={20} className="text-orange-500" />
              <span className="text-sm">7-day easy returns</span>
            </div>
          </div>

          {/* Desktop Action Bar */}
          <div className="hidden md:flex space-x-4 pt-8">
            <button 
              onClick={() => onAddToCart(wig)}
              className="flex-1 bg-primary-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Add to Cart</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-2xl text-secondary-400 hover:text-primary-500 hover:border-primary-500 transition-all">
              <Heart size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-50 flex items-center space-x-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Total Price</span>
          <span className="text-xl font-black text-secondary-900">EGP {wig.price.toLocaleString()}</span>
        </div>
        <button 
          onClick={() => onAddToCart(wig)}
          className="flex-1 bg-primary-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-all flex items-center justify-center space-x-2"
        >
          <ShoppingBag size={20} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
