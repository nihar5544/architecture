"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-800">{value ?? "—"}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function QuickAction({ href, label, description, icon, color }) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
          {icon}
        </div>
        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {label}
        </p>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState(null);
  const [inquiries, setInquiries] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    axios.get("/api/projectDetails").then((res) => {
      const data = res.data?.data || [];
      setProjects(data.length);
      setRecentProjects(data.slice(-5).reverse());
    });
    axios.get("/api/contect").then((res) => {
      setInquiries(res.data?.data?.length ?? 0);
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here&apos;s your overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <StatCard
          label="Total Projects"
          value={projects}
          color="bg-blue-50 text-blue-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
          }
        />
        <StatCard
          label="Total Inquiries"
          value={inquiries}
          color="bg-amber-50 text-amber-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />
        <StatCard
          label="CMS Pages"
          value={3}
          color="bg-green-50 text-green-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <h2 className="text-base font-semibold text-gray-700 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <QuickAction
          href="/admin/create"
          label="Add Project"
          description="Create new project"
          color="bg-blue-50 text-blue-600"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}
        />
        <QuickAction
          href="/admin/projects"
          label="All Projects"
          description="Edit or delete"
          color="bg-indigo-50 text-indigo-600"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>}
        />
        <QuickAction
          href="/admin/bulk-upload"
          label="Bulk Upload"
          description="Upload via JSON"
          color="bg-cyan-50 text-cyan-600"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>}
        />
        <QuickAction
          href="/admin/inquiry-details"
          label="Inquiries"
          description="View messages"
          color="bg-amber-50 text-amber-600"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
        />
        <QuickAction
          href="/admin/cms"
          label="Edit Content"
          description="CMS / pages"
          color="bg-green-50 text-green-600"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>}
        />
      </div>

      {/* Recent Projects */}
      {recentProjects.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-700">Recent Projects</h2>
            <Link href="/admin/projects" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {recentProjects.map((project, i) => (
              <div
                key={project._id}
                className={`flex items-center gap-4 px-5 py-4 ${
                  i < recentProjects.length - 1 ? "border-b border-gray-50" : ""
                } hover:bg-gray-50 transition-colors`}
              >
                <Image
                  src={project.image || "/images/Logo.webp"}
                  alt={project.title}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover w-12 h-12"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{project.title}</p>
                  <p className="text-xs text-gray-400">{project.Category}</p>
                </div>
                <Link
                  href={`/admin/projects/${project._id}`}
                  className="text-xs text-blue-600 hover:underline shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
