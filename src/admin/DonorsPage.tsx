import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { supabase } from '../lib/supabase'
import type { BloodDonorRow } from '../lib/db'
import { PageHeader, Modal, Field, inputClass, PrimaryButton } from './ui'
import DataTable from './DataTable'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const emptyForm = { name: '', blood_group: 'O+', phone: '', area: '', last_donation: '', available: true }

export default function DonorsPage() {
  const [rows, setRows] = useState<BloodDonorRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<BloodDonorRow | null>(null)
  const [form, setForm] = useState(emptyForm)

  const fetchRows = async () => {
    const { data } = await supabase.from('blood_donors').select('*').order('created_at')
    if (data) setRows(data as BloodDonorRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (row: BloodDonorRow) => {
    setEditing(row)
    setForm({ name: row.name, blood_group: row.blood_group, phone: row.phone, area: row.area, last_donation: row.last_donation || '', available: row.available })
    setShowModal(true)
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    const payload = { name: form.name, blood_group: form.blood_group, phone: form.phone, area: form.area, last_donation: form.last_donation || null, available: form.available }
    if (editing) {
      await supabase.from('blood_donors').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('blood_donors').insert(payload)
    }
    setShowModal(false)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('blood_donors').delete().eq('id', id)
    fetchRows()
  }

  const columns = useMemo<ColumnDef<BloodDonorRow, unknown>[]>(() => [
    { accessorKey: 'name', header: 'নাম', cell: (c) => <span className="font-bold">{c.getValue() as string}</span> },
    { accessorKey: 'blood_group', header: 'গ্রুপ' },
    { accessorKey: 'phone', header: 'ফোন' },
    { accessorKey: 'area', header: 'এলাকা' },
    { accessorKey: 'available', header: 'উপলব্ধ', cell: (c) => ((c.getValue() as boolean) ? 'হ্যাঁ' : 'না') },
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
      <PageHeader title="রক্তদাতা" action={<PrimaryButton onClick={openAdd}>+ নতুন যোগ করুন</PrimaryButton>} />
      <DataTable columns={columns} data={rows} searchPlaceholder="নাম, গ্রুপ বা এলাকা লিখে খুঁজুন..." emptyMessage="কোনো ডোনার নেই" />

      {showModal && (
        <Modal title={editing ? 'ডোনার এডিট করুন' : 'নতুন ডোনার'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave}>
            <Field label="নাম">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </Field>
            <Field label="রক্তের গ্রুপ">
              <select value={form.blood_group} onChange={(e) => setForm({ ...form, blood_group: e.target.value })} className={inputClass}>
                {BLOOD_GROUPS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </Field>
            <Field label="ফোন">
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </Field>
            <Field label="এলাকা">
              <input required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inputClass} />
            </Field>
            <Field label="সর্বশেষ দান (তারিখ)">
              <input type="date" value={form.last_donation} onChange={(e) => setForm({ ...form, last_donation: e.target.value })} className={inputClass} />
            </Field>
            <Field label="উপলব্ধ">
              <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="w-5 h-5" />
            </Field>
            <PrimaryButton type="submit">সংরক্ষণ করুন</PrimaryButton>
          </form>
        </Modal>
      )}
    </div>
  )
}
