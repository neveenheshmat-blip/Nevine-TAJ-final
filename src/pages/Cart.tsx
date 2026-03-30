
import React, { useState } from 'react';
import { Wig } from '../types';
import { ChevronLeft, Trash2, ShoppingBag, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CartProps {
  cart: Wig[];
  onRemove: (id: string) => void;
  onBack: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ cart, onRemove, onBack, onCheckout }) => {
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckoutStep(2);
    }, 1500);
  };

  if (checkoutStep === 2) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-lg">
          <CheckCircle2 size={48} strokeWidth={3} />
        </div>
        <h2 className="text-4xl font-display font-bold text-secondary-900 mb-4">Order Placed!</h2>
        <p className="text-secondary-500 mb-10 max-w-sm text-lg leading-relaxed">
          Thank you for shopping with TAJ. Your order #TJ-9482 is being processed and will ship soon.
        </p>
        <button 
          onClick={onCheckout}
          className="w-full max-w-xs bg-secondary-900 text-white py-5 rounded-3xl font-bold shadow-2xl hover:bg-secondary-800 transition-all transform hover:scale-105 active:scale-95"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-gray-50 text-secondary-200 rounded-full flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-2xl font-display font-bold text-secondary-900 mb-2">Your cart is empty</h2>
        <p className="text-secondary-400 mb-8 max-w-xs">Looks like you haven't added any crowns to your collection yet.</p>
        <button 
          onClick={onBack}
          className="w-full max-w-xs bg-primary-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-all"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="pt-8 px-6 max-w-4xl mx-auto w-full pb-32 animate-fade-in">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-secondary-900 mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-display font-bold">Your Cart</h1>
        <span className="ml-3 bg-gray-100 text-secondary-500 text-xs font-bold px-2 py-1 rounded-full">{cart.length} items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex space-x-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-all">
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                <img src={item.images[0]} className="w-full h-full object-cover" alt={item.title} referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-secondary-900 line-clamp-1">{item.title}</h3>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="p-1 text-secondary-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-secondary-400 mt-1 uppercase tracking-widest font-bold">{item.length} • {item.color}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-primary-600">EGP {item.price.toLocaleString()}</span>
                  <span className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider">In Stock</span>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
            <ShieldCheck className="text-blue-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-bold text-blue-900">TAJ Buyer Protection</p>
              <p className="text-xs text-blue-700 mt-1">Your money is held securely until you receive and approve your item.</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-3xl p-6 sticky top-24 border border-gray-100">
            <h3 className="font-display font-bold text-xl mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-secondary-500 text-sm">
                <span>Subtotal</span>
                <span className="font-bold text-secondary-900">EGP {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-secondary-500 text-sm">
                <span>Shipping</span>
                <span className="font-bold text-secondary-900">EGP {shipping.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-secondary-900">Total</span>
                <span className="text-2xl font-black text-primary-600">EGP {total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-secondary-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-secondary-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <CreditCard size={20} />
                  <span>Checkout Now</span>
                </>
              )}
            </button>
            
            <p className="text-[10px] text-center text-secondary-400 mt-4 uppercase tracking-widest font-bold">Secure Payment via TAJ Pay</p>
          </div>
        </div>
      </div>
    </div>
  );
};
