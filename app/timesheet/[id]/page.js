"use client"



import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import EntryModal from "@/components/EntryModal"
import { formatDateRange, getWeekDays } from "@/lib/constants"

export default function TimesheetPage() {
  const router      = useRouter()
  const params      = useParams()
  const timesheetId = params.id

  const { data: session, status } = useSession()

  const [timesheet,    setTimesheet]   = useState(null)
  const [loading,      setLoading]     = useState(true)

  const [showModal,    setShowModal]    = useState(false)
  const [entryToEdit,  setEntryToEdit]  = useState(null)   
  const [selectedDate, setSelectedDate] = useState("")     

  const [openMenuId, setOpenMenuId] = useState(null)

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated") {
      loadTimesheet()
    }
  }, [status])

  async function loadTimesheet() {
    setLoading(true)
    const res  = await fetch(`/api/timesheets/${timesheetId}`)
    const data = await res.json()
    setTimesheet(data.timesheet || null)
    setLoading(false)
  }

  function openAddModal(day) {
    setEntryToEdit(null)
    setSelectedDate(day)
    setShowModal(true)
  }

  function openEditModal(entry) {
    setEntryToEdit(entry)
    setSelectedDate(entry.date)
    setOpenMenuId(null)
    setShowModal(true)
  }

  async function handleDelete(entryId) {
    if (!confirm("Are you sure you want to delete this task?")) return
    setOpenMenuId(null)
    await fetch(`/api/timesheets/${timesheetId}/entries/${entryId}`, { method: "DELETE" })
    loadTimesheet()
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (status === "unauthenticated") return null

  if (!timesheet) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Timesheet not found.</p>
      </div>
    )
  }


  const weekDays = getWeekDays(timesheet.startDate, timesheet.endDate)

  const entriesByDay = {}
  timesheet.entries.forEach((entry) => {
    const day = entry.date || "Unknown"
    if (!entriesByDay[day]) entriesByDay[day] = []
    entriesByDay[day].push(entry)
  })

  const totalHours  = timesheet.entries.reduce((sum, e) => sum + Number(e.hours), 0)
  const targetHours = 40
  const progress    = Math.min(100, Math.round((totalHours / targetHours) * 100))

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userName={session.user.name} />

      <div className="max-w-3xl mx-auto p-6">

        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mb-4 block">
          ← Back to Timesheets
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6">

          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-bold">This week&apos;s timesheet</h1>
            <span className="text-sm text-gray-600 font-medium">{totalHours}/{targetHours} hrs</span>
          </div>

          <p className="text-sm text-gray-400 mb-4">
            {formatDateRange(timesheet.startDate, timesheet.endDate)}
          </p>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-10 text-right">{progress}%</span>
          </div>

          {weekDays.map((day) => {
            const dayEntries = entriesByDay[day] || []

            return (
              <div key={day} className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">{day}</h3>

                {dayEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 mb-2 hover:bg-gray-50"
                  >
                    <span className="text-sm text-gray-700 flex-1 mr-3">{entry.description}</span>
                    <span className="text-sm text-gray-500 mr-3 whitespace-nowrap">{entry.hours} hrs</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mr-3 whitespace-nowrap hidden sm:block">
                      {entry.project}
                    </span>

                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === entry.id ? null : entry.id)}
                        className="text-gray-400 hover:text-gray-600 px-2 py-1 text-base leading-none"
                      >
                        •••
                      </button>

                      {openMenuId === entry.id && (
                        <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => openEditModal(entry)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-b-lg"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => openAddModal(day)}
                  className="w-full border border-dashed border-blue-300 text-blue-500 text-sm py-2.5 rounded-lg hover:bg-blue-50 transition mt-1"
                >
                  + Add new task
                </button>
              </div>
            )
          })}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">© 2026 tentwenty. All rights reserved.</p>
      </div>

      {showModal && (
        <EntryModal
          timesheetId={timesheetId}
          entryToEdit={entryToEdit}
          selectedDate={selectedDate}
          weekDays={weekDays}
          onClose={() => setShowModal(false)}
          onSaved={loadTimesheet}
        />
      )}
    </div>
  )
}
