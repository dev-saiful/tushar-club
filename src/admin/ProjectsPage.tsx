import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import type { ProjectRow } from '../lib/db'
import { PageHeader, Modal, Field, inputClass, PrimaryButton } from './ui'

const emptyForm = { title: '', category: 'মানবতা', category_en: 'Humanity', description: '', impact: '', status: 'চলমান', image_url: '', highlights: '' }

export default function ProjectsPage() {
  const [rows, setRows] = useState<ProjectRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('সকল')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<ProjectRow | null>(null)
  const [form, setForm] = useState(emptyForm)

  const fetchRows = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at')
    if (data) setRows(data as ProjectRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRows() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (row: ProjectRow) => {
    setEditing(row)
    setForm({ title: row.title, category: row.category, category_en: row.category_en, description: row.description, impact: row.impact || '', status: row.status, image_url: row.image_url || '', highlights: (row.highlights || []).join('\n') })
    setShowModal(true)
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    const payload = { title: form.title, category: form.category, category_en: form.category_en, description: form.description, impact: form.impact || null, status: form.status, image_url: form.image_url || null, highlights: form.highlights.split('\n').map((s) => s.trim()).filter(Boolean) }
    if (editing) {
      await supabase.from('projects').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('projects').insert(payload)
    }
    setShowModal(false)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('projects').delete().eq('id', id)
    fetchRows()
  }

  const visible = filter === 'সকল' ? rows : rows.filter((r) => r.category === filter)

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader
        title="প্রকল্প"
        action={
          <div className="flex gap-2">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 rounded bg-gray-700 text-white text-sm">
              <option value="সকল">সকল</option>
              <option value="শিক্ষা">শিক্ষা</option>
              <option value="ঐক্য">ঐক্য</option>
              <option value="মানবতা">মানবতা</option>
              <option value="পরিবেশ">পরিবেশ</option>
            </select>
            <PrimaryButton onClick={openAdd}>+ নতুন যোগ করুন</PrimaryButton>
          </div>
        }
      />
      <div className="bg-gray-800 rounded-lg overflow-auto">
        <table className="w-full text-sm text-gray-200">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="px-4 py-3">শিরোনাম</th>
              <th className="px-4 py-3">ক্যাটাগরি</th>
              <th className="px-4 py-3">স্ট্যাটাস</th>
              <th className="px-4 py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="px-4 py-3 font-bold">{r.title}</td>
                <td className="px-4 py-3">{r.category}</td>
                <td className="px-4 py-3">{r.status}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(r)} className="px-3 py-1 bg-yellow-600 rounded text-white text-xs">এডিট</button>
                  <button onClick={() => handleDelete(r.id)} className="px-3 py-1 bg-red-600 rounded text-white text-xs">মুছুন</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title={editing ? 'প্রকল্প এডিট করুন' : 'নতুন প্রকল্প'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave}>
            <Field label="শিরোনাম">
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
            </Field>
            <Field label="ক্যাটাগরি">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                <option value="শিক্ষা">শিক্ষা</option>
                <option value="ঐক্য">ঐক্য</option>
                <option value="মানবতা">মানবতা</option>
                <option value="পরিবেশ">পরিবেশ</option>
              </select>
            </Field>
            <Field label="Category (English)">
              <input required value={form.category_en} onChange={(e) => setForm({ ...form, category_en: e.target.value })} className={inputClass} />
            </Field>
            <Field label="বিবরণ">
              <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
            </Field>
            <Field label="প্রভাব">
              <input value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} className={inputClass} />
            </Field>
            <Field label="স্ট্যাটাস">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                <option value="চলমান">চলমান</option>
                <option value="আসন্ন">আসন্ন</option>
                <option value="সম্পন্ন">সম্পন্ন</option>
              </select>
            </Field>
            <Field label="ছবির URL">
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className={inputClass} />
            </Field>
            <Field label="হাইলাইটস (প্রতি লাইনে একটি)">
              <textarea rows={3} value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} className={inputClass} />
            </Field>
            <PrimaryButton type="submit">সংরক্ষণ করুন</PrimaryButton>
          </form>
        </Modal>
      )}
    </div>
  )
}
