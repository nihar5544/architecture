"use client";
import axios from "axios";
import { useState, useRef } from "react";
import { toast } from "sonner";

const CATEGORIES = ["Architecture", "Interior Design", "Retail Design", "Commercial", "Residential"];

const TEMPLATE = [
  {
    title: "Modern Living Room",
    Client: "Jane Smith",
    Category: "Residential",
    Location: "Ahmedabad, IN",
    Date: "2024",
    Link: "",
    description: "",
    image: "",
    otherImage: [],
  },
];

const REQUIRED_FIELDS = ["title", "Client", "Category", "Location", "Date"];

export default function BulkUploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef();

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setErrors([]);

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!Array.isArray(parsed)) {
          setErrors(["JSON must be an array of project objects"]);
          setPreview(null);
          return;
        }
        const errs = [];
        parsed.forEach((item, i) => {
          REQUIRED_FIELDS.forEach((field) => {
            if (!item[field]) errs.push(`Row ${i + 1}: missing "${field}"`);
          });
        });
        setErrors(errs);
        setPreview(parsed);
      } catch {
        setErrors(["Invalid JSON file. Please check the format."]);
        setPreview(null);
      }
    };
    reader.readAsText(f);
  }

  function downloadTemplate() {
    const blob = new Blob([JSON.stringify(TEMPLATE, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects-template.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleUpload() {
    if (!preview || errors.length > 0) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/projectDetails/bulk", { projects: preview });
      setResult(res.data);
      toast.success(`${res.data.count} project(s) uploaded successfully`);
      setFile(null);
      setPreview(null);
      setErrors([]);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Bulk Upload Projects</h1>
        <p className="text-sm text-gray-400 mt-1">
          Upload multiple projects at once using a JSON file
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-blue-800 mb-2">How it works</h2>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Download the JSON template below</li>
            <li>Fill in your project data (one object per project)</li>
            <li>Upload the completed JSON file</li>
            <li>Review the preview and confirm upload</li>
          </ol>
          <button
            onClick={downloadTemplate}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900 underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Template (projects-template.json)
          </button>
        </div>

        {/* Required fields */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Required Fields</h2>
          <div className="flex flex-wrap gap-2">
            {REQUIRED_FIELDS.map((f) => (
              <span key={f} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-mono">
                {f}
              </span>
            ))}
            <span className="px-2.5 py-1 bg-gray-50 text-gray-400 rounded-lg text-xs font-mono">
              description (optional)
            </span>
            <span className="px-2.5 py-1 bg-gray-50 text-gray-400 rounded-lg text-xs font-mono">
              Link (optional)
            </span>
            <span className="px-2.5 py-1 bg-gray-50 text-gray-400 rounded-lg text-xs font-mono">
              image (optional)
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Valid categories:{" "}
            {CATEGORIES.map((c, i) => (
              <span key={c}>
                <code className="bg-gray-100 px-1 rounded">{c}</code>
                {i < CATEGORIES.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>

        {/* Upload area */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Upload JSON File</h2>
          <input
            ref={fileRef}
            type="file"
            id="json-file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-400 transition"
          >
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {file ? (
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-400 mt-1">Click to change file</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Click to select JSON file</p>
                <p className="text-xs text-gray-400 mt-1">Maximum 100 projects per upload</p>
              </div>
            )}
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-2">
              {errors.length} validation error{errors.length !== 1 ? "s" : ""} found
            </h3>
            <ul className="text-xs text-red-600 space-y-1 max-h-40 overflow-y-auto">
              {errors.map((e, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0">•</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Preview */}
        {preview && errors.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Preview — {preview.length} project{preview.length !== 1 ? "s" : ""} ready to upload
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {preview.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl text-sm"
                >
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{p.title}</p>
                    <p className="text-xs text-gray-400">
                      {p.Category} · {p.Location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-4 w-full px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {loading ? "Uploading..." : `Upload ${preview.length} Project${preview.length !== 1 ? "s" : ""}`}
            </button>
          </div>
        )}

        {/* Success result */}
        {result && (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">Upload complete!</p>
              <p className="text-xs text-green-600 mt-0.5">
                {result.count} project{result.count !== 1 ? "s" : ""} were added successfully.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
