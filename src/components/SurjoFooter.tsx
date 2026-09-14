import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  ExternalLink, 
  Send, 
  ShieldCheck, 
  Heart, 
  ArrowUp,
  Droplet
} from 'lucide-react';
import { SURJO_TORUN_INFO } from '../data/clubData';
import { ClubLogo } from './ClubLogo';
import { supabase } from '../lib/supabase';

export const SurjoFooter: React.FC = () => {
  const [message, setMessage] = useState({ name: '', phone: '', text: '' });
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');
    const { error } = await supabase.from('contact_messages').insert({
      name: message.name,
      phone: message.phone,
      message: message.text,
    });
    if (error) {
      setSendError('বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।');
      return;
    }
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage({ name: '', phone: '', text: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#032213] text-[#fbfdfb] border-t-4 border-amber-500 font-bangla relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Club Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <ClubLogo className="w-12 h-14" />
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  {SURJO_TORUN_INFO.nameBn}
                </h3>
                <p className="text-xs font-bold text-amber-400">
                  {SURJO_TORUN_INFO.motto}
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed">
              {SURJO_TORUN_INFO.nameBn} একটি সম্পূর্ণ অরাজনৈতিক যুব ও সমাজসেবামূলক সংগঠন। চাঁদপুরের উত্তর গাজীপুর এলাকার শিক্ষা উন্নয়ন, যুব সমাজকে ঐক্যবদ্ধ করা ও মানবিক সেবায় আমরা নিবেদিত।
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 text-amber-300 text-xs font-semibold border border-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{SURJO_TORUN_INFO.nature}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Official Contact & Address (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider border-b border-white/10 pb-2">
              যোগাযোগ ও ঠিকানা
            </h4>

            <div className="space-y-3 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{SURJO_TORUN_INFO.locationBn}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[11px] text-gray-400 block">হটলাইন নম্বর:</span>
                  <a href={`tel:${SURJO_TORUN_INFO.phoneTel}`} className="text-sm font-bold text-white hover:text-amber-300 tracking-wider">
                    {SURJO_TORUN_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{SURJO_TORUN_INFO.email}</span>
              </div>

              {/* Facebook Button */}
              <div className="pt-2">
                <a
                  href={SURJO_TORUN_INFO.fbPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition"
                >
                  <span>অফিসিয়াল ফেসবুক পেজ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Direct Message Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider border-b border-white/10 pb-2">
              ক্লাব সচিবালয়ে বার্তা পাঠান
            </h4>

            <p className="text-xs text-emerald-100/80">
              রক্তের প্রয়োজন, সদস্যপদ বা কোনো সামাজিক সহায়তার বিষয়ে সরাসরি বার্তা লিখুন:
            </p>

            <form onSubmit={handleSendMessage} className="space-y-2.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম"
                  value={message.name}
                  onChange={(e) => setMessage({ ...message, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <input
                  type="tel"
                  required
                  placeholder="মোবাইল নম্বর"
                  value={message.phone}
                  onChange={(e) => setMessage({ ...message, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <textarea
                required
                rows={2}
                placeholder="আপনার বার্তা বা পরামর্শ..."
                value={message.text}
                onChange={(e) => setMessage({ ...message, text: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />

              {sendError && (
                <span className="text-[11px] text-red-400 font-bold">{sendError}</span>
              )}

              <div className="flex items-center justify-between">
                {sent && (
                  <span className="text-[11px] text-amber-300 font-bold">
                    ✓ আপনার বার্তা সফলভাবে পাঠানো হয়েছে!
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#042816] font-extrabold rounded-lg transition flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>বার্তা প্রেরণ</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {SURJO_TORUN_INFO.nameBn} • চাঁদপুর, বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-300">{SURJO_TORUN_INFO.motto}</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-emerald-200 hover:text-white transition font-semibold"
            >
              <span>উপরে যান</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
