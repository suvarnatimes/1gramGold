import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, Sparkles, Droplets, Wind, PackageOpen, RefreshCw } from 'lucide-react';

export const CareGuideModal: React.FC = () => {
  const { isCareGuideOpen, setIsCareGuideOpen } = useShop();

  if (!isCareGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0F172A] border border-[#D4AF37]/40 rounded-2xl max-w-xl w-full text-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-gray-800 bg-[#061C14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-xl text-[#FFE27D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Chilakalapudi Gold Care & Longevity Guide
              </h3>
              <p className="text-xs text-[#D4AF37]">
                Proven secrets to keep your 1-Gram micro gold plating shining for 5+ years
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCareGuideOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            aria-label="Close care guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-gray-300">
          <div className="bg-[#1E293B] p-4 rounded-xl border border-gray-700 flex gap-3">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div>
              <h4 className="font-semibold text-[#FFE27D] text-sm mb-1">
                1-Year Manufacturer Plating Guarantee
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Every purchase comes with an authentic Chilakalapudi guarantee card. If your jewellery experiences abnormal discoloration within 12 months, our Machilipatnam factory replaces or re-plates it free of charge.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/60 border border-gray-800">
              <Droplets className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Rule 1: Last Thing On, First Thing Off</p>
                <p className="text-gray-400 mt-0.5">
                  Always spray perfumes, body mists, hairspray, and lotions BEFORE wearing your jewellery. Let chemicals dry completely for 5 minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/60 border border-gray-800">
              <Wind className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Rule 2: Wipe Perspiration After Functions</p>
                <p className="text-gray-400 mt-0.5">
                  After weddings or dance performances, gently wipe the necklace and dori with a dry soft cotton or microfiber cloth to remove sweat and oils before storing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/60 border border-gray-800">
              <PackageOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Rule 3: Store in Airtight Zip-Lock Pouches</p>
                <p className="text-gray-400 mt-0.5">
                  Do not store in velvet boxes (the adhesive fumes in velvet boxes react with gold salts). Store each piece in the individual zip-lock bag provided by Sudheer KT.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/60 border border-gray-800">
              <RefreshCw className="w-5 h-5 text-[#FFE27D] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Factory Re-Plating Service (Lifetime)</p>
                <p className="text-gray-400 mt-0.5">
                  Even after 5 years, if you want your jewellery restored to factory mint condition, simply courier it to our Chilakalapudi workshop. We provide full ultrasonic cleaning and fresh 24kt micro dipping for a nominal fee of ₹200.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0A1220] border-t border-gray-800 flex justify-end">
          <button
            type="button"
            onClick={() => setIsCareGuideOpen(false)}
            className="px-5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#FFE27D] text-[#0F172A] font-bold text-xs transition-colors"
          >
            I Understand, Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
