import React, { useState } from 'react';
import { X, CheckCircle2, UserPlus, Sparkles, Download, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { SURJO_TORUN_INFO } from '../data/clubData';
import { ClubLogo } from './ClubLogo';
import { supabase } from '../lib/supabase';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    phone: '',
    bloodGroup: 'B+',
    occupation: 'শিক্ষার্থী',
    address: 'উত্তর গাজীপুর, চাঁদপুর',
    reason: 'সামাজিক সেবামূলক কাজ ও তরুণদের সাথে ঐক্যবদ্ধ হয়ে এলাকার উন্নয়নে কাজ করতে চাই।'
  });

  const [submittedCard, setSubmittedCard] = useState<{
    id: string;
    name: string;
    phone: string;
    bloodGroup: string;
    date: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const token = `STC-${Math.floor(1000 + Math.random() * 9000)}`;
    const { error } = await supabase.from('membership_applications').insert({
      full_name: formData.fullName,
      father_name: formData.fatherName,
      phone: formData.phone,
      blood_group: formData.bloodGroup,
      occupation: formData.occupation,
      address: formData.address,
      reason: formData.reason,
      member_id: token,
    });
    setSubmitting(false);
    if (error) {
      setSubmitError('আবেদন জমা দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      return;
    }
    setSubmittedCard({
      id: token,
      name: formData.fullName,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      date: new Date().toLocaleDateString('bn-BD')
    });
  };

  const handleClose = () => {
    setSubmittedCard(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in font-bangla">
      <div className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-800 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#063b20] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <ClubLogo className="w-9 h-11" />
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                {SURJO_TORUN_INFO.nature}
              </span>
              <h3 className="font-bold text-base sm:text-lg text-white">
                সদস্যপদ আবেদন ফরম
              </h3>
            </div>
          </div>

          <button onClick={handleClose} className="text-white/80 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submittedCard ? (
            <div className="text-center space-y-5">
              <CheckCircle2 className="w-16 h-16 text-[#063b20] mx-auto" />
              <div>
                <h3 className="text-2xl font-bold text-[#063b20]">
                  আবেদন সফলভাবে গৃহীত হয়েছে!
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  স্বাগত জানাচ্ছি উত্তর গাজীপুর সূর্যতরুণ পরিবারে। আপনার প্রাথমিক ডিজিটাল সদস্য কার্ডটি নিচে তৈরি করা হলো।
                </p>
              </div>

              {/* Digital Member Card */}
              <div className="max-w-md mx-auto rounded-2xl p-6 bg-gradient-to-br from-[#063b20] to-[#032413] text-white border-2 border-amber-400 shadow-xl relative overflow-hidden text-left space-y-4">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2">
                    <ClubLogo className="w-8 h-10" />
                    <div>
                      <h4 className="font-bold text-sm text-amber-300">{SURJO_TORUN_INFO.nameBn}</h4>
                      <p className="text-[10px] text-emerald-200">{SURJO_TORUN_INFO.motto}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-[#063b20] text-[10px] font-extrabold">
                    MEMBER PASS
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-gray-300 text-[10px] block">সদস্যের নাম:</span>
                    <span className="font-bold text-base text-white">{submittedCard.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-gray-300 text-[10px] block">আইডি নম্বর:</span>
                      <span className="font-mono font-bold text-amber-300">{submittedCard.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-300 text-[10px] block">রক্তের গ্রুপ:</span>
                      <span className="font-bold text-rose-300">{submittedCard.bloodGroup}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300 text-[10px] block">মোবাইল:</span>
                    <span className="text-white">{submittedCard.phone}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-emerald-200">
                  <span>ঠিকানা: {SURJO_TORUN_INFO.locationBn}</span>
                  <span className="font-bold text-amber-400">হটলাইন: {SURJO_TORUN_INFO.phone}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-[#063b20] text-amber-300 font-bold text-xs shadow hover:bg-[#042816]"
                >
                  সম্পন্ন ও বন্ধ করুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-200 leading-relaxed">
                <span className="font-bold">নীতিমালা:</span> উত্তর গাজীপুর সূর্যতরুণ ক্লাব একটি সম্পূর্ণ অরাজনৈতিক স্বেচ্ছাসেবী সংগঠন। এলাকার শিক্ষা, ঐক্য ও মানবতার কল্যাণে কাজ করতে আগ্রহী যেকোনো তরুণ ও ব্যক্তি ক্লাবের সদস্য হতে পারবেন।
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  আপনার পূর্ণ নাম (বাংলায়) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ কামরুল হাসান"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    পিতার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="পিতার নাম লিখুন"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01841-......"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    রক্তের গ্রুপ *
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none"
                  >
                    <option value="A+">A+ (পজিটিভ)</option>
                    <option value="A-">A- (নেগেটিভ)</option>
                    <option value="B+">B+ (পজিটিভ)</option>
                    <option value="B-">B- (নেগেটিভ)</option>
                    <option value="O+">O+ (পজিটিভ)</option>
                    <option value="O-">O- (নেগেটিভ)</option>
                    <option value="AB+">AB+ (পজিটিভ)</option>
                    <option value="AB-">AB- (নেগেটিভ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    পেশা / শিক্ষাগত যোগ্যতা
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: শিক্ষার্থী / শিক্ষক / ব্যবসায়ী"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  বর্তমান ঠিকানা (গ্রাম/এলাকা) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: উত্তর গাজীপুর, চাঁদপুর"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  কেন আপনি ক্লাবে যুক্ত হতে চান?
                </label>
                <textarea
                  rows={2}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 rounded-xl text-xs text-red-800 border border-red-200">
                  {submitError}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#063b20] hover:bg-[#042816] text-[#fef3c7] text-xs font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4 text-amber-400" />
                  <span>{submitting ? 'জমা হচ্ছে...' : 'আবেদন জমা দিন'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
