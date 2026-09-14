import React from 'react';
import { Users, Award, Shield, Phone, MapPin } from 'lucide-react';
import { COMMITTEE_MEMBERS, SURJO_TORUN_INFO } from '../data/clubData';
import { useCommitteeMembers } from '../hooks/useCommitteeMembers';

export const CommitteeSection: React.FC = () => {
  const { members } = useCommitteeMembers();
  const list = members.length > 0 ? members : COMMITTEE_MEMBERS;
  const advisors = list.filter(m => m.role === 'advisor');
  const executives = list.filter(m => m.role === 'executive');
  const coordinators = list.filter(m => m.role === 'coordinator');

  return (
    <section id="committee" className="py-20 bg-white border-b border-emerald-900/10 font-bangla">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#063b20] text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>দায়িত্বশীল নেতৃত্ব</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063b20]">
            কার্যনির্বাহী কমিটি ও সম্মানিত উপদেষ্টামণ্ডলী
          </h2>

          <p className="text-gray-600 text-base">
            উত্তর গাজীপুর সূর্যতরুণ ক্লাবের সকল সামাজিক, শিক্ষামূলক ও মানবিক কার্যক্রম পরিচালিত হয় নিবেদিতপ্রাণ তরুণ সমাজসেবক ও এলাকার সম্মানিত মুরব্বিদের দিকনির্দেশনায়।
          </p>
        </div>

        {/* Advisors Row */}
        <div className="mt-14">
          <h3 className="text-center text-lg font-bold text-[#063b20] flex items-center justify-center gap-2 mb-6">
            <Award className="w-5 h-5 text-amber-500" />
            <span>সম্মানিত উপদেষ্টামণ্ডলী</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {advisors.map((adv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 text-center space-y-1 shadow-sm"
              >
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">{adv.designation}</span>
                <h4 className="text-lg font-bold text-[#063b20]">{adv.name}</h4>
                <p className="text-xs text-gray-500">{adv.area}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Committee Grid */}
        <div className="mt-12">
          <h3 className="text-center text-lg font-bold text-[#063b20] flex items-center justify-center gap-2 mb-6">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>কার্যনির্বাহী পরিষদ</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {executives.map((member, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-[#063b20] hover:shadow-md transition text-center space-y-1.5"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#063b20] font-bold text-base flex items-center justify-center mx-auto shadow-inner">
                  {member.name.slice(0, 2)}
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {member.designation}
                  </span>
                  <h4 className="font-bold text-sm text-[#063b20] mt-1.5">{member.name}</h4>
                  <p className="text-[11px] text-gray-500">{member.area}</p>
                  
                  {member.phone && (
                    <div className="pt-2">
                      <a
                        href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
                        className="text-[11px] font-bold text-[#063b20] hover:text-amber-600 flex items-center justify-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{member.phone}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expatriate Coordination Cell */}
        {coordinators.length > 0 && (
          <div className="mt-10 p-6 rounded-2xl bg-[#063b20] text-white text-center max-w-xl mx-auto shadow-md">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              প্রবাসী কল্যাণ সেল
            </span>
            <h4 className="text-xl font-bold">{coordinators[0].name}</h4>
            <p className="text-xs text-emerald-200 mt-1">{coordinators[0].designation}</p>
            <p className="text-xs text-gray-300 mt-2">
              চাঁদপুরের প্রবাসে অবস্থানরত সূর্যতরুণ ক্লাবের শুভানুধ্যায়ী ও সদস্যবৃন্দের সাথে নিয়মিত সমন্বয় ও পরামর্শ।
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
