
import React, { useState, useRef, useEffect } from 'react';
import { Wig, SiteSettings } from '../types';
import { storeService } from '../services/integration';
import { ChevronLeft, ChevronRight, ArrowUpDown, X, Edit2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Logo } from '../components/Logo';

interface HomeProps {
  onProductClick: (wig: Wig) => void;
  onInstallApp?: () => void;
  canInstall?: boolean;
  onChangeView?: (view: any, category?: string) => void;
  isAdminMode?: boolean;
  setIsAdminMode?: (isAdmin: boolean) => void;
  adminEmail?: string;
  siteSettings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
}

type SortOption = 'newest' | 'price_low' | 'price_high';

export const Home: React.FC<HomeProps> = ({ 
  onProductClick, 
  onInstallApp, 
  canInstall, 
  onChangeView,
  isAdminMode,
  setIsAdminMode,
  adminEmail,
  siteSettings,
  onUpdateSettings
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [wigs, setWigs] = useState<Wig[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(true);

  // Check if current user is admin (mock check)
  const isUserAdmin = adminEmail === 'neveen.heshmat@gmail.com';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await storeService.getAllProducts();
        setWigs(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredWigs = [...wigs].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    return b.createdAt - a.createdAt; // newest by default
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && !isAdminMode) {
        const { current } = scrollRef;
        const slideWidth = current.clientWidth * 0.9; // Match slide width
        const totalSlides = siteSettings.heroSlides.length;
        const nextSlide = (currentSlide + 1) % totalSlides;
        
        current.scrollTo({ left: nextSlide * (slideWidth + 16), behavior: 'smooth' }); // 16 is space-x-4
        setCurrentSlide(nextSlide);
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isAdminMode, siteSettings.heroSlides.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const slideWidth = current.clientWidth * 0.9;
      const totalSlides = siteSettings.heroSlides.length;
      let nextSlide = direction === 'left' ? currentSlide - 1 : currentSlide + 1;
      
      if (nextSlide < 0) nextSlide = totalSlides - 1;
      if (nextSlide >= totalSlides) nextSlide = 0;

      current.scrollTo({ left: nextSlide * (slideWidth + 16), behavior: 'smooth' });
      setCurrentSlide(nextSlide);
    }
  };

  const handleEditSlogan = () => {
    const main = prompt('Enter main slogan:', siteSettings.slogan.main);
    const sub = prompt('Enter sub slogan:', siteSettings.slogan.sub);
    if (main !== null && sub !== null) {
      onUpdateSettings({
        ...siteSettings,
        slogan: { main, sub }
      });
    }
  };

  const handleEditSlide = (id: number) => {
    const slide = siteSettings.heroSlides.find(s => s.id === id);
    if (!slide) return;

    const title = prompt('Enter slide title:', slide.title);
    const image = prompt('Enter slide image URL:', slide.image);
    const tag = prompt('Enter slide tag:', slide.tag);
    const cta = prompt('Enter slide CTA text:', slide.cta);

    if (title !== null && image !== null && tag !== null && cta !== null) {
      const newSlides = siteSettings.heroSlides.map(s => 
        s.id === id ? { ...s, title, image, tag, cta } : s
      );
      onUpdateSettings({ ...siteSettings, heroSlides: newSlides });
    }
  };

  const handleEditCategory = (id: string) => {
    const cat = siteSettings.categories.find(c => c.id === id);
    if (!cat) return;

    const title = prompt('Enter category title:', cat.title);
    const subtitle = prompt('Enter category subtitle:', cat.subtitle);
    const image = prompt('Enter category image URL:', cat.image);

    if (title !== null && subtitle !== null && image !== null) {
      const newCats = siteSettings.categories.map(c => 
        c.id === id ? { ...c, title, subtitle, image } : c
      );
      onUpdateSettings({ ...siteSettings, categories: newCats });
    }
  };

  return (
    <div className="pb-24 md:pb-12 bg-white min-h-screen font-sans">
      {/* Admin Toggle */}
      {isUserAdmin && (
        <div className="bg-primary-50 px-6 py-2 flex items-center justify-between border-b border-primary-100 sticky top-0 z-[60] backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">Site Editor</span>
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
          </div>
          <button 
            onClick={() => setIsAdminMode?.(!isAdminMode)}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
              isAdminMode 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'bg-white text-primary-600 border border-primary-200'
            }`}
          >
            {isAdminMode ? 'Exit Editor' : 'Enable Editor'}
          </button>
        </div>
      )}

      {/* Header / Logo Section */}
      <header className="pt-8 pb-6 px-6 text-center border-b border-gray-50 bg-white overflow-hidden relative">
        {/* Decorative background - Subtle Grid instead of Dots */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffe4e6 1px, transparent 1px), linear-gradient(90deg, #ffe4e6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Mobile Logo */}
        <div className="md:hidden mb-4 relative flex items-center justify-center">
            <Logo variant="comic" className="scale-125" text={siteSettings.logoText} />
        </div>
        
        {/* Slogan Section */}
        <div className="relative z-10 my-8 group">
            {isAdminMode && (
              <button 
                onClick={handleEditSlogan}
                className="absolute -top-10 right-0 p-3 bg-primary-500 text-white rounded-full shadow-2xl z-[100] transition-all hover:scale-110 cursor-pointer pointer-events-auto border-2 border-white"
                title="Edit Slogan"
              >
                <Edit2 size={18} />
              </button>
            )}
            <h1 className="font-black text-3xl md:text-5xl text-secondary-900 leading-snug drop-shadow-sm tracking-wide" dir="rtl">
              {siteSettings.slogan.main}
            </h1>
            <h1 className="text-xl md:text-3xl font-display font-bold text-secondary-400 mt-2 opacity-80">
              {siteSettings.slogan.sub}
            </h1>
        </div>
      </header>

           <div className="py-6 relative group bg-white">
         <div className="px-6 flex justify-between items-center mb-4">
           <div className="flex space-x-2">
             <button onClick={() => scroll('left')} className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-secondary-600 transition-colors">
               <ChevronLeft size={16} />
             </button>
             <button onClick={() => scroll('right')} className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-secondary-600 transition-colors">
               <ChevronRight size={16} />
             </button>
           </div>
           <h2 className="font-bold text-secondary-900 text-base md:text-lg tracking-wide text-right" dir="rtl">
             باروكتك موجوده هنا…هاتلاقيها😉
           </h2>
         </div>
         
         <div ref={scrollRef} className="flex space-x-4 overflow-x-auto px-6 no-scrollbar snap-x scroll-smooth pb-4">
            {siteSettings.heroSlides.map((slide) => (
              <div 
                key={slide.id}
                onClick={() => !isAdminMode && onChangeView?.(slide.view)}
                className="snap-center shrink-0 w-[90%] md:w-[45%] lg:w-[30%] relative rounded-2xl overflow-hidden aspect-[21/9] shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <img 
                  src={slide.image} 
                  alt={slide.tag} 
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 p-6 flex flex-col justify-center ${slide.dir === 'rtl' ? 'bg-gradient-to-l items-end text-right' : 'bg-gradient-to-r items-start text-left'} from-black/70 via-black/30 to-transparent`}>
                  <span className="bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 shadow-sm uppercase">{slide.tag}</span>
                  <p className="text-white font-bold text-xl md:text-2xl leading-tight drop-shadow-md whitespace-pre-line" dir={slide.dir}>
                    {slide.title}
                  </p>
                  <div className="mt-3 flex items-center text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 group-hover:bg-white/40 transition-all">
                    {slide.cta} {slide.dir === 'rtl' ? <ChevronLeft size={14} className="mr-1" /> : <ChevronRight size={14} className="ml-1" />}
                  </div>
                </div>
                {isAdminMode && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSlide(slide.id);
                    }}
                    className="absolute top-4 right-4 p-3 bg-primary-500 text-white rounded-full shadow-2xl z-[100] hover:scale-110 transition-all cursor-pointer pointer-events-auto border-2 border-white"
                    title="Edit Slide"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
            ))}
         </div>
      </div>

      {/* Categories Section */}
      <div className="px-6 py-4 space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
        {siteSettings.categories.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => !isAdminMode && onChangeView?.('SEARCH', cat.id)}
            className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden group shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <img src={cat.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.title} referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center p-4">
               <h3 className="text-white font-display font-bold text-3xl tracking-wide drop-shadow-md">{cat.title}</h3>
               <span className="text-white/90 text-sm font-medium mt-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                 {cat.subtitle}
               </span>
            </div>
            {isAdminMode && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditCategory(cat.id);
                }}
                className="absolute top-4 right-4 p-3 bg-primary-500 text-white rounded-full shadow-2xl z-[100] hover:scale-110 transition-all cursor-pointer pointer-events-auto border-2 border-white"
                title="Edit Category"
              >
                <Edit2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="px-6 py-6 bg-gray-50 md:bg-white rounded-t-3xl md:rounded-none mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="font-display font-bold text-secondary-900 text-xl mb-2 md:mb-0">
            Latest Collections
          </h2>
          
          <div className="flex items-center space-x-2 self-end md:self-auto">
            <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-gray-200 text-secondary-600 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-primary-500 shadow-sm cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
                <ArrowUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
             {[1, 2, 3, 4].map(n => (
               <div key={n} className="bg-white rounded-2xl p-2 pb-4 shadow-sm border border-gray-100">
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div>
               </div>
             ))}
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredWigs.map(wig => (
              <ProductCard key={wig.id} wig={wig} onClick={onProductClick} isAdminMode={isAdminMode} />
            ))}
          </div>
        )}
        
        {!loading && filteredWigs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl shadow-sm">
               💇‍♀️
            </div>
            <p className="text-secondary-900 font-bold text-lg">No styles found</p>
            <p className="text-secondary-500 text-sm mt-1 mb-4">We couldn't find any wigs right now. Please check back later!</p>
          </div>
        )}
      </div>
      
      {/* Mobile Install App Banner */}
      {canInstall && showInstallBanner && (
        <div className="md:hidden fixed bottom-20 left-4 right-4 bg-secondary-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between z-50 animate-bounce-in">
           <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3 font-comic text-lg shadow-inner">T</div>
              <div>
                <p className="font-bold text-sm">Download TAJ App</p>
                <p className="text-xs text-secondary-400">Better experience, faster checkout</p>
              </div>
           </div>
           <div className="flex items-center">
             <button 
               onClick={onInstallApp}
               className="bg-white text-secondary-900 px-3 py-1.5 rounded-full text-xs font-bold mr-2"
             >
               Install
             </button>
             <button onClick={() => setShowInstallBanner(false)} className="text-secondary-400">
               <X size={16} />
             </button>
           </div>
        </div>
      )}

    </div>
  );
};
