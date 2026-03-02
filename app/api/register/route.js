import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingUser) {
    return NextResponse.json(
      { error: "An account with that email already exists." },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error: insertError } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }]);

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return NextResponse.json(
      { error: "Could not create account. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Account created successfully." });
}
