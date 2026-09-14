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

export const CLUB_PROJECTS: ClubProject[] = [
  {
    id: "free-blood-camp",
    title: "জরুরি রক্তদান ও ব্লাড গ্রুপ নির্ণয় ক্যাম্পেইন",
    category: "মানবতা",
    categoryEn: "Humanity",
    description:
      "চাঁদপুর সদর ও স্থানীয় এলাকার মানুষের বিনামূল্যে রক্তের গ্রুপ পরীক্ষা এবং যেকোনো মুমূর্ষু রোগীর জন্য ২৪/৭ রক্তদাতা পাঠানোর স্থায়ী ভলান্টিয়ার নেটওয়ার্ক।",
    impact: "৫২০+ ব্যাগ রক্ত বিনামূল্যে সংগ্রহ ও সমন্বয়",
    status: "চলমান",
    imageUrl:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "২৪/৭ হটলাইন সেবা: 01841-590350",
      "চাঁদপুর জেনারেল হাসপাতালের সাথে সমন্বয়",
      "শতভাগ স্বেচ্ছাসেবী ডোনার তালিকা",
    ],
  },
  {
    id: "scholarship-distribution",
    title: "মেধাবী শিক্ষার্থী বৃত্তি ও শিক্ষা উপকরণ উপহার",
    category: "শিক্ষা",
    categoryEn: "Education",
    description:
      "উত্তর গাজীপুর ও আশপাশের প্রাথমিক ও মাধ্যমিক বিদ্যালয়ের অসচ্ছল পরিবারের শিক্ষার্থীদের মাঝে প্রতি বছর বিনামূল্যে খাতা, কলম, স্কুলব্যাগ ও বৃত্তি প্রদান।",
    impact: "৩০০+ ছাত্রছাত্রীকে নিয়মিত শিক্ষা সহায়তা",
    status: "চলমান",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "বার্ষিক মেধা বৃত্তি পরীক্ষা",
      "কৃতি শিক্ষার্থী সম্মাননা স্মারক",
      "দরিদ্র ছাত্রদের পরীক্ষার ফি প্রদান",
    ],
  },
  {
    id: "surjo-torun-premier-league",
    title: "সূর্যতরুণ বার্ষিক গোল্ডকাপ ক্রিকেট ও ফুটবল টুর্নামেন্ট",
    category: "ঐক্য",
    categoryEn: "Unity",
    description:
      "তরুণ প্রজন্মকে স্বাস্থ্যবান, শৃঙ্খলাবদ্ধ ও মাদকবিরোধী রাখতে জমকালো আয়োজনে স্থানীয় ও পার্শ্ববর্তী দলগুলোর অংশগ্রহণে বার্ষিক ক্রীড়া উৎসব।",
    impact: "৩২টি যুব দলের অংশগ্রহণ ও হাজারো দর্শকের আনন্দ",
    status: "আসন্ন",
    imageUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "আকর্ষণীয় ট্রফি ও প্রাইজমানি",
      "মাদকমুক্ত যুব সমাজ গড়ার শপথ",
      "ফেয়ার প্লে ও সম্প্রীতির বার্তা",
    ],
  },
  {
    id: "winter-blanket-relief",
    title: "শীতার্ত অসহায় মানুষের মাঝে শীতবস্ত্র ও কম্বল বিতরণ",
    category: "মানবতা",
    categoryEn: "Humanity",
    description:
      "প্রতি বছর তীব্র শীতে চাঁদপুর নদী অববাহিকার উত্তর গাজীপুর ও সংলগ্ন চরাঞ্চলের ছিন্নমূল, প্রবীণ ও বিধবা মা-বোনদের মাঝে উষ্ণ কম্বল উপহার।",
    impact: "৭০০+ অসহায় পরিবারে শীতের উষ্ণতা",
    status: "সম্পন্ন",
    imageUrl:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "সরাসরি বাড়ি বাড়ি গিয়ে তালিকা প্রণয়ন",
      "উন্নত মানের ভারী কম্বল বিতরণ",
      "প্রবাসী ও স্থানীয় শুভাকাঙ্ক্ষীদের অর্থায়ন",
    ],
  },
  {
    id: "green-chandpur-plantation",
    title: "সবুজ চাঁদপুর গড়ি — নদী তীরবর্তী বৃক্ষরোপণ কর্মসূচি",
    category: "পরিবেশ",
    categoryEn: "Environment",
    description:
      "পরিবেশের ভারসাম্য রক্ষা ও প্রাকৃতিক বিপর্যয় রোধে উত্তর গাজীপুর রাস্তাঘাট, মসজিদ প্রাঙ্গণ ও স্কুল মাঠে ফলজ, বনজ ও ওষধি গাছের চারা রোপণ।",
    impact: "১,৫০০+ গাছের চারা রোপণ ও পরিচর্যা",
    status: "চলমান",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "আম, মেহগনি ও নিম গাছের চারা",
      "বিদ্যালয়ের শিক্ষার্থীদের সম্পৃক্তকরণ",
      "পরিবেশ সচেতনতা র‍্যালি",
    ],
  },
  {
    id: "ramadan-eid-gift",
    title: "রমজানের খাদ্যসামগ্রী ও ঈদ উপহার প্যাকেজ",
    category: "মানবতা",
    categoryEn: "Humanity",
    description:
      "পবিত্র রমজান মাসে অসহায় রোজাদার পরিবারের ঘরে চাল, ডাল, তেল, চিনি, সেমাই ও ছোলা সমৃদ্ধ খাদ্য প্যাকেজ পৌঁছে দেওয়া।",
    impact: "৪০০+ পরিবারে পবিত্র ঈদের খুশি ছড়িয়ে দেওয়া",
    status: "সম্পন্ন",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "গোপনীয়তা বজায় রেখে সম্মানিত সাহায্য",
      "প্রবাসী কল্যাণ তহবিলের বিশেষ অনুদান",
      "ঈদ আনন্দ সবার ঘরে ঘরে",
    ],
  },
];

