import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  CategoryType,
  PlatingType,
  StoneType,
  OccasionType,
} from '../types/jewelry';
import {
  Filter,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  Grid3X3,
  Search,
  Check,
  ChevronDown,
} from 'lucide-react';

const CATEGORIES: CategoryType[] = [
  'All',
  'Harams',
  'Necklaces',
  'Bangles',
  'Earrings',
  'Vaddanams',
  'Mangalsutras',
  'Chains',
];

const PLATING_OPTIONS: PlatingType[] = [
  'Micro Gold',
  'Antique Matte',
  'Rose Gold',
  'Matte Finish',
];

const STONE_OPTIONS: StoneType[] = [
  'Kemp Stones',
  'CZ American Diamond',
  'Pearls',
  'Plain Gold',
];

const OCCASION_OPTIONS: OccasionType[] = [
  'Bridal',
  'Daily Wear',
  'Festival',
  'Gifting',
];

export const CollectionsPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useShop();

  // Faceted Filters State
  const [selectedPlatings, setSelectedPlatings] = useState<PlatingType[]>([]);
  const [selectedStones, setSelectedStones] = useState<StoneType[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<OccasionType[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all'); // 'all' | 'under-1000' | '1000-2500' | '2500-5000' | 'above-5000'
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<'normal' | 'dense'>('normal');

  // Toggle filter helpers
  const togglePlating = (plating: PlatingType) => {
    setSelectedPlatings((prev) =>
      prev.includes(plating) ? prev.filter((p) => p !== plating) : [...prev, plating]
    );
  };

  const toggleStone = (stone: StoneType) => {
    setSelectedStones((prev) =>
      prev.includes(stone) ? prev.filter((s) => s !== stone) : [...prev, stone]
    );
  };

  const toggleOccasion = (occasion: OccasionType) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion) ? prev.filter((o) => o !== occasion) : [...prev, occasion]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPlatings([]);
    setSelectedStones([]);
    setSelectedOccasions([]);
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Plating filter
      if (selectedPlatings.length > 0 && !selectedPlatings.includes(item.plating)) {
        return false;
      }

      // Stone filter
      if (selectedStones.length > 0 && !selectedStones.includes(item.stone)) {
        return false;
      }

      // Occasion filter
      if (selectedOccasions.length > 0 && !selectedOccasions.includes(item.occasion)) {
        return false;
      }

      // Price filter
      if (priceRange === 'under-1000' && item.price >= 1000) return false;
      if (priceRange === '1000-2500' && (item.price < 1000 || item.price > 2500)) return false;
      if (priceRange === '2500-5000' && (item.price < 2500 || item.price > 5000)) return false;
      if (priceRange === 'above-5000' && item.price < 5000) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.shortDescription.toLowerCase().includes(query) ||
          item.specs.stones.toLowerCase().includes(query);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured (trending first)
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedPlatings,
    selectedStones,
    selectedOccasions,
    priceRange,
    searchQuery,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedPlatings.length +
    selectedStones.length +
    selectedOccasions.length +
    (priceRange !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="border-b border-[#E2D8C0] pb-6">
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#064E3B] uppercase">
          Chilakalapudi Factory Catalog
        </span>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#0F172A]">
              1-Gram Gold Jewellery Collections
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Showing {filteredProducts.length} authentic handcrafted temple & bridal pieces
            </p>
          </div>

          {/* Quick Category Pill Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#064E3B] text-[#FFE27D] shadow-sm'
                    : 'bg-white text-gray-700 border border-[#E2D8C0] hover:border-[#D4AF37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Control Bar: Filter toggle on mobile, Sort, and Grid toggle */}
      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-[#E2D8C0] shadow-sm">
        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#064E3B] text-[#FFE27D] text-xs font-bold shadow-sm"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="hidden lg:flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium pl-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}

          {searchQuery && (
            <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              Search: "{searchQuery}"
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="hover:font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Grid column toggle on desktop */}
          <div className="hidden sm:flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
            <button
              type="button"
              onClick={() => setGridColumns('normal')}
              className={`p-1.5 rounded ${
                gridColumns === 'normal' ? 'bg-white text-[#064E3B] shadow-sm' : 'text-gray-400'
              }`}
              title="Standard 4-Column Grid"
              aria-label="4-Column grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setGridColumns('dense')}
              className={`p-1.5 rounded ${
                gridColumns === 'dense' ? 'bg-white text-[#064E3B] shadow-sm' : 'text-gray-400'
              }`}
              title="Compact Grid"
              aria-label="Compact grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg py-1.5 px-3 text-xs text-gray-800 font-medium focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="featured">Featured / Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`${
            mobileFilterOpen ? 'fixed inset-0 z-50 bg-black/70 p-4 flex' : 'hidden lg:block'
          } lg:relative lg:inset-auto lg:p-0 lg:bg-transparent`}
        >
          <div className="w-full max-w-xs bg-white rounded-2xl border border-[#E2D8C0] p-5 shadow-sm space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#064E3B]" />
                <h3 className="font-serif-luxury text-lg font-bold text-[#0F172A]">
                  Faceted Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-red-600"
              >
                Clear All
              </button>
            </div>

            {/* 1. Plating Type */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Plating Type
              </h4>
              <div className="space-y-1.5 text-xs">
                {PLATING_OPTIONS.map((plat) => {
                  const checked = selectedPlatings.includes(plat);
                  return (
                    <label
                      key={plat}
                      className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-black py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePlating(plat)}
                        className="rounded border-gray-300 text-[#064E3B] focus:ring-[#D4AF37]"
                      />
                      <span>{plat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 2. Stone Type */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Stone Type
              </h4>
              <div className="space-y-1.5 text-xs">
                {STONE_OPTIONS.map((st) => {
                  const checked = selectedStones.includes(st);
                  return (
                    <label
                      key={st}
                      className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-black py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleStone(st)}
                        className="rounded border-gray-300 text-[#064E3B] focus:ring-[#D4AF37]"
                      />
                      <span>{st}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Price Bracket */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Price Range (INR)
              </h4>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-1000', label: 'Under ₹999' },
                  { id: '1000-2500', label: '₹1,000 – ₹2,500' },
                  { id: '2500-5000', label: '₹2,500 – ₹5,000' },
                  { id: 'above-5000', label: 'Bridal Grand ₹5,000+' },
                ].map((range) => (
                  <label
                    key={range.id}
                    className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-black py-0.5"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === range.id}
                      onChange={() => setPriceRange(range.id)}
                      className="text-[#064E3B] focus:ring-[#D4AF37]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Occasion */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Occasion
              </h4>
              <div className="space-y-1.5 text-xs">
                {OCCASION_OPTIONS.map((occ) => {
                  const checked = selectedOccasions.includes(occ);
                  return (
                    <label
                      key={occ}
                      className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-black py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOccasion(occ)}
                        className="rounded border-gray-300 text-[#064E3B] focus:ring-[#D4AF37]"
                      />
                      <span>{occ}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Close button on mobile */}
            <div className="lg:hidden pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#064E3B] text-[#FFE27D] font-bold text-xs uppercase"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E2D8C0] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 mx-auto flex items-center justify-center text-amber-700">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#0F172A]">
                No Jewellery Found Matching Filters
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try clearing some of your faceted filters or search terms to explore more of our Chilakalapudi collection.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-full bg-[#064E3B] text-[#FFE27D] font-semibold text-xs shadow"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                gridColumns === 'dense'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                  : 'grid-cols-2 md:grid-cols-3'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
