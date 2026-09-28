import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { ImagePlus, LoaderCircle, UploadCloud } from "lucide-react";
import { supabase } from "../lib/supabase";

const IMAGE_BUCKET = "club-images";
const MAX_FILE_SIZE = 6 * 1024 * 1024;

export type UploadFolder = "projects" | "gallery" | "members" | "committee";

// Which storage policy must allow the folder, so an RLS failure points at the exact fix.
const POLICY_FOR_FOLDER: Record<UploadFolder, string> = {
  members: '"Public upload member photos"',
  projects: '"Admin upload club images"',
  gallery: '"Admin upload club images"',
  committee: '"Admin upload club images" (policy folder list must include \'committee\')',
};

interface ImageUploadProps {
  value: string;
  folder: UploadFolder;
  onChange: (url: string) => void;
  /** "dark" matches the admin dashboard, "light" matches the public site. */
  variant?: "dark" | "light";
  /** "avatar" renders a round portrait preview, "cover" a wide banner preview. */
  shape?: "cover" | "avatar";
  onUploadingChange?: (uploading: boolean) => void;
}

const theme = {
  dark: {
    idle: "border-gray-600 bg-gray-700/50 hover:border-blue-500",
    active: "border-blue-400 bg-blue-900/30",
    text: "text-gray-300",
    hint: "text-gray-500",
    error: "text-red-400",
    spinner: "text-blue-400",
    icon: "text-gray-400",
    frame: "border-gray-500",
  },
  light: {
    idle: "border-gray-300 bg-gray-50 hover:border-[#063b20]",
    active: "border-[#063b20] bg-emerald-50",
    text: "text-gray-600",
    hint: "text-gray-400",
    error: "text-red-600",
    spinner: "text-[#063b20]",
    icon: "text-gray-400",
    frame: "border-gray-300",
  },
} as const;

export default function ImageUpload({
  value,
  folder,
  onChange,
  variant = "dark",
  shape = "cover",
  onUploadingChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const colors = theme[variant];

  const setBusy = (busy: boolean) => {
    setUploading(busy);
    onUploadingChange?.(busy);
  };

  const uploadFile = async (file: File) => {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("শুধু ছবি আপলোড করা যাবে।");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("ছবির আকার সর্বোচ্চ ৬ MB হতে পারবে।");
      return;
    }

    setBusy(true);
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      const message = uploadError.message.includes("row-level security")
        ? `ছবি আপলোডের Storage policy সেটআপ করা হয়নি ("${folder}" ফোল্ডার)। docs/supabase-storage.sql ফাইলটি Supabase SQL Editor-এ আবার চালান — প্রয়োজন: ${POLICY_FOR_FOLDER[folder]} policy।`
        : `ছবি আপলোড করা যায়নি: ${uploadError.message}`;
      setError(message);
      setBusy(false);
      return;
    }

    const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
    onChange(data.publicUrl);
    setBusy(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void uploadFile(file);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void uploadFile(file);
  };

  const previewClass =
    shape === "avatar"
      ? `mx-auto h-28 w-28 rounded-full border object-cover ${colors.frame}`
      : "mx-auto h-32 w-full rounded object-cover";

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded border-2 border-dashed p-4 text-center transition ${
          dragging ? colors.active : colors.idle
        }`}
      >
        {value ? (
          <img src={value} alt="Preview" className={previewClass} />
        ) : uploading ? (
          <LoaderCircle
            className={`mx-auto h-8 w-8 animate-spin ${colors.spinner}`}
          />
        ) : (
          <UploadCloud className={`mx-auto h-8 w-8 ${colors.icon}`} />
        )}
        <div
          className={`mt-2 flex items-center justify-center gap-2 text-sm ${colors.text}`}
        >
          {uploading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          <span>
            {uploading
              ? "ছবি আপলোড হচ্ছে..."
              : value
                ? "পরিবর্তন করতে আবার ক্লিক করুন"
                : "ছবি টেনে আনুন অথবা ক্লিক করে নির্বাচন করুন"}
          </span>
        </div>
        <p className={`mt-1 text-xs ${colors.hint}`}>
          PNG, JPG বা WEBP, সর্বোচ্চ ৬ MB
        </p>
      </div>
      {error && <p className={`mt-2 text-xs ${colors.error}`}>{error}</p>}
    </div>
  );
}

export { IMAGE_BUCKET };
