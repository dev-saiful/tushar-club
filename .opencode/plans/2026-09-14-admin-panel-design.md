# Admin Panel Design Spec

## Overview

Add an admin panel to the Surjo Torun Club website for managing content (committee members, blood donors, projects, gallery) and processing form submissions (membership applications, blood donor registrations, donations, contact messages). Uses Supabase for database and authentication.

**Approach:** Incremental migration — keep Vite + React, add React Router + Supabase.

---

## Database Schema

### Committee Members
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

### Blood Donors
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

### Projects
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

### Gallery Items
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

### Membership Applications
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

### Blood Donor Registrations
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

### Donations
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

### Contact Messages
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

### Admin Users
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_donor_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read for content tables
CREATE POLICY "Public read" ON committee_members FOR SELECT USING (true);
CREATE POLICY "Public read" ON blood_donors FOR SELECT USING (true);
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON gallery_items FOR SELECT USING (true);

-- Admin-only write policies (apply to all tables)
-- Example for committee_members (repeat for others):
CREATE POLICY "Admin insert" ON committee_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin update" ON committee_members FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admin delete" ON committee_members FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
```

---

## Authentication

- **Method:** Supabase Auth (email/password)
- **Admin check:** Query `admin_users` table after login
- **Session:** Stored in Supabase client, persists across refreshes
- **Login flow:**
  1. Admin visits `/admin/login`
  2. Enters email/password
  3. Supabase Auth validates credentials
  4. Check `admin_users` for role
  5. Redirect to `/admin/dashboard`

---

## Admin Routes

```
/admin/login          → Login page
/admin                → Dashboard (stats overview)
/admin/committee      → Committee members CRUD
/admin/donors         → Blood donors CRUD
/admin/projects       → Projects CRUD
/admin/gallery        → Gallery items CRUD
/admin/memberships    → Membership applications (view/approve/reject)
/admin/blood-requests → Blood donor registrations (view/verify/reject)
/admin/donations      → Donation records (view/verify/reject)
/admin/messages       → Contact messages (view/mark read)
```

---

## Admin Pages

| Page | Features |
|------|----------|
| **Dashboard** | Stats cards (total members, donors, projects, pending applications) |
| **Committee** | Table + Add/Edit/Delete modal |
| **Donors** | Table + Add/Edit/Delete modal, blood group filter |
| **Projects** | Table + Add/Edit/Delete modal, category filter |
| **Gallery** | Grid + Add/Delete modal, image URL input |
| **Memberships** | Table with status badges, approve/reject buttons |
| **Blood Requests** | Table with status badges, verify/reject buttons |
| **Donations** | Table with status badges, verify/reject buttons |
| **Messages** | Table, mark as read, delete |

---

## File Structure

```
src/
├── components/           # Public components (unchanged)
├── data/                 # clubData.ts (kept as fallback/seed)
├── lib/
│   └── supabase.ts       # Supabase client init
├── admin/
│   ├── AdminLayout.tsx   # Sidebar + auth guard
│   ├── LoginPage.tsx
│   ├── Dashboard.tsx
│   ├── CommitteePage.tsx
│   ├── DonorsPage.tsx
│   ├── ProjectsPage.tsx
│   ├── GalleryPage.tsx
│   ├── MembershipsPage.tsx
│   ├── BloodRequestsPage.tsx
│   ├── DonationsPage.tsx
│   └── MessagesPage.tsx
├── App.tsx               # Router setup
├── main.tsx
└── index.css
```

---

## Data Migration Strategy

### Phase 1: Setup
- Add `react-router-dom` to existing app
- Add `@supabase/supabase-js` client
- Create Supabase tables via MCP
- Add `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Phase 2: Admin Layer
- Create `/admin` routes with auth guard
- Build admin pages (read from Supabase)
- Seed initial data from `clubData.ts` into Supabase

### Phase 3: Public Pages Migration
- Replace hardcoded data in public components with Supabase queries
- `CommitteeSection.tsx` → reads from `committee_members`
- `BloodNetworkSection.tsx` → reads from `blood_donors`
- `ProjectsSection.tsx` → reads from `projects`
- `GallerySection.tsx` → reads from `gallery_items`

### Phase 4: Forms Migration
- `MembershipModal.tsx` → writes to `membership_applications`
- `BloodDonorModal.tsx` → writes to `blood_donor_registrations`
- `DonationModal.tsx` → writes to `donations`
- `SurjoFooter.tsx` → writes to `contact_messages`

---

## Dependencies

```bash
npm install react-router-dom @supabase/supabase-js
```

---

## Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Success Criteria

1. Admin can log in via email/password
2. Admin can CRUD all content (committee, donors, projects, gallery)
3. Admin can view/process form submissions (memberships, blood requests, donations, messages)
4. Public pages read from Supabase instead of hardcoded data
5. Forms write to Supabase database
6. Data persists across refreshes
7. RLS policies protect write operations
