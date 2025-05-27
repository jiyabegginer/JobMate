import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      resumes: data,
    })
  } catch (error) {
    console.error("Error fetching resumes:", error)
    return NextResponse.json({ error: "An error occurred while fetching resumes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id
    const { title, fileUrl, isDefault } = await request.json()

    // Validasi input
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Jika isDefault true, atur semua CV lain menjadi non-default
    if (isDefault) {
      await supabase.from("resumes").update({ is_default: false }).eq("user_id", userId)
    }

    // Tambahkan resume baru
    const { data, error } = await supabase
      .from("resumes")
      .insert({
        user_id: userId,
        title,
        file_url: fileUrl,
        is_default: isDefault || false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Resume created successfully",
      resume: data,
    })
  } catch (error) {
    console.error("Error creating resume:", error)
    return NextResponse.json({ error: "An error occurred while creating resume" }, { status: 500 })
  }
}
