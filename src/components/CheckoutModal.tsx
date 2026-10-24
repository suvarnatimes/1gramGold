import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, calculateFreeShipping, calculateWholesaleDiscount } from '../utils/jewelryLogic';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  QrCode,
  Smartphone,
  Lock,
  ArrowRight,
  MessageCircle,
  Package,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    currency,
    cartSubtotalInINR,
    addToast,
  } = useShop();

  // Form fields
  const [formData, setFormData] = useState({
    fullName: 'Priya Sharma',
    phone: '9848012345',
    email: 'priya.sharma@example.com',
    address: 'Flat 402, Sai Balaji Enclave, Road No. 12, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'phonepe' | 'card' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [savedOrderTotal, setSavedOrderTotal] = useState(0);

  const freeShipping = calculateFreeShipping(cartSubtotalInINR, currency);
  const wholesale = calculateWholesaleDiscount(cartSubtotalInINR);
  const shippingFee = freeShipping.isEligible ? 0 : 150;
  const netTotal = cartSubtotalInINR - wholesale.discountAmount + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const orderTotalToSave = netTotal;

    // Simulate payment gateway authorization
    setTimeout(() => {
      const orderId = `SKT-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackId = `DELHIVERY-SKT-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setConfirmedOrderId(orderId);
      setTrackingNumber(trackId);
      setSavedOrderTotal(orderTotalToSave);
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      addToast('Order Placed Successfully!', `Order ID: ${orderId}`);
    }, 1200);
  };

  const openWhatsAppConfirmation = () => {
    const message = `Hello Sudheer KT Jewellers! I have placed an order on your portal.\n\n*Order ID:* ${confirmedOrderId}\n*Customer:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Delivery Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n*Items:* ${cart.map((c) => `${c.product.title} (x${c.quantity})`).join(', ') || 'Bridal Set'}\n*Payment Mode:* ${paymentMethod.toUpperCase()}\n*Total Amount:* ₹${netTotal.toLocaleString('en-IN')}\n\nPlease confirm dispatch date from Chilakalapudi factory!`;

    window.open(`https://wa.me/919646191111?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] border border-[#D4AF37]/50 rounded-2xl max-w-2xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-800 bg-[#061C14] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-xl text-[#FFE27D]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                {orderComplete ? 'Order Confirmed!' : 'Secure Express Checkout'}
              </h3>
              <p className="text-xs text-[#D4AF37]">
                {orderComplete
                  ? 'Your parcel is being packaged in Chilakalapudi'
                  : '256-Bit Encrypted Payment • Direct Factory Dispatch'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderComplete ? (
          /* Order Confirmation View */
          <div className="p-6 space-y-6 text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold">
                Order Confirmed & Received
              </span>
              <h2 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                Thank You, {formData.fullName}!
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                We have received your order. Your items are undergoing final diamond buffing and 1-year warranty card insertion at our Chilakalapudi workshop.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-[#162032] border border-gray-800 rounded-xl p-4 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-gray-400">Order Reference</span>
                <span className="font-mono font-bold text-[#FFE27D]">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-gray-400">Tracking Number (Delhivery / BlueDart)</span>
                <span className="font-mono text-emerald-400 font-semibold">{trackingNumber}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-gray-400">Delivery Address</span>
                <span className="text-white text-right max-w-xs">
                  {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Paid</span>
                <span className="font-bold text-[#FFE27D] text-sm">
                  {formatPrice(savedOrderTotal, currency)}
                </span>
              </div>
            </div>

            {/* WhatsApp Notification Button */}
            <div className="bg-[#064E3B]/40 border border-[#D4AF37]/30 rounded-xl p-4 space-y-3 text-left">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-[#25D366] shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-xs">
                    Get Instant WhatsApp Order Invoice & Tracking
                  </h4>
                  <p className="text-[11px] text-gray-300">
                    Click below to receive your official GST invoice and courier live dispatch link via WhatsApp.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openWhatsAppConfirmation}
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Receive WhatsApp Invoice & Live Updates</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Step 1: Shipping Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>1. Delivery Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="98480xxxxx"
                    className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 mb-1">Delivery Street Address / Flat / Landmark *</label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-300 mb-1">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Other">Other State / NRI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-[#162032] border border-gray-700 rounded-lg p-2 text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Gateway Selection */}
            <div className="space-y-3 pt-3 border-t border-gray-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>2. Select Payment Gateway</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {/* UPI QR */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#D4AF37] bg-[#064E3B]/40 ring-1 ring-[#D4AF37]'
                      : 'border-gray-800 bg-[#162032] hover:border-gray-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#FFE27D] mb-1" />
                  <div>
                    <p className="font-semibold text-white">Instant UPI</p>
                    <p className="text-[10px] text-gray-400">GPay / Paytm / QR</p>
                  </div>
                </button>

                {/* PhonePe */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('phonepe')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'phonepe'
                      ? 'border-[#D4AF37] bg-[#064E3B]/40 ring-1 ring-[#D4AF37]'
                      : 'border-gray-800 bg-[#162032] hover:border-gray-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-purple-400 mb-1" />
                  <div>
                    <p className="font-semibold text-white">PhonePe</p>
                    <p className="text-[10px] text-gray-400">Fast 1-Click Pay</p>
                  </div>
                </button>

                {/* Cards & NetBanking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#D4AF37] bg-[#064E3B]/40 ring-1 ring-[#D4AF37]'
                      : 'border-gray-800 bg-[#162032] hover:border-gray-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-400 mb-1" />
                  <div>
                    <p className="font-semibold text-white">Cards / EMI</p>
                    <p className="text-[10px] text-gray-400">Debit, Credit, NetBanking</p>
                  </div>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#D4AF37] bg-[#064E3B]/40 ring-1 ring-[#D4AF37]'
                      : 'border-gray-800 bg-[#162032] hover:border-gray-700'
                  }`}
                >
                  <Package className="w-5 h-5 text-emerald-400 mb-1" />
                  <div>
                    <p className="font-semibold text-white">Pay on Delivery</p>
                    <p className="text-[10px] text-gray-400">Verified Pin codes</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Order Summary Line */}
            <div className="bg-[#162032] p-3.5 rounded-xl border border-gray-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Items Subtotal</span>
                <span>{formatPrice(cartSubtotalInINR, currency)}</span>
              </div>
              {wholesale.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Wholesale Discount ({wholesale.discountPercent}%)</span>
                  <span>-{formatPrice(wholesale.discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-300">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee, currency)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-gray-800">
                <span>Payable Amount</span>
                <span className="text-[#FFE27D]">{formatPrice(netTotal, currency)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFE27D] to-[#D4AF37] text-[#0F172A] font-bold text-xs tracking-wider uppercase shadow-xl hover:shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <span>Connecting to Payment Gateway...</span>
              ) : (
                <>
                  <span>Authorize & Pay {formatPrice(netTotal, currency)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> Razorpay & PhonePe Verified
              </span>
              <span>•</span>
              <span>100% Transit Insured</span>
              <span>•</span>
              <span>7-Day Hassle-Free Returns</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
