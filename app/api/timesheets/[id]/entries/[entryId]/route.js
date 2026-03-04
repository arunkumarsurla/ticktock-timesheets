
import { updateEntry, deleteEntry } from "@/lib/mockData"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
  const body = await request.json()
  const { date, project, workType, description, hours } = body

  if (!date)               return NextResponse.json({ error: "Date is required" },        { status: 400 })
  if (!project)            return NextResponse.json({ error: "Project is required" },     { status: 400 })
  if (!workType)           return NextResponse.json({ error: "Work type is required" },   { status: 400 })
  if (!description?.trim()) return NextResponse.json({ error: "Description is required" }, { status: 400 })
  if (!hours || Number(hours) < 1 || Number(hours) > 24)
    return NextResponse.json({ error: "Hours must be between 1 and 24" }, { status: 400 })

  const updated = updateEntry(params.id, params.entryId, { date, project, workType, description, hours: Number(hours) })

  if (!updated) return NextResponse.json({ error: "Entry not found" }, { status: 404 })

  return NextResponse.json({ entry: updated })
}

export async function DELETE(request, { params }) {
  const deleted = deleteEntry(params.id, params.entryId)
  if (!deleted) return NextResponse.json({ error: "Entry not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
