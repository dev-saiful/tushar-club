import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { supabase } from '../lib/supabase'
import type { ContactMessageRow } from '../lib/db'
import { PageHeader } from './ui'
import DataTable from './DataTable'

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

  const columns = useMemo<ColumnDef<ContactMessageRow, unknown>[]>(() => [
    { accessorKey: 'name', header: 'নাম', cell: (c) => <span className="font-bold">{c.getValue() as string}</span> },
    { accessorKey: 'phone', header: 'ফোন' },
    { accessorKey: 'message', header: 'বার্তা' },
    { accessorKey: 'read', header: 'অবস্থা', cell: (c) => ((c.getValue() as boolean) ? 'পঠিত' : 'অপঠিত') },
    {
      id: 'actions',
      header: 'অ্যাকশন',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end md:justify-start">
          {!row.original.read && (
            <button onClick={() => markRead(row.original.id)} className="px-3 py-1 bg-blue-600 rounded text-white text-xs">পঠিত করুন</button>
          )}
          <button onClick={() => handleDelete(row.original.id)} className="px-3 py-1 bg-red-600 rounded text-white text-xs">মুছুন</button>
        </div>
      ),
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="বার্তা" />
      <DataTable columns={columns} data={rows} searchPlaceholder="নাম বা বার্তা লিখে খুঁজুন..." emptyMessage="কোনো বার্তা নেই" />
    </div>
  )
}
