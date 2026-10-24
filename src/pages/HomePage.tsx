import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { REVIEWS, INSTAGRAM_POSTS, VIDEO_REELS } from '../data/reviews';
import { CHILAKALAPUDI_STORY } from '../data/craftStory';
import { ProductCard } from '../components/ProductCard';
import { CategoryType } from '../types/jewelry';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Play,
  Heart,
  Building2,
  Gem,
  Flame,
  Award,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

const HERO_SLIDES = [
  {
    title: 'Authentic 1-Gram Micro Gold Bridal Jewellery',
    subtitle: 'Direct from the World Capital of Gold-Covering: Chilakalapudi, Machilipatnam',
    highlight: 'Handcrafted with 24Kt Pure Micro Electro-Plating',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85',
    ctaPrimary: 'Shop Bridal Collection',
    category: 'Harams',
  },
  {
    title: 'Temple Heritage Kemp & Guttapusalu Chokers',
    subtitle: 'Heirloom South Indian Masterpieces Indistinguishable From Real 22Kt Gold',
    highlight: '1-Year Full Plating Replacement Guarantee',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85',
    ctaPrimary: 'Explore Kemp Chokers',
    category: 'Necklaces',
  },
  {
    title: 'Daily Wear Peacock Kada & Screw Bangles',
    subtitle: 'High-Density Red Brass Core with Double 24Kt Micro Dipping',
    highlight: 'Non-tarnishing, Water & Sweat Tested for Everyday Wear',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1600&q=85',
    ctaPrimary: 'Explore Daily Wear Bangles',
    category: 'Bangles',
  },
];

