import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface Stats {
  committee: number
  donors: number
  projects: number
  gallery: number
  pendingMemberships: number
  pendingBloodRequests: number
  pendingDonations: number
  unreadMessages: number
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats>({
    committee: 0,
    donors: 0,
    projects: 0,
    gallery: 0,
    pendingMemberships: 0,
    pendingBloodRequests: 0,
    pendingDonations: 0,
    unreadMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const [
        committee,
        donors,
        projects,
        gallery,
        memberships,
        bloodRequests,
        donations,
        messages,
      ] = await Promise.all([
        supabase.from('committee_members').select('id', { count: 'exact', head: true }),
        supabase.from('blood_donors').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('gallery_items').select('id', { count: 'exact', head: true }),
        supabase.from('membership_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('blood_donor_registrations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('donations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false),
      ])

      setStats({
        committee: committee.count || 0,
        donors: donors.count || 0,
        projects: projects.count || 0,
        gallery: gallery.count || 0,
        pendingMemberships: memberships.count || 0,
        pendingBloodRequests: bloodRequests.count || 0,
        pendingDonations: donations.count || 0,
        unreadMessages: messages.count || 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  const statCards = [
    { label: 'কমিটি সদস্য', value: stats.committee, color: 'bg-blue-600', path: '/admin/committee' },
    { label: 'রক্তদাতা', value: stats.donors, color: 'bg-red-600', path: '/admin/donors' },
    { label: 'প্রকল্প', value: stats.projects, color: 'bg-green-600', path: '/admin/projects' },
    { label: 'গ্যালারি', value: stats.gallery, color: 'bg-purple-600', path: '/admin/gallery' },
    { label: 'পেন্ডিং সদস্যপদ', value: stats.pendingMemberships, color: 'bg-yellow-600', path: '/admin/memberships' },
    { label: 'পেন্ডিং রক্তদাতা নিবন্ধন', value: stats.pendingBloodRequests, color: 'bg-orange-600', path: '/admin/blood-requests' },
    { label: 'পেন্ডিং দান', value: stats.pendingDonations, color: 'bg-teal-600', path: '/admin/donations' },
    { label: 'অপঠিত বার্তা', value: stats.unreadMessages, color: 'bg-pink-600', path: '/admin/messages' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ড্যাশবোর্ড</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <button
            key={card.label}
            onClick={() => navigate(card.path)}
            className={`${card.color} group p-6 rounded-lg text-left cursor-pointer transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/70`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-white text-lg">{card.label}</h3>
              <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <p className="text-white text-3xl font-bold">{card.value}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
