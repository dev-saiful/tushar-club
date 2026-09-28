import React, { useRef, useState } from 'react';
import { X, CheckCircle2, UserPlus, Sparkles, Download, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { SURJO_TORUN_INFO } from '../data/clubData';
import { ClubLogo } from './ClubLogo';
import ImageUpload from './ImageUpload';
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
    address: 'উত্তর গাজীপুর, মতলব উত্তর, চাঁদপুর',
    reason: 'সামাজিক সেবামূলক কাজ ও তরুণদের সাথে ঐক্যবদ্ধ হয়ে এলাকার উন্নয়নে কাজ করতে চাই।'
  });

  const [submittedCard, setSubmittedCard] = useState<{
    id: string;
    name: string;
    phone: string;
    bloodGroup: string;
    date: string;
    photoUrl: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  // Refs mirror the photo state so a submit that starts mid-upload still sees the URL
  // once the upload finishes (state updates from the upload callback aren't readable
  // inside the already-running submit handler).
  const photoUrlRef = useRef('');
  const uploadingRef = useRef(false);
  const uploadWaiters = useRef<Array<() => void>>([]);

  if (!isOpen) return null;

  const handlePhotoChange = (url: string) => {
    photoUrlRef.current = url;
    setPhotoUrl(url);
  };

  const handlePhotoUploadingChange = (uploading: boolean) => {
    uploadingRef.current = uploading;
    setUploadingPhoto(uploading);
    if (!uploading) {
      uploadWaiters.current.forEach((resolve) => resolve());
      uploadWaiters.current = [];
    }
  };

  // The photo is optional: submit never waits unless an upload is actually in flight.
  const waitForPhotoUpload = () =>
    uploadingRef.current
      ? new Promise<void>((resolve) => {
          uploadWaiters.current.push(resolve);
        })
      : Promise.resolve();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    await waitForPhotoUpload();
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
      photo_url: photoUrlRef.current || null,
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
      date: new Date().toLocaleDateString('bn-BD'),
      photoUrl: photoUrlRef.current,
    });
  };

  const handleClose = () => {
    setSubmittedCard(null);
    photoUrlRef.current = '';
    uploadingRef.current = false;
    uploadWaiters.current = [];
    setPhotoUrl('');
    setUploadingPhoto(false);
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
              <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-br from-[#063b20] to-[#032413] text-white border-2 border-amber-400 shadow-xl relative overflow-hidden text-left">
                {/* Decorative sheen */}
                <div className="pointer-events-none absolute -right-14 -top-14 w-36 h-36 rounded-full bg-amber-400/10" />
                <div className="pointer-events-none absolute -left-16 -bottom-20 w-44 h-44 rounded-full bg-emerald-300/5" />

                {/* Card Header */}
                <div className="relative flex items-center justify-between gap-2 px-4 py-3 bg-black/15 border-b border-amber-400/30">
                  <div className="flex items-center gap-2 min-w-0">
                    <ClubLogo className="w-7 h-9 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-[13px] text-amber-300 leading-tight truncate">
                        {SURJO_TORUN_INFO.nameBn}
                      </h4>
                      <p className="text-[9px] text-emerald-200 truncate">{SURJO_TORUN_INFO.motto}</p>
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded bg-amber-400 text-[#063b20] text-[9px] font-extrabold tracking-wider">
                    MEMBER PASS
                  </span>
                </div>

                {/* Card Body: portrait on the left, details on the right */}
                <div className="relative p-4 flex gap-4">
                  <div className="shrink-0">
                    <div className="w-[86px] h-[108px] rounded-xl overflow-hidden border-2 border-amber-400/70 bg-white/10 shadow-inner">
                      {submittedCard.photoUrl ? (
                        <img
                          src={submittedCard.photoUrl}
                          alt={submittedCard.name}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-1 text-center">
                          <span className="text-2xl font-bold text-amber-300 leading-none">
                            {submittedCard.name.trim().charAt(0) || 'স'}
                          </span>
                          <span className="text-[8px] text-emerald-200/80">ছবি নেই</span>
                        </div>
                      )}
                    </div>
                    <span className="mt-1 block text-center text-[9px] font-bold tracking-wider text-amber-300/90">
                      সদস্য
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-2 text-xs">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-emerald-200/80">
                        সদস্যের নাম
                      </span>
                      <span className="block font-bold text-[15px] leading-tight text-white break-words">
                        {submittedCard.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="min-w-0">
                        <span className="block text-[9px] text-emerald-200/80">আইডি নম্বর</span>
                        <span className="block font-mono font-bold text-[13px] text-amber-300 truncate">
                          {submittedCard.id}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[9px] text-emerald-200/80">রক্তের গ্রুপ</span>
                        <span className="block font-bold text-[13px] text-rose-300">
                          {submittedCard.bloodGroup}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="min-w-0">
                        <span className="block text-[9px] text-emerald-200/80">মোবাইল</span>
                        <span className="block text-[13px] text-white truncate">{submittedCard.phone}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[9px] text-emerald-200/80">ইস্যু তারিখ</span>
                        <span className="block text-[13px] text-white">{submittedCard.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="relative px-4 py-2.5 bg-black/20 border-t border-white/15 flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-[9px] text-emerald-200">
                  <span className="truncate">ঠিকানা: {SURJO_TORUN_INFO.locationBn}</span>
                  <span className="font-bold text-amber-400 whitespace-nowrap">
                    হটলাইন: {SURJO_TORUN_INFO.phone}
                  </span>
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
                  আপনার ছবি{' '}
                  <span className="font-normal text-gray-500">
                    (ঐচ্ছিক — ছবি না দিলেও আবেদন জমা দেওয়া যাবে)
                  </span>
                </label>
                <ImageUpload
                  value={photoUrl}
                  folder="members"
                  variant="light"
                  shape="avatar"
                  onChange={handlePhotoChange}
                  onUploadingChange={handlePhotoUploadingChange}
                />
                <p className="mt-1 text-[11px] text-gray-500">
                  ছবি দিলে তা আপনার ডিজিটাল সদস্য কার্ডে যুক্ত হবে।
                </p>
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
                  placeholder="যেমন: উত্তর গাজীপুর, মতলব উত্তর, চাঁদপুর"
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
                  <span>
                    {submitting
                      ? uploadingPhoto
                        ? 'ছবি আপলোড শেষ হওয়ার অপেক্ষায়...'
                        : 'জমা হচ্ছে...'
                      : 'আবেদন জমা দিন'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
