// POST /api/auth  — check email + password, return user
import { findUser } from "@/lib/mockData"
import { NextResponse } from "next/server"

export async function POST(request) {
  const { email, password } = await request.json()

  // Basic validation
  if (!email || !email.trim())    return NextResponse.json({ error: "Email is required" },    { status: 400 })
  if (!password || !password.trim()) return NextResponse.json({ error: "Password is required" }, { status: 400 })

  const user = findUser(email.trim(), password)

  if (!user) return NextResponse.json({ error: "Wrong email or password" }, { status: 401 })

  return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } })
}
