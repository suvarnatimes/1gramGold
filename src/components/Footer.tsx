import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, setIsCareGuideOpen, setIsWholesaleRegisterOpen } = useShop();

  return (
    <footer className="bg-[#09111E] text-white border-t border-[#D4AF37]/30 pt-12 pb-24 lg:pb-12">
      {/* Trust Highlights Row */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#0F1E17] border border-[#D4AF37]/30 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFE27D]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#FFE27D]">1-Year Guarantee</h4>
              <p className="text-[11px] text-gray-300">Replacement warranty card included</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFE27D]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#FFE27D]">Chilakalapudi Craft</h4>
              <p className="text-[11px] text-gray-300">Authentic micro gold electro-deposition</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFE27D]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#FFE27D]">Free Express Shipping</h4>
              <p className="text-[11px] text-gray-300">All India orders above ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFE27D]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#FFE27D]">Lifetime Re-plating</h4>
              <p className="text-[11px] text-gray-300">Factory refresh at nominal ₹200 fee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap Columns */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 text-xs">
        {/* Brand Information */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif-luxury font-bold tracking-wider text-white">
              SUDHEER KT
            </span>
            <span className="bg-[#D4AF37] text-[#0F172A] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
              1 Gram Gold
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed max-w-sm">
            The premier manufacturing house of authentic 1-gram micro gold-plated jewellery in Chilakalapudi, Machilipatnam. Handcrafted to mirror 22kt hallmark bridal gold without the astronomical price tag.
          </p>

          <div className="space-y-2 text-gray-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                Main Road, Opp. Ramalayam Temple, Chilakalapudi, Machilipatnam, Krishna Dist, Andhra Pradesh - 521002
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a href="tel:+919646191111" className="hover:text-[#FFE27D]">
                +91 96461 91111 / +91 8672 254890
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>orders@sudheerktjewels.com</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-serif-luxury text-base font-bold text-[#FFE27D] uppercase tracking-wider">
            Collections
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Harams');
                  setCurrentPage('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#FFE27D] transition-colors"
              >
                Bridal Temple Harams
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Necklaces');
                  setCurrentPage('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#FFE27D] transition-colors"
              >
                Kemp Stone Chokers
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Bangles');
                  setCurrentPage('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#FFE27D] transition-colors"
              >
                Peacock Kada Bangles
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Vaddanams');
                  setCurrentPage('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#FFE27D] transition-colors"
              >
                Ashtalakshmi Vaddanams
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Mangalsutras');
                  setCurrentPage('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#FFE27D] transition-colors"
              >
                Andhra Bottu Nallapusalu
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Chains');
                  setCurrentPage('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#FFE27D] transition-colors"
              >
                Daily Wear Gold Chains
              </button>
            </li>
          </ul>
        </div>

        {/* Resellers & B2B */}
        <div className="space-y-3">
          <h4 className="font-serif-luxury text-base font-bold text-[#FFE27D] uppercase tracking-wider">
            Wholesale & B2B
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('wholesale');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#FFE27D] transition-colors"
              >
                Wholesale Portal
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setIsWholesaleRegisterOpen(true)}
                className="hover:text-[#FFE27D] transition-colors font-medium text-[#D4AF37]"
              >
                Download Price Sheet (PDF)
              </button>
            </li>
            <li>
              <span className="text-gray-400 block">Tier 1: 15% Off (Min ₹15,000)</span>
            </li>
            <li>
              <span className="text-gray-400 block">Tier 2: 25% Off (Min ₹50,000)</span>
            </li>
            <li>
              <a
                href="https://wa.me/919646191111?text=Hello%20Sudheer%20KT,%20I%20want%20wholesale%20reseller%20terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Direct WhatsApp Line
              </a>
            </li>
          </ul>
        </div>

        {/* Guarantee & Support */}
        <div className="space-y-3">
          <h4 className="font-serif-luxury text-base font-bold text-[#FFE27D] uppercase tracking-wider">
            Customer Care
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('guarantee');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#FFE27D] transition-colors"
              >
                1-Year Plating Warranty
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setIsCareGuideOpen(true)}
                className="hover:text-[#FFE27D] transition-colors"
              >
                Maintenance & Care Guide
              </button>
            </li>
            <li>
              <span className="text-gray-400 block">7-Day Transit Replacement</span>
            </li>
            <li>
              <span className="text-gray-400 block">Worldwide NRI Shipping (DHL/FedEx)</span>
            </li>
            <li>
              <span className="text-gray-400 block">GST Compliant Invoices</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-gray-800 text-[11px] text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © 2026 Sudheer KT One Gram Gold. All Rights Reserved. Chilakalapudi, Machilipatnam, Andhra Pradesh.
        </p>
        <p className="flex items-center gap-2">
          <span>Factory Direct Micro Gold Plating Technology</span>
          <span>•</span>
          <span className="text-[#FFE27D]">1,800+ 5-Star Reviews on Google</span>
        </p>
      </div>
    </footer>
  );
};
