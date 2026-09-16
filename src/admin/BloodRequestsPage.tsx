import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { supabase } from '../lib/supabase'
import type { BloodDonorRegistrationRow } from '../lib/db'
import { PageHeader, StatusBadge } from './ui'
import DataTable from './DataTable'

export default function BloodRequestsPage() {
  const [rows, setRows] = useState<BloodDonorRegistrationRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRows = async () => {
    const { data } = await supabase.from('blood_donor_registrations').select('*').order('created_at', { ascending: false })
    if (data) setRows(data as BloodDonorRegistrationRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const setStatus = async (row: BloodDonorRegistrationRow, status: 'verified' | 'rejected') => {
    const { error } = await supabase.from('blood_donor_registrations').update({ status }).eq('id', row.id)
    if (error) {
      alert('নিবন্ধন আপডেট করা যায়নি: ' + error.message)
      return
    }
    if (status === 'verified') {
      // Verified donor is added to the blood donor list shown on the website and admin panel
      const { data: existingDonor } = await supabase
        .from('blood_donors')
        .select('id')
        .eq('phone', row.donor_phone)
        .maybeSingle()
      if (!existingDonor) {
        const { error: insertError } = await supabase.from('blood_donors').insert({
          name: row.donor_name,
          blood_group: row.blood_group,
          phone: row.donor_phone,
          area: row.donor_area,
          available: true,
        })
        if (insertError) {
          alert('রক্তদাতার তালিকায় যোগ করা যায়নি: ' + insertError.message)
        }
      }
    }
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('blood_donor_registrations').delete().eq('id', id)
    fetchRows()
  }

  const columns = useMemo<ColumnDef<BloodDonorRegistrationRow, unknown>[]>(() => [
    { accessorKey: 'donor_name', header: 'নাম', cell: (c) => <span className="font-bold">{c.getValue() as string}</span> },
    { accessorKey: 'donor_phone', header: 'ফোন' },
    { accessorKey: 'blood_group', header: 'গ্রুপ' },
    { accessorKey: 'donor_area', header: 'এলাকা' },
    { accessorKey: 'status', header: 'স্ট্যাটাস', cell: (c) => <StatusBadge status={c.getValue() as string} /> },
    {
      id: 'actions',
      header: 'অ্যাকশন',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end md:justify-start">
          {row.original.status === 'pending' && (
            <>
              <button onClick={() => setStatus(row.original, 'verified')} className="px-3 py-1 bg-green-600 rounded text-white text-xs">যাচাই</button>
              <button onClick={() => setStatus(row.original, 'rejected')} className="px-3 py-1 bg-red-600 rounded text-white text-xs">বাতিল</button>
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
      <PageHeader title="রক্তদাতা নিবন্ধন অনুরোধ" />
      <DataTable columns={columns} data={rows} searchPlaceholder="নাম, ফোন বা এলাকা লিখে খুঁজুন..." emptyMessage="কোনো নিবন্ধন নেই" />
    </div>
  )
}
