import React, { useState } from 'react';
import { useShop, PageRoute } from '../context/ShopContext';
import { CurrencyCode, CURRENCIES } from '../utils/jewelryLogic';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Phone,
  Sparkles,
  ChevronDown,
  Globe,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setSelectedCategory,
    currency,
    setCurrency,
    cartTotalCount,
    wishlistIds,
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    setIsWholesaleRegisterOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleNavClick = (page: PageRoute, category?: string) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category as any);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('collections');
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] text-white shadow-xl">
      {/* Top Announcement Bar */}
      <div className="bg-[#064E3B] text-[#F7E7A9] text-xs py-1.5 px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="inline-flex items-center gap-1 bg-[#D4AF37]/20 text-[#FFE27D] px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border border-[#D4AF37]/40">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Chilakalapudi Authentic
            </span>
            <span className="hidden sm:inline text-white/90">
              Direct from Machilipatnam Factory • 1-Year Plating Guarantee • 1,800+ 5-Star Reviews
            </span>
            <span className="sm:hidden text-white/90">
              Factory Direct 1-Gram Gold • 1-Yr Warranty
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[#F7E7A9] hover:text-white px-2 py-0.5 rounded border border-[#D4AF37]/30 bg-[#0F172A]/50 transition-colors"
                aria-label="Change Currency"
              >
                <Globe className="w-3 h-3" />
                <span className="font-semibold">{currency}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-[#0F172A] border border-[#D4AF37]/40 rounded shadow-2xl py-1 z-50 text-xs">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#064E3B] transition-colors ${
                        currency === c ? 'text-[#FFE27D] font-bold bg-[#064E3B]/50' : 'text-gray-200'
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-[#D4AF37]">{CURRENCIES[c].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://wa.me/919646191111?text=Hello%20Sudheer%20KT,%20I%20have%20an%20inquiry%20regarding%20jewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <Phone className="w-3 h-3" />
              <span>+91 96461 91111</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Identity / Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer text-center lg:text-left flex flex-col items-center lg:items-start group"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif-luxury font-bold tracking-wider text-white group-hover:text-[#F7E7A9] transition-colors">
              SUDHEER KT
            </span>
            <span className="bg-[#D4AF37] text-[#0F172A] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              1 Gram Gold
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] tracking-[0.2em] text-[#D4AF37] font-medium uppercase">
            Chilakalapudi • Machilipatnam
          </span>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temple harams, kemp chokers, kada bangles..."
              className="w-full bg-[#1E293B] border border-gray-700 focus:border-[#D4AF37] rounded-full py-2 pl-4 pr-10 text-xs text-white placeholder-gray-400 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-[#D4AF37]"
              aria-label="Search items"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="lg:hidden p-2 text-gray-300 hover:text-[#D4AF37]"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wholesale partner button */}
          <button
            type="button"
            onClick={() => handleNavClick('wholesale')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#064E3B]/40 hover:bg-[#064E3B] text-[#F7E7A9] text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Wholesale B2B</span>
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => handleNavClick('wishlist')}
            className="relative p-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
            aria-label={`Wishlist with ${wishlistIds.length} items`}
          >
            <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'text-[#D4AF37] fill-[#D4AF37]' : ''}`} />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D4AF37] text-[#0F172A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#064E3B] hover:bg-[#065F46] border border-[#D4AF37]/40 text-white transition-all shadow-md group"
            aria-label={`Shopping bag with ${cartTotalCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#FFE27D] group-hover:scale-110 transition-transform" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0F172A] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartTotalCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-semibold tracking-wider text-[#F7E7A9]">
              Bag
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search */}
      {isSearchExpanded && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-gray-800 bg-[#0F172A]">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temple jewelry, bangles, harams..."
              className="w-full bg-[#1E293B] border border-[#D4AF37]/40 rounded-full py-2 pl-4 pr-10 text-xs text-white placeholder-gray-400 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-[#D4AF37]"
              aria-label="Submit search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:block border-t border-gray-800 bg-[#061C14]/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8 text-xs font-medium tracking-wider uppercase text-gray-200 py-2.5">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#D4AF37] transition-colors ${
                currentPage === 'home' ? 'text-[#FFE27D] font-bold border-b border-[#D4AF37] pb-1' : ''
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('collections')}
              className={`hover:text-[#D4AF37] transition-colors ${
                currentPage === 'collections' ? 'text-[#FFE27D] font-bold border-b border-[#D4AF37] pb-1' : ''
              }`}
            >
              All Jewellery
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('collections', 'Harams')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Bridal Harams
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('collections', 'Necklaces')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Kemp Chokers
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('collections', 'Bangles')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Kada Bangles
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('collections', 'Vaddanams')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Vaddanams
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('collections', 'Mangalsutras')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Mangalsutras
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('guarantee')}
              className={`hover:text-[#D4AF37] transition-colors flex items-center gap-1 ${
                currentPage === 'guarantee' ? 'text-[#FFE27D] font-bold border-b border-[#D4AF37] pb-1' : ''
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Chilakalapudi Craft & Warranty</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('wholesale')}
              className="text-[11px] text-[#FFE27D] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Reseller Tier Discount: 15% - 25% Off</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-sm bg-[#0F172A] h-full flex flex-col border-r border-[#D4AF37]/30 shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#FFE27D]">Sudheer KT</h3>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider">Chilakalapudi Gold Covering</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-sm">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="w-full text-left py-2 px-3 rounded hover:bg-[#064E3B] text-white flex items-center justify-between"
              >
                <span>Home</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('collections')}
                className="w-full text-left py-2 px-3 rounded hover:bg-[#064E3B] text-white flex items-center justify-between font-semibold text-[#FFE27D]"
              >
                <span>All Collections</span>
              </button>

              <div className="pl-4 space-y-2 border-l-2 border-[#D4AF37]/30 text-xs text-gray-300">
                <button
                  type="button"
                  onClick={() => handleNavClick('collections', 'Harams')}
                  className="block w-full text-left py-1 hover:text-[#FFE27D]"
                >
                  Bridal Harams
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('collections', 'Necklaces')}
                  className="block w-full text-left py-1 hover:text-[#FFE27D]"
                >
                  Kemp Chokers
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('collections', 'Bangles')}
                  className="block w-full text-left py-1 hover:text-[#FFE27D]"
                >
                  Daily Wear Bangles
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('collections', 'Vaddanams')}
                  className="block w-full text-left py-1 hover:text-[#FFE27D]"
                >
                  Bridal Vaddanams
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('collections', 'Mangalsutras')}
                  className="block w-full text-left py-1 hover:text-[#FFE27D]"
                >
                  Nallapusalu Mangalsutras
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('collections', 'Earrings')}
                  className="block w-full text-left py-1 hover:text-[#FFE27D]"
                >
                  Temple Jhumkas
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('collections', 'Chains')}
                  className="block w-full text-left py-1 hover:text-[#FFE27D]"
                >
                  Daily Wear Chains
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('wholesale')}
                className="w-full text-left py-2 px-3 rounded bg-[#064E3B] text-[#FFE27D] font-bold flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> B2B Wholesale Portal
                </span>
                <span className="text-[10px] bg-[#D4AF37] text-black px-1.5 py-0.5 rounded">Bulk</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('wishlist')}
                className="w-full text-left py-2 px-3 rounded hover:bg-[#064E3B] text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#D4AF37]" /> Bridal Wishlist
                </span>
                <span className="text-xs text-[#D4AF37] font-semibold">{wishlistIds.length}</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('guarantee')}
                className="w-full text-left py-2 px-3 rounded hover:bg-[#064E3B] text-white flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>1-Year Plating Guarantee</span>
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-800 text-xs text-gray-400 space-y-3">
              <div className="flex items-center justify-between">
                <span>Select Currency:</span>
                <div className="flex gap-2">
                  {(['INR', 'USD', 'AED'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        currency === c
                          ? 'bg-[#D4AF37] text-[#0F172A]'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/919646191111?text=Hello%20Sudheer%20KT,%20I%20want%20to%20inquire%20about%20jewellery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-center block font-semibold"
              >
                WhatsApp Factory Chat
              </a>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
