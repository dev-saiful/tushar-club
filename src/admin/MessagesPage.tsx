import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { ContactMessageRow } from '../lib/db'
import { PageHeader } from './ui'

export default function MessagesPage() {
  const [rows, setRows] = useState<ContactMessageRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRows = async () => {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    if (data) setRows(data as ContactMessageRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const markRead = async (id: string) => {
    await supabase.from('contact_messages').update({ read: true }).eq('id', id)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    fetchRows()
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="বার্তা" />
      <div className="bg-gray-800 rounded-lg overflow-auto">
        <table className="w-full text-sm text-gray-200">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="px-4 py-3">নাম</th>
              <th className="px-4 py-3">ফোন</th>
              <th className="px-4 py-3">বার্তা</th>
              <th className="px-4 py-3">অবস্থা</th>
              <th className="px-4 py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="px-4 py-3 font-bold">{r.name}</td>
                <td className="px-4 py-3">{r.phone}</td>
                <td className="px-4 py-3 max-w-xs">{r.message}</td>
                <td className="px-4 py-3">{r.read ? 'পঠিত' : 'অপঠিত'}</td>
                <td className="px-4 py-3 flex gap-2">
                  {!r.read && (
                    <button onClick={() => markRead(r.id)} className="px-3 py-1 bg-blue-600 rounded text-white text-xs">পঠিত করুন</button>
                  )}
                  <button onClick={() => handleDelete(r.id)} className="px-3 py-1 bg-red-600 rounded text-white text-xs">মুছুন</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="text-gray-400 p-4 text-center">কোনো বার্তা নেই</p>}
      </div>
    </div>
  )
}
