import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { supabase } from "../lib/supabase";
import type { ProjectRow } from "../lib/db";
import { PageHeader, Modal, Field, inputClass, PrimaryButton } from "./ui";
import DataTable from "./DataTable";
import ImageUpload from "../components/ImageUpload";

const emptyForm = {
  title: "",
  category: "মানবতা",
  category_en: "Humanity",
  description: "",
  impact: "",
  status: "চলমান",
  image_url: "",
  highlights: "",
};

export default function ProjectsPage() {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ProjectRow | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchRows = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at");
    if (data) setRows(data as ProjectRow[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (row: ProjectRow) => {
    setEditing(row);
    setForm({
      title: row.title,
      category: row.category,
      category_en: row.category_en,
      description: row.description,
      impact: row.impact || "",
      status: row.status,
      image_url: row.image_url || "",
      highlights: (row.highlights || []).join("\n"),
    });
    setShowModal(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      category: form.category,
      category_en: form.category_en,
      description: form.description,
      impact: form.impact || null,
      status: form.status,
      image_url: form.image_url || null,
      highlights: form.highlights
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editing) {
      await supabase.from("projects").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("projects").insert(payload);
    }
    setShowModal(false);
    fetchRows();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("মুছে ফেলতে চান?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchRows();
  };

  const columns = useMemo<ColumnDef<ProjectRow, unknown>[]>(
    () => [
      {
        accessorKey: "image_url",
        header: "ছবি",
        enableSorting: false,
        cell: (c) => {
          const imageUrl = c.getValue() as string | null;
          return imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="h-12 w-16 rounded object-cover"
            />
          ) : (
            <span className="text-xs text-gray-500">ছবি নেই</span>
          );
        },
      },
      {
        accessorKey: "title",
        header: "শিরোনাম",
        cell: (c) => (
          <span className="font-bold">{c.getValue() as string}</span>
        ),
      },
      { accessorKey: "category", header: "ক্যাটাগরি" },
      { accessorKey: "status", header: "স্ট্যাটাস" },
      {
        id: "actions",
        header: "অ্যাকশন",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2 justify-end md:justify-start">
            <button
              onClick={() => openEdit(row.original)}
              className="px-3 py-1 bg-yellow-600 rounded text-white text-xs"
            >
              এডিট
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="px-3 py-1 bg-red-600 rounded text-white text-xs"
            >
              মুছুন
            </button>
          </div>
        ),
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    [],
  );

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <PageHeader
        title="প্রকল্প"
        action={
          <PrimaryButton onClick={openAdd}>+ নতুন যোগ করুন</PrimaryButton>
        }
      />
      <DataTable
        columns={columns}
        data={rows}
        searchPlaceholder="শিরোনাম বা ক্যাটাগরি লিখে খুঁজুন..."
        emptyMessage="কোনো প্রকল্প নেই"
      />

      {showModal && (
        <Modal
          title={editing ? "প্রকল্প এডিট করুন" : "নতুন প্রকল্প"}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSave}>
            <Field label="শিরোনাম">
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="ক্যাটাগরি">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                <option value="শিক্ষা">শিক্ষা</option>
                <option value="ঐক্য">ঐক্য</option>
                <option value="মানবতা">মানবতা</option>
                <option value="পরিবেশ">পরিবেশ</option>
              </select>
            </Field>
            <Field label="Category (English)">
              <input
                required
                value={form.category_en}
                onChange={(e) =>
                  setForm({ ...form, category_en: e.target.value })
                }
                className={inputClass}
              />
            </Field>
            <Field label="বিবরণ">
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={inputClass}
              />
            </Field>
            <Field label="প্রভাব">
              <input
                value={form.impact}
                onChange={(e) => setForm({ ...form, impact: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="স্ট্যাটাস">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={inputClass}
              >
                <option value="চলমান">চলমান</option>
                <option value="আসন্ন">আসন্ন</option>
                <option value="সম্পন্ন">সম্পন্ন</option>
              </select>
            </Field>
            <Field label="ছবি">
              <ImageUpload
                value={form.image_url}
                folder="projects"
                onChange={(image_url) => setForm({ ...form, image_url })}
              />
            </Field>
            <Field label="হাইলাইটস (প্রতি লাইনে একটি)">
              <textarea
                rows={3}
                value={form.highlights}
                onChange={(e) =>
                  setForm({ ...form, highlights: e.target.value })
                }
                className={inputClass}
              />
            </Field>
            <PrimaryButton type="submit" disabled={!form.image_url}>
              সংরক্ষণ করুন
            </PrimaryButton>
          </form>
        </Modal>
      )}
    </div>
  );
}
