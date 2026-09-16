import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { supabase } from '../lib/supabase'
import type { MembershipApplicationRow } from '../lib/db'
import { PageHeader, StatusBadge } from './ui'
import DataTable from './DataTable'

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
    const { error } = await supabase.from('membership_applications').update({ status, member_id }).eq('id', row.id)
    if (error) {
      alert('আবেদন আপডেট করা যায়নি: ' + error.message)
      return
    }
    if (status === 'approved') {
      // Approved member is added to the existing committee list and blood donor list
      const { data: existingCommittee } = await supabase
        .from('committee_members')
        .select('id')
        .eq('phone', row.phone)
        .maybeSingle()
      if (!existingCommittee) {
        await supabase.from('committee_members').insert({
          name: row.full_name,
          designation: 'সদস্য',
          phone: row.phone,
          area: row.address,
          role: 'executive',
        })
      }
      const { data: existingDonor } = await supabase
        .from('blood_donors')
        .select('id')
        .eq('phone', row.phone)
        .maybeSingle()
      if (!existingDonor) {
        await supabase.from('blood_donors').insert({
          name: row.full_name,
          blood_group: row.blood_group,
          phone: row.phone,
          area: row.address,
          available: true,
        })
      }
    }
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('membership_applications').delete().eq('id', id)
    fetchRows()
  }

  const columns = useMemo<ColumnDef<MembershipApplicationRow, unknown>[]>(() => [
    { accessorKey: 'full_name', header: 'নাম', cell: (c) => <span className="font-bold">{c.getValue() as string}</span> },
    { accessorKey: 'phone', header: 'ফোন' },
    { accessorKey: 'blood_group', header: 'গ্রুপ' },
    { accessorKey: 'address', header: 'ঠিকানা' },
    { accessorKey: 'member_id', header: 'সদস্য আইডি', cell: (c) => <span className="font-mono">{(c.getValue() as string) || '-'}</span> },
    { accessorKey: 'status', header: 'স্ট্যাটাস', cell: (c) => <StatusBadge status={c.getValue() as string} /> },
    {
      id: 'actions',
      header: 'অ্যাকশন',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end md:justify-start">
          {row.original.status === 'pending' && (
            <>
              <button onClick={() => setStatus(row.original, 'approved')} className="px-3 py-1 bg-green-600 rounded text-white text-xs">অনুমোদন</button>
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
      <PageHeader title="সদস্যপদ আবেদন" />
      <DataTable columns={columns} data={rows} searchPlaceholder="নাম, ফোন বা ঠিকানা লিখে খুঁজুন..." emptyMessage="কোনো আবেদন নেই" />
    </div>
  )
}
