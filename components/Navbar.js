"use client";



import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar({ userName }) {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    const loadingToast = toast.loading("Logging you out...");

    try {
      await signOut({
        redirect: false,
      });

      toast.dismiss(loadingToast);
      toast.success("Logged out successfully 👋");

      window.location.href = "/login";
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to logout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-lg font-bold text-gray-900">
          ticktock
        </Link>
        <span className="text-gray-500 text-sm">Timesheets</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">
          {userName}
        </span>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-60"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
}