import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, calculateFreeShipping, calculateWholesaleDiscount } from '../utils/jewelryLogic';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Building2,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    currency,
    cartSubtotalInINR,
    setIsCheckoutOpen,
    setIsWholesaleRegisterOpen,
    addToast,
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const freeShipping = calculateFreeShipping(cartSubtotalInINR, currency);
  const wholesale = calculateWholesaleDiscount(cartSubtotalInINR);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'CHILAKALAPUDI10' || cleanCode === 'FESTIVAL10') {
      const discount = Math.round(cartSubtotalInINR * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage('Coupon Applied: 10% Festive Savings (₹' + discount + ' Off)');
      addToast('Coupon Applied!', '10% discount added to your order');
    } else if (cleanCode === 'WHOLESALE15') {
      const discount = Math.round(cartSubtotalInINR * 0.15);
      setAppliedDiscount(discount);
      setCouponMessage('Wholesale Reseller Discount: 15% Off');
      addToast('Wholesale Tier Applied', '15% Partner discount activated');
    } else {
      setCouponMessage('Invalid code. Try code "CHILAKALAPUDI10" for 10% off');
    }
  };

  const finalSubtotal = Math.max(
    0,
    cartSubtotalInINR - wholesale.discountAmount - appliedDiscount
  );
  const shippingFee = freeShipping.isEligible || cart.length === 0 ? 0 : 150;
  const grandTotal = finalSubtotal + shippingFee;

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F172A] text-white flex flex-col shadow-2xl border-l border-[#D4AF37]/30">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-800 bg-[#061C14] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FFE27D]" />
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3.5 bg-[#064E3B]/40 border-b border-[#D4AF37]/20">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-[#FFE27D]">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                {freeShipping.isEligible ? (
                  <span>You've Unlocked Free Express Delivery! 🎉</span>
                ) : (
                  <span>
                    Add {formatPrice(freeShipping.remainingInINR, currency)} more for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-gray-300">
                {freeShipping.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#D4AF37] to-[#FFE27D] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShipping.percentage}%` }}
              />
            </div>
          </div>

          {/* Wholesale B2B Tier Callout */}
          <div className="p-3 bg-[#1E293B] border-b border-gray-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div>
                <p className="font-semibold text-gray-200">
                  {wholesale.discountPercent > 0 ? (
                    <span className="text-[#FFE27D]">
                      {wholesale.discountPercent}% Wholesale Applied ({wholesale.tierName})
                    </span>
                  ) : (
                    <span>B2B Reseller Tier: 15% - 25% Off</span>
                  )}
                </p>
                {wholesale.nextTierShortfall > 0 && (
                  <p className="text-[10px] text-gray-400">
                    Add {formatPrice(wholesale.nextTierShortfall, currency)} more to unlock {wholesale.nextTierPercent}% off!
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCartDrawerOpen(false);
                setIsWholesaleRegisterOpen(true);
              }}
              className="text-[10px] underline text-[#FFE27D] shrink-0 font-medium"
            >
              Wholesale Info
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <div className="w-16 h-16 rounded-full bg-gray-800/80 flex items-center justify-center mb-4 text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-white mb-1">
                  Your Bag is Currently Empty
                </h4>
                <p className="text-xs text-gray-400 max-w-xs mb-6">
                  Explore our authentic Chilakalapudi 1-gram micro gold bridal and temple collections.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#0F172A] font-bold text-xs hover:bg-[#FFE27D] transition-colors shadow-lg"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="flex gap-3 bg-[#162032] p-3 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-700 bg-black shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-white truncate font-serif-luxury text-sm">
                          {item.product.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-gray-400 hover:text-red-400 p-0.5"
                          aria-label={`Remove ${item.product.title} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        SKU: {item.product.sku}
                      </p>
                      {item.selectedSize && (
                        <span className="text-[10px] bg-gray-800 text-amber-300 px-1.5 py-0.2 rounded border border-gray-700 mt-1 inline-block">
                          Size: {item.selectedSize}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-800">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-bold text-[#FFE27D]">
                          {formatPrice(item.product.price * item.quantity, currency)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-gray-400">
                            ({formatPrice(item.product.price, currency)} ea)
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                          className="p-1 hover:text-[#FFE27D] text-gray-300"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                          className="p-1 hover:text-[#FFE27D] text-gray-300"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-[#0A1220] border-t border-gray-800 space-y-3">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. CHILAKALAPUDI10)"
                    className="w-full bg-[#162032] border border-gray-700 rounded-lg py-1.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-[#FFE27D] border border-gray-700"
                >
                  Apply
                </button>
              </form>

              {couponMessage && (
                <p className="text-[11px] text-[#FFE27D] bg-[#064E3B]/50 p-1.5 rounded border border-[#D4AF37]/30">
                  {couponMessage}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-gray-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    {formatPrice(cartSubtotalInINR, currency)}
                  </span>
                </div>

                {wholesale.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Wholesale Partner Tier ({wholesale.discountPercent}%)</span>
                    <span>-{formatPrice(wholesale.discountAmount, currency)}</span>
                  </div>
                )}

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#FFE27D]">
                    <span>Festive Coupon Savings</span>
                    <span>-{formatPrice(appliedDiscount, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Shipping
                    {freeShipping.isEligible && (
                      <span className="text-[9px] bg-emerald-900 text-emerald-200 px-1 rounded">
                        FREE
                      </span>
                    )}
                  </span>
                  <span>
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee, currency)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-gray-800">
                  <span className="font-serif-luxury text-base">Grand Total</span>
                  <span className="text-[#FFE27D] text-base font-bold">
                    {formatPrice(grandTotal, currency)}
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>1-Year Plating Warranty Card Included with Box</span>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFE27D] to-[#D4AF37] text-[#0F172A] font-bold text-xs tracking-wider uppercase shadow-xl hover:shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Safe Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
