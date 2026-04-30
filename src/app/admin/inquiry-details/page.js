"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
        <h3 className="text-base font-semibold text-center text-gray-900 mb-1">Delete Inquiry</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          This inquiry will be permanently deleted.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-60">
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InquiryDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  async function getData() {
    setLoading(true);
    try {
      const res = await axios.get("/api/contect");
      setData(res.data?.data || []);
    } catch {
      toast.error("Failed to fetch inquiries");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/contect/${confirmId}`);
      toast.success("Inquiry deleted");
      setConfirmId(null);
      getData();
    } catch {
      toast.error("Failed to delete inquiry");
    } finally {
      setDeleteLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
  }, []);

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
          <h1 className="text-xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {data.length} message{data.length !== 1 ? "s" : ""} received
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="w-8 h-8 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <p className="font-medium">No inquiries yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Subject</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Phone</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 max-w-xs">Message</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={row._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      i < data.length - 1 ? "border-b border-gray-50" : ""
                    }`}
                  >
                    <td className="px-5 py-4 font-medium text-gray-800">{row.name}</td>
                    <td className="px-5 py-4 text-gray-500">{row.email}</td>
                    <td className="px-5 py-4 text-gray-500">{row.subject}</td>
                    <td className="px-5 py-4 text-gray-500">{row.phone}</td>
                    <td className="px-5 py-4 text-gray-500 max-w-xs truncate">{row.description}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setConfirmId(row._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 text-xs font-medium text-red-500 hover:bg-red-50 transition"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
