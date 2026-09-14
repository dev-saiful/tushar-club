import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { BloodDonorRegistrationRow } from '../lib/db'
import { PageHeader, StatusBadge } from './ui'

export default function BloodRequestsPage() {
  const [rows, setRows] = useState<BloodDonorRegistrationRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRows = async () => {
    const { data } = await supabase.from('blood_donor_registrations').select('*').order('created_at', { ascending: false })
    if (data) setRows(data as BloodDonorRegistrationRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const setStatus = async (id: string, status: 'verified' | 'rejected') => {
    await supabase.from('blood_donor_registrations').update({ status }).eq('id', id)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('blood_donor_registrations').delete().eq('id', id)
    fetchRows()
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="রক্তদাতা নিবন্ধন" />
      <div className="bg-gray-800 rounded-lg overflow-auto">
        <table className="w-full text-sm text-gray-200">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="px-4 py-3">নাম</th>
              <th className="px-4 py-3">ফোন</th>
              <th className="px-4 py-3">গ্রুপ</th>
              <th className="px-4 py-3">এলাকা</th>
              <th className="px-4 py-3">স্ট্যাটাস</th>
              <th className="px-4 py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="px-4 py-3 font-bold">{r.donor_name}</td>
                <td className="px-4 py-3">{r.donor_phone}</td>
                <td className="px-4 py-3">{r.blood_group}</td>
                <td className="px-4 py-3">{r.donor_area}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3 flex gap-2">
                  {r.status === 'pending' && (
                    <>
                      <button onClick={() => setStatus(r.id, 'verified')} className="px-3 py-1 bg-green-600 rounded text-white text-xs">যাচাই</button>
                      <button onClick={() => setStatus(r.id, 'rejected')} className="px-3 py-1 bg-red-600 rounded text-white text-xs">বাতিল</button>
                    </>
                  )}
                  <button onClick={() => handleDelete(r.id)} className="px-3 py-1 bg-gray-600 rounded text-white text-xs">মুছুন</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="text-gray-400 p-4 text-center">কোনো নিবন্ধন নেই</p>}
      </div>
    </div>
  )
}
