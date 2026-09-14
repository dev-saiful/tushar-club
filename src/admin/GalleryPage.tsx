import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import type { GalleryItemRow } from '../lib/db'
import { PageHeader, Modal, Field, inputClass, PrimaryButton } from './ui'

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

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="গ্যালারি" action={<PrimaryButton onClick={() => setShowModal(true)}>+ নতুন ছবি</PrimaryButton>} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((r) => (
          <div key={r.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img src={r.image_url} alt={r.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-white font-bold text-sm">{r.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{r.category} • {r.date}</p>
              <button onClick={() => handleDelete(r.id)} className="mt-3 px-3 py-1 bg-red-600 rounded text-white text-xs">মুছুন</button>
            </div>
          </div>
        ))}
      </div>

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
