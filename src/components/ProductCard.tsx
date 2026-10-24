import React, { useState } from 'react';
import { Product } from '../types/jewelry';
import { useShop } from '../context/ShopContext';
import { formatPrice, generateWhatsAppSkuLink } from '../utils/jewelryLogic';
import { Heart, Star, Sparkles, MessageCircle, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const {
    navigateToProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    currency,
    setSelectedProductId,
    setIsTryOnOpen,
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const displayImage = isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = generateWhatsAppSkuLink({
      sku: product.sku,
      title: product.title,
      priceInINR: product.price,
    });
    window.open(link, '_blank');
  };

  const handleTryOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProductId(product.id);
    setIsTryOnOpen(true);
  };

  return (
    <div
      onClick={() => navigateToProduct(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-[#E2D8C0] hover:border-[#D4AF37] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Top Media & Badges Container */}
      <div className="relative aspect-square w-full bg-[#FDFBF7] overflow-hidden">
        <img
          src={displayImage}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="bg-[#064E3B] text-[#FFE27D] text-[10px] font-bold px-2 py-0.5 rounded tracking-wide shadow-sm border border-[#D4AF37]/50 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#D4AF37] text-[#0F172A] text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Floating Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-[#D4AF37] flex items-center justify-center text-gray-600 hover:text-red-500 shadow-md transition-all z-10"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted ? 'text-red-500 fill-red-500 scale-110' : 'hover:scale-110'
            }`}
          />
        </button>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="hidden md:flex absolute inset-x-2 bottom-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={handleTryOnClick}
            className="flex-1 py-1.5 bg-[#0F172A]/90 hover:bg-[#0F172A] text-white text-[11px] font-semibold rounded-lg shadow-lg flex items-center justify-center gap-1 backdrop-blur-sm border border-[#D4AF37]/40"
            aria-label="Virtual Try-On"
          >
            <Eye className="w-3.5 h-3.5 text-[#FFE27D]" />
            <span>Try On</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-semibold rounded-lg shadow-lg flex items-center justify-center gap-1"
            title="Ask on WhatsApp"
            aria-label="Inquire SKU on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Plating tag */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-medium text-[#064E3B] uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <span className="bg-amber-50 text-amber-900 border border-amber-200/60 px-1.5 py-0.2 rounded text-[10px]">
              {product.plating}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury text-sm sm:text-base font-semibold text-[#0F172A] line-clamp-2 leading-snug group-hover:text-[#064E3B] transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">({product.reviewsCount})</span>
            <span className="text-[10px] text-gray-400 ml-auto font-mono">SKU: {product.sku}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#064E3B]">
                {formatPrice(product.price, currency)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice, currency)}
              </span>
            </div>
            <p className="text-[9px] text-emerald-700 font-medium">
              Factory Direct Wholesale Price
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#064E3B] hover:bg-[#065F46] text-[#FFE27D] hover:text-white transition-all shadow-sm flex items-center justify-center gap-1.5 text-xs font-semibold shrink-0"
            aria-label={`Add ${product.title} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
