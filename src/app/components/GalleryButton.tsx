import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  url: string;
  caption?: string;
  credit?: string;
}

interface GalleryButtonProps {
  images: GalleryImage[];
  label?: string;
  theme?: 'light' | 'dark';
  modalVariant?: 'default' | 'feature';
}

export function GalleryButton({
  images,
  label = "Ver galería",
  theme = 'dark',
  modalVariant = 'default',
}: GalleryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFeatureModal = modalVariant === 'feature';

  const openGallery = () => {
    setIsOpen(true);
    setCurrentIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <>
      {/* Gallery Trigger Button */}
      <motion.button
        onClick={openGallery}
        className={`
          group relative inline-flex items-center gap-3 px-6 py-3 
          border backdrop-blur-sm transition-all duration-300
          ${theme === 'dark' 
            ? 'border-white/30 text-white/70 hover:text-white rounded-lg hover:border-white/50 hover:bg-white/5' 
            : 'border-black/20 text-black/70 hover:text-black hover:border-black/50 hover:bg-black/5'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ImageIcon className="w-5 h-5" />
        <span className="text-sm tracking-wide uppercase">{label}</span>
        <motion.div 
          className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ${
            theme === 'dark' ? 'bg-white/50' : 'bg-black/50'
          }`}
        />
      </motion.button>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
            onClick={closeGallery}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <motion.button
              onClick={closeGallery}
              aria-label="Cerrar galería"
              className="fixed top-8 right-8 z-[110] p-3 text-white/70 hover:text-white transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Counter */}
            <motion.div
              className="fixed top-8 left-8 z-[110] text-white/70 text-sm tracking-wider"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentIndex + 1} / {images.length}
            </motion.div>

            {/* Main Gallery Container */}
            <div
              className={`h-full w-full flex items-center justify-center ${
                isFeatureModal ? 'px-3 py-14 md:px-8 md:py-10' : 'p-4 md:p-12'
              }`}
            >
              <div
                className={`relative w-full h-full flex flex-col ${
                  isFeatureModal ? 'max-w-[96vw] max-h-[96vh]' : 'max-w-7xl max-h-[90vh]'
                }`}
              >
                {/* Image Container */}
                <div className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait" custom={currentIndex}>
                    <motion.div
                      key={currentIndex}
                      custom={currentIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={images[currentIndex].url}
                        alt={images[currentIndex].caption || `Imagen ${currentIndex + 1}`}
                        loading="lazy"
                        decoding="async"
                        className={`max-w-full object-contain ${
                          isFeatureModal ? 'max-h-[calc(100vh-12rem)] md:max-h-[calc(100vh-10rem)]' : 'max-h-full'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Caption */}
                {(images[currentIndex].caption || images[currentIndex].credit) && (
                  <motion.div
                    key={`caption-${currentIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={isFeatureModal ? 'mt-3 text-center' : 'mt-6 text-center'}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {images[currentIndex].caption && (
                      <p className="text-white/80 text-sm md:text-base italic max-w-3xl mx-auto leading-relaxed">
                        {images[currentIndex].caption}
                      </p>
                    )}
                    {images[currentIndex].credit && (
                      <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/45">
                        {images[currentIndex].credit}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      aria-label="Imagen anterior"
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/60 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-10 h-10" />
                    </motion.button>

                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      aria-label="Imagen siguiente"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/60 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-10 h-10" />
                    </motion.button>
                  </>
                )}

                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`max-w-full overflow-x-auto overflow-y-hidden pb-2 ${
                      isFeatureModal
                        ? 'mt-4 flex flex-nowrap justify-start gap-1.5 px-1'
                        : 'mt-8 flex flex-wrap justify-center gap-2'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(index);
                        }}
                        aria-label={`Abrir imagen ${index + 1}`}
                        className={`
                          relative shrink-0 overflow-hidden transition-all
                          ${isFeatureModal ? 'h-10 w-14 md:h-12 md:w-16' : 'h-16 w-16 md:h-20 md:w-20'}
                          ${index === currentIndex 
                            ? 'ring-2 ring-white opacity-100' 
                            : 'opacity-40 hover:opacity-70'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={image.url}
                          alt={`Thumbnail ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase"
            >
              Usa las flechas o desliza para navegar • ESC para cerrar
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
