"use client";

import { useState, useEffect } from "react";
import { FiSettings, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import apiClient from "@/utils/apiClient";

const SettingsTab = () => {
    const [settings, setSettings] = useState({ maintenanceMode: false, apiServiceEnabled: true, websiteOrdersEnabled: true });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await apiClient.get("/api/admin/settings");
            const data = res.data;
            if (data.success) {
                setSettings(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch settings", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleMaintenance = async () => {
        try {
            setSaving(true);
            setMessage({ type: "", text: "" });
            const newValue = !settings.maintenanceMode;

            const res = await apiClient.patch("/api/admin/settings", { maintenanceMode: newValue });
            const data = res.data;
            if (data.success) {
                setSettings(data.data);
                setMessage({ type: "success", text: `Maintenance mode ${newValue ? "enabled" : "disabled"} successfully!` });
            } else {
                setMessage({ type: "error", text: data.message || "Failed to update settings" });
            }
        } catch (err) {
            console.error("Failed to update settings", err);
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setSaving(false);
        }
    };

    const toggleApiService = async () => {
        try {
            setSaving(true);
            setMessage({ type: "", text: "" });
            const newValue = !settings.apiServiceEnabled;

            const res = await apiClient.patch("/api/admin/settings", { apiServiceEnabled: newValue });
            const data = res.data;
            if (data.success) {
                setSettings(data.data);
                setMessage({ type: "success", text: `API Service ${newValue ? "enabled" : "disabled"} successfully!` });
            } else {
                setMessage({ type: "error", text: data.message || "Failed to update settings" });
            }
        } catch (err) {
            console.error("Failed to update settings", err);
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setSaving(false);
        }
    };

    const toggleWebsiteOrders = async () => {
        try {
            setSaving(true);
            setMessage({ type: "", text: "" });
            const newValue = !settings.websiteOrdersEnabled;

            const res = await apiClient.patch("/api/admin/settings", { websiteOrdersEnabled: newValue });
            const data = res.data;
            if (data.success) {
                setSettings(data.data);
                setMessage({ type: "success", text: `Website Orders ${newValue ? "enabled" : "disabled"} successfully!` });
            } else {
                setMessage({ type: "error", text: data.message || "Failed to update settings" });
            }
        } catch (err) {
            console.error("Failed to update settings", err);
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <FiLoader className="w-10 h-10 animate-spin text-[var(--accent)]" />
                <p className="text-[var(--muted)]">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                    <FiSettings className="text-[var(--accent)]" />
                    Main Settings
                </h2>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Manage your website status and background settings.
                </p>
            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="p-6 flex items-center justify-between gap-6 border-b border-[var(--border)]">
                    <div>
                        <h3 className="font-semibold text-[var(--foreground)]">Maintenance Mode</h3>
                        <p className="text-xs text-[var(--muted)] mt-1">
                            When enabled, users will see a maintenance message and won't be able to access the site.
                            Admin panel remains accessible for you.
                        </p>
                    </div>

                    <button
                        onClick={toggleMaintenance}
                        disabled={saving}
                        className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
              ${settings.maintenanceMode ? "bg-[var(--accent)]" : "bg-gray-700"}
              ${saving ? "opacity-50 cursor-not-allowed" : ""}
            `}
                    >
                        <span
                            className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${settings.maintenanceMode ? "translate-x-5" : "translate-x-0"}
              `}
                        />
                    </button>
                </div>

                {message.text && (
                    <div className={`p-4 flex items-center gap-2 text-sm ${message.type === "success" ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`}>
                        {message.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                        {message.text}
                    </div>
                )}
            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="p-6 flex items-center justify-between gap-6 border-b border-[var(--border)]">
                    <div>
                        <h3 className="font-semibold text-[var(--foreground)]">B2B API Service</h3>
                        <p className="text-xs text-[var(--muted)] mt-1">
                            When disabled, new external API orders will be instantly rejected without deducting wallet balances. (Frontend website orders will still work normally).
                        </p>
                    </div>

                    <button
                        onClick={toggleApiService}
                        disabled={saving}
                        className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
              ${settings.apiServiceEnabled ? "bg-emerald-500" : "bg-gray-700"}
              ${saving ? "opacity-50 cursor-not-allowed" : ""}
            `}
                    >
                        <span
                            className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${settings.apiServiceEnabled ? "translate-x-5" : "translate-x-0"}
              `}
                        />
                    </button>
                </div>
                <div className="p-6 flex items-center justify-between gap-6 border-b border-[var(--border)]">
                    <div>
                        <h3 className="font-semibold text-[var(--foreground)]">Website Orders</h3>
                        <p className="text-xs text-[var(--muted)] mt-1">
                            When disabled, new orders from your direct website checkout will be instantly rejected without deducting wallet balances.
                        </p>
                    </div>

                    <button
                        onClick={toggleWebsiteOrders}
                        disabled={saving}
                        className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
              ${settings.websiteOrdersEnabled ? "bg-blue-500" : "bg-gray-700"}
              ${saving ? "opacity-50 cursor-not-allowed" : ""}
            `}
                    >
                        <span
                            className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${settings.websiteOrdersEnabled ? "translate-x-5" : "translate-x-0"}
              `}
                        />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SettingsTab;
