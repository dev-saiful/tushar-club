// Database row types (snake_case as stored in Supabase)

export interface CommitteeMemberRow {
  id: string
  name: string
  designation: string
  phone: string | null
  area: string
  role: 'executive' | 'advisor' | 'coordinator'
  created_at: string
}

export interface BloodDonorRow {
  id: string
  name: string
  blood_group: string
  phone: string
  area: string
  last_donation: string | null
  available: boolean
  created_at: string
}

export interface ProjectRow {
  id: string
  title: string
  category: string
  category_en: string
  description: string
  impact: string | null
  status: string
  image_url: string | null
  highlights: string[]
  created_at: string
}

export interface GalleryItemRow {
  id: string
  title: string
  category: string
  date: string
  image_url: string
  created_at: string
}

export interface MembershipApplicationRow {
  id: string
  full_name: string
  father_name: string
  phone: string
  blood_group: string
  occupation: string | null
  address: string
  reason: string | null
  status: 'pending' | 'approved' | 'rejected'
  member_id: string | null
  created_at: string
}

export interface BloodDonorRegistrationRow {
  id: string
  donor_name: string
  donor_phone: string
  blood_group: string
  donor_area: string
  status: 'pending' | 'verified' | 'rejected'
  created_at: string
}

export interface DonationRow {
  id: string
  donor_name: string
  amount: number
  fund_type: string
  trx_id: string | null
  status: 'pending' | 'verified' | 'rejected'
  created_at: string
}

export interface ContactMessageRow {
  id: string
  name: string
  phone: string
  message: string
  read: boolean
  created_at: string
}
