import React, { useState } from "react";
import {
  Droplet,
  Phone,
  Search,
  MapPin,
  ShieldCheck,
  UserPlus,
  Clock,
  AlertCircle,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";
import { SURJO_TORUN_INFO, BloodDonor } from "../data/clubData";
import { useBloodDonors } from "../hooks/useBloodDonors";

interface BloodNetworkSectionProps {
  onOpenDonorRegister: () => void;
}

export const BloodNetworkSection: React.FC<BloodNetworkSectionProps> = ({
  onOpenDonorRegister,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>("সকল");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const bloodGroups = ["সকল", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const { donors, loading } = useBloodDonors();
  const donorList: BloodDonor[] = donors;

  const filteredDonors = donorList.filter((donor) => {
    const matchesGroup =
      selectedGroup === "সকল" || donor.bloodGroup === selectedGroup;
    const matchesSearch =
      searchTerm === "" ||
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <section
      id="blood-network"
      className="py-20 bg-[#f8faf8] border-b border-emerald-900/10 font-bangla"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner Card */}
        <div className="rounded-3xl bg-gradient-to-r from-rose-700 via-rose-800 to-rose-900 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
            <Droplet className="w-80 h-80 fill-white" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-rose-100 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>মানবতার শ্রেষ্ঠ উপহার • স্বেচ্ছায় রক্তদান</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              সূর্যতরুণ জরুরি রক্তদান সহায়তা ও ডোনার নেটওয়ার্ক
            </h2>

            <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
              চাঁদপুর, মতলব ও উত্তর গাজীপুর এলাকায় যেকোনো মুমূর্ষু রোগীর রক্তের
              প্রয়োজনে আমাদের ভলান্টিয়ার টিম দিন-রাত প্রস্তুত। রক্ত দিতে বা
              জরুরি রক্তের প্রয়োজনে সরাসরি আমাদের হটলাইনে যোগাযোগ করুন।
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
                className="px-5 py-3 rounded-xl bg-white text-rose-800 font-extrabold text-sm hover:bg-rose-50 transition shadow-md flex items-center gap-2"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>জরুরি রক্ত কল: {SURJO_TORUN_INFO.phone}</span>
              </a>

              <button
                onClick={onOpenDonorRegister}
                className="px-5 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-950 text-white border border-rose-300/40 font-bold text-sm transition flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>রক্তদাতা হিসেবে নাম নিবন্ধন করুন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#063b20]">
                রক্তের গ্রুপ অনুযায়ী ডোনার তালিকা খুঁজুন
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                চাঁদপুরের উত্তর গাজীপুর ও সংলগ্ন এলাকার নিবন্ধিত ভলান্টিয়ার
                রক্তদাতাগণ
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="নাম বা এলাকা লিখে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#063b20]"
              />
            </div>
          </div>

          {/* Blood Group Chips */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
            {bloodGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  selectedGroup === group
                    ? "bg-rose-600 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-700"
                }`}
              >
                <Droplet
                  className={`w-3.5 h-3.5 ${selectedGroup === group ? "fill-white" : "text-rose-500 fill-rose-500"}`}
                />
                <span>{group}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Donor Cards Grid */}
        {loading ? (
          <p className="mt-8 text-center text-gray-500">
            ডোনারের তথ্য লোড হচ্ছে...
          </p>
        ) : filteredDonors.length === 0 ? (
          <p className="mt-8 text-center text-gray-500">
            কোনো ডোনারের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 font-extrabold text-lg flex items-center justify-center shadow-inner">
                      {donor.bloodGroup}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      প্রস্তুত
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-[#063b20]">
                      {donor.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{donor.area}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>সর্বশেষ রক্তদান: {donor.lastDonation}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
                    className="w-full py-2 rounded-lg bg-[#063b20] hover:bg-[#042816] text-[#fef3c7] text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>যোগাযোগ: {SURJO_TORUN_INFO.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Emergency Note */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">জরুরি সতর্কবার্তা:</span> উত্তর গাজীপুর
            সূর্যতরুণ ক্লাব সম্পূর্ণ বিনামূল্যে এবং নিঃস্বার্থভাবে মুমূর্ষু
            রোগীর জন্য রক্তদাতা খুঁজে দেয়। রক্তদানের বিনিময়ে কোনো প্রকার আর্থিক
            লেনদেন সম্পূর্ণ নিষিদ্ধ ও অনৈতিক।
          </div>
        </div>
      </div>
    </section>
  );
};
