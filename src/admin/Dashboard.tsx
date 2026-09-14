import { useEffect, useState } from 'react'
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
    { label: 'কমিটি সদস্য', value: stats.committee, color: 'bg-blue-600' },
    { label: 'রক্তদাতা', value: stats.donors, color: 'bg-red-600' },
    { label: 'প্রকল্প', value: stats.projects, color: 'bg-green-600' },
    { label: 'গ্যালারি', value: stats.gallery, color: 'bg-purple-600' },
    { label: 'পেন্ডিং সদস্যপদ', value: stats.pendingMemberships, color: 'bg-yellow-600' },
    { label: 'পেন্ডিং রক্ত অনুরোধ', value: stats.pendingBloodRequests, color: 'bg-orange-600' },
    { label: 'পেন্ডিং দান', value: stats.pendingDonations, color: 'bg-teal-600' },
    { label: 'অপঠিত বার্তা', value: stats.unreadMessages, color: 'bg-pink-600' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ড্যাশবোর্ড</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className={`${card.color} p-6 rounded-lg`}>
            <h3 className="text-white text-lg">{card.label}</h3>
            <p className="text-white text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
