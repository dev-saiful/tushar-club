import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { supabase } from '../lib/supabase'
import type { GalleryItemRow } from '../lib/db'
import { PageHeader, Modal, Field, inputClass, PrimaryButton } from './ui'
import DataTable from './DataTable'

const emptyForm = { title: '', category: '', date: '', image_url: '' }

export default function GalleryPage() {
  const [rows, setRows] = useState<GalleryItemRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const fetchRows = async () => {
    const { data } = await supabase.from('gallery_items').select('*').order('date', { ascending: false })
    if (data) setRows(data as GalleryItemRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    await supabase.from('gallery_items').insert({ title: form.title, category: form.category, date: form.date, image_url: form.image_url })
    setShowModal(false)
    setForm(emptyForm)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('gallery_items').delete().eq('id', id)
    fetchRows()
  }

  const columns = useMemo<ColumnDef<GalleryItemRow, unknown>[]>(() => [
    {
      accessorKey: 'image_url',
      header: 'ছবি',
      enableSorting: false,
      cell: (c) => <img src={c.getValue() as string} alt="" className="w-16 h-12 object-cover rounded" />,
    },
    { accessorKey: 'title', header: 'শিরোনাম', cell: (c) => <span className="font-bold">{c.getValue() as string}</span> },
    { accessorKey: 'category', header: 'ক্যাটাগরি' },
    { accessorKey: 'date', header: 'তারিখ' },
    {
      id: 'actions',
      header: 'অ্যাকশন',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end md:justify-start">
          <button onClick={() => handleDelete(row.original.id)} className="px-3 py-1 bg-red-600 rounded text-white text-xs">মুছুন</button>
        </div>
      ),
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="গ্যালারি" action={<PrimaryButton onClick={() => setShowModal(true)}>+ নতুন ছবি</PrimaryButton>} />
      <DataTable columns={columns} data={rows} searchPlaceholder="শিরোনাম বা ক্যাটাগরি লিখে খুঁজুন..." emptyMessage="কোনো ছবি নেই" />

      {showModal && (
        <Modal title="নতুন ছবি" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave}>
            <Field label="শিরোনাম">
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
            </Field>
            <Field label="ক্যাটাগরি">
              <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass} />
            </Field>
            <Field label="তারিখ">
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
            </Field>
            <Field label="ছবির URL">
              <input required value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className={inputClass} />
            </Field>
            <PrimaryButton type="submit">সংরক্ষণ করুন</PrimaryButton>
          </form>
        </Modal>
      )}
    </div>
  )
}
