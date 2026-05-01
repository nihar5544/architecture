import Link from "next/link";

const pages = [
  {
    key: "home",
    label: "Home Page",
    description: "Hero section, services intro, stats, about section",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600",
    sections: ["Hero", "Services Cards", "About Section", "Stats"],
  },
  {
    key: "services",
    label: "Services Page",
    description: "Service cards, how we work process steps",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    color: "bg-purple-50 text-purple-600",
    sections: ["Service Cards", "Process Steps"],
  },
  {
    key: "contact",
    label: "Contact Page",
    description: "Page title, email, phone, website",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    color: "bg-green-50 text-green-600",
    sections: ["Contact Info", "Page Title"],
  },
];

export default function CMSOverview() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Content Management</h1>
        <p className="text-sm text-gray-400 mt-1">
          Edit the text and content displayed on public pages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pages.map((page) => (
          <Link key={page.key} href={`/admin/cms/${page.key}`}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer h-full flex flex-col">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${page.color}`}>
                {page.icon}
              </div>
              <h2 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                {page.label}
              </h2>
              <p className="text-sm text-gray-400 mb-4 flex-1">{page.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {page.sections.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Changes take effect immediately</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Saved content is stored in the database and shown to visitors right away. Use the preview link on each page to verify changes before publishing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
