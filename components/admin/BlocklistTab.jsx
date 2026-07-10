"use client";

import { useState, useEffect } from "react";
import { FiShieldOff, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import apiClient from "@/utils/apiClient";

export default function BlocklistTab() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("email");
  const [value, setValue] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchBlocklist();
  }, []);

  const fetchBlocklist = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/admin/blocklist");
      if (res.data.success) {
        setEntries(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch blocklist", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await apiClient.post("/api/admin/blocklist", { type, value, reason });
      if (res.data.success) {
        setSuccess("Successfully added to blocklist.");
        setValue("");
        setReason("");
        fetchBlocklist();
      } else {
        setError(res.data.message || "Failed to add.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this from the blocklist?")) return;
    try {
      const res = await apiClient.delete(`/api/admin/blocklist?id=${id}`);
      if (res.data.success) {
        fetchBlocklist();
      } else {
        alert(res.data.message || "Failed to delete.");
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  const filteredEntries = filterType === "all" ? entries : entries.filter(e => e.type === filterType);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
          <FiShieldOff className="text-red-500" />
          Blocklist Management
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Block specific IP addresses, emails, or game IDs from accessing your services. 
          Blocked users will see generic error messages and will not know they are explicitly blocked.
        </p>
      </div>

      {/* ADD FORM */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
        <h3 className="font-semibold text-[var(--foreground)] mb-4">Add to Blocklist</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3">
            <label className="text-xs text-[var(--muted)] mb-1 block">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
            >
              <option value="email">Email (Gmail)</option>
              <option value="ip">IP Address</option>
              <option value="gameId">Game ID (PlayerID)</option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label className="text-xs text-[var(--muted)] mb-1 block">Value</label>
            <input
              type="text"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={type === "email" ? "user@gmail.com" : type === "ip" ? "192.168.1.1" : "12345678"}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div className="md:col-span-3">
            <label className="text-xs text-[var(--muted)] mb-1 block">Reason (Optional)</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Botting"
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors flex items-center justify-center gap-2 h-[38px]"
            >
              <FiPlus />
              Block
            </button>
          </div>
        </form>
        {error && <p className="text-xs text-red-500 mt-3 font-semibold">{error}</p>}
        {success && <p className="text-xs text-green-500 mt-3 font-semibold">{success}</p>}
      </div>

      {/* FILTER & TABLE */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--background)]/50">
          <h3 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
            <FiSearch className="text-[var(--muted)]" />
            Blocked Entries
          </h3>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs text-[var(--foreground)] focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="email">Emails</option>
            <option value="ip">IP Addresses</option>
            <option value="gameId">Game IDs</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--background)]/80 text-[10px] uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)]">
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Value</th>
                <th className="px-4 py-3 font-semibold">Reason</th>
                <th className="px-4 py-3 font-semibold">Date Added</th>
                <th className="px-4 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-[var(--muted)] text-sm">
                    Loading blocklist...
                  </td>
                </tr>
              ) : filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-[var(--muted)] text-sm italic">
                    No blocked entries found.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-[var(--background)]/40 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        entry.type === 'ip' ? 'bg-orange-500/10 text-orange-500' :
                        entry.type === 'email' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-purple-500/10 text-purple-500'
                      }`}>
                        {entry.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-[var(--foreground)]">
                      {entry.value}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted)]">
                      {entry.reason || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted)]">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="text-red-500 hover:text-red-400 p-1.5 rounded-md hover:bg-red-500/10 transition-colors"
                        title="Remove from blocklist"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
