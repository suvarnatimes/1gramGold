import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { CareGuideModal } from './components/CareGuideModal';
import { CheckoutModal } from './components/CheckoutModal';
import { WholesaleModal } from './components/WholesaleModal';

import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WholesalePage } from './pages/WholesalePage';
import { WishlistPage } from './pages/WishlistPage';
import { GuaranteePage } from './pages/GuaranteePage';

import { MessageCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, toasts, removeToast } = useShop();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'collections':
        return <CollectionsPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'wholesale':
        return <WholesalePage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'guarantee':
        return <GuaranteePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#0F172A] selection:bg-[#D4AF37]/30 selection:text-[#064E3B]">
      {/* Header */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1">{renderPage()}</main>

      {/* Footer */}
      <Footer />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <VirtualTryOnModal />
      <CareGuideModal />
      <CheckoutModal />
      <WholesaleModal />

      {/* Floating WhatsApp Quick Factory Desk Button (Bottom Right) */}
      <a
        href="https://wa.me/919646191111?text=Hello%20Sudheer%20KT,%20I%20have%20an%20inquiry%20regarding%20Chilakalapudi%20gold%20jewellery"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 border-2 border-white/60 group"
        aria-label="Direct WhatsApp Factory Inquiry"
        title="Chat on WhatsApp with Sudheer KT"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden group-hover:inline ml-2 text-xs font-bold font-sans pr-1 whitespace-nowrap">
          Chilakalapudi Help Desk
        </span>
      </a>

      {/* Toast Notification Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl shadow-2xl text-white flex items-start gap-3 border transition-all animate-in slide-in-from-right duration-200 ${
              toast.type === 'info'
                ? 'bg-[#0F172A] border-gray-700'
                : toast.type === 'warning'
                ? 'bg-amber-900 border-amber-600'
                : 'bg-[#064E3B] border-[#D4AF37]/50'
            }`}
          >
            {toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 text-[#FFE27D] shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <p className="text-xs font-bold font-serif-luxury">{toast.title}</p>
              {toast.description && (
                <p className="text-[11px] text-gray-200 mt-0.5">{toast.description}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white text-xs p-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
