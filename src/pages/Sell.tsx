
import React, { useState } from 'react';
import { WigCondition, WigType, WigLength, WigTexture } from '../types';
import { storeService } from '../services/integration';
import { Camera, Check, ArrowRight, X } from 'lucide-react';

interface SellProps {
  onSuccess: () => void;
}

export const Sell: React.FC<SellProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: WigType.FULL_WIG,
    length: 'Medium Length' as WigLength,
    condition: WigCondition.LIKE_NEW,
    color: '',
    texture: 'Straight' as WigTexture,
    images: [] as string[]
  });

  const handleImageUpload = () => {
    // Mock image upload
    const mockImages = [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80'
    ];
    setFormData({ ...formData, images: mockImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await storeService.addProduct({
        ...formData,
        price: Number(formData.price),
        sellerId: 'user_1' // Mock current user
      });
      setStep(3); // Success step
    } catch (error) {
      console.error("Failed to add product", error);
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Check size={40} strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-display font-bold text-secondary-900 mb-2">Item Listed!</h2>
        <p className="text-secondary-500 mb-8 max-w-xs">Your wig is now live on TAJ. We'll notify you when someone buys it.</p>
        <button 
          onClick={onSuccess}
          className="w-full max-w-xs bg-secondary-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-secondary-800 transition-all"
        >
          Go to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="pt-8 px-6 max-w-2xl mx-auto w-full pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Sell Your Wig</h1>
        <div className="flex space-x-1">
          {[1, 2].map(s => (
            <div key={s} className={`h-1.5 w-8 rounded-full transition-all ${step >= s ? 'bg-primary-500' : 'bg-gray-100'}`}></div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-secondary-900">Add Photos</label>
              <div 
                onClick={handleImageUpload}
                className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all group"
              >
                {formData.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 w-full h-full p-2">
                    {formData.images.map((img, i) => (
                      <img key={i} src={img} className="w-full h-full object-cover rounded-lg" alt="Upload preview" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-white rounded-full text-secondary-400 group-hover:text-primary-500 shadow-sm transition-all">
                      <Camera size={32} />
                    </div>
                    <p className="mt-4 text-sm font-medium text-secondary-400">Tap to upload photos</p>
                    <p className="text-[10px] text-secondary-300 mt-1 uppercase tracking-widest">Up to 5 photos</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary-900">Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Luxurious Body Wave - Human Hair"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary-900">Description</label>
              <textarea 
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the condition, brand, and any customizations..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-all min-h-[120px]"
              />
            </div>

            <button 
              type="button"
              onClick={() => setStep(2)}
              disabled={!formData.title || !formData.description}
              className="w-full bg-secondary-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-secondary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Next Step</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-secondary-900">Price (EGP)</label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-secondary-900">Type</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as WigType })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-all"
                >
                  <option value={WigType.FULL_WIG}>Full Wig</option>
                  <option value={WigType.HALF_WIG}>Half Wig</option>
                  <option value={WigType.EXTENSION}>Extension</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-secondary-900">Length</label>
                <select 
                  value={formData.length}
                  onChange={e => setFormData({ ...formData, length: e.target.value as WigLength })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-all"
                >
                  <option value="Short">Short</option>
                  <option value="Medium Length">Medium</option>
                  <option value="Long">Long</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-secondary-900">Condition</label>
                <select 
                  value={formData.condition}
                  onChange={e => setFormData({ ...formData, condition: e.target.value as WigCondition })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-all"
                >
                  <option value={WigCondition.LIKE_NEW}>Like New</option>
                  <option value={WigCondition.GOOD}>Good</option>
                  <option value={WigCondition.FAIR}>Fair</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-secondary-900 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={loading || !formData.price}
                className="flex-[2] bg-primary-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-all disabled:opacity-50"
              >
                {loading ? 'Listing...' : 'List Item'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
