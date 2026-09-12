import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Heart, 
  UserPlus, 
  Share2, 
  Shield, 
  Droplet,
  ExternalLink
} from 'lucide-react';
import { SURJO_TORUN_INFO } from '../data/clubData';
import { ClubLogo } from './ClubLogo';

interface SurjoNavbarProps {
  onOpenMembership: () => void;
  onOpenBloodModal: () => void;
  onOpenDonationModal: () => void;
}

export const SurjoNavbar: React.FC<SurjoNavbarProps> = ({
  onOpenMembership,
  onOpenBloodModal,
  onOpenDonationModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "আমাদের সম্পর্কে" },
    { href: "#pillars", label: "মূলনীতি" },
    { href: "#projects", label: "সামাজিক কার্যক্রম" },
    { href: "#blood-network", label: "রক্তদান সেবা" },
    { href: "#committee", label: "কমিটি ও পরিষদ" },
    { href: "#gallery", label: "ফটো গ্যালারি" },
    { href: "#contact", label: "যোগাযোগ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification & Hotline Strip */}
      <div className="bg-[#052e16] text-[#fef3c7] py-1.5 px-4 sm:px-8 text-xs font-bangla border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          
          {/* Organization Type & Location */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-amber-300 font-medium text-[11px]">
              <Shield className="w-3 h-3 text-amber-400" />
              <span>{SURJO_TORUN_INFO.nature}</span>
            </span>
            <span className="hidden sm:inline text-emerald-200/80">|</span>
            <div className="hidden sm:flex items-center gap-1 text-emerald-100/90 text-[11px]">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{SURJO_TORUN_INFO.locationBn}</span>
            </div>
          </div>

          {/* Quick Actions: Direct Hotline & Facebook Link */}
          <div className="flex items-center gap-3 ml-auto text-[11px]">
            {/* Direct Hotline */}
            <a
              href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-[#052e16] font-bold hover:bg-amber-300 hover:shadow-sm transition-all duration-200 ease-out shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-1 active:scale-[0.97]"
              title="হটলাইনে সরাসরি কল করুন"
            >
              <Phone className="w-3 h-3 fill-current" />
              <span>কল: {SURJO_TORUN_INFO.phone}</span>
            </a>

            {/* Official Facebook Page */}
            <a
              href={SURJO_TORUN_INFO.fbPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xs:flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-600 hover:bg-blue-500 hover:shadow-sm text-white font-semibold transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-1 active:scale-[0.97]"
              title="অফিসিয়াল ফেসবুক পেজ ভিজিট করুন"
            >
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>

      {/* Main Prestigious Navbar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-emerald-900/10' 
            : 'bg-white py-3.5 border-b border-emerald-900/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group text-left">
            <div className="flex-shrink-0">
              <ClubLogo className="w-11 h-13 sm:w-13 sm:h-15 group-hover:scale-105 transition-transform" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bangla font-extrabold text-base sm:text-xl tracking-tight text-[#063b20] group-hover:text-amber-600 transition-colors">
                  {SURJO_TORUN_INFO.nameBn}
                </span>
              </div>
              <p className="text-[12px] sm:text-[13px] font-bangla font-bold text-amber-600 -mt-0.5 flex items-center gap-2">
                <span>{SURJO_TORUN_INFO.motto}</span>
                <span className="text-gray-400 hidden md:inline">• {SURJO_TORUN_INFO.locationBn}</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 font-bangla text-sm font-semibold text-[#132a1c]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#063b20] hover:border-b-2 hover:border-amber-500 py-1 transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:text-[#063b20] focus-visible:border-b-2 focus-visible:border-amber-500"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenBloodModal}
              className="px-3.5 py-2 text-xs font-bold font-bangla text-rose-700 bg-rose-50 hover:bg-rose-100 hover:shadow-sm border border-rose-200 rounded-lg transition-all duration-200 ease-out flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-1 active:scale-[0.97]"
            >
              <Droplet className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>জরুরি রক্তদান</span>
            </button>

            <button
              onClick={onOpenMembership}
              className="px-4 py-2 text-xs font-bold font-bangla bg-[#063b20] hover:bg-[#042816] hover:shadow-md text-[#fef3c7] rounded-lg shadow-sm border border-amber-500/40 transition-all duration-200 ease-out flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 active:scale-[0.97]"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-400" />
              <span>সদস্য হন</span>
            </button>

            <button
              onClick={onOpenDonationModal}
              className="px-3.5 py-2 text-xs font-bold font-bangla bg-amber-500 hover:bg-amber-600 hover:shadow-md text-[#052e16] rounded-lg shadow-sm transition-all duration-200 ease-out flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 active:scale-[0.97]"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>অনুদান</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-[#063b20] hover:bg-emerald-50 hover:shadow-sm rounded-lg transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 active:scale-95"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbfdfb] border-b-2 border-emerald-800/30 shadow-xl px-6 py-6 font-bangla">
          <div className="flex flex-col space-y-3 font-semibold text-[#132a1c]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-emerald-100/50 hover:text-[#063b20] flex items-center justify-between transition-all duration-200 ease-out cursor-pointer active:bg-emerald-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1"
              >
                <span>{link.label}</span>
                <span className="text-amber-500 text-xs">›</span>
              </a>
            ))}

            <div className="pt-4 border-t border-gray-200 flex flex-col gap-2.5">
              <a
                href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
                className="w-full py-3 px-4 bg-amber-400 text-[#052e16] font-bold rounded-lg flex items-center justify-center gap-2 text-xs shadow-sm hover:bg-amber-300 hover:shadow-md transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>সরাসরি কল করুন: {SURJO_TORUN_INFO.phone}</span>
              </a>

              <a
                href={SURJO_TORUN_INFO.fbPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 text-xs hover:bg-blue-500 hover:shadow-md transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 active:scale-[0.98]"
              >
                <span>অফিসিয়াল ফেসবুক পেজে যুক্ত হোন</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBloodModal();
                  }}
                  className="py-3 px-3 bg-rose-100 text-rose-800 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 hover:bg-rose-200 hover:shadow-sm transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-1 active:scale-[0.97]"
                >
                  <Droplet className="w-3.5 h-3.5 fill-current" />
                  <span>রক্তের আবেদন</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMembership();
                  }}
                  className="py-3 px-3 bg-[#063b20] text-[#fef3c7] font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 hover:bg-[#042816] hover:shadow-md transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 active:scale-[0.97]"
                >
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                  <span>সদস্য নিবন্ধন</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
