import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { SURJO_TORUN_INFO } from "../data/clubData";
import { useProjects } from "../hooks/useProjects";

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("সকল");
  const { projects, loading } = useProjects();
  const projectList = projects;

  const categories = ["সকল", "শিক্ষা", "ঐক্য", "মানবতা", "পরিবেশ"];

  const filteredProjects =
    selectedCategory === "সকল"
      ? projectList
      : projectList.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-20 bg-white border-b border-emerald-900/10 font-bangla"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#063b20] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>সামাজিক অবদান ও কর্মযজ্ঞ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063b20] mt-2">
              আমাদের বর্তমান ও নিয়মিত কার্যক্রমসমূহ
            </h2>
            <p className="text-gray-600 mt-2 text-base max-w-2xl">
              চাঁদপুরের গ্রামীণ সমাজের সার্বিক উন্নয়ন, পিছিয়ে পড়া মানুষের মুখে
              হাসি ফোটানো এবং শিক্ষার্থীদের স্বপ্ন পূরণে আমাদের প্রতিটি উদ্যোগ।
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#063b20] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <p className="mt-12 text-center text-gray-500">
            প্রকল্পের তথ্য লোড হচ্ছে...
          </p>
        ) : filteredProjects.length === 0 ? (
          <p className="mt-12 text-center text-gray-500">
            কোনো প্রকল্পের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Status Badge */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#063b20] text-white shadow">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold shadow ${
                        project.status === "চলমান"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : project.status === "আসন্ন"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-blue-100 text-blue-900 border border-blue-300"
                      }`}
                    >
                      ● {project.status}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#063b20] group-hover:text-amber-600 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      বিশেষ দিকসমূহ:
                    </span>
                    {project.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Badge */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                      {project.impact}
                    </div>

                    <a
                      href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
                      className="text-xs font-bold text-[#063b20] hover:text-amber-600 flex items-center gap-1"
                    >
                      <span>অংশ নিন</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
