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
        .select('id, photo_url')
        .eq('phone', row.phone)
        .maybeSingle()
      if (!existingCommittee) {
        // Append to the end of the manual order instead of defaulting to 0.
        const { data: last } = await supabase
          .from('committee_members')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1)
          .maybeSingle()
        await supabase.from('committee_members').insert({
          name: row.full_name,
          designation: 'সদস্য',
          phone: row.phone,
          area: row.address,
          role: 'executive',
          photo_url: row.photo_url,
          display_order: (last?.display_order ?? -1) + 1,
        })
      } else if (row.photo_url && !existingCommittee.photo_url) {
        // Fill in the photo the applicant uploaded without overwriting an admin-set one
        await supabase.from('committee_members').update({ photo_url: row.photo_url }).eq('id', existingCommittee.id)
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
    {
      id: 'photo_url',
      header: 'ছবি',
      enableSorting: false,
      cell: ({ row }) =>
        row.original.photo_url ? (
          <img
            src={row.original.photo_url}
            alt={row.original.full_name}
            className="w-10 h-10 rounded-full object-cover border border-gray-600"
          />
        ) : (
          <span className="text-gray-500">-</span>
        ),
    },
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
