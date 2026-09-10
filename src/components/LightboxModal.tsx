import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle, Columns2, Square } from 'lucide-react';
import { PortfolioItem } from '../types';
import { SITE_CONFIG } from '../data/content';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
}) => {
  // Navigation inside the modal is strictly between the 2 shoot images:
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [showDiptych, setShowDiptych] = useState<boolean>(false);

  // Reset active photo index whenever a new item is selected
  useEffect(() => {
    setActivePhotoIndex(0);
    setShowDiptych(false);
  }, [item?.id]);

  const shootImages = item?.images && item.images.length > 0 ? item.images : (item ? [item.image] : []);
  const totalPhotos = Math.min(shootImages.length, 2);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, totalPhotos]);

  if (!item) return null;

  const handleNextPhoto = () => {
    if (totalPhotos <= 1) return;
    setActivePhotoIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handlePrevPhoto = () => {
    if (totalPhotos <= 1) return;
    setActivePhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleWhatsAppEnquiry = () => {
    const cleanPhone = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

    const message =
      `Hello Melissa,\n\n` +
      `I would like to enquire about this look from your portfolio:\n\n` +
      `*Look / Shoot:* ${item.title} (${item.category})\n` +
      `*Details:* ${item.subtitle}\n` +
      `*Technique:* ${item.technique}\n\n` +
      `Could you please share your package details and availability? Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const currentImage = shootImages[activePhotoIndex] || item.image;

  return (
    <div
      id="portfolio-lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-[#1E0F11]/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF6F1] max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-[#DDD2C5] shadow-[0_25px_70px_rgba(30,15,17,0.35)] flex flex-col lg:flex-row text-[#3E2023]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-30 w-8 h-8 bg-[#FAF6F1]/95 border border-[#DDD2C5] flex items-center justify-center text-[#3E2023] hover:bg-[#3E2023] hover:text-[#F2ECE6] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Visual Stage: Displays ONLY the 2 shoot images */}
        <div className="lg:w-7/12 relative bg-[#1A0C0E] flex flex-col justify-between overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[580px]">
          
          {/* Main Visual Display */}
          <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6">
            {showDiptych && shootImages.length >= 2 ? (
              /* Side-by-Side Diptych View of the 2 images */
              <div className="grid grid-cols-2 gap-2 w-full h-full max-h-[520px]">
                {shootImages.slice(0, 2).map((imgUrl, i) => (
                  <div key={i} className="relative w-full h-full overflow-hidden bg-[#100607] flex items-center justify-center">
                    <img
                      src={imgUrl}
                      alt={`${item.title} - Photo 0${i + 1}`}
                      className="w-full h-full object-contain filter contrast-[1.02]"
                    />
                    <span className="absolute bottom-2 left-2 bg-[#1E0F11]/80 text-[#FAF6F1] text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#4E2C30]/50">
                      Photo 0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              /* Single Focused Photo View */
              <div className="relative w-full h-full flex items-center justify-center max-h-[520px]">
                <img
                  src={currentImage}
                  alt={`${item.title} - Photo 0${activePhotoIndex + 1}`}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[520px] object-contain filter contrast-[1.02] transition-opacity duration-300"
                />

                {/* Left navigation arrow strictly between the 2 shoot images */}
                {totalPhotos > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevPhoto();
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#FAF6F1]/90 backdrop-blur-sm border border-[#DDD2C5] flex items-center justify-center text-[#3E2023] hover:bg-[#3E2023] hover:text-[#FAF6F1] transition-all cursor-pointer shadow-md group"
                    aria-label="Previous shoot photo"
                    title="View Photo 01"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                )}

                {/* Right navigation arrow strictly between the 2 shoot images */}
                {totalPhotos > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextPhoto();
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#FAF6F1]/90 backdrop-blur-sm border border-[#DDD2C5] flex items-center justify-center text-[#3E2023] hover:bg-[#3E2023] hover:text-[#FAF6F1] transition-all cursor-pointer shadow-md group"
                    aria-label="Next shoot photo"
                    title="View Photo 02"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Bottom Shoot Bar: Select between the 2 photos */}
          <div className="bg-[#120708] border-t border-[#30161A] px-4 py-3 flex items-center justify-between z-10">
            {/* Shoot Photo Counter: strictly 01 / 02 or 02 / 02 */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#C29A3A] font-medium">
                {showDiptych
                  ? `Shoot Diptych • Both Photos`
                  : `Photo 0${activePhotoIndex + 1} of 0${totalPhotos}`}
              </span>
            </div>

            {/* Quick 2-Photo Selector & View Mode Switcher */}
            <div className="flex items-center space-x-2">
              {shootImages.slice(0, 2).map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowDiptych(false);
                    setActivePhotoIndex(idx);
                  }}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 text-[9px] uppercase tracking-widest border transition-all cursor-pointer ${
                    !showDiptych && activePhotoIndex === idx
                      ? 'bg-[#FAF6F1] text-[#3E2023] border-[#FAF6F1] font-medium'
                      : 'bg-[#251315]/80 text-[#D8C7B9] border-[#4E2C30] hover:border-[#C29A3A] hover:text-[#FAF6F1]'
                  }`}
                  title={`View Shoot Photo 0${idx + 1}`}
                >
                  <span>Photo 0{idx + 1}</span>
                </button>
              ))}

              {shootImages.length >= 2 && (
                <button
                  onClick={() => setShowDiptych(!showDiptych)}
                  className={`flex items-center space-x-1 px-2.5 py-1 text-[9px] uppercase tracking-widest border transition-all cursor-pointer ${
                    showDiptych
                      ? 'bg-[#C29A3A] text-[#1E0F11] border-[#C29A3A] font-semibold'
                      : 'bg-[#251315]/80 text-[#D8C7B9] border-[#4E2C30] hover:border-[#C29A3A] hover:text-[#FAF6F1]'
                  }`}
                  title="Toggle side-by-side view of both photos"
                >
                  {showDiptych ? (
                    <>
                      <Square className="w-3 h-3" />
                      <span>Single</span>
                    </>
                  ) : (
                    <>
                      <Columns2 className="w-3 h-3" />
                      <span>Both</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Shoot Details Breakdown */}
        <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4 pr-6 sm:pr-8">
            {/* Shoot Category & Year */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.24em] text-[#7A5F62] border-b border-[#E0D6CB] pb-2 leading-normal">
              <span className="font-semibold text-[#3E2023] tracking-[0.28em] bg-[#EAE2D8] px-2.5 py-0.5 border border-[#DDD2C5]">
                {item.category}
              </span>
              <span className="text-[#553E41]">{item.client} • {item.year}</span>
            </div>

            {/* Shoot Title */}
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#3E2023] font-light leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-[#7A5F62] mt-1 font-light">
                {item.subtitle}
              </p>
            </div>

            {/* Technique Details */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#7A5F62] font-medium block">
                Artistry Technique
              </span>
              <p className="font-sans text-xs text-[#3E2023] font-light">
                {item.technique}
              </p>
            </div>

            {/* Products In Kit */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#7A5F62] font-medium block">
                Featured Kit Products
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.keyProducts.map((prod, pIdx) => (
                  <span
                    key={pIdx}
                    className="px-2 py-0.5 bg-[#F2ECE6] border border-[#DDD2C5] text-[10px] text-[#4F3538]"
                  >
                    {prod}
                  </span>
                ))}
              </div>
            </div>

            {/* Shoot Composition Indicator */}
            <div className="p-3 bg-[#F2ECE6] border border-[#DDD2C5] text-[11px] text-[#664D50]">
              <p className="font-light">
                <strong className="font-medium text-[#3E2023]">Shoot Archive:</strong> 2 high-resolution photographic portraits showcasing both front profile radiance and detailed hair styling.
              </p>
            </div>
          </div>

          {/* Book / Enquire Action via WhatsApp */}
          <div className="pt-4 border-t border-[#E0D6CB]">
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-3.5 bg-[#3E2023] text-[#F2ECE6] text-xs uppercase tracking-[0.22em] font-normal hover:bg-[#4E2C30] hover:border-[#C29A3A]/40 border border-[#3E2023] transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-sm group cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#C29A3A] group-hover:scale-110 transition-transform" />
              <span>Enquire About {item.title}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
