import { useEffect, useState } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const menuItems = [
  { path: '/admin', label: 'ড্যাশবোর্ড', icon: '📊' },
  { path: '/admin/committee', label: 'কমিটি', icon: '👥' },
  { path: '/admin/donors', label: 'রক্তদাতা', icon: '🩸' },
  { path: '/admin/projects', label: 'প্রকল্প', icon: '📁' },
  { path: '/admin/gallery', label: 'গ্যালারি', icon: '🖼️' },
  { path: '/admin/memberships', label: 'সদস্যপদ', icon: '📝' },
  { path: '/admin/blood-requests', label: 'রক্তের অনুরোধ', icon: '💉' },
  { path: '/admin/donations', label: 'দান', icon: '💰' },
  { path: '/admin/messages', label: 'বার্তা', icon: '✉️' },
]

export default function AdminLayout() {
  const [loading, setLoading] = useState(true)
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

  const handleLogout = async () => {
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
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap px-4 py-2 rounded mb-0 md:mb-1 block ${
                location.pathname === item.path
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex md:block gap-2 mt-2 md:mt-4">
          <Link
            to="/"
            className="flex-1 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-center text-sm"
          >
            ওয়েবসাইট দেখুন
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 mt-0 md:mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm"
          >
            লগ আউট
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
