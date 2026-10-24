import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { generateWishlistShareLink } from '../utils/jewelryLogic';
import { Heart, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, addToCart, setCurrentPage, addToast } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleShareOnWhatsApp = () => {
    const titles = wishlistedProducts.map((p) => `${p.title} (SKU: ${p.sku})`);
    const link = generateWishlistShareLink(titles, '919646191111');
    window.open(link, '_blank');
    addToast('Wishlist Link Opened', 'Shared directly with Sudheer KT bridal support');
  };

  const handleMoveAllToBag = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1));
    addToast('All Saved Items Added to Bag!', `${wishlistedProducts.length} items ready for checkout`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D8C0] pb-6">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#064E3B] uppercase">
            Curated Bridal Selection
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#0F172A] mt-1">
            My Bridal Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Items saved locally on your device. Share with family or order together for bundle discounts.
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleShareOnWhatsApp}
              className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share My Bridal Wishlist on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleMoveAllToBag}
              className="px-4 py-2.5 rounded-full bg-[#064E3B] hover:bg-[#065F46] text-[#FFE27D] font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Bag</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2D8C0] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#0F172A]">
            Your Bridal Wishlist is Empty
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Explore our collections and tap the heart icon on any necklace, haram, or bangles to save them here for your wedding trousseau.
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage('collections')}
            className="px-6 py-2.5 rounded-full bg-[#064E3B] text-[#FFE27D] font-bold text-xs uppercase tracking-wider shadow"
          >
            Browse Collections
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
