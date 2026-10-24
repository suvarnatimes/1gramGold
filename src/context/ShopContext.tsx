import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CategoryType } from '../types/jewelry';
import { PRODUCTS } from '../data/products';
import { CurrencyCode, calculateWholesaleDiscount } from '../utils/jewelryLogic';

export type PageRoute = 'home' | 'collections' | 'product' | 'wholesale' | 'wishlist' | 'guarantee';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

interface ShopContextType {
  // Navigation
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  selectedProduct: Product | undefined;
  navigateToProduct: (productId: string) => void;

  // Filtering & Catalog
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotalInINR: number;
  wholesaleInfo: ReturnType<typeof calculateWholesaleDiscount>;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals
  isTryOnOpen: boolean;
  setIsTryOnOpen: (open: boolean) => void;
  isCareGuideOpen: boolean;
  setIsCareGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isWholesaleRegisterOpen: boolean;
  setIsWholesaleRegisterOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sudheer_kt_cart_v1';
const WISHLIST_STORAGE_KEY = 'sudheer_kt_wishlist_v1';
const CURRENCY_STORAGE_KEY = 'sudheer_kt_currency_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('skt-haram-804');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [currency, setCurrencyState] = useState<CurrencyCode>('INR');

  // Modals state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWholesaleRegisterOpen, setIsWholesaleRegisterOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Initial demo cart item for instant delight
    const initialProduct = PRODUCTS.find((p) => p.id === 'skt-haram-804') || PRODUCTS[0];
    return [{ product: initialProduct, quantity: 1 }];
  });

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['skt-haram-804', 'skt-vadd-512'];
  });

  // Load currency
  useEffect(() => {
    try {
      const savedCurr = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode;
      if (savedCurr && (savedCurr === 'INR' || savedCurr === 'USD' || savedCurr === 'AED')) {
        setCurrencyState(savedCurr);
      }
    } catch {
      // ignore
    }
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, c);
    } catch {
      // ignore
    }
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedSize }];
    });

    addToast('Added to Shopping Bag', `${product.title} (Qty: ${quantity})`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === selectedSize))
    );
    addToast('Item removed from Bag', undefined, 'info');
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlistIds.includes(productId);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      addToast('Removed from Bridal Wishlist', undefined, 'info');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      addToast('Saved to Bridal Wishlist', 'View your saved items anytime');
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalInINR = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const wholesaleInfo = calculateWholesaleDiscount(cartSubtotalInINR);

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        navigateToProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        currency,
        setCurrency,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotalInINR,
        wholesaleInfo,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        isTryOnOpen,
        setIsTryOnOpen,
        isCareGuideOpen,
        setIsCareGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWholesaleRegisterOpen,
        setIsWholesaleRegisterOpen,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
