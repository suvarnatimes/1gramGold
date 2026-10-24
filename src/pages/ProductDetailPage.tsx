import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';
import {
  formatPrice,
  generateWhatsAppSkuLink,
  calculateBundleTotal,
} from '../utils/jewelryLogic';
import {
  Sparkles,
  Heart,
  ShoppingBag,
  MessageCircle,
  Eye,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle,
  ZoomIn,
  Package,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    currency,
    setIsTryOnOpen,
    setIsCareGuideOpen,
    setIsCheckoutOpen,
    navigateToProduct,
    setCurrentPage,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [selectedBangleSize, setSelectedBangleSize] = useState<string | undefined>(
    selectedProduct?.specs.bangleSizes ? selectedProduct.specs.bangleSizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isWishlisted = isInWishlist(selectedProduct.id);
  const discountPercent = Math.round(
    ((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100
  );

  // Matching upsell product
  const matchingProduct = PRODUCTS.find((p) => p.id === selectedProduct.matchingProductId);
  const bundleCalculation = matchingProduct
    ? calculateBundleTotal(selectedProduct.price, matchingProduct.price)
    : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handleWhatsAppInquiry = () => {
    const link = generateWhatsAppSkuLink({
      sku: selectedProduct.sku,
      title: selectedProduct.title,
      priceInINR: selectedProduct.price,
    });
    window.open(link, '_blank');
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedBangleSize);
    setIsCheckoutOpen(true);
  };

  const handleAddBundle = () => {
    if (matchingProduct) {
      addToCart(selectedProduct, 1, selectedBangleSize);
      addToCart(matchingProduct, 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
          className="hover:text-[#064E3B]"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <button
          type="button"
          onClick={() => setCurrentPage('collections')}
          className="hover:text-[#064E3B]"
        >
          Collections
        </button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-400">{selectedProduct.category}</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate max-w-xs">
          {selectedProduct.title}
        </span>
      </nav>

      {/* Main Product Stage: Gallery & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery (Columns 1 to 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] shrink-0">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#FDFBF7] ${
                    activeImageIndex === idx
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-105'
                      : 'border-gray-200 hover:border-gray-400 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* High-Res Deep Zoom Showcase Image */}
            <div
              className="relative flex-1 aspect-square bg-[#FDFBF7] border border-[#E2D8C0] rounded-2xl overflow-hidden cursor-crosshair group shadow-sm"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={selectedProduct.images[activeImageIndex]}
                alt={selectedProduct.title}
                className="w-full h-full object-cover transition-opacity duration-200"
              />

              {/* Deep Zoom Lens Overlay on Desktop */}
              {isZoomed && (
                <div
                  className="hidden md:block absolute inset-0 pointer-events-none bg-no-repeat bg-[#FDFBF7] z-20"
                  style={{
                    backgroundImage: `url(${selectedProduct.images[activeImageIndex]})`,
                    backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                    backgroundSize: '240%',
                  }}
                />
              )}

              {/* Floating Magnifier indicator */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white flex items-center gap-1.5 pointer-events-none z-10 border border-white/20">
                <ZoomIn className="w-3.5 h-3.5 text-[#FFE27D]" />
                <span className="hidden sm:inline">Hover to inspect hand-carving</span>
                <span className="sm:hidden">Tap image to zoom</span>
              </div>

              {/* Floating Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-700 hover:text-red-500 shadow-md transition-all z-20"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'text-red-500 fill-red-500 scale-110' : ''
                  }`}
                />
              </button>

              {/* Badge */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {selectedProduct.badge && (
                  <span className="bg-[#064E3B] text-[#FFE27D] text-xs font-bold px-2.5 py-1 rounded-md shadow-md border border-[#D4AF37]/50 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {selectedProduct.badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-[#D4AF37] text-[#0F172A] text-xs font-black px-2 py-0.5 rounded shadow">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Features Row */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#064E3B] mx-auto mb-1" />
              <p className="font-semibold text-gray-900">1-Year Guarantee</p>
              <p className="text-[10px] text-gray-500">Color & micro-plating</p>
            </div>
            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl">
              <Truck className="w-5 h-5 text-[#064E3B] mx-auto mb-1" />
              <p className="font-semibold text-gray-900">Fast Express Ship</p>
              <p className="text-[10px] text-gray-500">Dispatch in 24 hrs</p>
            </div>
            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl">
              <RotateCcw className="w-5 h-5 text-[#064E3B] mx-auto mb-1" />
              <p className="font-semibold text-gray-900">7-Day Return</p>
              <p className="text-[10px] text-gray-500">Transit insured</p>
            </div>
          </div>
        </div>

        {/* Right Info & Actions (Columns 8 to 12) */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-[#E2D8C0] shadow-sm">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="text-[#064E3B] font-bold uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                SKU: {selectedProduct.sku}
              </span>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0F172A] leading-tight">
              {selectedProduct.title}
            </h1>

            {/* Reviews summary */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-gray-800">{selectedProduct.rating}</span>
              <span className="text-gray-500">({selectedProduct.reviewsCount} Verified Reviews)</span>
              <span className="text-emerald-700 font-medium ml-auto flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> In Stock at Chilakalapudi
              </span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E2D8C0] space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#064E3B]">
                {formatPrice(selectedProduct.price, currency)}
              </span>
              <span className="text-base text-gray-400 line-through">
                {formatPrice(selectedProduct.originalPrice, currency)}
              </span>
              <span className="text-xs bg-[#064E3B] text-[#FFE27D] font-bold px-2 py-0.5 rounded">
                Save {discountPercent}%
              </span>
            </div>
            <p className="text-[11px] text-gray-600">
              Inclusive of all taxes • Factory Direct Wholesale Price
            </p>
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {selectedProduct.shortDescription}
          </p>

          {/* Bangle Size selector if applicable */}
          {selectedProduct.specs.bangleSizes && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Select Bangle Size:
              </label>
              <div className="flex gap-2">
                {selectedProduct.specs.bangleSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedBangleSize(size)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      selectedBangleSize === size
                        ? 'bg-[#064E3B] text-[#FFE27D] border-[#064E3B] shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Size {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Virtual Try-On Banner CTA */}
          <div className="p-4 bg-gradient-to-r from-[#061C14] to-[#0A2E20] rounded-xl border border-[#D4AF37]/40 text-white flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#FFE27D] uppercase font-bold tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Virtual Try-On Studio
              </span>
              <h4 className="font-serif-luxury font-bold text-base mt-0.5">
                See How This Fits Your Neckline
              </h4>
              <p className="text-[11px] text-gray-300">
                Preview with bridal silk sarees or your live webcam camera
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsTryOnOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#FFE27D] text-[#0F172A] font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Try It On</span>
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => addToCart(selectedProduct, quantity, selectedBangleSize)}
                className="w-full py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#065F46] text-[#FFE27D] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFE27D] text-[#0F172A] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-[#D4AF37]/40"
              >
                Buy Now
              </button>
            </div>

            {/* Direct WhatsApp SKU Inquiry Button */}
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp (Send SKU: {selectedProduct.sku})</span>
            </button>
          </div>

          {/* Maintenance Modal Trigger */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Need care tips for micro-plating?</span>
            <button
              type="button"
              onClick={() => setIsCareGuideOpen(true)}
              className="text-[#064E3B] font-semibold underline flex items-center gap-1 hover:text-[#043327]"
            >
              <Info className="w-3.5 h-3.5" />
              <span>View Care & Longevity Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* "Match with This" Recommendation Engine (Upsell Bundle) */}
      {matchingProduct && bundleCalculation && (
        <section className="bg-gradient-to-br from-[#061C14] to-[#0A261C] rounded-2xl p-6 sm:p-8 text-white border border-[#D4AF37]/40 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] text-[#FFE27D] uppercase font-bold tracking-widest flex items-center justify-center md:justify-start gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Complete the Bridal Look
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
                Match with {matchingProduct.title}
              </h3>
              <p className="text-xs text-gray-300 max-w-lg">
                Specially designed to pair with this piece. Save 10% when you order both together directly from our workshop!
              </p>
            </div>

            {/* Combo Visual */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-black">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-[#FFE27D]">+</span>
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-black">
                <img
                  src={matchingProduct.images[0]}
                  alt={matchingProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Price & Bundle Button */}
            <div className="text-center md:text-right shrink-0 space-y-2">
              <div>
                <p className="text-xs text-gray-400 line-through">
                  Total: {formatPrice(bundleCalculation.originalTotal, currency)}
                </p>
                <p className="text-xl font-bold text-[#FFE27D]">
                  Combo: {formatPrice(bundleCalculation.bundlePrice, currency)}
                </p>
                <p className="text-[10px] text-emerald-400 font-semibold">
                  You Save {formatPrice(bundleCalculation.savings, currency)} (10% Off)
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddBundle}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFE27D] text-[#0F172A] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
              >
                Bundle & Save 10%
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Product Specifications & Craft Story Tabs */}
      <section className="bg-white rounded-2xl border border-[#E2D8C0] p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="font-serif-luxury text-2xl font-bold text-[#0F172A] border-b border-gray-100 pb-3">
          Detailed Specifications & Craftsmanship
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Base Metal Alloy</span>
              <span className="font-semibold text-gray-900 text-right">
                {selectedProduct.specs.baseMetal}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Plating Thickness</span>
              <span className="font-semibold text-gray-900 text-right text-[#064E3B]">
                {selectedProduct.specs.platingThickness}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Stone Details</span>
              <span className="font-semibold text-gray-900 text-right">
                {selectedProduct.specs.stones}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Gross Weight</span>
              <span className="font-semibold text-gray-900">
                {selectedProduct.specs.weightGrams} Grams
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {selectedProduct.specs.lengthInches && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Chain / Necklace Length</span>
                <span className="font-semibold text-gray-900 text-right">
                  {selectedProduct.specs.lengthInches}
                </span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Clasp / Closure Type</span>
              <span className="font-semibold text-gray-900 text-right">
                {selectedProduct.specs.claspType}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Guarantee Certification</span>
              <span className="font-semibold text-emerald-800 text-right">
                {selectedProduct.specs.certification}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Manufacturing Origin</span>
              <span className="font-semibold text-gray-900">
                Chilakalapudi, Machilipatnam, AP
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-serif-luxury font-bold text-base text-[#0F172A] mb-2">
            The Artisan's Note:
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {selectedProduct.longDescription}
          </p>
        </div>
      </section>

      {/* Customer Reviews for this Product */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-luxury text-2xl font-bold text-[#0F172A]">
            Customer Reviews ({selectedProduct.reviewsCount})
          </h3>
          <span className="text-xs text-gray-500">4.9 / 5.0 Rating</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVIEWS.slice(0, 2).map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-2xl border border-[#E2D8C0] shadow-sm space-y-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{rev.author}</p>
                    <p className="text-[10px] text-gray-500">{rev.city}, {rev.state}</p>
                  </div>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic">"{rev.comment}"</p>
              <p className="text-[10px] text-emerald-700 font-medium">✓ Verified Buyer from Chilakalapudi Portal</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
