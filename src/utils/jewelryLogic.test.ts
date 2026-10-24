import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPrice,
  calculateFreeShipping,
  calculateWholesaleDiscount,
  generateWhatsAppSkuLink,
  calculateBundleTotal,
} from './jewelryLogic';

test('formatPrice correctly formats INR, USD, and AED', () => {
  assert.equal(formatPrice(3499, 'INR'), '₹3,499');
  assert.equal(formatPrice(1000, 'USD'), '$12.00');
  assert.equal(formatPrice(1000, 'AED'), 'AED 44.00');
});

test('calculateFreeShipping threshold works at ₹1,999', () => {
  const below = calculateFreeShipping(1500, 'INR');
  assert.equal(below.isEligible, false);
  assert.equal(below.remainingInINR, 499);
  assert.equal(below.percentage, 75);

  const above = calculateFreeShipping(2500, 'INR');
  assert.equal(above.isEligible, true);
  assert.equal(above.remainingInINR, 0);
  assert.equal(above.percentage, 100);
});

test('calculateWholesaleDiscount applies tiered discounts', () => {
  // Retail (below 15k)
  const retail = calculateWholesaleDiscount(10000);
  assert.equal(retail.discountPercent, 0);
  assert.equal(retail.finalTotal, 10000);
  assert.equal(retail.nextTierShortfall, 5000);

  // Silver (15k - 50k)
  const silver = calculateWholesaleDiscount(20000);
  assert.equal(silver.discountPercent, 15);
  assert.equal(silver.discountAmount, 3000);
  assert.equal(silver.finalTotal, 17000);
  assert.equal(silver.nextTierShortfall, 30000);

  // Gold (50k+)
  const gold = calculateWholesaleDiscount(60000);
  assert.equal(gold.discountPercent, 25);
  assert.equal(gold.discountAmount, 15000);
  assert.equal(gold.finalTotal, 45000);
  assert.equal(gold.nextTierShortfall, 0);
});

test('generateWhatsAppSkuLink contains proper SKU, price and encoded text', () => {
  const link = generateWhatsAppSkuLink({
    sku: 'SKT-HARAM-804',
    title: 'Temple Peacock Bridal Haram',
    priceInINR: 3499,
  });
  assert.ok(link.includes('wa.me/919646191111'));
  assert.ok(link.includes('SKT-HARAM-804'));
  assert.ok(link.includes('%E2%82%B93%2C499') || link.includes('3%2C499'));
});

test('calculateBundleTotal calculates 10% combo savings correctly', () => {
  const bundle = calculateBundleTotal(3000, 1000);
  assert.equal(bundle.originalTotal, 4000);
  assert.equal(bundle.savings, 400);
  assert.equal(bundle.bundlePrice, 3600);
});
