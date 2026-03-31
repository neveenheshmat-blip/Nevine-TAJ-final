
import { Wig, WigCondition, WigType, User, SiteSettings } from './types';

export const COMMISSION_RATE = 0.20;
export const APP_NAME = "TAJ";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  logoText: 'TAJ',
  slogan: {
    main: 'باروكة تروح 👑 و باروكة تيجى 👑',
    sub: 'Find Your Human Hair Crown'
  },
  heroSlides: [
    {
      id: 1,
      title: 'عندك فرح او مناسبه و نفسك تشترى باروكة؟',
      image: '/IMG_3586.webp',
      tag: 'SPECIAL OCCASION',
      cta: 'تصفحي الآن',
      view: 'SEARCH',
      dir: 'rtl'
    },
    {
      id: 2,
      title: 'شعرك هلك من الصبغه و الحراره و نفسك تريحيه ؟',
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'HAIR CARE',
      cta: 'اكتشفي الحل',
      view: 'SEARCH',
      dir: 'rtl'
    },
    {
      id: 3,
      title: 'Only human hair\nTry before you buy\nGet that curly beach look',
      image: 'https://images.unsplash.com/photo-1560829141-9988019e917d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'PREMIUM QUALITY',
      cta: 'Shop Now',
      view: 'SEARCH',
      dir: 'ltr'
    },
    {
      id: 4,
      title: 'بيعى باروكتك لو مش لايقه عليكى',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'CASH FOR YOUR WIG',
      cta: 'ابدئي البيع',
      view: 'SELL',
      dir: 'rtl'
    }
  ],
  categories: [
    {
      id: 'short',
      title: 'Short Wigs',
      subtitle: 'Chic & Bold',
      image: 'https://images.unsplash.com/photo-1516914915600-89f7ddec1c1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'medium',
      title: 'Medium Length',
      subtitle: 'Versatile & Classy',
      image: 'https://images.unsplash.com/photo-1584297141812-0199b7a38f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'long',
      title: 'Long Wigs',
      subtitle: 'Glamorous & Flowy',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]
};

export const MOCK_USER: User = {
  id: 'user_1',
  name: 'Sarah J.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  bio: 'Professional wig stylist and collector. Passionate about high-quality human hair and custom styling.',
  isSeller: true,
  earnings: 1200.50
};

