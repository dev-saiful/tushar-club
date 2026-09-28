import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { supabase } from '../lib/supabase'
import type { CommitteeMemberRow } from '../lib/db'
import { PageHeader, Modal, Field, inputClass, PrimaryButton } from './ui'
import DataTable from './DataTable'
import ImageUpload from '../components/ImageUpload'

const emptyForm = { name: '', designation: '', phone: '', area: '', role: 'executive', photo_url: '' }

export default function CommitteePage() {
  const [rows, setRows] = useState<CommitteeMemberRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<CommitteeMemberRow | null>(null)
  const [form, setForm] = useState(emptyForm)

  const fetchRows = async () => {
    const { data } = await supabase.from('committee_members').select('*').order('created_at')
    if (data) setRows(data as CommitteeMemberRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (row: CommitteeMemberRow) => {
    setEditing(row)
    setForm({ name: row.name, designation: row.designation, phone: row.phone || '', area: row.area, role: row.role, photo_url: row.photo_url || '' })
    setShowModal(true)
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    const payload = { name: form.name, designation: form.designation, phone: form.phone || null, area: form.area, role: form.role, photo_url: form.photo_url || null }
    const { error } = editing
      ? await supabase.from('committee_members').update(payload).eq('id', editing.id)
      : await supabase.from('committee_members').insert(payload)
    if (error) {
      // e.g. the photo_url column is missing until docs/supabase-storage.sql is applied
      alert('সংরক্ষণ করা যায়নি: ' + error.message)
      return
    }
    setShowModal(false)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('committee_members').delete().eq('id', id)
    fetchRows()
  }

  const columns = useMemo<ColumnDef<CommitteeMemberRow, unknown>[]>(() => [
    {
      id: 'photo_url',
      header: 'ছবি',
      enableSorting: false,
      cell: ({ row }) =>
        row.original.photo_url ? (
          <img
            src={row.original.photo_url}
            alt={row.original.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-600"
          />
        ) : (
          <span className="text-gray-500">-</span>
        ),
    },
    { accessorKey: 'name', header: 'নাম', cell: (c) => <span className="font-bold">{c.getValue() as string}</span> },
    { accessorKey: 'designation', header: 'পদবি' },
    { accessorKey: 'phone', header: 'ফোন', cell: (c) => (c.getValue() as string) || '-' },
    { accessorKey: 'area', header: 'এলাকা' },
    { accessorKey: 'role', header: 'ভূমিকা' },
    {
      id: 'actions',
      header: 'অ্যাকশন',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end md:justify-start">
          <button onClick={() => openEdit(row.original)} className="px-3 py-1 bg-yellow-600 rounded text-white text-xs">এডিট</button>
          <button onClick={() => handleDelete(row.original.id)} className="px-3 py-1 bg-red-600 rounded text-white text-xs">মুছুন</button>
        </div>
      ),
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="কমিটি সদস্য" action={<PrimaryButton onClick={openAdd}>+ নতুন যোগ করুন</PrimaryButton>} />
      <DataTable columns={columns} data={rows} searchPlaceholder="নাম, পদবি বা এলাকা লিখে খুঁজুন..." emptyMessage="কোনো সদস্য নেই" />

      {showModal && (
        <Modal title={editing ? 'সদস্য এডিট করুন' : 'নতুন সদস্য'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave}>
            <Field label="নাম">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </Field>
            <Field label="পদবি">
              <input required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className={inputClass} />
            </Field>
            <Field label="ফোন">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </Field>
            <Field label="এলাকা">
              <input required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inputClass} />
            </Field>
            <Field label="ভূমিকা">
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass}>
                <option value="executive">executive</option>
                <option value="advisor">advisor</option>
                <option value="coordinator">coordinator</option>
              </select>
            </Field>
            <Field label="ছবি">
              <ImageUpload
                value={form.photo_url}
                folder="committee"
                shape="avatar"
                onChange={(photo_url) => setForm({ ...form, photo_url })}
              />
            </Field>
            <PrimaryButton type="submit">সংরক্ষণ করুন</PrimaryButton>
          </form>
        </Modal>
      )}
    </div>
  )
}