export const BLOOD_DONORS: BloodDonor[] = [
  {
    id: "bd-1",
    name: "মোহাম্মদ রফিকুল ইসলাম",
    bloodGroup: "O+",
    phone: "01841-590350",
    area: "উত্তর গাজীপুর",
    lastDonation: "৪ মাস পূর্বে",
    available: true,
  },
  {
    id: "bd-2",
    name: "তানভীর আহমেদ শাওন",
    bloodGroup: "A+",
    phone: "01841-590350",
    area: "চাঁদপুর সদর",
    lastDonation: "৫ মাস পূর্বে",
    available: true,
  },
  {
    id: "bd-3",
    name: "মাহমুদুল হাসান শুভ",
    bloodGroup: "B+",
    phone: "01841-590350",
    area: "উত্তর গাজীপুর বাজার",
    lastDonation: "৩ মাস পূর্বে",
    available: true,
  },
  {
    id: "bd-4",
    name: "সাইফুল ইসলাম রনি",
    bloodGroup: "AB+",
    phone: "01841-590350",
    area: "চাঁদপুরঘাট",
    lastDonation: "৬ মাস পূর্বে",
    available: true,
  },
  {
    id: "bd-5",
    name: "আরিফুল হক মিলন",
    bloodGroup: "O-",
    phone: "01841-590350",
    area: "উত্তর গাজীপুর",
    lastDonation: "৪ মাস পূর্বে",
    available: true,
  },
  {
    id: "bd-6",
    name: "কামরুল হাসান সাকিব",
    bloodGroup: "A-",
    phone: "01841-590350",
    area: "নতুন বাজার, চাঁদপুর",
    lastDonation: "৭ মাস পূর্বে",
    available: true,
  },
  {
    id: "bd-7",
    name: "জাকির হোসেন মজুমদার",
    bloodGroup: "B-",
    phone: "01841-590350",
    area: "উত্তর গাজীপুর",
    lastDonation: "৫ মাস পূর্বে",
    available: true,
  },
  {
    id: "bd-8",
    name: "নুরুজ্জামান ইমন",
    bloodGroup: "AB-",
    phone: "01841-590350",
    area: "চাঁদপুর",
    lastDonation: "৩ মাস পূর্বে",
    available: true,
  },
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    name: "আলহাজ্ব মোঃ দেলোয়ার হোসেন",
    designation: "প্রধান উপদেষ্টা",
    area: "উত্তর গাজীপুর",
    role: "advisor",
  },
  {
    name: "মাওলানা আবদুল কুদ্দুস",
    designation: "উপদেষ্টা",
    area: "উত্তর গাজীপুর",
    role: "advisor",
  },
  {
    name: "মোঃ জহিরুল ইসলাম",
    designation: "সভাপতি",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ কামরুল হাসান",
    designation: "সহ-সভাপতি",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ সাইফুল ইসলাম",
    designation: "সাধারণ সম্পাদক",
    phone: "01841-590350",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ রাসেল হোসেন",
    designation: "যুগ্ম সাধারণ সম্পাদক",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ মেহেদী হাসান",
    designation: "সাংগঠনিক সম্পাদক",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ সোহেল রানা",
    designation: "অর্থ ও সমাজকল্যাণ সম্পাদক",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ নাজমুল হোসেন",
    designation: "প্রচার ও দপ্তর সম্পাদক",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ রিয়াজ উদ্দিন",
    designation: "ক্রীড়া ও সাংস্কৃতিক সম্পাদক",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ তারেকুল ইসলাম",
    designation: "তথ্য ও প্রযুক্তি সম্পাদক",
    area: "উত্তর গাজীপুর",
    role: "executive",
  },
  {
    name: "মোঃ সোহাগ গাজী",
    designation: "সদস্য সচিব (প্রবাসী কল্যাণ সেল)",
    area: "প্রবাসী শুভাকাঙ্ক্ষী",
    role: "coordinator",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "বিনামূল্যে রক্তের গ্রুপ নির্ণয় ও স্বেচ্ছায় রক্তদান কর্মসূচি",
    category: "মানবতা",
    date: "মে ২০২৬",
    imageUrl:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g-2",
    title: "বার্ষিক সূর্যতরুণ শর্টপিচ ক্রিকেট টুর্নামেন্টের ফাইনাল ম্যাচ",
    category: "ঐক্য ও ক্রীড়া",
    date: "মার্চ ২০২৬",
    imageUrl:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g-3",
    title: "দরিদ্র ও মেধাবী শিক্ষার্থীদের মাঝে শিক্ষা উপকরণ ও খাতা বিতরণ",
    category: "শিক্ষা",
    date: "জানুয়ারি ২০২৬",
    imageUrl:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g-4",
    title: "তীব্র শীতে অসহায় পরিবারের মাঝে কম্বল ও গরম কাপড় উপহার",
    category: "মানবতা",
    date: "ডিসেম্বর ২০২৫",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g-5",
    title: "উত্তর গাজীপুর গ্রামীণ রাস্তায় বৃক্ষরোপণ অভিযান",
    category: "পরিবেশ",
    date: "জুলাই ২০২৫",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g-6",
    title: "পবিত্র রমজানে ছিন্নমূল ও অসহায়দের জন্য ইফতার বিতরণ",
    category: "মানবতা",
    date: "এপ্রিল ২০২৫",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  },
];
