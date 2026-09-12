import React from 'react';
import { BookOpen, Users, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { CORE_PILLARS, SURJO_TORUN_INFO } from '../data/clubData';

interface PillarsSectionProps {
  onOpenMembership: () => void;
  onOpenBloodModal: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ 
  onOpenMembership,
  onOpenBloodModal 
}) => {
  return (
    <section id="pillars" className="py-20 bg-[#fbfdfb] border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#063b20] text-xs font-bold font-bangla uppercase tracking-wider">
            <span>ক্লাবের তিনটি মূলস্তম্ভ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-bangla text-[#063b20]">
            {SURJO_TORUN_INFO.motto}
          </h2>

          <p className="text-base sm:text-lg font-bangla text-gray-700 leading-relaxed">
            {SURJO_TORUN_INFO.nameBn}-র প্রতিটি কার্যক্রম পরিচালিত হয় এই তিনটি মূল নীতির ওপর ভিত্তি করে। আমরা বিশ্বাস করি একটি সচেতন ও মানবিক সমাজ গঠনে শিক্ষা, ঐক্য এবং মানবতার কোনো বিকল্প নেই।
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 font-bangla">
          
          {/* 1. শিক্ষা (Education) */}
          <div className="rounded-2xl bg-white border-2 border-amber-200/80 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">১ম মূলনীতি</span>
                <h3 className="text-2xl font-bold text-[#063b20] mt-0.5">শিক্ষা (Education)</h3>
                <p className="text-xs font-semibold text-gray-500 mt-1">মেধা বিকাশ ও ভবিষ্যৎ প্রজন্ম বিনির্মাণ</p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                দরিদ্র ও মেধাবী শিক্ষার্থীদের মাঝে বিনামূল্যে পাঠ্যপুস্তক, খাতা ও শিক্ষা উপকরণ বিতরণ। বার্ষিক মেধা বৃত্তি পরীক্ষার আয়োজন ও কৃতি শিক্ষার্থীদের সংবর্ধনা দিয়ে পড়াশোনায় উৎসাহিত করা।
              </p>

              <ul className="space-y-2 pt-2 text-xs font-semibold text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>বিনামূল্যে বই ও শিক্ষা উপকরণ উপহার</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>কৃতি শিক্ষার্থী মেধা বৃত্তি পরীক্ষা</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>গ্রামীণ লাইব্রেরি ও পাঠাগার কর্মসূচি</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-amber-100 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">৩৫০+ শিক্ষার্থী উপকৃত</span>
              <a href="#projects" className="font-bold text-[#063b20] hover:underline flex items-center gap-1">
                <span>বিস্তারিত</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. ঐক্য (Unity) */}
          <div className="rounded-2xl bg-white border-2 border-emerald-200/80 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#063b20] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">২য় মূলনীতি</span>
                <h3 className="text-2xl font-bold text-[#063b20] mt-0.5">ঐক্য (Unity)</h3>
                <p className="text-xs font-semibold text-gray-500 mt-1">ভ্রাতৃত্ব, ক্রীড়াঙ্গন ও সামাজিক সম্প্রীতি</p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                গ্রামের যুবসমাজকে মাদক, মোবাইল গেম ও অনৈতিক কর্মকাণ্ড থেকে দূরে রাখতে খেলাধুলার বিকল্প নেই। ফুটবল, ক্রিকেট ও ঐতিহ্যবাহী গ্রামীণ খেলার মাধ্যমে তরুণদের মধ্যে ভ্রাতৃত্ববোধ জাগ্রত করা।
              </p>

              <ul className="space-y-2 pt-2 text-xs font-semibold text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>বার্ষিক সূর্যতরুণ গোল্ডকাপ টুর্নামেন্ট</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>মাদক ও সামাজিক অবক্ষয় বিরোধী ঐক্য</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>জাতীয় ও সামাজিক দিবস উদযাপন</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">১৫০+ তরুণ স্বেচ্ছাসেবক</span>
              <button onClick={onOpenMembership} className="font-bold text-[#063b20] hover:underline flex items-center gap-1">
                <span>যুক্ত হোন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. মানবতা (Humanity) */}
          <div className="rounded-2xl bg-white border-2 border-rose-200/80 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 fill-rose-600" />
              </div>

              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">৩য় মূলনীতি</span>
                <h3 className="text-2xl font-bold text-[#063b20] mt-0.5">মানবতা (Humanity)</h3>
                <p className="text-xs font-semibold text-gray-500 mt-1">জরুরি রক্তদান ও আর্তমানবতার সেবা</p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                যেকোনো মুমূর্ষু রোগীর জন্য তাৎক্ষণিক রক্তের ব্যবস্থা করা, নদীভাঙন ও বন্যায় অসহায় পরিবারে ত্রাণ সামগ্রী বিতরণ, তীব্র শীতে কম্বল বিতরণ এবং অসুস্থদের চিকিৎসা সহায়তা দেওয়া।
              </p>

              <ul className="space-y-2 pt-2 text-xs font-semibold text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>২৪/৭ জরুরি রক্তদান ভলান্টিয়ার টিম</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>শীতবস্ত্র ও কম্বল বিতরণ কার্যক্রম</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>অসহায় রোগীদের জরুরি চিকিৎসা তহবিল</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-100 flex items-center justify-between text-xs">
              <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">৫০০+ রক্তদান রেকর্ড</span>
              <button onClick={onOpenBloodModal} className="font-bold text-rose-700 hover:underline flex items-center gap-1">
                <span>রক্ত খুঁজুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
