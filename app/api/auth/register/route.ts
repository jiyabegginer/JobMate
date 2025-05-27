import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"
import { hash } from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    const { phone, email, password, fullName } = await request.json()

    // Validasi input
    if ((!phone && !email) || !password) {
      return NextResponse.json({ error: "Phone or email and password are required" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Buat user di Supabase Auth
    const authResponse = await supabase.auth.signUp({
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (authResponse.error) {
      return NextResponse.json({ error: authResponse.error.message }, { status: 400 })
    }

    // Buat user di tabel users
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authResponse.data.user?.id,
        phone,
        email,
        password_hash: hashedPassword,
        full_name: fullName,
      })
      .select()
      .single()

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: userData.id,
        phone: userData.phone,
        email: userData.email,
        fullName: userData.full_name,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}
