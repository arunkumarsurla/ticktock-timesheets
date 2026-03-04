"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import StatusBadge from "@/components/StatusBadge";
import { formatDateRange } from "@/lib/constants";

const ROWS_OPTIONS = [5, 10, 20];

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [timesheets, setTimesheets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      loadTimesheets(session.user.id);
    }
  }, [status]);

  async function loadTimesheets(userId) {
    const res = await fetch(`/api/timesheets?userId=${userId}`);
    const data = await res.json();
    setTimesheets(data.timesheets || []);
  }

  const filtered = timesheets.filter((t) => {
    if (statusFilter !== "ALL" && t.status.toUpperCase() !== statusFilter)
      return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filtered.slice(startIndex, startIndex + rowsPerPage);

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userName={session.user.name} />

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Your Timesheets</h1>

          <div className="flex gap-3 mb-6">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              <option value="ALL">Date Range</option>
              <option value="ALL">All dates</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              <option value="ALL">Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="INCOMPLETE">Incomplete</option>
              <option value="MISSING">Missing</option>
            </select>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase">
                <th className="text-left pb-3 font-semibold">Week #</th>
                <th className="text-left pb-3 font-semibold">Date</th>
                <th className="text-left pb-3 font-semibold">Status</th>
                <th className="text-right pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    No timesheets found
                  </td>
                </tr>
              ) : (
                currentRows.map((sheet) => (
                  <tr
                    key={sheet.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 text-gray-700">{sheet.weekNumber}</td>
                    <td className="py-4 text-gray-700">
                      {formatDateRange(sheet.startDate, sheet.endDate)}
                    </td>
                    <td className="py-4">
                      <StatusBadge status={sheet.status} />
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/timesheet/${sheet.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {sheet.status === "COMPLETED" && "View"}
                        {sheet.status === "INCOMPLETE" && "Update"}
                        {sheet.status === "MISSING" && "Create"}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-6">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            >
              {ROWS_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} per page
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 text-sm">
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3 text-sm">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="text-gray-500">
                    Page {currentPage} of {totalPages || 1}
                  </span>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-4 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          © 2026 tentwenty. All rights reserved.
        </p>
      </div>
    </div>
  );
}
