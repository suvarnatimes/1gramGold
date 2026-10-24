import React from 'react';
import { useShop, PageRoute } from '../context/ShopContext';
import { Home, Sparkles, Heart, Building2, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartTotalCount,
    wishlistIds,
    setIsCartDrawerOpen,
  } = useShop();

  const handleNav = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-t border-[#D4AF37]/30 shadow-2xl px-2 py-1.5">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'home' ? 'text-[#FFE27D]' : 'text-gray-400'
          }`}
          aria-label="Home page"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>

        {/* Collections */}
        <button
          type="button"
          onClick={() => handleNav('collections')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'collections' ? 'text-[#FFE27D]' : 'text-gray-400'
          }`}
          aria-label="Collections"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Catalog</span>
        </button>

        {/* Wholesale B2B */}
        <button
          type="button"
          onClick={() => handleNav('wholesale')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'wholesale' ? 'text-[#FFE27D]' : 'text-gray-400'
          }`}
          aria-label="Wholesale B2B"
        >
          <Building2 className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-[10px] font-medium mt-0.5 text-[#D4AF37]">Wholesale</span>
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => handleNav('wishlist')}
          className={`relative flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'wishlist' ? 'text-[#FFE27D]' : 'text-gray-400'
          }`}
          aria-label="Bridal Wishlist"
        >
          <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'text-[#D4AF37] fill-[#D4AF37]' : ''}`} />
          {wishlistIds.length > 0 && (
            <span className="absolute top-0 right-2 bg-[#D4AF37] text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
          <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          type="button"
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center p-1.5 text-gray-400 hover:text-white"
          aria-label="Cart"
        >
          <ShoppingBag className="w-5 h-5 text-[#FFE27D]" />
          {cartTotalCount > 0 && (
            <span className="absolute top-0 right-2 bg-[#D4AF37] text-[#0F172A] text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartTotalCount}
            </span>
          )}
          <span className="text-[10px] font-medium mt-0.5 text-[#FFE27D]">Bag</span>
        </button>
      </div>
    </nav>
  );
};
