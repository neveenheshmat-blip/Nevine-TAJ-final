
import React, { useState } from 'react';
import { MOCK_USER, MOCK_WIGS } from '../constants';
import { Settings, LogOut, Package, Heart, ShieldCheck, ExternalLink, CheckCircle2, Edit2, Save, X, Camera, ChevronRight, Star } from 'lucide-react';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listings' | 'orders' | 'likes'>('listings');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: MOCK_USER.name,
    avatar: MOCK_USER.avatar,
    bio: MOCK_USER.bio || ''
  });

  const userListings = MOCK_WIGS.filter(w => w.sellerId === 'user_2'); // Mock user's items

  const handleSave = () => {
    // In a real app, this would call an API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: MOCK_USER.name,
      avatar: MOCK_USER.avatar,
      bio: MOCK_USER.bio || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="pt-8 px-6 max-w-4xl mx-auto w-full pb-32 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">My Profile</h1>
        <div className="flex space-x-2">
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-xl hover:bg-primary-100 transition-all font-bold text-sm"
            >
              <Edit2 size={16} />
              <span>Edit Profile</span>
            </button>
          )}
          <button className="p-2 bg-gray-50 text-secondary-400 rounded-full hover:bg-gray-100 transition-all">
            <Settings size={20} />
          </button>
          <button className="p-2 bg-gray-50 text-secondary-400 rounded-full hover:bg-gray-100 transition-all">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* User Info Card */}
      <div className={`bg-white rounded-3xl p-6 border transition-all duration-300 ${isEditing ? 'border-primary-200 shadow-lg ring-4 ring-primary-50' : 'border-gray-100 shadow-sm'} mb-8 flex flex-col md:flex-row items-center md:items-start md:space-x-8 text-center md:text-left`}>
        <div className="relative mb-4 md:mb-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-50 shadow-inner relative group">
            <img src={profileData.avatar} className="w-full h-full object-cover" alt={profileData.name} referrerPolicy="no-referrer" />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera size={24} className="text-white" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
            <Star size={12} fill="currentColor" />
          </div>
        </div>
        
        <div className="flex-1 space-y-4 w-full">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest block text-left">Full Name</label>
                <input 
                  type="text" 
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-all font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest block text-left">Bio</label>
                <textarea 
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-all text-sm min-h-[80px]"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-primary-500 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-primary-600 transition-all flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-6 bg-gray-100 text-secondary-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-2xl font-display font-bold text-secondary-900">{profileData.name}</h2>
                <p className="text-secondary-400 text-sm font-medium">Member since 2024 • Verified Seller</p>
                <p className="mt-2 text-secondary-600 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                  {profileData.bio}
                </p>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-6">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-secondary-900">4.9</span>
                  <span className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Rating</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-secondary-900">12</span>
                  <span className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Sales</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-secondary-900">156</span>
                  <span className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest">Followers</span>
                </div>
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="mt-6 md:mt-0 w-full md:w-auto">
            <div className="bg-secondary-900 text-white p-6 rounded-2xl shadow-xl shadow-secondary-900/20 flex flex-col items-center">
              <span className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest mb-1">Total Earnings</span>
              <span className="text-2xl font-black">EGP {MOCK_USER.earnings.toLocaleString()}</span>
              <button className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 px-4 rounded-full border border-white/20 transition-all flex items-center justify-center">
                <span>Withdraw Funds</span>
                <ExternalLink size={12} className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('listings')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'listings' ? 'text-primary-500' : 'text-secondary-400 hover:text-secondary-900'}`}
        >
          <span>My Listings</span>
          {activeTab === 'listings' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'orders' ? 'text-primary-500' : 'text-secondary-400 hover:text-secondary-900'}`}
        >
          <span>Orders</span>
          {activeTab === 'orders' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('likes')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'likes' ? 'text-primary-500' : 'text-secondary-400 hover:text-secondary-900'}`}
        >
          <span>Liked Items</span>
          {activeTab === 'likes' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-t-full"></div>}
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-slide-up">
        {activeTab === 'listings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userListings.length > 0 ? (
              userListings.map(wig => (
                <div key={wig.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex space-x-4 group hover:shadow-md transition-all relative">
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <img src={wig.images[0]} className="w-full h-full object-cover" alt={wig.title} referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold text-secondary-900 text-sm line-clamp-1">{wig.title}</h3>
                      <p className="text-[10px] text-secondary-400 mt-1 uppercase tracking-widest font-bold">{wig.likes} Likes • {wig.condition}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-primary-600">EGP {wig.price.toLocaleString()}</span>
                      {isEditing ? (
                        <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all">
                          <Edit2 size={14} />
                        </button>
                      ) : (
                        <button className="text-secondary-400 hover:text-secondary-900 transition-colors">
                          <ChevronRight size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <button className="absolute -top-2 -right-2 p-1.5 bg-red-50 text-red-500 rounded-full border border-red-100 shadow-sm hover:bg-red-100 transition-all">
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                <p className="text-secondary-400">You haven't listed any items yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Order #TJ-8271</h3>
                    <p className="text-xs text-secondary-400 mt-1">Status: <span className="text-blue-500 font-bold uppercase tracking-widest">Shipped</span> • 2 days ago</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-secondary-300 group-hover:text-secondary-900 transition-colors" />
             </div>
             
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-50 text-green-500 rounded-xl">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Order #TJ-7102</h3>
                    <p className="text-xs text-secondary-400 mt-1">Status: <span className="text-green-500 font-bold uppercase tracking-widest">Delivered</span> • 1 week ago</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-secondary-300 group-hover:text-secondary-900 transition-colors" />
             </div>
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {MOCK_WIGS.slice(0, 2).map(wig => (
               <div key={wig.id} className="bg-white rounded-2xl p-2 pb-4 shadow-sm border border-gray-100">
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
                    <img src={wig.images[0]} className="w-full h-full object-cover" alt={wig.title} referrerPolicy="no-referrer" />
                    <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full text-primary-500 shadow-sm">
                      <Heart size={14} fill="currentColor" />
                    </button>
                  </div>
                  <h3 className="text-xs font-bold text-secondary-900 truncate px-1">{wig.title}</h3>
                  <p className="text-primary-600 font-black text-sm px-1 mt-1">EGP {wig.price.toLocaleString()}</p>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="mt-12 p-6 bg-secondary-50 rounded-3xl border border-secondary-100 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 text-center md:text-left">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-primary-500">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-secondary-900">Need help with an order?</h4>
            <p className="text-xs text-secondary-500 mt-1">Our support team is available 24/7 to assist you.</p>
          </div>
        </div>
        <button className="bg-white text-secondary-900 px-6 py-3 rounded-xl text-sm font-bold border border-secondary-200 hover:bg-gray-50 transition-all shadow-sm">
          Contact Support
        </button>
      </div>
    </div>
  );
};
