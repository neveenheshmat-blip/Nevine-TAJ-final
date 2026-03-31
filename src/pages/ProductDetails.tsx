
import React, { useState } from 'react';
import { Wig, User } from '../types';
import { ChevronLeft, Share2, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Edit2, Save, X } from 'lucide-react';

interface ProductDetailsProps {
  wig: Wig;
  onBack: () => void;
  onAddToCart: (wig: Wig) => void;
  currentUser?: User;
  isAdminMode?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  wig, 
  onBack, 
  onAddToCart, 
  currentUser,
  isAdminMode 
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: wig.title,
    price: wig.price,
    description: wig.description,
    images: [...wig.images]
  });

  const isOwner = currentUser?.id === wig.sellerId;
  const canEdit = isOwner || isAdminMode;

  const handleSave = () => {
    // In a real app, this would call an API
    setIsEditing(false);
  };

  const handleAddPhoto = () => {
    const newPhoto = prompt('Enter image URL:');
    if (newPhoto) {
      setEditData({
        ...editData,
        images: [...editData.images, newPhoto]
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    if (editData.images.length <= 1) return;
    const newImages = editData.images.filter((_, i) => i !== index);
    setEditData({
      ...editData,
      images: newImages
    });
    if (activeImage >= newImages.length) {
      setActiveImage(newImages.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-fade-in">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between md:hidden">
        <button onClick={onBack} className="p-2 -ml-2 text-secondary-900">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center space-x-2">
          {canEdit && (
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`p-3 transition-all rounded-full z-[100] cursor-pointer pointer-events-auto ${isEditing ? 'bg-primary-500 text-white shadow-lg' : 'text-secondary-400 hover:bg-gray-100'}`}
              title="Toggle Edit Mode"
            >
              <Edit2 size={24} />
            </button>
          )}
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
              src={editData.images[activeImage]} 
              alt={editData.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {editData.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {editData.images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all ${activeImage === i ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                  ></div>
                ))}
              </div>
            )}
            {isEditing && (
              <button 
                onClick={() => handleRemovePhoto(activeImage)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          <div className="flex space-x-4 px-6 md:px-0 overflow-x-auto no-scrollbar items-center">
            {editData.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`View ${i + 1}`} referrerPolicy="no-referrer" />
              </button>
            ))}
            {isEditing && (
              <button 
                onClick={handleAddPhoto}
                className="shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all"
              >
                <Edit2 size={20} />
                <span className="text-[10px] font-bold mt-1">Add Photo</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-6 md:px-0 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="bg-primary-50 text-primary-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{wig.type}</span>
                <span className="bg-gray-100 text-secondary-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{wig.condition}</span>
              </div>
              {canEdit && !isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="hidden md:flex items-center space-x-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-primary-100 transition-all z-[100] cursor-pointer pointer-events-auto shadow-sm"
                >
                  <Edit2 size={16} />
                  <span>Edit Listing {isAdminMode && '(Admin)'}</span>
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-4 pt-2">
                <input 
                  type="text" 
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full text-2xl font-display font-bold text-secondary-900 border-b-2 border-primary-200 outline-none focus:border-primary-500 transition-all bg-transparent"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-black text-primary-600">EGP</span>
                  <input 
                    type="number" 
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                    className="w-32 text-2xl font-black text-primary-600 border-b-2 border-primary-200 outline-none focus:border-primary-500 transition-all bg-transparent"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-display font-bold text-secondary-900 leading-tight">{editData.title}</h1>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-black text-primary-600">EGP {editData.price.toLocaleString()}</span>
                  {wig.originalPrice && (
                    <span className="text-xl text-secondary-400 line-through">EGP {wig.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </>
            )}
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
            {isEditing ? (
              <textarea 
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-primary-500 transition-all text-sm min-h-[120px]"
              />
            ) : (
              <p className="text-secondary-600 leading-relaxed text-sm md:text-base">
                {editData.description}
              </p>
            )}
          </div>

          {isEditing ? (
            <div className="flex space-x-4 pt-4">
              <button 
                onClick={handleSave}
                className="flex-1 bg-primary-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-all flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-8 bg-gray-100 text-secondary-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
              >
                <X size={20} />
                <span>Cancel</span>
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Action Bar */}
      {!isEditing && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-50 flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Total Price</span>
            <span className="text-xl font-black text-secondary-900">EGP {editData.price.toLocaleString()}</span>
          </div>
          <button 
            onClick={() => onAddToCart(wig)}
            className="flex-1 bg-primary-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={20} />
            <span>Add to Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};

