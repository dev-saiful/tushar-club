export type Language = 'bn' | 'en';

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  phone: string;
  area: string;
  lastDonation: string;
  available: boolean;
}

export interface ClubProject {
  id: string;
  title: string;
  category: 'শিক্ষা' | 'ঐক্য' | 'মানবতা' | 'পরিবেশ';
  categoryEn: string;
  description: string;
  impact: string;
  status: 'চলমান' | 'আসন্ন' | 'সম্পন্ন';
  imageUrl: string;
  highlights: string[];
}

export interface CommitteeMember {
  name: string;
  designation: string;
  phone?: string;
  area: string;
  role: 'executive' | 'advisor' | 'coordinator';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}
