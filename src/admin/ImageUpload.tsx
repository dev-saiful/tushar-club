import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { ImagePlus, LoaderCircle, UploadCloud } from "lucide-react";
import { supabase } from "../lib/supabase";

const IMAGE_BUCKET = "club-images";
const MAX_FILE_SIZE = 6 * 1024 * 1024;

interface ImageUploadProps {
  value: string;
  folder: "projects" | "gallery";
  onChange: (url: string) => void;
}

export default function ImageUpload({
  value,
  folder,
  onChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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

    setUploading(true);
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      const message = uploadError.message.includes("row-level security")
        ? "ছবি আপলোডের Storage policy সেটআপ করা হয়নি। docs/supabase-storage.sql চালান।"
        : `ছবি আপলোড করা যায়নি: ${uploadError.message}`;
      setError(message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
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
          dragging
            ? "border-blue-400 bg-blue-900/30"
            : "border-gray-600 bg-gray-700/50 hover:border-blue-500"
        }`}
      >
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="mx-auto h-32 w-full rounded object-cover"
          />
        ) : uploading ? (
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-400" />
        ) : (
          <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
        )}
        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-300">
          {uploading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          <span>
            {uploading
              ? "ছবি আপলোড হচ্ছে..."
              : "ছবি টেনে আনুন অথবা ক্লিক করে নির্বাচন করুন"}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG বা WEBP, সর্বোচ্চ ৬ MB
        </p>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export { IMAGE_BUCKET };
