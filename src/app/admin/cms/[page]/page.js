"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/* ─── Shared field components ─── */
function TextField({ label, value, onChange, multiline = false, rows = 3, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      )}
    </div>
  );
}

function ImageUpload({ label, value, onChange, fallback }) {
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  const inputId = `img-${label.replace(/\s/g, "-")}`;
  const displaySrc = value || fallback;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input type="file" id={inputId} accept="image/*" onChange={handleFile} className="hidden" />
      <div
        onClick={() => document.getElementById(inputId).click()}
        className="relative h-36 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 cursor-pointer hover:border-blue-400 transition group"
      >
        {displaySrc ? (
          <>
            <Image src={displaySrc} alt={label} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <span className="text-white text-xs font-medium">Click to change</span>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs">
            Click to upload image
          </div>
        )}
      </div>
      {value && (
        <button type="button" onClick={() => onChange("")} className="text-xs text-red-500 hover:text-red-700 text-left">
          Remove (use default)
        </button>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ─── Page-specific editors ─── */
function HomeEditor({ content, onChange }) {
  const hero = content.hero || {};
  const about = content.about || {};
  const stats = content.stats || [];
  const services = content.services || [];

  function set(path, value) {
    const parts = path.split(".");
    onChange((prev) => {
      const next = { ...prev };
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = { ...obj[parts[i]] };
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  }

  function setArrayItem(key, index, field, value) {
    onChange((prev) => {
      const arr = [...(prev[key] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  }

  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <TextField label="Headline" value={hero.title || ""} onChange={(v) => set("hero.title", v)} hint="Use \n for line breaks" multiline rows={2} />
        <TextField label="Subtitle" value={hero.subtitle || ""} onChange={(v) => set("hero.subtitle", v)} multiline rows={3} />
        <TextField label="Button Text" value={hero.buttonText || ""} onChange={(v) => set("hero.buttonText", v)} />
      </Section>

      <Section title="Services Cards (Home)">
        {services.map((s, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Card {i + 1}</p>
            <TextField label="Title" value={s.title || ""} onChange={(v) => setArrayItem("services", i, "title", v)} />
            <TextField label="Content" value={s.content || ""} onChange={(v) => setArrayItem("services", i, "content", v)} multiline rows={3} />
          </div>
        ))}
      </Section>

      <Section title="About Section">
        <TextField label="Headline" value={about.title || ""} onChange={(v) => set("about.title", v)} hint="Use \n for line breaks" multiline rows={2} />
        <TextField label="Description" value={about.description || ""} onChange={(v) => set("about.description", v)} multiline rows={3} />
        <TextField label="Phone Number" value={about.phone || ""} onChange={(v) => set("about.phone", v)} />
        <TextField label="Button Text" value={about.buttonText || ""} onChange={(v) => set("about.buttonText", v)} />
      </Section>

      <Section title="Stats">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2">
              <TextField label="Value" value={s.value || ""} onChange={(v) => setArrayItem("stats", i, "value", v)} />
              <TextField label="Label" value={s.label || ""} onChange={(v) => setArrayItem("stats", i, "label", v)} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Follow Our Projects Section">
        <TextField label="Section Title" value={content.followTitle || ""} onChange={(v) => onChange((p) => ({ ...p, followTitle: v }))} />
        <TextField label="Section Subtitle" value={content.followSubtitle || ""} onChange={(v) => onChange((p) => ({ ...p, followSubtitle: v }))} multiline rows={2} />
      </Section>
    </div>
  );
}

function ServicesEditor({ content, onChange }) {
  const cards = content.cards || [];
  const steps = content.steps || [];

  function setArrayItem(key, index, field, value) {
    onChange((prev) => {
      const arr = [...(prev[key] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  }

  return (
    <div className="space-y-6">
      <Section title="Service Cards">
        {cards.map((card, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Card {i + 1}</p>
            <TextField label="Title" value={card.title || ""} onChange={(v) => setArrayItem("cards", i, "title", v)} />
            <TextField label="Content" value={card.content || ""} onChange={(v) => setArrayItem("cards", i, "content", v)} multiline rows={3} />
          </div>
        ))}
      </Section>

      <Section title="How We Work — Process Steps">
        {steps.map((step, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Step {step.number}</p>
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Step Number" value={step.number || ""} onChange={(v) => setArrayItem("steps", i, "number", v)} />
              <TextField label="Title" value={step.title || ""} onChange={(v) => setArrayItem("steps", i, "title", v)} />
            </div>
            <TextField label="Description" value={step.description || ""} onChange={(v) => setArrayItem("steps", i, "description", v)} multiline rows={3} />
            <ImageUpload
              label="Step Image"
              value={step.image || ""}
              onChange={(v) => setArrayItem("steps", i, "image", v)}
              fallback={`/images/Service${i + 1}.webp`}
            />
          </div>
        ))}
      </Section>
    </div>
  );
}

function ContactEditor({ content, onChange }) {
  function set(key, value) {
    onChange((prev) => ({ ...prev, [key]: value }));
  }
  return (
    <div className="space-y-6">
      <Section title="Page Heading">
        <TextField label="Title" value={content.title || ""} onChange={(v) => set("title", v)} hint='Use \n for line breaks' multiline rows={2} />
      </Section>
      <Section title="Contact Information">
        <TextField label="Email" value={content.email || ""} onChange={(v) => set("email", v)} />
        <TextField label="Phone" value={content.phone || ""} onChange={(v) => set("phone", v)} />
        <TextField label="Website" value={content.website || ""} onChange={(v) => set("website", v)} />
      </Section>
    </div>
  );
}

/* ─── Main page ─── */
const PAGE_META = {
  home: { label: "Home Page", publicPath: "/" },
  services: { label: "Services Page", publicPath: "/services" },
  contact: { label: "Contact Page", publicPath: "/contact" },
};

export default function CMSEditor() {
  const { page } = useParams();
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const meta = PAGE_META[page];

  useEffect(() => {
    if (!meta) return;
    axios
      .get(`/api/cms/${page}`)
      .then((res) => setContent(res.data?.data || {}))
      .catch(() => toast.error("Failed to load content"))
      .finally(() => setLoading(false));
  }, [page, meta]);

  async function handleSave() {
    setSaving(true);
    try {
      await axios.put(`/api/cms/${page}`, content);
      toast.success("Content saved successfully");
    } catch {
      toast.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  }

  if (!meta) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>Page not found. Valid pages: home, services, contact.</p>
        <Link href="/admin/cms" className="mt-3 inline-block text-blue-600 hover:underline text-sm">
          Back to CMS
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/cms")} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edit: {meta.label}</h1>
            <p className="text-sm text-gray-400 mt-0.5">Changes are reflected on the live site after saving</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={meta.publicPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
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
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="w-8 h-8 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      ) : (
        <div className="max-w-3xl">
          {page === "home" && <HomeEditor content={content} onChange={setContent} />}
          {page === "services" && <ServicesEditor content={content} onChange={setContent} />}
          {page === "contact" && <ContactEditor content={content} onChange={setContent} />}

          {/* Bottom save */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => router.push("/admin/cms")}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60 flex items-center gap-2"
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
        </div>
      )}
    </div>
  );
}
