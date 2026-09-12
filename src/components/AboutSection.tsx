import React from 'react';
import { ShieldCheck, Heart, Users, BookOpen, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import { SURJO_TORUN_INFO } from '../data/clubData';
import { ClubLogo } from './ClubLogo';

interface AboutSectionProps {
  onOpenMembership: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenMembership }) => {
  return (
    <section id="about" className="py-20 bg-white border-b border-emerald-900/10 font-bangla">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#f2f7f4] to-white border-2 border-emerald-800/20 shadow-xl max-w-md w-full text-center">
              
              <div className="mx-auto flex items-center justify-center mb-4">
                <ClubLogo className="w-36 h-44" />
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-xl text-[#063b20]">
                  {SURJO_TORUN_INFO.nameBn}
                </h3>
                <p className="text-xs font-bold text-amber-600">
                  {SURJO_TORUN_INFO.motto}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-[#063b20] text-xs font-semibold">
                    {SURJO_TORUN_INFO.nature}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-1">
                <div className="flex items-center justify-center gap-1.5 font-medium text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{SURJO_TORUN_INFO.locationBn}</span>
                </div>
                <div>হটলাইন: <strong className="text-[#063b20]">{SURJO_TORUN_INFO.phone}</strong></div>
              </div>

            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#063b20] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>আমাদের পরিচিতি ও লক্ষ্য</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063b20] leading-tight">
              চাঁদপুরের উত্তর গাজীপুর গ্রামীণ জনপদে সেবার এক অনন্য বাতিঘর
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              উত্তর গাজীপুর সূর্যতরুণ ক্লাব সম্পূর্ণ অরাজনৈতিক, সামাজিক ও যুব কল্যাণমূলক একটি আদর্শ সংগঠন। চাঁদপুর জেলার উত্তর গাজীপুর এলাকার তরুণ সমাজকে ঐক্যবদ্ধ করে দেশপ্রেম, মানবতাবোধ এবং শিক্ষার আলো ছড়িয়ে দেওয়াই আমাদের মূল অঙ্গীকার।
            </p>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#063b20]">সম্পূর্ণ অরাজনৈতিক সামাজিক দর্শন:</strong> যেকোনো রাজনৈতিক মতাদর্শের ঊর্ধ্বে উঠে শুধুমাত্র মানবিক সেবা, গ্রামীণ উন্নয়ন ও যুবকল্যাণে ক্লাব কাজ করে।
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#063b20]">যুব সমাজের নৈতিক ও শারীরিক বিকাশ:</strong> তরুণদের মাদক, জুয়া ও অনৈতিক আসক্তি থেকে দূরে রেখে খেলাধুলা, বিতর্ক ও সৃজনশীল কর্মকাণ্ডে সম্পৃক্ত রাখা।
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#063b20]">২৪ ঘণ্টা জরুরি রক্তদান ও মানবিক সহায়তা:</strong> চাঁদপুরের যেকোনো অসহায় পরিবারের পাশে চিকিৎসা, শীতবস্ত্র ও খাদ্য সামগ্রী নিয়ে দাঁড়ানো।
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenMembership}
                className="px-6 py-3 rounded-xl bg-[#063b20] hover:bg-[#042816] text-[#fef3c7] font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>আমাদের সাথে যুক্ত হোন</span>
              </button>

              <a
                href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
                className="px-5 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#063b20] font-bold text-sm transition"
              >
                হটলাইন: {SURJO_TORUN_INFO.phone}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
