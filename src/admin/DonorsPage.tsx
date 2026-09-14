import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import type { BloodDonorRow } from '../lib/db'
import { PageHeader, Modal, Field, inputClass, PrimaryButton } from './ui'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const emptyForm = { name: '', blood_group: 'O+', phone: '', area: '', last_donation: '', available: true }

export default function DonorsPage() {
  const [rows, setRows] = useState<BloodDonorRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('সকল')
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

  const visible = filter === 'সকল' ? rows : rows.filter((r) => r.blood_group === filter)

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <PageHeader
        title="রক্তদাতা"
        action={
          <div className="flex gap-2">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 rounded bg-gray-700 text-white text-sm">
              <option value="সকল">সকল</option>
              {BLOOD_GROUPS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <PrimaryButton onClick={openAdd}>+ নতুন যোগ করুন</PrimaryButton>
          </div>
        }
      />
      <div className="bg-gray-800 rounded-lg overflow-auto">
        <table className="w-full text-sm text-gray-200">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="px-4 py-3">নাম</th>
              <th className="px-4 py-3">গ্রুপ</th>
              <th className="px-4 py-3">ফোন</th>
              <th className="px-4 py-3">এলাকা</th>
              <th className="px-4 py-3">উপলব্ধ</th>
              <th className="px-4 py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="px-4 py-3 font-bold">{r.name}</td>
                <td className="px-4 py-3">{r.blood_group}</td>
                <td className="px-4 py-3">{r.phone}</td>
                <td className="px-4 py-3">{r.area}</td>
                <td className="px-4 py-3">{r.available ? 'হ্যাঁ' : 'না'}</td>
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
