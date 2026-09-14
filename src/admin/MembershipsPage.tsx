import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { MembershipApplicationRow } from '../lib/db'
import { PageHeader, StatusBadge } from './ui'

export default function MembershipsPage() {
  const [rows, setRows] = useState<MembershipApplicationRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRows = async () => {
    const { data } = await supabase.from('membership_applications').select('*').order('created_at', { ascending: false })
    if (data) setRows(data as MembershipApplicationRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const setStatus = async (row: MembershipApplicationRow, status: 'approved' | 'rejected') => {
    const member_id = status === 'approved' ? (row.member_id || `STC-${Math.floor(1000 + Math.random() * 9000)}`) : row.member_id
    await supabase.from('membership_applications').update({ status, member_id }).eq('id', row.id)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('membership_applications').delete().eq('id', id)
    fetchRows()
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="সদস্যপদ আবেদন" />
      <div className="bg-gray-800 rounded-lg overflow-auto">
        <table className="w-full text-sm text-gray-200">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="px-4 py-3">নাম</th>
              <th className="px-4 py-3">ফোন</th>
              <th className="px-4 py-3">রক্তের গ্রুপ</th>
              <th className="px-4 py-3">ঠিকানা</th>
              <th className="px-4 py-3">সদস্য আইডি</th>
              <th className="px-4 py-3">স্ট্যাটাস</th>
              <th className="px-4 py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="px-4 py-3 font-bold">{r.full_name}</td>
                <td className="px-4 py-3">{r.phone}</td>
                <td className="px-4 py-3">{r.blood_group}</td>
                <td className="px-4 py-3">{r.address}</td>
                <td className="px-4 py-3 font-mono">{r.member_id || '-'}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3 flex gap-2">
                  {r.status === 'pending' && (
                    <>
                      <button onClick={() => setStatus(r, 'approved')} className="px-3 py-1 bg-green-600 rounded text-white text-xs">অনুমোদন</button>
                      <button onClick={() => setStatus(r, 'rejected')} className="px-3 py-1 bg-red-600 rounded text-white text-xs">বাতিল</button>
                    </>
                  )}
                  <button onClick={() => handleDelete(r.id)} className="px-3 py-1 bg-gray-600 rounded text-white text-xs">মুছুন</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="text-gray-400 p-4 text-center">কোনো আবেদন নেই</p>}
      </div>
    </div>
  )
}