export const MOCK_WIGS: Wig[] = [
  {
    id: 'w1',
    sellerId: 'user_2',
    title: 'Luxurious HD Lace Frontal - 24" Body Wave',
    description: 'Ultra-thin HD lace for a seamless melt. 100% Virgin Brazilian hair, high density (250%). Perfect for special occasions.',
    price: 12500,
    originalPrice: 15000,
    images: [
      'https://picsum.photos/seed/wig1/800/800', 
      'https://picsum.photos/seed/wig1b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.LIKE_NEW,
    color: 'Natural Black',
    texture: 'Wavy',
    likes: 45,
    isSold: false,
    createdAt: Date.now() - 10000000
  },
  {
    id: 'w2',
    sellerId: 'user_3',
    title: 'Premium Brazilian Silk Straight - 18"',
    description: 'Silky smooth texture that stays straight all day. Pre-plucked hairline and bleached knots for a natural look.',
    price: 9800,
    originalPrice: 11000,
    images: [
      'https://picsum.photos/seed/wig2/800/800',
      'https://picsum.photos/seed/wig2b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Medium Length',
    condition: WigCondition.LIKE_NEW,
    color: 'Jet Black',
    texture: 'Straight',
    likes: 32,
    isSold: false,
    createdAt: Date.now() - 5000000
  },
  {
    id: 'w3',
    sellerId: 'user_4',
    title: 'Elite European Bob Cut - 12"',
    description: 'Chic and sophisticated bob cut. European human hair for a fine, natural feel. Glueless cap for easy wear.',
    price: 8500,
    originalPrice: 9500,
    images: [
      'https://picsum.photos/seed/wig3/800/800', 
      'https://picsum.photos/seed/wig3b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Short',
    condition: WigCondition.LIKE_NEW,
    color: 'Dark Chocolate',
    texture: 'Straight',
    likes: 128,
    isSold: false,
    createdAt: Date.now() - 200000
  },
  {
    id: 'w4',
    sellerId: 'user_5',
    title: 'Royal Curly Deep Wave - 22"',
    description: 'Deep, defined curls that bounce beautifully. Minimal shedding and tangling. Can be styled wet for a sleek look.',
    price: 11200,
    images: [
      'https://picsum.photos/seed/wig4/800/800',
      'https://picsum.photos/seed/wig4b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.GOOD,
    color: 'Natural Brown',
    texture: 'Curly',
    likes: 56,
    isSold: false,
    createdAt: Date.now() - 86400000
  },
  {
    id: 'w5',
    sellerId: 'user_6',
    title: 'Signature Ombre Body Wave - 20"',
    description: 'Beautiful 1B/30 ombre transition. Soft waves that hold their shape. High-quality Remy hair.',
    price: 10500,
    images: [
      'https://picsum.photos/seed/wig5/800/800',
      'https://picsum.photos/seed/wig5b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.LIKE_NEW,
    color: '1B/30 Ombre',
    texture: 'Wavy',
    likes: 89,
    isSold: false,
    createdAt: Date.now() - 400000
  },
  {
    id: 'w6',
    sellerId: 'user_7',
    title: 'Goddess Kinky Straight - 16"',
    description: 'Mimics natural blown-out hair perfectly. Adds incredible volume and length. Very realistic texture.',
    price: 9200,
    images: [
      'https://picsum.photos/seed/wig6/800/800',
      'https://picsum.photos/seed/wig6b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Medium Length',
    condition: WigCondition.GOOD,
    color: 'Natural Black',
    texture: 'Straight',
    likes: 42,
    isSold: false,
    createdAt: Date.now() - 900000
  },
  {
    id: 'w7',
    sellerId: 'user_8',
    title: 'Platinum Blonde 613 Glamour - 26"',
    description: 'Stunning 613 blonde hair. Can be dyed any color. Double wefted for extra thickness.',
    price: 13500,
    originalPrice: 16000,
    images: [
      'https://picsum.photos/seed/wig7/800/800',
      'https://picsum.photos/seed/wig7b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.LIKE_NEW,
    color: '613 Blonde',
    texture: 'Straight',
    likes: 210,
    isSold: false,
    createdAt: Date.now() - 1200000
  },
  {
    id: 'w8',
    sellerId: 'user_9',
    title: 'Natural Afro Kinky Coils - 14"',
    description: 'Authentic 4C hair texture. Soft, manageable, and very full. Perfect for a natural afro look.',
    price: 8800,
    images: [
      'https://picsum.photos/seed/wig8/800/800',
      'https://picsum.photos/seed/wig8b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Medium Length',
    condition: WigCondition.LIKE_NEW,
    color: 'Natural Black',
    texture: 'Curly',
    likes: 74,
    isSold: false,
    createdAt: Date.now() - 3000000
  },
  {
    id: 'w9',
    sellerId: 'user_10',
    title: 'Sleek Bone Straight 30" - Extra Long',
    description: 'For the ultimate glamour look. 30 inches of pure bone straight hair. Requires minimal styling.',
    price: 15500,
    images: [
      'https://picsum.photos/seed/wig9/800/800',
      'https://picsum.photos/seed/wig9b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.LIKE_NEW,
    color: 'Jet Black',
    texture: 'Straight',
    likes: 340,
    isSold: false,
    createdAt: Date.now() - 500000
  },
  {
    id: 'w10',
    sellerId: 'user_11',
    title: 'Chocolate Brown Highlights - 16" Bob',
    description: 'Trendy chocolate brown with honey highlights. Pre-cut bob style. Very flattering for all skin tones.',
    price: 9400,
    images: [
      'https://picsum.photos/seed/wig10/800/800',
      'https://picsum.photos/seed/wig10b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Short',
    condition: WigCondition.GOOD,
    color: 'Chocolate Brown',
    texture: 'Straight',
    likes: 62,
    isSold: false,
    createdAt: Date.now() - 2500000
  },
  {
    id: 'w11',
    sellerId: 'user_12',
    title: 'Burgundy Red Wine Wave - 22"',
    description: 'Deep burgundy color that shines in the sun. Soft body waves for a romantic look. Breathable lace cap.',
    price: 10800,
    images: [
      'https://picsum.photos/seed/wig11/800/800',
      'https://picsum.photos/seed/wig11b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.LIKE_NEW,
    color: 'Burgundy',
    texture: 'Wavy',
    likes: 95,
    isSold: false,
    createdAt: Date.now() - 1500000
  },
  {
    id: 'w12',
    sellerId: 'user_13',
    title: 'Short Pixie Cut Human Hair',
    description: 'Effortless style with this short pixie cut. 100% human hair, can be heat styled. Very lightweight.',
    price: 8200,
    images: [
      'https://picsum.photos/seed/wig12/800/800',
      'https://picsum.photos/seed/wig12b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Short',
    condition: WigCondition.LIKE_NEW,
    color: 'Natural Black',
    texture: 'Straight',
    likes: 38,
    isSold: false,
    createdAt: Date.now() - 4500000
  },
  {
    id: 'w13',
    sellerId: 'user_14',
    title: 'Glueless Wear & Go Straight - 20"',
    description: 'The ultimate convenience. No glue needed, just wear and go. Perfect for beginners. Natural hairline.',
    price: 11500,
    images: [
      'https://picsum.photos/seed/wig13/800/800',
      'https://picsum.photos/seed/wig13b/800/800'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.LIKE_NEW,
    color: 'Natural Black',
    texture: 'Straight',
    likes: 112,
    isSold: false,
    createdAt: Date.now() - 6000000
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'short', label: 'Short', icon: '💇‍♀️' },
  { id: 'medium', label: 'Medium', icon: '👩' },
  { id: 'long', label: 'Long', icon: '🧜‍♀️' },
];
