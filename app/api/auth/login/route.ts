import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"
import { compare } from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    const { phone, email, password } = await request.json()

    // Validasi input
    if ((!phone && !email) || !password) {
      return NextResponse.json({ error: "Phone or email and password are required" }, { status: 400 })
    }

    // Cari user berdasarkan phone atau email
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .or(`phone.eq.${phone},email.eq.${email}`)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verifikasi password
    const passwordValid = await compare(password, userData.password_hash)
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Login dengan Supabase Auth
    const authResponse = await supabase.auth.signInWithPassword({
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      password,
    })

    if (authResponse.error) {
      return NextResponse.json({ error: authResponse.error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: userData.id,
        phone: userData.phone,
        email: userData.email,
        fullName: userData.full_name,
      },
      session: authResponse.data.session,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