const CATEGORIES_LIST: { name: CategoryType; image: string; tag: string }[] = [
  {
    name: 'Harams',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80',
    tag: 'Bridal Grandeur',
  },
  {
    name: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80',
    tag: 'Kemp Chokers',
  },
  {
    name: 'Bangles',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80',
    tag: 'Kada & Screw',
  },
  {
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=500&q=80',
    tag: 'Temple Jhumkas',
  },
  {
    name: 'Vaddanams',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=500&q=80',
    tag: 'Ashtalakshmi',
  },
  {
    name: 'Mangalsutras',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=500&q=80',
    tag: 'Nallapusalu Bottu',
  },
  {
    name: 'Chains',
    image: 'https://images.unsplash.com/photo-1611591475155-4284ec289e0d?auto=format&fit=crop&w=500&q=80',
    tag: 'Daily Wear Rope',
  },
];

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, setIsWholesaleRegisterOpen, navigateToProduct } = useShop();

  const [heroIndex, setHeroIndex] = useState(0);

  // Flash deal countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero auto-slider
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const trendingProducts = PRODUCTS.filter((p) => p.isTrending);
  const flashDealProducts = PRODUCTS.filter((p) => p.isFlashDeal || p.price > 2500).slice(0, 4);

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
    setCurrentPage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Showcase Section */}
      <section className="relative bg-[#061810] text-white overflow-hidden min-h-[520px] sm:min-h-[600px] flex items-center">
        {/* Background Image Carousel */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === heroIndex ? 'opacity-40' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-7000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061810] via-[#061810]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061810] via-transparent to-transparent" />
          </div>
        ))}

        {/* Content Box */}
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 z-10 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Floating Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#FFE27D]">
                1,800+ 5-Star Reviews on Google
              </span>
              <span className="text-xs text-white/70 hidden sm:inline">• Chilakalapudi Factory Direct</span>
            </div>

            {/* Regal Heading */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-white">
              {HERO_SLIDES[heroIndex].title}
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
              {HERO_SLIDES[heroIndex].subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FFE27D] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{HERO_SLIDES[heroIndex].highlight}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleCategoryClick(HERO_SLIDES[heroIndex].category as any)}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE27D] to-[#D4AF37] text-[#0F172A] font-bold text-xs uppercase tracking-wider shadow-xl hover:shadow-[#D4AF37]/40 transition-all flex items-center gap-2 group"
              >
                <span>{HERO_SLIDES[heroIndex].ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Bangles');
                  setCurrentPage('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-full bg-[#0F172A]/80 hover:bg-[#0F172A] border border-gray-600 hover:border-[#D4AF37] text-white font-semibold text-xs transition-all backdrop-blur-md"
              >
                Explore Daily Wear Bangles
              </button>

              <button
                type="button"
                onClick={() => setIsWholesaleRegisterOpen(true)}
                className="px-5 py-3.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-500/60 text-[#FFE27D] font-semibold text-xs transition-all flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Download Wholesale Catalog</span>
              </button>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex items-center gap-2 mt-8">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setHeroIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  heroIndex === i ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. "Shop by Category" Visual Grid (Circular / Arch Cards) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Signature Factory Collections
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#0F172A] mt-1">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES_LIST.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer flex flex-col items-center text-center transition-transform hover:-translate-y-1"
            >
              {/* Arch Shaped Card */}
              <div className="relative w-28 sm:w-32 aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#E2D8C0] group-hover:border-[#D4AF37] shadow-sm group-hover:shadow-lg transition-all bg-[#FDFBF7]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-2 inset-x-1 text-[10px] font-bold text-[#FFE27D] tracking-wide uppercase drop-shadow">
                  {cat.tag}
                </span>
              </div>

              <span className="font-serif-luxury text-sm font-bold text-[#0F172A] group-hover:text-[#064E3B] mt-2 transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Flash Deals & Wedding Season Specials (with countdown timer) */}
      <section className="bg-gradient-to-br from-[#061C14] to-[#0A261C] text-white py-12 border-y border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/20 border border-[#D4AF37] px-3 py-1 rounded-full text-[11px] text-[#FFE27D] font-bold uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Wedding Muhurtham Season Flash Deals</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white">
                Trending Factory Exclusives
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Direct workshop price discounts up to 45% off. Guaranteed delivery within 3-4 days.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2 bg-[#0F172A]/80 border border-[#D4AF37]/40 px-4 py-2 rounded-xl backdrop-blur-md">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs text-gray-300 font-medium">Offer Ends In:</span>
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#FFE27D]">
                <span className="bg-[#1E293B] px-1.5 py-0.5 rounded border border-gray-700">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-[#1E293B] px-1.5 py-0.5 rounded border border-gray-700">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-[#1E293B] px-1.5 py-0.5 rounded border border-gray-700">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          {/* Flash Deals Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashDealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                setCurrentPage('collections');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full border border-[#D4AF37] text-[#FFE27D] hover:bg-[#D4AF37] hover:text-[#0F172A] text-xs font-semibold tracking-wider transition-all"
            >
              View All 120+ Wedding Season Designs →
            </button>
          </div>
        </div>
      </section>

      {/* 4. "The Chilakalapudi Craft" Story Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#F8F5EE] border border-[#E2D8C0] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story Text */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#064E3B] uppercase">
                Since 1988 • Machilipatnam, Andhra Pradesh
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
                The Science of Chilakalapudi Micro Gold Plating
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Why does Sudheer KT jewellery look indistinguishable from real 22kt gold? In our Machilipatnam workshops, we practice a specialized molecular electro-deposition technique.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Instead of cheap gold flash that washes away in days, our multi-stage process fuses 24kt pure gold into a dense copper-brass matrix, finished with high-temperature nano-ceramic sealing.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('guarantee');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#064E3B] hover:bg-[#065F46] text-[#FFE27D] font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Read 1-Year Guarantee & Replating Policy</span>
                </button>
              </div>
            </div>

            {/* Step-by-Step Craft Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CHILAKALAPUDI_STORY.steps.slice(0, 4).map((s) => (
                <div
                  key={s.step}
                  className="p-4 bg-white rounded-2xl border border-[#E2D8C0] shadow-sm space-y-1.5 hover:border-[#D4AF37] transition-colors"
                >
                  <div className="flex items-center justify-between text-[#064E3B]">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#D4AF37]">
                      Stage 0{s.step}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-serif-luxury font-bold text-sm text-[#0F172A]">
                    {s.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-[11px]">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Video Shopping & Sparkle Reels Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
              Real Daylight Shine
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Video Shopping: Watch It Sparkle
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-sm">
            Unfiltered camera video clips showing authentic 24kt micro gold shine, weight, and flexible screw clasps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEO_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => navigateToProduct(reel.sku.toLowerCase())}
              className="group cursor-pointer bg-[#0F172A] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-lg hover:shadow-2xl transition-all relative flex flex-col"
            >
              <div className="relative aspect-[9/14] bg-black overflow-hidden">
                <video
                  src={reel.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlays */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1 border border-white/20">
                  <Play className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>{reel.views} Views</span>
                </div>

                <div className="absolute bottom-3 inset-x-3 bg-[#0F172A]/90 backdrop-blur-md p-3 rounded-xl border border-[#D4AF37]/40 text-white">
                  <p className="text-[10px] text-[#FFE27D] font-mono">SKU: {reel.sku}</p>
                  <h4 className="font-serif-luxury font-bold text-sm truncate">{reel.productName}</h4>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-700">
                    <span className="text-xs font-bold text-[#FFE27D]">
                      ₹{reel.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] bg-[#064E3B] text-[#FFE27D] px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                      Shop Look <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Live Instagram Feed / Customer Photos */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#064E3B] uppercase">
            #SudheerKTBrides
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1">
            Real Brides Across India & Abroad
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Tag @sudheerktfashions on Instagram to be featured on our official wall of brides!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-2xl overflow-hidden border border-[#E2D8C0] shadow-sm hover:shadow-xl transition-all aspect-square bg-[#FDFBF7]"
            >
              <img
                src={post.image}
                alt={post.bride}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] text-[#FFE27D] font-mono">{post.event}</span>
                <p className="text-xs font-bold font-serif-luxury">{post.bride}</p>
                <p className="text-[10px] text-gray-300 line-clamp-1 mt-0.5">{post.tagline}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-red-400">
                  <Heart className="w-3 h-3 fill-red-400" />
                  <span>{post.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Google Reviews Trust Carousel */}
      <section className="bg-[#FAF8F3] py-12 border-t border-[#E2D8C0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0F172A]">
              1,800+ 5-Star Reviews on Google
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Chilakalapudi's most trusted 1-gram gold manufacturer since 1988
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-[#E2D8C0] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-[#0F172A]">{rev.author}</h4>
                    <p className="text-[10px] text-gray-500">
                      {rev.city}, {rev.state} • Verified Buyer
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Sticky / Floating Wholesale Enquiry Float */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#064E3B] via-[#043327] to-[#064E3B] rounded-2xl p-6 sm:p-8 text-white border-2 border-[#D4AF37]/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] uppercase tracking-widest text-[#FFE27D] font-bold flex items-center justify-center md:justify-start gap-1.5">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Are You a Reseller or Boutique Owner?</span>
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white">
              Direct Wholesale Factory Pricing (Minimum Order ₹10,000)
            </h3>
            <p className="text-xs text-gray-300 max-w-xl">
              Get tiered factory discounts (15% - 25% off) with physical 1-year warranty cards for your customers. We supply 400+ jewellery boutiques across Andhra, Telangana, Karnataka, and Tamil Nadu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsWholesaleRegisterOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFE27D] text-[#0F172A] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[#D4AF37]/40 transition-all"
            >
              Apply for Wholesale Portal
            </button>
            <a
              href="https://wa.me/919646191111?text=Hello%20Sudheer%20KT,%20I%20am%20a%20jewellery%20boutique%20owner%20interested%20in%20wholesale%20reseller%20pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 border border-emerald-600"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Wholesale Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
