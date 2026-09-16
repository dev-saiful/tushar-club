import { useEffect, useState } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { ExternalLink, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface MenuItem {
  path: string
  label: string
  icon: string
  badgeKey?: keyof PendingCounts
}

const menuItems: MenuItem[] = [
  { path: '/admin', label: 'ড্যাশবোর্ড', icon: '📊' },
  { path: '/admin/committee', label: 'কমিটি', icon: '👥' },
  { path: '/admin/donors', label: 'রক্তদাতা', icon: '🩸' },
  { path: '/admin/projects', label: 'প্রকল্প', icon: '📁' },
  { path: '/admin/gallery', label: 'গ্যালারি', icon: '🖼️' },
  { path: '/admin/memberships', label: 'সদস্যপদ', icon: '📝', badgeKey: 'pendingMemberships' },
  { path: '/admin/blood-requests', label: 'রক্তদাতা নিবন্ধন অনুরোধ', icon: '💉', badgeKey: 'pendingBloodRequests' },
  { path: '/admin/donations', label: 'দান', icon: '💰', badgeKey: 'pendingDonations' },
  { path: '/admin/messages', label: 'বার্তা', icon: '✉️', badgeKey: 'unreadMessages' },
]

interface PendingCounts {
  pendingMemberships: number
  pendingBloodRequests: number
  pendingDonations: number
  unreadMessages: number
}

export default function AdminLayout() {
  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState<PendingCounts>({
    pendingMemberships: 0,
    pendingBloodRequests: 0,
    pendingDonations: 0,
    unreadMessages: 0,
  })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/admin/login')
        return
      }

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!adminUser) {
        await supabase.auth.signOut()
        navigate('/admin/login')
        return
      }

      setLoading(false)
    }

    checkAuth()
  }, [navigate])

  useEffect(() => {
    const fetchCounts = async () => {
      const [memberships, bloodRequests, donations, messages] = await Promise.all([
        supabase.from('membership_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('blood_donor_registrations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('donations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false),
      ])

      setCounts({
        pendingMemberships: memberships.count || 0,
        pendingBloodRequests: bloodRequests.count || 0,
        pendingDonations: donations.count || 0,
        unreadMessages: messages.count || 0,
      })
    }

    fetchCounts()

    // Refresh badge counts whenever the admin navigates to a different page
    const interval = setInterval(fetchCounts, 30000)

    return () => clearInterval(interval)
  }, [location.pathname])

  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (!confirm('আপনি কি লগ আউট করতে চান?')) return
    setLoggingOut(true)
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-800 text-white p-4 shrink-0">
        <h2 className="text-xl font-bold mb-4 md:mb-6 text-center">অ্যাডমিন প্যানেল</h2>
        <nav className="flex md:block gap-1 overflow-x-auto pb-2 md:pb-0">
          {menuItems.map((item) => {
            const badgeValue = item.badgeKey ? counts[item.badgeKey] : undefined
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`whitespace-nowrap px-4 py-2 rounded mb-0 md:mb-1 flex items-center gap-2 ${
                  location.pathname === item.path
                    ? 'bg-blue-600'
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
                {badgeValue ? (
                  <span className="ml-auto min-w-[20px] h-5 px-1.5 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold">
                    {badgeValue > 99 ? '99+' : badgeValue}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </nav>
        <div className="flex md:block gap-2 mt-2 md:mt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-center text-sm flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            ওয়েবসাইট দেখুন
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex-1 mt-0 md:mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-3.5 h-3.5" />
            {loggingOut ? 'লগ আউট হচ্ছে...' : 'লগ আউট'}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
