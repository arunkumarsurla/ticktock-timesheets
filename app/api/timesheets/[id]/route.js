import { getTimesheetById } from "@/lib/mockData"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  const timesheet = getTimesheetById(params.id)
  if (!timesheet) return NextResponse.json({ error: "Timesheet not found" }, { status: 404 })
  return NextResponse.json({ timesheet })
}
