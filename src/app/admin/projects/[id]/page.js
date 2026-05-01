"use client";
import BuildingLoading from "@/components/loader/pageLoader";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FIELDS = [
  { key: "Client", label: "Client", placeholder: "e.g. John Doe" },
  { key: "Category", label: "Category", placeholder: "e.g. Residential" },
  { key: "Location", label: "Location", placeholder: "e.g. Melbourne, AU" },
  { key: "Date", label: "Date", placeholder: "e.g. 2024" },
  { key: "Link", label: "Link", placeholder: "e.g. https://..." },
  { key: "title", label: "Title", placeholder: "Project title" },
];

function Field({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
      />
    </div>
  );
}

export default function EditProject() {
  const [form, setForm] = useState({
    Client: "", Category: "", Location: "", Date: "", Link: "", title: "", description: "",
  });
  const [coverBase64, setCoverBase64] = useState("");
  const [newCoverFile, setNewCoverFile] = useState(null);
  const [galleryBase64, setGalleryBase64] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/projectDetails/${params.id}`)
      .then((res) => {
        const d = res.data?.data;
        if (!d) return;
        setForm({
          Client: d.Client || "",
          Category: d.Category || "",
          Location: d.Location || "",
          Date: d.Date || "",
          Link: d.Link || "",
          title: d.title || "",
          description: d.description || "",
        });
        setCoverBase64(d.image || "");
        setGalleryBase64(d.otherImage || []);
      })
      .catch(() => toast.error("Failed to load project"))
      .finally(() => setDataLoading(false));
  }, [params.id]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setNewCoverFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverBase64(reader.result);
    reader.readAsDataURL(file);
  }

  function handleGalleryAdd(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setGalleryBase64((prev) => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }

  function removeGallery(index) {
    setGalleryBase64((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`/api/projectDetails/${params.id}`, {
        ...form,
        image: coverBase64,
        otherImage: galleryBase64,
      });
      toast.success("Project updated successfully");
    } catch {
      toast.error("Failed to update project");
    } finally {
      setSaving(false);
    }
  }

  if (dataLoading) return <BuildingLoading />;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => router.push("/admin/projects")} className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-sm text-gray-400">Update the project details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Project Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-5 uppercase tracking-wide">Project Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FIELDS.map((f) => (
              <Field
                key={f.key}
                label={f.label}
                value={form[f.key]}
                onChange={(v) => setField(f.key, v)}
                placeholder={f.placeholder}
              />
            ))}
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-5 uppercase tracking-wide">Cover Image</h2>
          <input type="file" id="cover" accept="image/*" onChange={handleCoverChange} className="hidden" />
          <div
            onClick={() => document.getElementById("cover").click()}
            className="relative h-52 w-full border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-blue-400 transition group"
          >
            {coverBase64 ? (
              <>
                <Image
                  src={
                    newCoverFile
                      ? URL.createObjectURL(newCoverFile)
                      : coverBase64
                  }
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Click to change</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="text-sm">Click to upload cover image</span>
              </div>
            )}
          </div>
          {coverBase64 && (
            <button
              type="button"
              onClick={() => { setCoverBase64(""); setNewCoverFile(null); }}
              className="mt-3 text-xs text-red-500 hover:text-red-700"
            >
              Remove cover image
            </button>
          )}
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Gallery Images</h2>
          <p className="text-xs text-gray-400 mb-5">{galleryBase64.length} image{galleryBase64.length !== 1 ? "s" : ""} in gallery</p>
          <input type="file" id="gallery" accept="image/*" multiple onChange={handleGalleryAdd} className="hidden" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryBase64.map((src, i) => (
              <div key={i} className="relative group h-32 rounded-xl overflow-hidden border border-gray-100">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeGallery(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => document.getElementById("gallery").click()}
              className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="text-xs">Add images</span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving && (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
