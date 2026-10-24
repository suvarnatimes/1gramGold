export type CategoryType =
  | 'All'
  | 'Harams'
  | 'Necklaces'
  | 'Bangles'
  | 'Earrings'
  | 'Vaddanams'
  | 'Mangalsutras'
  | 'Chains';

export type PlatingType = 'Micro Gold' | 'Antique Matte' | 'Rose Gold' | 'Matte Finish';

export type StoneType = 'CZ American Diamond' | 'Kemp Stones' | 'Pearls' | 'Plain Gold';

export type OccasionType = 'Bridal' | 'Daily Wear' | 'Festival' | 'Gifting';

export interface ProductSpecification {
  baseMetal: string;
  platingThickness: string;
  stones: string;
  weightGrams: number;
  lengthInches?: string;
  bangleSizes?: string[];
  claspType: string;
  certification: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: CategoryType;
  price: number; // in INR
  originalPrice: number;
  plating: PlatingType;
  stone: StoneType;
  occasion: OccasionType;
  rating: number;
  reviewsCount: number;
  badge?: 'Best Seller' | '1-Year Plating Guarantee' | 'Fast Shipping' | 'Bridal Pick' | 'Hot Deal';
  isTrending?: boolean;
  isFlashDeal?: boolean;
  images: string[];
  shortDescription: string;
  longDescription: string;
  specs: ProductSpecification;
  matchingProductId?: string;
  reelsVideoUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  comment: string;
  avatarUrl: string;
  productTitle?: string;
}

export interface ResellerFormData {
  fullName: string;
  storeName: string;
  city: string;
  state: string;
  whatsappNumber: string;
  email: string;
  gstin?: string;
  resellerType: 'Boutique Owner' | 'Online Reseller' | 'Wholesale Distributor' | 'Bridal Makeup Artist';
  estimatedMonthlyVolume: string;
}
