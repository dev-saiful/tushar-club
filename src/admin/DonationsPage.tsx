import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { supabase } from '../lib/supabase'
import type { DonationRow } from '../lib/db'
import { PageHeader, StatusBadge } from './ui'
import DataTable from './DataTable'

export default function DonationsPage() {
  const [rows, setRows] = useState<DonationRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRows = async () => {
    const { data } = await supabase.from('donations').select('*').order('created_at', { ascending: false })
    if (data) setRows(data as DonationRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const setStatus = async (id: string, status: 'verified' | 'rejected') => {
    await supabase.from('donations').update({ status }).eq('id', id)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('donations').delete().eq('id', id)
    fetchRows()
  }

  const columns = useMemo<ColumnDef<DonationRow, unknown>[]>(() => [
    { accessorKey: 'donor_name', header: 'দাতার নাম', cell: (c) => <span className="font-bold">{c.getValue() as string}</span> },
    { accessorKey: 'amount', header: 'পরিমাণ' },
    { accessorKey: 'fund_type', header: 'তহবিল' },
    { accessorKey: 'trx_id', header: 'TrxID', cell: (c) => <span className="font-mono">{(c.getValue() as string) || '-'}</span> },
    { accessorKey: 'status', header: 'স্ট্যাটাস', cell: (c) => <StatusBadge status={c.getValue() as string} /> },
    {
      id: 'actions',
      header: 'অ্যাকশন',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end md:justify-start">
          {row.original.status === 'pending' && (
            <>
              <button onClick={() => setStatus(row.original.id, 'verified')} className="px-3 py-1 bg-green-600 rounded text-white text-xs">যাচাই</button>
              <button onClick={() => setStatus(row.original.id, 'rejected')} className="px-3 py-1 bg-red-600 rounded text-white text-xs">বাতিল</button>
            </>
          )}
          <button onClick={() => handleDelete(row.original.id)} className="px-3 py-1 bg-gray-600 rounded text-white text-xs">মুছুন</button>
        </div>
      ),
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="অনুদান" />
      <DataTable columns={columns} data={rows} searchPlaceholder="নাম বা তহবিল লিখে খুঁজুন..." emptyMessage="কোনো অনুদান নেই" />
    </div>
  )
}
