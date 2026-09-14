import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import type { CommitteeMemberRow } from '../lib/db'
import { PageHeader, Modal, Field, inputClass, PrimaryButton } from './ui'

const emptyForm = { name: '', designation: '', phone: '', area: '', role: 'executive' }

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
    setForm({ name: row.name, designation: row.designation, phone: row.phone || '', area: row.area, role: row.role })
    setShowModal(true)
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    const payload = { name: form.name, designation: form.designation, phone: form.phone || null, area: form.area, role: form.role }
    if (editing) {
      await supabase.from('committee_members').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('committee_members').insert(payload)
    }
    setShowModal(false)
    fetchRows()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return
    await supabase.from('committee_members').delete().eq('id', id)
    fetchRows()
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader title="কমিটি সদস্য" action={<PrimaryButton onClick={openAdd}>+ নতুন যোগ করুন</PrimaryButton>} />
      <div className="bg-gray-800 rounded-lg overflow-auto">
        <table className="w-full text-sm text-gray-200">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="px-4 py-3">নাম</th>
              <th className="px-4 py-3">পদবি</th>
              <th className="px-4 py-3">ফোন</th>
              <th className="px-4 py-3">এলাকা</th>
              <th className="px-4 py-3">ভূমিকা</th>
              <th className="px-4 py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="px-4 py-3 font-bold">{r.name}</td>
                <td className="px-4 py-3">{r.designation}</td>
                <td className="px-4 py-3">{r.phone || '-'}</td>
                <td className="px-4 py-3">{r.area}</td>
                <td className="px-4 py-3">{r.role}</td>
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
            <PrimaryButton type="submit">সংরক্ষণ করুন</PrimaryButton>
          </form>
        </Modal>
      )}
    </div>
  )
}
