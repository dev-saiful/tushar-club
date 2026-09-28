import React from "react";
import { Camera, Calendar, Tag } from "lucide-react";
import { useGalleryItems } from "../hooks/useGalleryItems";

/** Mirrors the gallery card, including the caption that sits over the image. */
const GalleryCardSkeleton: React.FC = () => (
  <div className="relative h-60 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />

    <div className="absolute bottom-3 left-3 right-3 space-y-2">
      <div className="h-2.5 w-24 rounded-full bg-gray-300/70 animate-pulse" />
      <div className="h-3.5 w-3/4 rounded-full bg-gray-300/70 animate-pulse" />
    </div>
  </div>
);

const GallerySkeleton: React.FC = () => (
  <div aria-busy="true" aria-live="polite">
    <span className="sr-only">গ্যালারির তথ্য লোড হচ্ছে...</span>
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <GalleryCardSkeleton key={idx} />
      ))}
    </div>
  </div>
);

export const GallerySection: React.FC = () => {
  const { items, loading } = useGalleryItems();
  return (
    <section
      id="gallery"
      className="py-20 bg-[#f8faf8] border-b border-emerald-900/10 font-bangla"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#063b20] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            <span>স্মৃতির অ্যালবাম</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063b20]">
            ক্লাবের বিভিন্ন সামাজিক ও ক্রীড়া উৎসবের চিত্র
          </h2>

          <p className="text-gray-600 text-base">
            উত্তর গাজীপুর সূর্যতরুণ ক্লাবের বিভিন্ন সমাজসেবামূলক ক্যাম্প, ফুটবল
            টুর্নামেন্ট, রক্তদান ও ত্রাণ বিতরণের বাস্তব মুহূর্তসমূহ।
          </p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <GallerySkeleton />
        ) : items.length === 0 ? (
          <p className="mt-12 text-center text-gray-500">
            কোনো গ্যালারি আইটেম পাওয়া যায়নি।
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white"
              >
                <div className="h-60 overflow-hidden bg-gray-100 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 text-[11px] text-amber-300 mb-1">
                      <Tag className="w-3 h-3" />
                      <span>{item.category}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    <h4 className="font-bold text-sm leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
