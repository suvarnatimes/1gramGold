import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/jewelryLogic';
import {
  Building2,
  Download,
  Percent,
  CheckCircle,
  Truck,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  Package,
} from 'lucide-react';

export const WholesalePage: React.FC = () => {
  const { currency, setIsWholesaleRegisterOpen, addToast } = useShop();

  const [simulatedOrderValue, setSimulatedOrderValue] = useState<number>(35000);

  const calculateSimulator = (val: number) => {
    let discountPct = 0;
    if (val >= 50000) discountPct = 25;
    else if (val >= 15000) discountPct = 15;

    const discountAmount = Math.round((val * discountPct) / 100);
    const finalAmount = val - discountAmount;
    const estResellerProfit = Math.round(val * 0.45); // typical 40-50% boutique retail markup

    return { discountPct, discountAmount, finalAmount, estResellerProfit };
  };

  const simResult = calculateSimulator(simulatedOrderValue);

  const handleDownloadSheet = () => {
    const textData = `SUDHEER KT ONE GRAM GOLD - B2B WHOLESALE PRICING SHEET (CHILAKALAPUDI)
====================================================================================
Factory Location: Main Road, Chilakalapudi, Machilipatnam, Krishna Dist, AP - 521002
Phone/WhatsApp: +91 96461 91111 | Email: wholesale@sudheerktjewels.com
Date Generated: ${new Date().toLocaleDateString()}

TIER SUMMARY:
- Tier 1: 15% Instant Discount on orders ₹15,000 to ₹49,999 (MOQ ₹15,000)
- Tier 2: 25% Factory Direct Discount on orders ₹50,000+ (MOQ ₹50,000)

FULL INVENTORY WHOLESALE PRICE LIST:
------------------------------------------------------------------------------------
SKU            ITEM NAME                                RETAIL      15% TIER    25% TIER
SKT-HARAM-804  Temple Peacock Bridal Haram (88g)        ₹3,499      ₹2,974      ₹2,624
SKT-NECK-102   Kemp Stone Floral Choker (46g)           ₹1,899      ₹1,614      ₹1,424
SKT-BANG-305   Peacock Kada Screw Bangles (Pair, 52g)   ₹1,499      ₹1,274      ₹1,124
SKT-EARR-409   Grand Temple Kemp Jhumkas (28g)          ₹999        ₹849        ₹749
SKT-VADD-512   Ashtalakshmi Bridal Vaddanam (145g)      ₹4,999      ₹4,249      ₹3,749
SKT-MANG-601   Andhra Bottu Nallapusalu (22g)           ₹1,299      ₹1,104      ₹974
SKT-CHAI-702   Mugappu Gundu Chain (30g)                ₹899        ₹764        ₹674
SKT-NECK-108   Nakshi Matte Peacock Collar (64g)        ₹2,799      ₹2,379      ₹2,099
SKT-BANG-312   Rose Gold Diamond Bangles 4pc (48g)      ₹1,999      ₹1,699      ₹1,499
SKT-HARAM-819  Guttapusalu Pearl Cluster Haram (96g)    ₹4,299      ₹3,654      ₹3,224
SKT-CHAI-715   Daily Wear Thali Rope Chain (18g)        ₹799        ₹679        ₹599
SKT-VADD-520   Peacock Filigree Slim Ottiyanam (62g)    ₹2,499      ₹2,124      ₹1,874
------------------------------------------------------------------------------------
Notes:
* All pieces come with individual 1-Year Guarantee certificates for your retail customers.
* Free insured express shipping across India via BlueDart / Delhivery.
`;
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sudheer_KT_Wholesale_Price_Sheet_2026.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Wholesale Sheet Downloaded', 'Price sheet downloaded to your device');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#061C14] via-[#043327] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold text-[#FFE27D]">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Factory Direct Reseller & Boutique Portal</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold leading-tight">
            Chilakalapudi B2B Wholesale Jewellery Hub
          </h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
            Are you a jewelry boutique owner, bridal makeup artist, or online reseller in Andhra Pradesh, Telangana, Karnataka, or Tamil Nadu? Partner directly with Sudheer KT One Gram Gold.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsWholesaleRegisterOpen(true)}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE27D] to-[#D4AF37] text-[#0F172A] font-bold text-xs uppercase tracking-wider shadow-xl hover:shadow-[#D4AF37]/40 transition-all"
            >
              Register Reseller Boutique
            </button>

            <button
              type="button"
              onClick={handleDownloadSheet}
              className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-[#FFE27D]" />
              <span>Download 2026 Price Sheet</span>
            </button>
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="hidden lg:block absolute -right-6 -bottom-6 text-white/5 pointer-events-none">
          <Building2 className="w-80 h-80" />
        </div>
      </section>

      {/* Tier Explanation Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#064E3B] uppercase">
            Transparent Factory Slabs
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#0F172A] mt-1">
            Wholesale Pricing & MOQ Tiers
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1: Retail Sample */}
          <div className="bg-white rounded-2xl border border-[#E2D8C0] p-6 shadow-sm space-y-4">
            <span className="text-xs font-mono text-gray-500 uppercase">Starter Tier</span>
            <h3 className="font-serif-luxury text-xl font-bold text-[#0F172A]">
              Retail / Sample Order
            </h3>
            <p className="text-2xl font-bold text-gray-800">Standard Pricing</p>
            <p className="text-xs text-gray-600">
              Ideal for new boutiques wishing to test our Chilakalapudi 1-gram gold quality before committing to bulk.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 pt-2 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>No Minimum Order Quantity</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>1-Year Plating Guarantee Card</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Free delivery on orders ₹1,999+</span>
              </li>
            </ul>
          </div>

          {/* Tier 2: Silver Wholesale (15%) */}
          <div className="bg-[#FAF8F3] rounded-2xl border-2 border-[#D4AF37] p-6 shadow-md space-y-4 relative">
            <div className="absolute top-3 right-3 bg-[#064E3B] text-[#FFE27D] text-[10px] font-bold px-2 py-0.5 rounded">
              POPULAR BOUTIQUE SLAB
            </div>
            <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold">
              Silver Partner
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-[#0F172A]">
              15% Flat Wholesale
            </h3>
            <p className="text-2xl font-bold text-[#064E3B]">Min Order: ₹15,000</p>
            <p className="text-xs text-gray-600">
              Tailored for local jewellery shops and bridal boutiques in cities like Vijayawada, Guntur, and Vizag.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>15% Off automatically applied at cart</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Free Express Air Courier Delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Unbranded luxury gift boxes for resale</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>High-res photo pack for your Instagram</span>
              </li>
            </ul>
          </div>

          {/* Tier 3: Gold Wholesale (25%) */}
          <div className="bg-[#061C14] text-white rounded-2xl border-2 border-[#FFE27D] p-6 shadow-xl space-y-4">
            <span className="text-xs font-mono text-[#FFE27D] uppercase font-bold">
              Gold Distributor
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              25% Factory Direct
            </h3>
            <p className="text-2xl font-bold text-[#FFE27D]">Min Order: ₹50,000</p>
            <p className="text-xs text-gray-300">
              Direct workshop pricing for high-volume regional wholesalers, chain stores, and NRI bridal exporters.
            </p>
            <ul className="space-y-2 text-xs text-gray-200 pt-2 border-t border-gray-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FFE27D]" />
                <span>25% Flat Factory Slab</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FFE27D]" />
                <span>Priority production & custom length doris</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FFE27D]" />
                <span>Dedicated B2B Relationship Manager</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FFE27D]" />
                <span>Full GST credit input invoices</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Reseller Profit & Discount Simulator */}
      <section className="bg-white rounded-2xl border border-[#E2D8C0] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <span className="text-[10px] text-[#064E3B] uppercase font-bold tracking-wider">
              Interactive B2B Calculator
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#0F172A]">
              Simulate Your Wholesale Profit Margins
            </h3>
          </div>
          <span className="text-xs text-gray-500">
            Slide the cart value to preview tier discounts & expected boutique retail profits.
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center text-sm font-bold text-gray-800 mb-2">
              <span>Simulated Order Value (Retail MSRP):</span>
              <span className="text-lg text-[#064E3B]">₹{simulatedOrderValue.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="150000"
              step="5000"
              value={simulatedOrderValue}
              onChange={(e) => setSimulatedOrderValue(Number(e.target.value))}
              className="w-full accent-[#064E3B] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>₹10,000 (Min Retail)</span>
              <span>₹15,000 (15% Slab)</span>
              <span>₹50,000 (25% Slab)</span>
              <span>₹1,50,000+ (Distributor)</span>
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#FAF8F3] rounded-xl border border-[#E2D8C0]">
            <div>
              <p className="text-[11px] text-gray-500">Tier Discount</p>
              <p className="text-xl font-bold text-[#064E3B] mt-0.5">
                {simResult.discountPct}% Off
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">Factory Discount Amount</p>
              <p className="text-xl font-bold text-emerald-700 mt-0.5">
                ₹{simResult.discountAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">Your Net Payable to Factory</p>
              <p className="text-xl font-bold text-[#0F172A] mt-0.5">
                ₹{simResult.finalAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">Estimated Boutique Resale Profit</p>
              <p className="text-xl font-bold text-[#D4AF37] mt-0.5">
                ~₹{simResult.estResellerProfit.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact with Factory Manager */}
      <section className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 text-white border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
            Need Custom Bridal Orders or Special Requirements?
          </h3>
          <p className="text-xs text-gray-300 max-w-lg">
            We offer custom length doris, customized kemp gemstone colour-ways, and bulk bridal trousseau packaging.
          </p>
        </div>

        <a
          href="https://wa.me/919646191111?text=Hello%20Sudheer%20KT,%20I%20want%20to%20discuss%20a%20bulk%20wholesale%20reseller%20order"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Speak with Srikanth (Wholesale Lead)</span>
        </a>
      </section>
    </div>
  );
};
