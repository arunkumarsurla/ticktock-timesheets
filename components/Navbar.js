"use client";

// NAVBAR — top bar shown on every logged-in page
// Uses next-auth signOut instead of localStorage

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar({ userName }) {

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Left — logo + page label */}
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-lg font-bold text-gray-900">
          ticktock
        </Link>
        <span className="text-gray-500 text-sm">Timesheets</span>
      </div>

      {/* Right — user name + logout dropdown */}
      <div className="flex items-center gap-4">
      
      {/* User Name */}
      <span className="text-sm font-medium text-gray-700">
        {userName}
      </span>

      {/* Logout Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-sm text-red-600 hover:text-red-700 font-medium"
      >
        Logout
      </button>

    </div>
    </nav>
  );
}
