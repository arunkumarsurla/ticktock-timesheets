
import { getTimesheetsByUser, createTimesheet } from "@/lib/mockData"
import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = Number(searchParams.get("userId"))
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 })
  const timesheets = getTimesheetsByUser(userId)
  return NextResponse.json({ timesheets })
}

export async function POST(request) {
  const { userId, weekNumber, startDate, endDate } = await request.json()
  if (!userId || !weekNumber || !startDate || !endDate)
    return NextResponse.json({ error: "All fields required" }, { status: 400 })
  const newSheet = createTimesheet(userId, weekNumber, startDate, endDate)
  return NextResponse.json({ timesheet: newSheet })
}
