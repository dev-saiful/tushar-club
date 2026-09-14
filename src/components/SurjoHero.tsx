import React from 'react';
import { 
  Phone, 
  MapPin, 
  Heart, 
  UserPlus, 
  Droplet, 
  BookOpen, 
  Users, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SURJO_TORUN_INFO } from '../data/clubData';
import { ClubLogo } from './ClubLogo';

interface SurjoHeroProps {
  onOpenMembership: () => void;
  onOpenBloodModal: () => void;
  onOpenDonationModal: () => void;
}

export const SurjoHero: React.FC<SurjoHeroProps> = ({
  onOpenMembership,
  onOpenBloodModal,
  onOpenDonationModal
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#042816] via-[#063b20] to-[#021f10] text-white pt-10 pb-20 border-b-4 border-amber-500">
      {/* Subtle Pattern & Sunray Backdrop Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Hero Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 pt-4">
          
          {/* Left Hero Text Block */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            
            {/* Non-Political Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bangla font-semibold shadow-inner">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{SURJO_TORUN_INFO.nature}</span>
              <span className="text-emerald-400">•</span>
              <span className="text-emerald-200">{SURJO_TORUN_INFO.locationBn}</span>
            </div>

            {/* Club Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-bangla text-[#fbfdfb] tracking-tight leading-tight">
                {SURJO_TORUN_INFO.nameBn}
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-bangla text-amber-400 tracking-wide flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{SURJO_TORUN_INFO.motto}</span>
              </p>
            </div>

            {/* Inspiring Statement */}
            <p className="text-emerald-100/90 font-bangla text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              চাঁদপুর মতলবের উত্তর গাজীপুর এলাকার শিক্ষা বিস্তার, যুব সমাজকে ঐক্যবদ্ধ করে ক্রীড়াঙ্গনে সম্পৃক্ত রাখা এবং মানবতার সেবায় জরুরি মানবিক সহায়তার এক অবিচল ঠিকানা।
            </p>

            {/* Contact & Hotline Bar */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-amber-500/30 max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-bangla">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-[#042816] flex items-center justify-center flex-shrink-0 shadow">
                  <Phone className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-emerald-200 block font-medium">ক্লাবের অফিসিয়াল যোগাযোগ ও হটলাইন:</span>
                  <a 
                    href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
                    className="text-lg font-bold text-amber-300 hover:text-white transition tracking-wider"
                  >
                    {SURJO_TORUN_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Facebook Direct Link */}
              <a
                href={SURJO_TORUN_INFO.fbPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow"
              >
                <span>ফেসবুক পেজ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 font-bangla">
              <button
                onClick={onOpenMembership}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#042816] font-extrabold text-sm sm:text-base shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-[#042816]" />
                <span>সদস্য হতে আবেদন করুন</span>
              </button>

              <button
                onClick={onOpenBloodModal}
                className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm sm:text-base shadow-md transition flex items-center gap-2"
              >
                <Droplet className="w-4 h-4 fill-current" />
                <span>জরুরি রক্তদাতা খুঁজুন</span>
              </button>

              <button
                onClick={onOpenDonationModal}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/20 font-semibold text-sm sm:text-base transition flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>তহবিলে অনুদান দিন</span>
              </button>
            </div>

          </div>

          {/* Right Hero: Official Crest Badge Feature */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md border-2 border-amber-400/50 shadow-2xl">
              
              {/* Glowing Aura */}
              <div className="absolute inset-0 rounded-3xl bg-amber-400/10 filter blur-xl pointer-events-none" />

              {/* Official Logo */}
              <div className="relative z-10 flex flex-col items-center">
                <ClubLogo className="w-56 h-64 sm:w-64 sm:h-76" />

                <div className="mt-4 text-center font-bangla">
                  <h3 className="font-bold text-base text-amber-300">
                    {SURJO_TORUN_INFO.nameBn}
                  </h3>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    {SURJO_TORUN_INFO.nature}
                  </p>
                  <p className="text-xs text-gray-300 font-sans mt-0.5">
                    Matlab Uttar, Chandpur, Bangladesh
                  </p>
                </div>
              </div>

            </div>

            {/* Facebook Badge Under Logo */}
            <a
              href={SURJO_TORUN_INFO.fbPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bangla text-emerald-200 hover:text-amber-300 transition flex items-center gap-1.5"
            >
              <span>অফিসিয়াল ফেসবুক পেজের সকল আপডেট দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Live Social Impact Counters */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 font-bangla">
          
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-emerald-500/30 text-center">
            <Droplet className="w-6 h-6 text-rose-400 mx-auto mb-1 fill-rose-400" />
            <div className="text-2xl sm:text-3xl font-extrabold text-white">৫২০+ ব্যাগ</div>
            <span className="text-xs text-emerald-200 font-medium">রক্তদান ও জরুরি সমন্বয়</span>
          </div>

          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-emerald-500/30 text-center">
            <BookOpen className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <div className="text-2xl sm:text-3xl font-extrabold text-white">৩৫০+ জন</div>
            <span className="text-xs text-emerald-200 font-medium">মেধাবী শিক্ষার্থী সহায়তা</span>
          </div>

          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-emerald-500/30 text-center">
            <Heart className="w-6 h-6 text-rose-300 mx-auto mb-1 fill-rose-300" />
            <div className="text-2xl sm:text-3xl font-extrabold text-white">১২০০+ পরিবার</div>
            <span className="text-xs text-emerald-200 font-medium">শীতবস্ত্র ও খাদ্য সামগ্রী</span>
          </div>

          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-emerald-500/30 text-center">
            <Users className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
            <div className="text-2xl sm:text-3xl font-extrabold text-white">১৫০+ তরুণ</div>
            <span className="text-xs text-emerald-200 font-medium">সক্রিয় সমাজকর্মী ও ভলান্টিয়ার</span>
          </div>

        </div>

      </div>
    </section>
  );
};
