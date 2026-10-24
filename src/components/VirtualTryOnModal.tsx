import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/jewelryLogic';
import {
  X,
  Camera,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Sliders,
  CheckCircle2,
  Share2,
} from 'lucide-react';

const MODEL_LOOKS = [
  {
    id: 'bridal-silk',
    name: 'Red Silk Bridal Saree',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    necklineY: 48,
    scale: 75,
  },
  {
    id: 'green-kanjeevaram',
    name: 'Emerald Kanjeevaram',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    necklineY: 50,
    scale: 72,
  },
  {
    id: 'gold-lehenga',
    name: 'Royal Reception Lehenga',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    necklineY: 46,
    scale: 78,
  },
];

export const VirtualTryOnModal: React.FC = () => {
  const { isTryOnOpen, setIsTryOnOpen, selectedProduct, addToCart, currency, addToast } = useShop();

  const [mode, setMode] = useState<'model' | 'camera'>('model');
  const [selectedModel, setSelectedModel] = useState(MODEL_LOOKS[0]);
  const [positionY, setPositionY] = useState(MODEL_LOOKS[0].necklineY);
  const [scale, setScale] = useState(MODEL_LOOKS[0].scale);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(95);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (!isTryOnOpen) {
      stopCamera();
    }
  }, [isTryOnOpen]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access not granted or unavailable. You can use our High-Definition Bridal Models.');
      setMode('model');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const handleModeChange = (newMode: 'model' | 'camera') => {
    setMode(newMode);
    if (newMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  const resetCalibration = () => {
    setPositionY(selectedModel.necklineY);
    setScale(selectedModel.scale);
    setRotation(0);
    setOpacity(95);
  };

  if (!isTryOnOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] border border-[#D4AF37]/50 rounded-2xl max-w-4xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between bg-[#061C14]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-xl text-[#FFE27D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Virtual Neckline & Bridal Try-On Studio</span>
                <span className="text-[10px] bg-[#D4AF37] text-black px-1.5 py-0.5 rounded font-sans uppercase font-bold">
                  AR Preview
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Visualizing <span className="text-[#FFE27D] font-medium">{selectedProduct.title}</span> (SKU: {selectedProduct.sku})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              stopCamera();
              setIsTryOnOpen(false);
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close try-on modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Main Visual Stage (Left / Center) */}
          <div className="md:col-span-7 bg-[#050C16] flex flex-col items-center justify-center p-4 relative min-h-[380px] sm:min-h-[460px] select-none overflow-hidden">
            {/* Viewport Frame */}
            <div className="relative w-full max-w-[360px] aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-inner bg-black">
              {/* Background Model or Live Camera */}
              {mode === 'camera' ? (
                <div className="w-full h-full relative">
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gray-900/90 text-gray-300">
                      <Camera className="w-10 h-10 mb-2 text-[#D4AF37] animate-pulse" />
                      <p className="text-sm font-semibold">Starting camera...</p>
                      <p className="text-xs text-gray-400 mt-1">Please allow camera permissions</p>
                      {cameraError && <p className="text-xs text-red-400 mt-2">{cameraError}</p>}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={selectedModel.image}
                    alt={selectedModel.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-gray-300 border border-gray-700">
                    Model: {selectedModel.name}
                  </div>
                </div>
              )}

              {/* Jewelry Overlay */}
              <div
                className="absolute inset-x-0 pointer-events-none flex items-center justify-center transition-all duration-75"
                style={{
                  top: `${positionY}%`,
                  transform: `translateY(-50%) rotate(${rotation}deg) scale(${scale / 100})`,
                  opacity: opacity / 100,
                }}
              >
                <div className="relative filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.title}
                    className="max-w-[260px] w-full object-contain pointer-events-auto rounded-3xl [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)] shadow-2xl transition-all"
                  />
                  {/* Subtle golden shimmer sparkle */}
                  <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-[#FFE27D] rounded-full blur-[2px] animate-ping opacity-75" />
                </div>
              </div>

              {/* Watermark / Authentic Badge */}
              <div className="absolute top-2 right-2 bg-[#064E3B]/80 backdrop-blur-sm border border-[#D4AF37]/50 px-2 py-0.5 rounded text-[10px] text-[#FFE27D] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                <span>1-Gram Gold Covering</span>
              </div>
            </div>

            {/* Instruction note */}
            <p className="text-[11px] text-gray-400 mt-3 text-center">
              Adjust neckline height and scaling using controls on the right for an exact fit.
            </p>
          </div>

          {/* Controls & Options (Right Sidebar) */}
          <div className="md:col-span-5 p-4 sm:p-5 border-t md:border-t-0 md:border-l border-gray-800 bg-[#0F172A] flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Mode Switcher */}
              <div>
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                  1. Try-On Source
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleModeChange('model')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 border ${
                      mode === 'model'
                        ? 'bg-[#064E3B] text-[#FFE27D] border-[#D4AF37]'
                        : 'bg-gray-800 text-gray-300 border-transparent hover:bg-gray-700'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bridal Models</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeChange('camera')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 border ${
                      mode === 'camera'
                        ? 'bg-[#064E3B] text-[#FFE27D] border-[#D4AF37]'
                        : 'bg-gray-800 text-gray-300 border-transparent hover:bg-gray-700'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Live Camera</span>
                  </button>
                </div>
              </div>

              {/* Model Selectors (if in model mode) */}
              {mode === 'model' && (
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                    2. Choose Attire / Neckline
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {MODEL_LOOKS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedModel(m);
                          setPositionY(m.necklineY);
                          setScale(m.scale);
                        }}
                        className={`p-1.5 rounded-lg border text-left transition-all ${
                          selectedModel.id === m.id
                            ? 'border-[#D4AF37] bg-[#064E3B]/30 ring-1 ring-[#D4AF37]'
                            : 'border-gray-700 bg-gray-800/60 hover:border-gray-500'
                        }`}
                      >
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-full h-14 object-cover rounded mb-1"
                        />
                        <span className="text-[10px] text-gray-200 block truncate font-medium">
                          {m.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AR Calibration Sliders */}
              <div className="bg-[#1E293B]/60 p-3.5 rounded-xl border border-gray-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Neckline Fine Tuning</span>
                  </span>
                  <button
                    type="button"
                    onClick={resetCalibration}
                    className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" /> Reset
                  </button>
                </div>

                {/* Neckline Position (Y) */}
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Neckline Height</span>
                    <span className="font-mono">{positionY}%</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="75"
                    value={positionY}
                    onChange={(e) => setPositionY(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                {/* Size / Scale */}
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Jewelry Scale</span>
                    <span className="font-mono">{scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="110"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                {/* Rotation */}
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Tilt Angle</span>
                    <span className="font-mono">{rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Total Price</p>
                  <p className="text-base font-bold text-[#FFE27D]">
                    {formatPrice(selectedProduct.price, currency)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedProduct, 1);
                    setIsTryOnOpen(false);
                    stopCamera();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFE27D] text-[#0F172A] font-bold text-xs shadow-lg hover:shadow-[#D4AF37]/30 transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Looks Great, Add to Bag</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToast(
                    'Try-On Photo Saved!',
                    'You can share this look with friends and family on WhatsApp'
                  );
                }}
                className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share this Bridal Look</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
