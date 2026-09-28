export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  phone: string;
  area: string;
  lastDonation: string;
  available: boolean;
}

export interface ClubProject {
  id: string;
  title: string;
  category: "শিক্ষা" | "ঐক্য" | "মানবতা" | "পরিবেশ";
  categoryEn: string;
  description: string;
  impact: string;
  status: "চলমান" | "আসন্ন" | "সম্পন্ন";
  imageUrl: string;
  highlights: string[];
}

export interface CommitteeMember {
  name: string;
  designation: string;
  phone?: string;
  area: string;
  role: "executive" | "advisor" | "coordinator";
  photoUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

export const SURJO_TORUN_INFO = {
  nameBn: "উত্তর গাজীপুর সূর্যতরুণ ক্লাব",
  nameEn: "Uttar Gazipur Surjo Torun Club",
  nature: "একটি সম্পূর্ণ অরাজনৈতিক সামাজিক ও যুব সংগঠন",
  motto: "শিক্ষা • ঐক্য • মানবিকতা",
  established: "২০১৮",
  phone: "01841-590350",
  phoneTel: "+8801841590350",
  locationBn: "উত্তর গাজীপুর, মতলব উত্তর, চাঁদপুর",
  locationEn: "Uttar Gazipur, Matlab Uttar, Chandpur, Bangladesh",
  fbPageUrl: "https://www.facebook.com/profile.php?id=100064704081192",
  email: "surjotorunclub.chandpur@gmail.com",
  aboutBrief:
    "উত্তর গাজীপুর সূর্যতরুণ ক্লাব চাঁদপুরের একটি সক্রিয় ও আদর্শ অরাজনৈতিক যুব সংগঠন। গ্রামীণ শিক্ষার প্রসার, তরুণ সমাজকে মাদক ও অপসংস্কৃতি থেকে দূরে রেখে খেলাধুলায় উৎসাহিত করা এবং দরিদ্র-অসহায় মানুষের চিকিৎসা ও জরুরি রক্তদানে নিরলস কাজ করে যাচ্ছে।",
};

export const CORE_PILLARS = [
  {
    id: "shikkha",
    title: "শিক্ষা",
    titleEn: "Education",
    subtitle: "মেধা বিকাশ ও ভবিষ্যৎ প্রজন্ম গঠন",
    description:
      "দরিদ্র ও মেধাবী শিক্ষার্থীদের মাঝে বিনামূল্যে বই-খাতা বিতরণ, মেধা বৃত্তি পরীক্ষা, কৃতি সংবর্ধনা ও গ্রামীণ পাঠাগার প্রতিষ্ঠার মাধ্যমে আলোর দিশারী হিসেবে কাজ করা।",
    stats: "৩৫০+ শিক্ষার্থী উপকৃত",
    color: "from-amber-500 to-amber-600",
    iconName: "BookOpen",
  },
  {
    id: "oikko",
    title: "ঐক্য",
    titleEn: "Unity",
    subtitle: "যুব সমাজের ভ্রাতৃত্ব ও ক্রীড়াঙ্গন",
    description:
      "গ্রামের তরুণদের মাদক, মোবাইল আসক্তি ও সামাজিক অবক্ষয় থেকে দূরে রাখতে বার্ষিক ফুটবল ও ক্রিকেট টুর্নামেন্ট, সাংস্কৃতিক উৎসব এবং পারস্পরিক সম্প্রীতির মেলবন্ধন।",
    stats: "১৫০+ সক্রিয় তরুণ সদস্য",
    color: "from-emerald-700 to-emerald-800",
    iconName: "Users",
  },
  {
    id: "manobota",
    title: "মানবিকতা",
    titleEn: "Humanity",
    subtitle: "আর্তমানবতার সেবায় নিবেদিত প্রাণ",
    description:
      "২৪ ঘণ্টা জরুরি রক্তদান সমন্বয়, শীতার্তদের কম্বল বিতরণ, বন্যায় খাদ্য ত্রাণ সহায়তা এবং অসহায় অসুস্থ রোগীদের জরুরি আর্থিক চিকিৎসা সহায়তা প্রদান।",
    stats: "৫০০+ ব্যাগ রক্ত ও ১০০০+ পরিবারে খাদ্য সহায়তা",
    color: "from-rose-600 to-rose-700",
    iconName: "Heart",
  },
];
