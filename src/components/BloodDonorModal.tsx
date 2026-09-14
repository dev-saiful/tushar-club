import React, { useState } from 'react';
import { X, Droplet, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { SURJO_TORUN_INFO } from '../data/clubData';
import { supabase } from '../lib/supabase';

interface BloodDonorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloodDonorModal: React.FC<BloodDonorModalProps> = ({ isOpen, onClose }) => {
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [donorArea, setDonorArea] = useState('উত্তর গাজীপুর, মতলব উত্তর, চাঁদপুর');
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const { error } = await supabase.from('blood_donor_registrations').insert({
      donor_name: donorName,
      donor_phone: donorPhone,
      blood_group: bloodGroup,
      donor_area: donorArea,
    });
    setSubmitting(false);
    if (error) {
      setSubmitError('নিবন্ধন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      return;
    }
    setRegistered(true);
  };

  const handleClose = () => {
    setRegistered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in font-bangla">
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border-2 border-rose-700 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Droplet className="w-6 h-6 fill-white" />
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-200 block">সূর্যতরুণ ব্লাড ব্যাংক</span>
              <h3 className="font-bold text-base sm:text-lg">স্বেচ্ছাসেবী রক্তদাতা নিবন্ধন</h3>
            </div>
          </div>

          <button onClick={handleClose} className="text-white/80 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {registered ? (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="w-16 h-16 text-rose-600 mx-auto" />
              <h3 className="text-2xl font-bold text-rose-800">
                ধন্যবাদ রক্তযোদ্ধা!
              </h3>
              <p className="text-sm text-gray-700">
                আপনার নাম ও রক্তের গ্রুপ সফলভাবে সূর্যতরুণ ব্লাড ডিরেক্টরিতে যুক্ত হয়েছে। কোনো রোগীর রক্তের প্রয়োজন হলে ক্লাবের রক্তদান সমন্বয় সেল থেকে আপনার সাথে যোগাযোগ করা হবে।
              </p>

              <div className="p-4 bg-rose-50 rounded-xl text-xs text-rose-900 border border-rose-200 text-left space-y-1">
                <div><span className="font-bold">নাম:</span> {donorName}</div>
                <div><span className="font-bold">রক্তের গ্রুপ:</span> {bloodGroup}</div>
                <div><span className="font-bold">মোবাইল:</span> {donorPhone}</div>
                <div><span className="font-bold">এলাকা:</span> {donorArea}</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-rose-700 text-white font-bold text-xs shadow hover:bg-rose-800"
                >
                  ঠিক আছে / সম্পন্ন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-900 border border-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  রক্তের জরুরি প্রয়োজনে সরাসরি ক্লাবের হটলাইনে যোগাযোগ করুন: <a href={`tel:${SURJO_TORUN_INFO.phoneTel}`} className="font-bold underline text-rose-700">{SURJO_TORUN_INFO.phone}</a>
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  রক্তদাতার নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম লিখুন"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-rose-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    রক্তের গ্রুপ *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-rose-600 focus:outline-none font-bold"
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
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01841-......"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-rose-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  বর্তমান অবস্থান / এলাকা *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: উত্তর গাজীপুর, মতলব উত্তর, চাঁদপুর"
                  value={donorArea}
                  onChange={(e) => setDonorArea(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-rose-600 focus:outline-none"
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
                  className="px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <Droplet className="w-4 h-4 fill-white" />
                  <span>{submitting ? 'জমা হচ্ছে...' : 'নিবন্ধন সম্পন্ন করুন'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
