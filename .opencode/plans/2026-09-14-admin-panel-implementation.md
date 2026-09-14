# Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an admin panel with Supabase backend for managing content and form submissions.

**Architecture:** Vite + React SPA with React Router for admin routes, Supabase for database and auth. Public pages read from Supabase, forms write to Supabase, admin panel provides CRUD interface.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS, React Router, Supabase JS, Supabase Auth

## Global Constraints

- Keep existing Vite + React setup (no framework migration)
- Supabase for all database operations
- Supabase Auth for admin authentication
- RLS policies for public read / admin-only write
- Minimal CRUD admin UI (tables + modals)
- Bangla-first UI maintained

---

## Phase 1: Setup & Configuration

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: existing package.json
- Produces: updated package.json with new dependencies

- [ ] **Step 1: Install React Router**

```bash
npm install react-router-dom
```

- [ ] **Step 2: Install Supabase client**

```bash
npm install @supabase/supabase-js
```

- [ ] **Step 3: Verify installation**

```bash
npm ls react-router-dom @supabase/supabase-js
```

Expected: Both packages listed with versions

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add react-router-dom and @supabase/supabase-js"
```

---

### Task 2: Create Supabase Client

**Files:**
- Create: `src/lib/supabase.ts`

**Interfaces:**
- Consumes: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY env vars
- Produces: `supabase` client export

- [ ] **Step 1: Create .env file**

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 2: Create supabase client**

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/supabase.ts .env
git commit -m "feat: add Supabase client initialization"
```

---

### Task 3: Create Database Tables via Supabase MCP

**Files:**
- None (database changes via MCP)

**Interfaces:**
- Consumes: Supabase MCP connection
- Produces: 8 tables + RLS policies

- [ ] **Step 1: Create committee_members table**

```sql
CREATE TABLE committee_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  phone TEXT,
  area TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('executive', 'advisor', 'coordinator')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 2: Create blood_donors table**

```sql
CREATE TABLE blood_donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+','A-','B+','B-','O+','O-','AB+','AB-')),
  phone TEXT NOT NULL,
  area TEXT NOT NULL,
  last_donation DATE,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 3: Create projects table**

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_en TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT,
  status TEXT NOT NULL CHECK (status IN ('চলমান', 'আসন্ন', 'সম্পন্ন')),
  image_url TEXT,
  highlights TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 4: Create gallery_items table**

```sql
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 5: Create membership_applications table**

```sql
CREATE TABLE membership_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  occupation TEXT,
  address TEXT NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  member_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 6: Create blood_donor_registrations table**

```sql
CREATE TABLE blood_donor_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  donor_phone TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  donor_area TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 7: Create donations table**

```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  fund_type TEXT NOT NULL,
  trx_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 8: Create contact_messages table**

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 9: Create admin_users table**

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 10: Enable RLS on all tables**

```sql
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_donor_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
```

- [ ] **Step 11: Create public read policies**

```sql
CREATE POLICY "Public read" ON committee_members FOR SELECT USING (true);
CREATE POLICY "Public read" ON blood_donors FOR SELECT USING (true);
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON gallery_items FOR SELECT USING (true);
```

- [ ] **Step 12: Create admin write policies (pattern for all tables)**

```sql
-- committee_members
CREATE POLICY "Admin insert" ON committee_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON committee_members FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON committee_members FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- blood_donors
CREATE POLICY "Admin insert" ON blood_donors FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON blood_donors FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON blood_donors FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- projects
CREATE POLICY "Admin insert" ON projects FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON projects FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON projects FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- gallery_items
CREATE POLICY "Admin insert" ON gallery_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON gallery_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON gallery_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- membership_applications
CREATE POLICY "Admin insert" ON membership_applications FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON membership_applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON membership_applications FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- blood_donor_registrations
CREATE POLICY "Admin insert" ON blood_donor_registrations FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON blood_donor_registrations FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON blood_donor_registrations FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- donations
CREATE POLICY "Admin insert" ON donations FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON donations FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON donations FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- contact_messages
CREATE POLICY "Admin insert" ON contact_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON contact_messages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON contact_messages FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
```

- [ ] **Step 13: Verify tables exist**

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

Expected: 9 tables listed (8 content + admin_users)

---

## Phase 2: Admin Layer

### Task 4: Set Up React Router

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: existing App.tsx
- Produces: Router configuration with public and admin routes

