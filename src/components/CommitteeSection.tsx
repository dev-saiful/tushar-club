import React from "react";
import { Users, Award, Shield, Phone, MapPin } from "lucide-react";
import type { CommitteeMember } from "../data/clubData";
import { useCommitteeMembers } from "../hooks/useCommitteeMembers";

type MemberTone = "executive" | "advisor";

/**
 * Photo-forward member card. The portrait leads the card; the name sits on the
 * image when a photo exists, and drops below it otherwise so the card never
 * shows a name twice.
 */
const MemberCard: React.FC<{ member: CommitteeMember; tone: MemberTone }> = ({
  member,
  tone,
}) => {
  const isAdvisor = tone === "advisor";
  const hasPhoto = Boolean(member.photoUrl);

  return (
    <article
      className={`group rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
        isAdvisor ? "border-amber-200" : "border-gray-200"
      }`}
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {hasPhoto ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center gap-2 ${
              isAdvisor
                ? "bg-gradient-to-br from-amber-100 to-amber-200"
                : "bg-gradient-to-br from-emerald-100 to-emerald-200"
            }`}
          >
            <span
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold shadow-inner ${
                isAdvisor
                  ? "bg-amber-300/80 text-amber-900"
                  : "bg-emerald-300/60 text-[#063b20]"
              }`}
            >
              {member.name.slice(0, 2)}
            </span>
          </div>
        )}

        {/* Keeps overlaying text legible on busy photos */}
        {hasPhoto && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        )}

        {/* Designation badge */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm ${
            isAdvisor
              ? "bg-amber-400 text-[#063b20]"
              : "bg-[#063b20]/90 text-amber-300 border border-amber-400/40"
          }`}
        >
          {member.designation}
        </span>

        {hasPhoto && (
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h4 className="font-extrabold text-sm sm:text-base leading-tight text-white drop-shadow-md break-words">
              {member.name}
            </h4>
          </div>
        )}
      </div>

      {/* Details */}
      <div
        className={`px-4 py-3 flex-1 flex flex-col items-center justify-center gap-1.5 text-center ${
          isAdvisor ? "bg-amber-50/60" : "bg-white"
        }`}
      >
        {!hasPhoto && (
          <h4 className="font-bold text-[15px] leading-tight text-[#063b20] break-words">
            {member.name}
          </h4>
        )}

        <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3 shrink-0 text-emerald-600" />
          <span>{member.area}</span>
        </p>

        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-[#063b20] hover:text-amber-600 transition-colors"
          >
            <Phone className="w-3 h-3 shrink-0 text-emerald-600" />
            <span>{member.phone}</span>
          </a>
        )}
      </div>
    </article>
  );
};

/** Mirrors MemberCard's geometry so the swap to real data doesn't shift the layout. */
const MemberCardSkeleton: React.FC = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm flex flex-col">
    <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
    <div className="px-4 py-3 flex flex-col items-center gap-2">
      <div className="h-3 w-3/4 rounded-full bg-gray-200 animate-pulse" />
      <div className="h-2.5 w-1/2 rounded-full bg-gray-100 animate-pulse" />
    </div>
  </div>
);

const CommitteeSkeleton: React.FC = () => (
  <div aria-busy="true" aria-live="polite">
    <span className="sr-only">কমিটি সদস্যদের তথ্য লোড হচ্ছে...</span>

    {/* Advisors Row */}
    <div className="mt-14">
      <div className="h-5 w-48 mx-auto rounded-full bg-gray-200 animate-pulse" />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {Array.from({ length: 2 }).map((_, idx) => (
          <MemberCardSkeleton key={idx} />
        ))}
      </div>
    </div>

    {/* Executive Committee Grid */}
    <div className="mt-16">
      <div className="h-5 w-40 mx-auto rounded-full bg-gray-200 animate-pulse" />
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, idx) => (
          <MemberCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  </div>
);

export const CommitteeSection: React.FC = () => {
  const { members, loading } = useCommitteeMembers();
  const advisors = members.filter((m) => m.role === "advisor");
  const executives = members.filter((m) => m.role === "executive");
  const coordinators = members.filter((m) => m.role === "coordinator");
  const coordinator = coordinators[0];

  return (
    <section
      id="committee"
      className="py-20 bg-white border-b border-emerald-900/10 font-bangla"
    >
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
            উত্তর গাজীপুর সূর্যতরুণ ক্লাবের সকল সামাজিক, শিক্ষামূলক ও মানবিক
            কার্যক্রম পরিচালিত হয় নিবেদিতপ্রাণ তরুণ সমাজসেবক ও এলাকার সম্মানিত
            মুরব্বিদের দিকনির্দেশনায়।
          </p>
        </div>

        {loading ? (
          <CommitteeSkeleton />
        ) : members.length === 0 ? (
          <p className="mt-14 text-center text-gray-500">
            কোনো কমিটি সদস্যের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <>
            {/* Advisors Row */}
            {advisors.length > 0 && (
              <div className="mt-14">
                <h3 className="text-center text-lg font-bold text-[#063b20] flex items-center justify-center gap-2 mb-8">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>সম্মানিত উপদেষ্টামণ্ডলী</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {advisors.map((advisor, idx) => (
                    <MemberCard
                      key={`${advisor.name}-${idx}`}
                      member={advisor}
                      tone="advisor"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Executive Committee Grid */}
            {executives.length > 0 && (
              <div className="mt-16">
                <h3 className="text-center text-lg font-bold text-[#063b20] flex items-center justify-center gap-2 mb-8">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>কার্যনির্বাহী পরিষদ</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {executives.map((member, idx) => (
                    <MemberCard
                      key={`${member.name}-${idx}`}
                      member={member}
                      tone="executive"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Expatriate Coordination Cell */}
            {coordinator && (
              <div className="mt-14 p-5 sm:p-6 rounded-2xl bg-[#063b20] text-white max-w-2xl mx-auto shadow-md border border-amber-400/20 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="shrink-0 w-24 h-28 rounded-xl overflow-hidden border-2 border-amber-400 shadow-lg">
                  {coordinator.photoUrl ? (
                    <img
                      src={coordinator.photoUrl}
                      alt={coordinator.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/10 text-amber-300 font-extrabold text-2xl">
                      {coordinator.name.slice(0, 2)}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    প্রবাসী কল্যাণ সেল
                  </span>
                  <h4 className="text-xl font-bold">{coordinator.name}</h4>
                  <p className="text-xs text-emerald-200">
                    {coordinator.designation}
                  </p>
                  <p className="text-xs text-gray-300 pt-1">
                    চাঁদপুরের প্রবাসে অবস্থানরত সূর্যতরুণ ক্লাবের শুভানুধ্যায়ী ও
                    সদস্যবৃন্দের সাথে নিয়মিত সমন্বয় ও পরামর্শ।
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
