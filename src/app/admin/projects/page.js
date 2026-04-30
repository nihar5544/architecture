"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import BuildingLoading from "@/components/loader/pageLoader";
import { toast } from "sonner";

function ConfirmDialog({ open, onCancel, onConfirm, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-center text-gray-900 mb-1">Delete Project</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          This action cannot be undone. The project and all its images will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  async function getData() {
    setLoading(true);
    try {
      const res = await axios.get("/api/projectDetails");
      setData(res.data?.data || []);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.Category?.toLowerCase().includes(q)
    );
  }, [search, data]);

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/projectDetails/${confirmId}`);
      toast.success("Project deleted");
      setConfirmId(null);
      getData();
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <ConfirmDialog
        open={!!confirmId}
        onCancel={() => setConfirmId(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">All Projects</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {data.length} project{data.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Project
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {loading ? (
        <BuildingLoading />
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
          </svg>
          <p className="font-medium">{search ? "No projects match your search" : "No projects yet"}</p>
          {!search && (
            <Link href="/admin/create" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
              Create your first project
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {filtered.map((project, i) => (
            <div
              key={project._id}
              className={`flex items-center gap-4 px-5 py-4 ${
                i < filtered.length - 1 ? "border-b border-gray-50" : ""
              } hover:bg-gray-50 transition-colors`}
            >
              <Image
                src={project.image || "/images/Logo.webp"}
                alt={project.title}
                width={56}
                height={56}
                className="rounded-xl object-cover w-14 h-14 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{project.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{project.Category}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/projects/${project._id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-100 transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </Link>
                <button
                  onClick={() => setConfirmId(project._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 text-xs font-medium text-red-500 hover:bg-red-50 transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