- [ ] **Step 1: Create basic router structure**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SurjoHero from './components/SurjoHero'
import AboutSection from './components/AboutSection'
import PillarsSection from './components/PillarsSection'
import ProjectsSection from './components/ProjectsSection'
import BloodNetworkSection from './components/BloodNetworkSection'
import CommitteeSection from './components/CommitteeSection'
import GallerySection from './components/GallerySection'
import SurjoFooter from './components/SurjoFooter'
import SurjoNavbar from './components/SurjoNavbar'

function HomePage() {
  return (
    <>
      <SurjoNavbar />
      <SurjoHero />
      <AboutSection />
      <PillarsSection />
      <ProjectsSection />
      <BloodNetworkSection />
      <CommitteeSection />
      <GallerySection />
      <SurjoFooter />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 2: Verify app still works**

```bash
npm run dev
```

Expected: App loads normally at localhost:3000

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add React Router with homepage route"
```

---

### Task 5: Create Admin Layout

**Files:**
- Create: `src/admin/AdminLayout.tsx`

**Interfaces:**
- Consumes: Supabase auth session
- Produces: Protected admin layout with sidebar

- [ ] **Step 1: Create AdminLayout component**

```tsx
// src/admin/AdminLayout.tsx
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

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
  const [user, setUser] = useState<User | null>(null)
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

      // Check if user is admin
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!adminUser) {
        navigate('/admin/login')
        return
      }

      setUser(session.user)
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
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6 text-center">অ্যাডমিন প্যানেল</h2>
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded mb-1 ${
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
        <button
          onClick={handleLogout}
          className="mt-6 w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          লগ আউট
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/admin/AdminLayout.tsx
git commit -m "feat: add admin layout with sidebar and auth guard"
```

---

### Task 6: Create Admin Login Page

**Files:**
- Create: `src/admin/LoginPage.tsx`

**Interfaces:**
- Consumes: Supabase auth
- Produces: Login form, redirects to dashboard on success

- [ ] **Step 1: Create LoginPage component**

```tsx
// src/admin/LoginPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (!adminUser) {
      setError('এই ইমেইল দিয়ে অ্যাডমিন অ্যাক্সেস নেই')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          অ্যাডমিন লগইন
        </h1>
        
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-white mb-2">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/admin/LoginPage.tsx
git commit -m "feat: add admin login page"
```

---

### Task 7: Add Admin Routes to App

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: AdminLayout, LoginPage
- Produces: Complete router with admin routes

- [ ] **Step 1: Update App.tsx with admin routes**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SurjoHero from './components/SurjoHero'
import AboutSection from './components/AboutSection'
import PillarsSection from './components/PillarsSection'
import ProjectsSection from './components/ProjectsSection'
import BloodNetworkSection from './components/BloodNetworkSection'
import CommitteeSection from './components/CommitteeSection'
import GallerySection from './components/GallerySection'
import SurjoFooter from './components/SurjoFooter'
import SurjoNavbar from './components/SurjoNavbar'
import AdminLayout from './admin/AdminLayout'
import LoginPage from './admin/LoginPage'

function HomePage() {
  return (
    <>
      <SurjoNavbar />
      <SurjoHero />
      <AboutSection />
      <PillarsSection />
      <ProjectsSection />
      <BloodNetworkSection />
      <CommitteeSection />
      <GallerySection />
      <SurjoFooter />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          {/* Admin pages will be added here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 2: Verify app works**

```bash
npm run dev
```

Expected: Homepage loads, /admin/login shows login page

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add admin routes to router"
```

---

### Task 8: Create Dashboard Page

**Files:**
- Create: `src/admin/Dashboard.tsx`

**Interfaces:**
- Consumes: Supabase tables
- Produces: Stats dashboard with counts

- [ ] **Step 1: Create Dashboard component**

```tsx
// src/admin/Dashboard.tsx
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
```

- [ ] **Step 2: Add Dashboard route to App.tsx**

```tsx
// In src/App.tsx, update the admin route:
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
</Route>
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/admin/Dashboard.tsx src/App.tsx
git commit -m "feat: add admin dashboard with stats"
```

---

### Task 9: Seed Initial Data

**Files:**
- None (database inserts via MCP)

**Interfaces:**
- Consumes: clubData.ts exports
- Produces: Populated database tables

- [ ] **Step 1: Seed committee_members**

Insert all 12 members from `COMMITTEE_MEMBERS` array in `src/data/clubData.ts`

- [ ] **Step 2: Seed blood_donors**

Insert all 8 donors from `BLOOD_DONORS` array in `src/data/clubData.ts`

- [ ] **Step 3: Seed projects**

Insert all 6 projects from `CLUB_PROJECTS` array in `src/data/clubData.ts`

- [ ] **Step 4: Seed gallery_items**

Insert all 6 items from `GALLERY_ITEMS` array in `src/data/clubData.ts`

- [ ] **Step 5: Create first admin user**

```sql
-- First, sign up via Supabase Auth UI or API
-- Then insert into admin_users:
INSERT INTO admin_users (id, email, role)
VALUES ('auth-user-id', 'admin@example.com', 'super_admin');
```

- [ ] **Step 6: Verify data exists**

```sql
SELECT COUNT(*) FROM committee_members;
SELECT COUNT(*) FROM blood_donors;
SELECT COUNT(*) FROM projects;
SELECT COUNT(*) FROM gallery_items;
```

Expected: 12, 8, 6, 6 respectively

---

## Phase 3: Public Pages Migration

### Task 10: Create Supabase Data Hooks

**Files:**
- Create: `src/hooks/useCommitteeMembers.ts`
- Create: `src/hooks/useBloodDonors.ts`
- Create: `src/hooks/useProjects.ts`
- Create: `src/hooks/useGalleryItems.ts`

**Interfaces:**
- Consumes: Supabase client
- Produces: React hooks returning data arrays

- [ ] **Step 1: Create useCommitteeMembers hook**

```typescript
// src/hooks/useCommitteeMembers.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { CommitteeMember } from '../data/clubData'

export function useCommitteeMembers() {
  const [members, setMembers] = useState<CommitteeMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('committee_members')
        .select('*')
        .order('created_at', { ascending: true })

      if (!error && data) {
        setMembers(data)
      }
      setLoading(false)
    }

    fetchMembers()
  }, [])

  return { members, loading }
}
```

- [ ] **Step 2: Create useBloodDonors hook**

```typescript
// src/hooks/useBloodDonors.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { BloodDonor } from '../data/clubData'

export function useBloodDonors() {
  const [donors, setDonors] = useState<BloodDonor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDonors = async () => {
      const { data, error } = await supabase
        .from('blood_donors')
        .select('*')
        .order('created_at', { ascending: true })

      if (!error && data) {
        setDonors(data)
      }
      setLoading(false)
    }

    fetchDonors()
  }, [])

  return { donors, loading }
}
```

- [ ] **Step 3: Create useProjects hook**

```typescript
// src/hooks/useProjects.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { ClubProject } from '../data/clubData'

export function useProjects() {
  const [projects, setProjects] = useState<ClubProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true })

      if (!error && data) {
        setProjects(data)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return { projects, loading }
}
```

- [ ] **Step 4: Create useGalleryItems hook**

```typescript
// src/hooks/useGalleryItems.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { GalleryItem } from '../data/clubData'

export function useGalleryItems() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('date', { ascending: false })

      if (!error && data) {
        setItems(data)
      }
      setLoading(false)
    }

    fetchItems()
  }, [])

  return { items, loading }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks/
git commit -m "feat: add Supabase data hooks for public pages"
```

---

### Task 11: Update CommitteeSection

**Files:**
- Modify: `src/components/CommitteeSection.tsx`

**Interfaces:**
- Consumes: useCommitteeMembers hook
- Produces: Committee section with dynamic data

- [ ] **Step 1: Update CommitteeSection to use hook**

Replace the hardcoded `COMMITTEE_MEMBERS` import with `useCommitteeMembers()` hook. Keep the same JSX structure, just replace the data source.

- [ ] **Step 2: Verify component renders**

```bash
npm run dev
```

Expected: Committee section shows data from Supabase

- [ ] **Step 3: Commit**

```bash
git add src/components/CommitteeSection.tsx
git commit -m "feat: use Supabase data for CommitteeSection"
```

---

### Task 12: Update BloodNetworkSection

**Files:**
- Modify: `src/components/BloodNetworkSection.tsx`

**Interfaces:**
- Consumes: useBloodDonors hook
- Produces: Blood network section with dynamic data

- [ ] **Step 1: Update BloodNetworkSection to use hook**

Replace the hardcoded `BLOOD_DONORS` import with `useBloodDonors()` hook. Keep the same JSX structure, just replace the data source.

- [ ] **Step 2: Verify component renders**

```bash
npm run dev
```

Expected: Blood network section shows data from Supabase

- [ ] **Step 3: Commit**

```bash
git add src/components/BloodNetworkSection.tsx
git commit -m "feat: use Supabase data for BloodNetworkSection"
```

---

### Task 13: Update ProjectsSection

**Files:**
- Modify: `src/components/ProjectsSection.tsx`

**Interfaces:**
- Consumes: useProjects hook
- Produces: Projects section with dynamic data

- [ ] **Step 1: Update ProjectsSection to use hook**

Replace the hardcoded `CLUB_PROJECTS` import with `useProjects()` hook. Keep the same JSX structure, just replace the data source.

- [ ] **Step 2: Verify component renders**

```bash
npm run dev
```

Expected: Projects section shows data from Supabase

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectsSection.tsx
git commit -m "feat: use Supabase data for ProjectsSection"
```

---

### Task 14: Update GallerySection

**Files:**
- Modify: `src/components/GallerySection.tsx`

**Interfaces:**
- Consumes: useGalleryItems hook
- Produces: Gallery section with dynamic data

- [ ] **Step 1: Update GallerySection to use hook**

Replace the hardcoded `GALLERY_ITEMS` import with `useGalleryItems()` hook. Keep the same JSX structure, just replace the data source.

- [ ] **Step 2: Verify component renders**

```bash
npm run dev
```

Expected: Gallery section shows data from Supabase

- [ ] **Step 3: Commit**

```bash
git add src/components/GallerySection.tsx
git commit -m "feat: use Supabase data for GallerySection"
```

---

## Phase 4: Forms Migration

### Task 15: Update MembershipModal

**Files:**
- Modify: `src/components/MembershipModal.tsx`

**Interfaces:**
- Consumes: Supabase client
- Produces: Form that writes to membership_applications table

- [ ] **Step 1: Update MembershipModal to write to Supabase**

Replace the local state-only form submission with a Supabase insert:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const { error } = await supabase
    .from('membership_applications')
    .insert({
      full_name: formData.fullName,
      father_name: formData.fatherName,
      phone: formData.phone,
      blood_group: formData.bloodGroup,
      occupation: formData.occupation,
      address: formData.address,
      reason: formData.reason,
    })

  if (!error) {
    // Show success message
    setShowSuccess(true)
  }
}
```

- [ ] **Step 2: Verify form submits**

```bash
npm run dev
```

Expected: Form submits to Supabase, success message shows

- [ ] **Step 3: Commit**

```bash
git add src/components/MembershipModal.tsx
git commit -m "feat: MembershipModal writes to Supabase"
```

---

### Task 16: Update BloodDonorModal

**Files:**
- Modify: `src/components/BloodDonorModal.tsx`

**Interfaces:**
- Consumes: Supabase client
- Produces: Form that writes to blood_donor_registrations table

- [ ] **Step 1: Update BloodDonorModal to write to Supabase**

Replace the local state-only form submission with a Supabase insert:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const { error } = await supabase
    .from('blood_donor_registrations')
    .insert({
      donor_name: formData.donorName,
      donor_phone: formData.donorPhone,
      blood_group: formData.bloodGroup,
      donor_area: formData.donorArea,
    })

  if (!error) {
    setShowSuccess(true)
  }
}
```

- [ ] **Step 2: Verify form submits**

```bash
npm run dev
```

Expected: Form submits to Supabase, success message shows

- [ ] **Step 3: Commit**

```bash
git add src/components/BloodDonorModal.tsx
git commit -m "feat: BloodDonorModal writes to Supabase"
```

---

### Task 17: Update DonationModal

**Files:**
- Modify: `src/components/DonationModal.tsx`

**Interfaces:**
- Consumes: Supabase client
- Produces: Form that writes to donations table

- [ ] **Step 1: Update DonationModal to write to Supabase**

Replace the local state-only form submission with a Supabase insert:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const { error } = await supabase
    .from('donations')
    .insert({
      donor_name: formData.donorName,
      amount: parseFloat(formData.amount),
      fund_type: formData.fundType,
      trx_id: formData.trxId,
    })

  if (!error) {
    setShowSuccess(true)
  }
}
```

- [ ] **Step 2: Verify form submits**

```bash
npm run dev
```

Expected: Form submits to Supabase, success message shows

- [ ] **Step 3: Commit**

```bash
git add src/components/DonationModal.tsx
git commit -m "feat: DonationModal writes to Supabase"
```

---

### Task 18: Update SurjoFooter Contact Form

**Files:**
- Modify: `src/components/SurjoFooter.tsx`

**Interfaces:**
- Consumes: Supabase client
- Produces: Form that writes to contact_messages table

- [ ] **Step 1: Update SurjoFooter to write to Supabase**

Replace the local state-only form submission with a Supabase insert:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const { error } = await supabase
    .from('contact_messages')
    .insert({
      name: formData.name,
      phone: formData.phone,
      message: formData.text,
    })

  if (!error) {
    setShowSuccess(true)
  }
}
```

- [ ] **Step 2: Verify form submits**

```bash
npm run dev
```

Expected: Form submits to Supabase, success message shows

- [ ] **Step 3: Commit**

```bash
git add src/components/SurjoFooter.tsx
git commit -m "feat: SurjoFooter contact form writes to Supabase"
```

---

## Phase 5: Admin CRUD Pages

### Task 19: Create Committee CRUD Page

**Files:**
- Create: `src/admin/CommitteePage.tsx`

**Interfaces:**
- Consumes: Supabase committee_members table
- Produces: CRUD interface for committee members

- [ ] **Step 1: Create CommitteePage component**

Create a page with:
- Table listing all committee members
- Add button opening a modal with form
- Edit button per row opening modal with pre-filled form
- Delete button per row with confirmation
- Fields: name, designation, phone, area, role

- [ ] **Step 2: Add route to App.tsx**

```tsx
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="committee" element={<CommitteePage />} />
</Route>
```

- [ ] **Step 3: Verify CRUD operations**

```bash
npm run dev
```

Expected: Can add, edit, delete committee members

- [ ] **Step 4: Commit**

```bash
git add src/admin/CommitteePage.tsx src/App.tsx
git commit -m "feat: add committee members CRUD page"
```

---

### Task 20: Create Donors CRUD Page

**Files:**
- Create: `src/admin/DonorsPage.tsx`

**Interfaces:**
- Consumes: Supabase blood_donors table
- Produces: CRUD interface for blood donors

- [ ] **Step 1: Create DonorsPage component**

Create a page with:
- Table listing all blood donors
- Add button opening a modal with form
- Edit button per row opening modal with pre-filled form
- Delete button per row with confirmation
- Blood group filter dropdown
- Fields: name, blood_group, phone, area, last_donation, available

- [ ] **Step 2: Add route to App.tsx**

```tsx
<Route path="donors" element={<DonorsPage />} />
```

- [ ] **Step 3: Verify CRUD operations**

```bash
npm run dev
```

Expected: Can add, edit, delete blood donors

- [ ] **Step 4: Commit**

```bash
git add src/admin/DonorsPage.tsx src/App.tsx
git commit -m "feat: add blood donors CRUD page"
```

---

### Task 21: Create Projects CRUD Page

**Files:**
- Create: `src/admin/ProjectsPage.tsx`

**Interfaces:**
- Consumes: Supabase projects table
- Produces: CRUD interface for projects

- [ ] **Step 1: Create ProjectsPage component**

Create a page with:
- Table listing all projects
- Add button opening a modal with form
- Edit button per row opening modal with pre-filled form
- Delete button per row with confirmation
- Category filter dropdown
- Fields: title, category, category_en, description, impact, status, image_url, highlights

- [ ] **Step 2: Add route to App.tsx**

```tsx
<Route path="projects" element={<ProjectsPage />} />
```

- [ ] **Step 3: Verify CRUD operations**

```bash
npm run dev
```

Expected: Can add, edit, delete projects

- [ ] **Step 4: Commit**

```bash
git add src/admin/ProjectsPage.tsx src/App.tsx
git commit -m "feat: add projects CRUD page"
```

---

### Task 22: Create Gallery CRUD Page

**Files:**
- Create: `src/admin/GalleryPage.tsx`

**Interfaces:**
- Consumes: Supabase gallery_items table
- Produces: CRUD interface for gallery items

- [ ] **Step 1: Create GalleryPage component**

Create a page with:
- Grid layout showing all gallery items
- Add button opening a modal with form
- Delete button per item with confirmation
- Fields: title, category, date, image_url

- [ ] **Step 2: Add route to App.tsx**

```tsx
<Route path="gallery" element={<GalleryPage />} />
```

- [ ] **Step 3: Verify CRUD operations**

```bash
npm run dev
```

Expected: Can add, delete gallery items

- [ ] **Step 4: Commit**

```bash
git add src/admin/GalleryPage.tsx src/App.tsx
git commit -m "feat: add gallery CRUD page"
```

---

### Task 23: Create Memberships Review Page

**Files:**
- Create: `src/admin/MembershipsPage.tsx`

**Interfaces:**
- Consumes: Supabase membership_applications table
- Produces: Review interface for membership applications

- [ ] **Step 1: Create MembershipsPage component**

Create a page with:
- Table listing all membership applications
- Status badges (pending, approved, rejected)
- Approve button per row
- Reject button per row
- Generate member_id (STC-XXXX) on approval

- [ ] **Step 2: Add route to App.tsx**

```tsx
<Route path="memberships" element={<MembershipsPage />} />
```

- [ ] **Step 3: Verify review operations**

```bash
npm run dev
```

Expected: Can approve/reject membership applications

- [ ] **Step 4: Commit**

```bash
git add src/admin/MembershipsPage.tsx src/App.tsx
git commit -m "feat: add memberships review page"
```

---

### Task 24: Create Blood Requests Review Page

**Files:**
- Create: `src/admin/BloodRequestsPage.tsx`

**Interfaces:**
- Consumes: Supabase blood_donor_registrations table
- Produces: Review interface for blood donor registrations

- [ ] **Step 1: Create BloodRequestsPage component**

Create a page with:
- Table listing all blood donor registrations
- Status badges (pending, verified, rejected)
- Verify button per row
- Reject button per row

- [ ] **Step 2: Add route to App.tsx**

```tsx
<Route path="blood-requests" element={<BloodRequestsPage />} />
```

- [ ] **Step 3: Verify review operations**

```bash
npm run dev
```

Expected: Can verify/reject blood donor registrations

- [ ] **Step 4: Commit**

```bash
git add src/admin/BloodRequestsPage.tsx src/App.tsx
git commit -m "feat: add blood requests review page"
```

---

### Task 25: Create Donations Review Page

**Files:**
- Create: `src/admin/DonationsPage.tsx`

**Interfaces:**
- Consumes: Supabase donations table
- Produces: Review interface for donations

- [ ] **Step 1: Create DonationsPage component**

Create a page with:
- Table listing all donations
- Status badges (pending, verified, rejected)
- Verify button per row
- Reject button per row

- [ ] **Step 2: Add route to App.tsx**

```tsx
<Route path="donations" element={<DonationsPage />} />
```

- [ ] **Step 3: Verify review operations**

```bash
npm run dev
```

Expected: Can verify/reject donations

- [ ] **Step 4: Commit**

```bash
git add src/admin/DonationsPage.tsx src/App.tsx
git commit -m "feat: add donations review page"
```

---

### Task 26: Create Messages Review Page

**Files:**
- Create: `src/admin/MessagesPage.tsx`

**Interfaces:**
- Consumes: Supabase contact_messages table
- Produces: Review interface for contact messages

- [ ] **Step 1: Create MessagesPage component**

Create a page with:
- Table listing all contact messages
- Read/unread status indicator
- Mark as read button per row
- Delete button per row with confirmation

- [ ] **Step 2: Add route to App.tsx**

```tsx
<Route path="messages" element={<MessagesPage />} />
```

- [ ] **Step 3: Verify review operations**

```bash
npm run dev
```

Expected: Can mark messages as read, delete messages

- [ ] **Step 4: Commit**

```bash
git add src/admin/MessagesPage.tsx src/App.tsx
git commit -m "feat: add messages review page"
```

---

## Final Verification

### Task 27: End-to-End Testing

**Files:**
- None

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified working system

- [ ] **Step 1: Test admin login flow**

1. Navigate to /admin/login
2. Enter credentials
3. Verify redirect to /admin/dashboard

- [ ] **Step 2: Test CRUD operations**

1. Navigate to each admin page
2. Add a new record
3. Edit the record
4. Delete the record

- [ ] **Step 3: Test public pages**

1. Navigate to homepage
2. Verify all sections load data from Supabase
3. Test form submissions (membership, blood donor, donation, contact)

- [ ] **Step 4: Test RLS policies**

1. Try accessing Supabase tables without auth
2. Verify public read works
3. Verify write operations require auth

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete admin panel implementation"
```
