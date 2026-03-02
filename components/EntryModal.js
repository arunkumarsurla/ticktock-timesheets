"use client"

// ENTRY MODAL — pops up to Add or Edit a task entry
// Props:
//   timesheetId  = which timesheet this entry belongs to
//   entryToEdit  = the entry object when editing (null when adding new)
//   selectedDate = the day label pre-selected when "Add new task" is clicked
//   weekDays     = array of all day labels for this week e.g. ["Jan 1", "Jan 2"...]
//   onClose      = close the modal
//   onSaved      = reload the timesheet after saving

import { useState } from "react"
import { PROJECTS, WORK_TYPES } from "@/lib/constants"

export default function EntryModal({ timesheetId, entryToEdit, selectedDate, weekDays, onClose, onSaved }) {

  const isEditing = !!entryToEdit

  // Prefill values when editing, otherwise use defaults
  const [date,        setDate]        = useState(entryToEdit?.date        || selectedDate || weekDays?.[0] || "")
  const [project,     setProject]     = useState(entryToEdit?.project     || "")
  const [workType,    setWorkType]     = useState(entryToEdit?.workType   || "Development")
  const [description, setDescription] = useState(entryToEdit?.description || "")
  const [hours,       setHours]       = useState(entryToEdit?.hours       || 1)
  const [error,       setError]       = useState("")
  const [loading,     setLoading]     = useState(false)

  // Validate before saving
  function validate() {
    if (!date)               { setError("Please select a date");               return false }
    if (!project)            { setError("Please select a project");            return false }
    if (!workType)           { setError("Please select a work type");          return false }
    if (!description.trim()) { setError("Please write a task description");    return false }
    if (hours < 1 || hours > 24) { setError("Hours must be between 1 and 24"); return false }
    return true
  }

  async function handleSave() {
    setError("")
    if (!validate()) return

    setLoading(true)
    try {
      let response

      if (isEditing) {
        // Update existing entry — send date too so it's preserved
        response = await fetch(`/api/timesheets/${timesheetId}/entries/${entryToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, project, workType, description, hours: Number(hours) }),
        })
      } else {
        // Add new entry
        response = await fetch(`/api/timesheets/${timesheetId}/entries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, project, workType, description, hours: Number(hours) }),
        })
      }

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Something went wrong")
      } else {
        onSaved()  // tell parent to reload timesheet
        onClose()  // close this modal
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
    setLoading(false)
  }

  return (
    // Dark overlay — clicking outside closes the modal
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* White modal box */}
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">{isEditing ? "Edit Entry" : "Add New Entry"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">{error}</div>
          )}

          {/* Date dropdown — shows every day of the week */}
          <div>
            <label className="block text-sm font-medium mb-1">Date <span className="text-red-500">*</span></label>
            <select
              value={date}
              onChange={(e) => { setDate(e.target.value); setError("") }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a day</option>
              {weekDays && weekDays.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Project <span className="text-red-500">*</span></label>
            <select
              value={project}
              onChange={(e) => { setProject(e.target.value); setError("") }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Project Name</option>
              {PROJECTS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type of Work <span className="text-red-500">*</span></label>
            <select
              value={workType}
              onChange={(e) => { setWorkType(e.target.value); setError("") }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {WORK_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Task description <span className="text-red-500">*</span></label>
            <textarea
              value={description}
              onChange={(e) => { setDescription(e.target.value); setError("") }}
              placeholder="Write text here ..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">A note for extra info</p>
          </div>

          {/* Hours stepper */}
          <div>
            <label className="block text-sm font-medium mb-2">Hours <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => { setHours(Math.max(1, hours - 1)); setError("") }}
                className="w-8 h-8 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 font-bold"
              >−</button>
              <span className="w-8 text-center font-medium">{hours}</span>
              <button
                type="button"
                onClick={() => { setHours(Math.min(24, hours + 1)); setError("") }}
                className="w-8 h-8 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 font-bold"
              >+</button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Saving..." : isEditing ? "Save changes" : "Add entry"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}
