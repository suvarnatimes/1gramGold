export type CurrencyCode = 'INR' | 'USD' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier from INR
  freeShippingThreshold: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    rate: 1,
    freeShippingThreshold: 1999,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 0.012, // approx 1 INR = ~0.012 USD
    freeShippingThreshold: 100,
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    rate: 0.044, // approx 1 INR = ~0.044 AED
    freeShippingThreshold: 350,
  },
};

/**
 * Format price in specified currency
 */
export function formatPrice(amountInINR: number, currency: CurrencyCode = 'INR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = amountInINR * config.rate;

  if (currency === 'INR') {
    return `${config.symbol}${converted.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  }
  return `${config.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Calculate free shipping progress and status
 */
export function calculateFreeShipping(subtotalInINR: number, currency: CurrencyCode = 'INR'): {
  isEligible: boolean;
  remainingInINR: number;
  percentage: number;
  thresholdInINR: number;
} {
  const thresholdInINR = CURRENCIES.INR.freeShippingThreshold;
  const isEligible = subtotalInINR >= thresholdInINR;
  const remainingInINR = Math.max(0, thresholdInINR - subtotalInINR);
  const percentage = Math.min(100, Math.round((subtotalInINR / thresholdInINR) * 100));

  return {
    isEligible,
    remainingInINR,
    percentage,
    thresholdInINR,
  };
}

/**
 * Calculate wholesale discount tier based on cart order value in INR
 * - ₹15,000+ = 15% off
 * - ₹50,000+ = 25% off
 */
export function calculateWholesaleDiscount(orderTotalInINR: number): {
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
  tierName: string;
  nextTierShortfall: number;
  nextTierPercent: number;
} {
  if (orderTotalInINR >= 50000) {
    const discountAmount = Math.round(orderTotalInINR * 0.25);
    return {
      discountPercent: 25,
      discountAmount,
      finalTotal: orderTotalInINR - discountAmount,
      tierName: 'Gold Reseller Partner (25% Factory Direct)',
      nextTierShortfall: 0,
      nextTierPercent: 25,
    };
  }

  if (orderTotalInINR >= 15000) {
    const discountAmount = Math.round(orderTotalInINR * 0.15);
    return {
      discountPercent: 15,
      discountAmount,
      finalTotal: orderTotalInINR - discountAmount,
      tierName: 'Silver Reseller Partner (15% Wholesale)',
      nextTierShortfall: 50000 - orderTotalInINR,
      nextTierPercent: 25,
    };
  }

  return {
    discountPercent: 0,
    discountAmount: 0,
    finalTotal: orderTotalInINR,
    tierName: 'Standard Retail (Add ₹' + (15000 - orderTotalInINR).toLocaleString('en-IN') + ' for 15% Wholesale)',
    nextTierShortfall: 15000 - orderTotalInINR,
    nextTierPercent: 15,
  };
}

/**
 * Generate official WhatsApp SKU inquiry link
 */
export function generateWhatsAppSkuLink(params: {
  sku: string;
  title: string;
  priceInINR: number;
  phone?: string;
}): string {
  const phone = params.phone || '919646191111';
  const formattedPrice = `₹${params.priceInINR.toLocaleString('en-IN')}`;
  const message = `Hello Sudheer KT, I am interested in Product SKU: ${params.sku} (${params.title}, Price: ${formattedPrice}). Is it in stock? Please share more live video/photos.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate bridal wishlist share link for WhatsApp
 */
export function generateWishlistShareLink(itemTitles: string[], phone?: string): string {
  const baseMessage = `Hello Sudheer KT, here is my bridal jewellery wishlist from your Chilakalapudi factory:\n\n` +
    itemTitles.map((title, i) => `${i + 1}. ${title}`).join('\n') +
    `\n\nPlease let me know availability and bridal package combo offer!`;
  
  if (phone) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(baseMessage)}`;
  }
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(baseMessage)}`;
}

/**
 * Calculate matching bundle discount (10% off when bought together)
 */
export function calculateBundleTotal(priceA: number, priceB: number): {
  originalTotal: number;
  savings: number;
  bundlePrice: number;
} {
  const originalTotal = priceA + priceB;
  const savings = Math.round(originalTotal * 0.10);
  const bundlePrice = originalTotal - savings;
  return {
    originalTotal,
    savings,
    bundlePrice,
  };
}
