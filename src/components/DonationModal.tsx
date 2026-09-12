import React, { useState } from 'react';
import { X, Heart, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';
import { SURJO_TORUN_INFO } from '../data/clubData';
import { ClubLogo } from './ClubLogo';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('1000');
  const [fundType, setFundType] = useState('শিক্ষা ও মেধা সহায়তা তহবিল');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [receipt, setReceipt] = useState<{
    id: string;
    name: string;
    amount: string;
    fund: string;
    date: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText("01841590350");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReceipt({
      id: `DON-${Math.floor(10000 + Math.random() * 90000)}`,
      name: donorName,
      amount: amount,
      fund: fundType,
      date: new Date().toLocaleDateString('bn-BD')
    });
  };

  const handleClose = () => {
    setReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in font-bangla">
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#063b20] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-amber-400 fill-amber-400" />
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">মানবতার সেবায় অংশ নিন</span>
              <h3 className="font-bold text-base sm:text-lg text-white">ক্লাব কল্যাণ তহবিলে অনুদান</h3>
            </div>
          </div>

          <button onClick={handleClose} className="text-white/80 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {receipt ? (
            <div className="text-center space-y-4 py-3">
              <CheckCircle2 className="w-16 h-16 text-[#063b20] mx-auto" />
              <h3 className="text-2xl font-bold text-[#063b20]">
                আপনার অনুদান প্রশংসিত!
              </h3>
              <p className="text-xs text-gray-600">
                উত্তর গাজীপুর সূর্যতরুণ ক্লাবের সমাজকল্যাণ ফান্ডে আপনার সহায়তার জন্য আন্তরিক ধন্যবাদ ও কৃতজ্ঞতা।
              </p>

              {/* Digital Receipt Voucher */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-400 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                  <span className="font-bold text-amber-900">রশিদ নম্বর:</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">{receipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">দাতার নাম:</span>
                  <span className="font-bold text-gray-900">{receipt.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">অনুদানের খাত:</span>
                  <span className="font-semibold text-[#063b20]">{receipt.fund}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">অনুদানের পরিমাণ:</span>
                  <span className="font-bold text-base text-[#063b20]">৳ {receipt.amount}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-amber-200 text-[11px] text-gray-500">
                  <span>তারিখ: {receipt.date}</span>
                  <span>স্বাক্ষরিত: অর্থ ও সমাজকল্যাণ সম্পাদক</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 rounded-xl bg-[#063b20] text-amber-300 font-bold text-xs shadow hover:bg-[#042816]"
                >
                  সম্পন্ন করুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Payment Info Card */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-gray-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#063b20]">বিকাশ / নগদ পার্সোনাল নম্বর:</span>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded transition"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "কপি হয়েছে" : "নম্বর কপি"}</span>
                  </button>
                </div>
                <div className="text-lg font-bold font-mono text-emerald-900 tracking-wider">
                  {SURJO_TORUN_INFO.phone}
                </div>
                <p className="text-[11px] text-gray-500">
                  রেফারেন্সে আপনার নাম বা খাতের নাম লিখুন (যেমন: Education বা Winter)
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম লিখুন"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    অনুদানের পরিমাণ (টাকা) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    অনুদানের খাত নির্বাচন করুন
                  </label>
                  <select
                    value={fundType}
                    onChange={(e) => setFundType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none font-semibold"
                  >
                    <option value="শিক্ষা ও মেধা সহায়তা তহবিল">শিক্ষা ও মেধা সহায়তা তহবিল</option>
                    <option value="চিকিৎসা ও জরুরি রক্তদান তহবিল">চিকিৎসা ও জরুরি রক্তদান তহবিল</option>
                    <option value="শীতার্তদের জন্য শীতবস্ত্র তহবিল">শীতার্তদের জন্য শীতবস্ত্র তহবিল</option>
                    <option value="রমজান ও ঈদ খাদ্য উপহার তহবিল">রমজান ও ঈদ খাদ্য উপহার তহবিল</option>
                    <option value="তরুণদের ক্রীড়া ও টুর্নামেন্ট তহবিল">তরুণদের ক্রীড়া ও টুর্নামেন্ট তহবিল</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  বিকাশ/নগদ ট্রানজেকশন আইডি (TrxID) বা মোবাইল শেষ ৪ ডিজিট
                </label>
                <input
                  type="text"
                  placeholder="যেমন: 9K72J..."
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#063b20] focus:outline-none font-mono"
                />
              </div>

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
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#042816] text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>রশিদ সংগ্রহ করুন</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
