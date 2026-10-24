import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ResellerFormData } from '../types/jewelry';
import {
  X,
  Building2,
  Download,
  CheckCircle,
  FileText,
  Percent,
  Sparkles,
  PhoneCall,
} from 'lucide-react';

export const WholesaleModal: React.FC = () => {
  const { isWholesaleRegisterOpen, setIsWholesaleRegisterOpen, addToast } = useShop();

  const [formData, setFormData] = useState<ResellerFormData>({
    fullName: '',
    storeName: '',
    city: '',
    state: 'Andhra Pradesh',
    whatsappNumber: '',
    email: '',
    gstin: '',
    resellerType: 'Boutique Owner',
    estimatedMonthlyVolume: '₹25,000 - ₹50,000',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast(
      'Wholesale Partner Account Approved!',
      'Factory price catalog & reseller tier activated'
    );
  };

  const handleDownloadCatalog = () => {
    // Generate simple text download simulation of wholesale price sheet
    const content = `SUDHEER KT ONE GRAM GOLD - FACTORY WHOLESALE PRICE SHEET (CHILAKALAPUDI, MACHILIPATNAM)
-------------------------------------------------------------------------------------
Registered Partner: ${formData.storeName || 'Boutique Partner'} (${formData.city || 'AP/Telangana'})
WhatsApp Contact: ${formData.whatsappNumber || 'N/A'}
Date: ${new Date().toLocaleDateString()}

TIER DISCOUNTS:
- MOQ ₹15,000+: 15% Flat Discount
- MOQ ₹50,000+: 25% Flat Discount (Direct Factory Rate)

PRODUCT CATALOG HIGHLIGHTS:
1. SKU: SKT-HARAM-804 | Temple Peacock Haram | Retail: ₹3,499 | Wholesale: ₹2,624 (25% off)
2. SKU: SKT-NECK-102  | Kemp Stone Floral Choker | Retail: ₹1,899 | Wholesale: ₹1,424
3. SKU: SKT-BANG-305  | Peacock Kada Screw Bangles | Retail: ₹1,499 | Wholesale: ₹1,124
4. SKU: SKT-VADD-512  | Ashtalakshmi Vaddanam | Retail: ₹4,999 | Wholesale: ₹3,749
5. SKU: SKT-MANG-601  | Andhra Bottu Nallapusalu | Retail: ₹1,299 | Wholesale: ₹974

FACTORY CONTACT:
Sudheer KT Fashions, Main Road, Chilakalapudi, Machilipatnam, Krishna Dist, AP - 521002.
Phone / WhatsApp: +91 96461 91111 | Email: wholesale@sudheerktjewels.com
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sudheer_KT_Wholesale_Catalog_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Catalog Downloaded', 'Sudheer KT Wholesale Rate Sheet saved to your device');
  };

  if (!isWholesaleRegisterOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] border border-[#D4AF37]/50 rounded-2xl max-w-xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-800 bg-[#061C14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-xl text-[#FFE27D]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                B2B Wholesale & Reseller Registration
              </h3>
              <p className="text-xs text-[#D4AF37]">
                Factory Direct Pricing for Boutiques across Andhra, Telangana, Karnataka & TN
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsWholesaleRegisterOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            aria-label="Close wholesale modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation & 1-Click Catalog Download */
          <div className="p-6 text-center space-y-5 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold">
                Partner Account Activated
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                Welcome, {formData.storeName || formData.fullName}!
              </h3>
              <p className="text-xs text-gray-300 mt-2 max-w-md mx-auto">
                You are now eligible for factory-direct wholesale discounts (15% on orders ₹15,000+ and 25% on orders ₹50,000+).
              </p>
            </div>

            {/* Download PDF / Price sheet CTA */}
            <div className="bg-[#162032] border border-gray-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#FFE27D]">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <span>2026 Chilakalapudi Wholesale Price Sheet</span>
              </div>
              <p className="text-xs text-gray-400">
                Contains full 120+ SKU inventory with wholesale margins, gross weight, and plating thickness data.
              </p>
              <button
                type="button"
                onClick={handleDownloadCatalog}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFE27D] text-[#0F172A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>1-Click Download Wholesale Price Sheet</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <a
                href="https://wa.me/919646191111?text=Hello%20Sudheer%20KT,%20I%20have%20registered%20as%20a%20B2B%20reseller."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Chat with Wholesale Manager</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsWholesaleRegisterOpen(false)}
              className="text-xs text-gray-400 hover:text-white underline"
            >
              Close and Browse Catalog
            </button>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto text-xs">
            {/* Wholesale Benefits */}
            <div className="grid grid-cols-2 gap-2 bg-[#162032] p-3 rounded-xl border border-gray-800">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <p className="font-bold text-white text-[11px]">15% Off on ₹15,000+</p>
                  <p className="text-[10px] text-gray-400">Starter Boutique Tier</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFE27D]" />
                <div>
                  <p className="font-bold text-white text-[11px]">25% Off on ₹50,000+</p>
                  <p className="text-[10px] text-gray-400">Super Distributor Tier</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Store / Boutique Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sri Balaji Fashions"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">WhatsApp Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="98480xxxxx"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">City / Town *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Guntur / Vijayawada"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Business Type</label>
                <select
                  value={formData.resellerType}
                  onChange={(e) => setFormData({ ...formData, resellerType: e.target.value as any })}
                  className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="Boutique Owner">Jewellery Boutique Owner</option>
                  <option value="Online Reseller">Instagram / WhatsApp Reseller</option>
                  <option value="Wholesale Distributor">Regional Wholesale Distributor</option>
                  <option value="Bridal Makeup Artist">Bridal Makeup Artist</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">GSTIN Number (Optional)</label>
                <input
                  type="text"
                  placeholder="37AAAAA0000A1Z5"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none uppercase font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFE27D] to-[#D4AF37] text-[#0F172A] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
            >
              Register & Download Wholesale Price Sheet
            </button>

            <p className="text-[10px] text-gray-400 text-center">
              Chilakalapudi Factory Direct • No Middlemen Margins • Real 24Kt Micro Coating
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
