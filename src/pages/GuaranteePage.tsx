import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CHILAKALAPUDI_STORY } from '../data/craftStory';
import {
  ShieldCheck,
  Award,
  RotateCcw,
  Sparkles,
  Droplets,
  Wind,
  PackageOpen,
  RefreshCw,
  PhoneCall,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

export const GuaranteePage: React.FC = () => {
  const { addToast } = useShop();

  const [replatingForm, setReplatingForm] = useState({
    customerName: '',
    phone: '',
    originalOrderIdOrDate: '',
    itemDetails: '',
    address: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    addToast('Re-plating Request Received!', 'Our Machilipatnam service team will contact you via WhatsApp');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#061C14] via-[#043327] to-[#0A261C] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold text-[#FFE27D]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>The Chilakalapudi Standard of Trust</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold leading-tight">
            1-Year Plating Guarantee & Lifetime Care
          </h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
            Every piece crafted at Sudheer KT in Chilakalapudi, Machilipatnam comes with our registered 1-Year Color & Plating Warranty certificate. Discover how we protect your jewellery investment for generations.
          </p>
        </div>
      </section>

      {/* 3 Pillars of Guarantee */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E2D8C0] p-6 shadow-sm space-y-3">
          <div className="p-3 w-12 h-12 rounded-xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#0F172A]">
            1-Year Color Guarantee
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Covers abnormal tarnishing or discoloration under normal recommended usage. In the rare event of premature color wear, we provide a brand new replacement or re-plating free of charge.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2D8C0] p-6 shadow-sm space-y-3">
          <div className="p-3 w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#A27F19] flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#0F172A]">
            Lifetime Re-Plating Service
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Even 5 or 10 years down the line, restore your cherished wedding jewellery to factory mint brilliance. Courier it to our Chilakalapudi workshop for fresh 24kt micro dipping at a nominal maintenance fee of ₹200.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2D8C0] p-6 shadow-sm space-y-3">
          <div className="p-3 w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#0F172A]">
            7-Day Replacement Policy
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            If your parcel arrives with loose stones, transit damage, or size mismatch, contact us within 7 days. We dispatch a fresh piece immediately via express courier with reverse pickup.
          </p>
        </div>
      </section>

      {/* The 5-Stage Scientific Plating Process */}
      <section className="bg-[#FAF8F3] rounded-3xl p-6 sm:p-10 border border-[#E2D8C0] space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#064E3B] uppercase">
            Metallurgical Process
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#0F172A] mt-1">
            Why Chilakalapudi Gold Covering Lasts
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {CHILAKALAPUDI_STORY.steps.map((st) => (
            <div
              key={st.step}
              className="bg-white p-5 rounded-2xl border border-[#E2D8C0] shadow-sm flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase">
                  Stage 0{st.step}
                </span>
                <h4 className="font-serif-luxury text-base font-bold text-[#0F172A] mt-1">
                  {st.title}
                </h4>
                <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-500 italic">
                {st.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Re-plating Request Form */}
      <section className="bg-white rounded-2xl border border-[#E2D8C0] p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-[#064E3B] uppercase font-bold tracking-wider">
            Factory Workshop Service
          </span>
          <h3 className="font-serif-luxury text-2xl font-bold text-[#0F172A]">
            Request Factory Re-Plating / Warranty Service
          </h3>
          <p className="text-xs text-gray-500">
            Submit your details below. Our Machilipatnam service desk will provide the courier booking address and instructions.
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-serif-luxury text-lg font-bold text-emerald-950">
              Service Request Logged!
            </h4>
            <p className="text-xs text-emerald-800">
              Our service coordinator will message you on WhatsApp ({replatingForm.phone}) with shipping instructions within 2 working hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={replatingForm.customerName}
                  onChange={(e) => setReplatingForm({ ...replatingForm, customerName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#064E3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">WhatsApp Mobile *</label>
                <input
                  type="tel"
                  required
                  placeholder="98480xxxxx"
                  value={replatingForm.phone}
                  onChange={(e) => setReplatingForm({ ...replatingForm, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#064E3B] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Original Order ID or Purchase Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. SKT-249018 or Purchased in Dec 2025"
                  value={replatingForm.originalOrderIdOrDate}
                  onChange={(e) => setReplatingForm({ ...replatingForm, originalOrderIdOrDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#064E3B] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Item Details & Service Required *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Temple Peacock Haram - needs fresh 24kt micro gold dip"
                  value={replatingForm.itemDetails}
                  onChange={(e) => setReplatingForm({ ...replatingForm, itemDetails: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#064E3B] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#064E3B] hover:bg-[#065F46] text-[#FFE27D] font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Submit Service Request
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
