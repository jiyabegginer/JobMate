import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function PUT(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id
    const { language } = await request.json()

    // Validasi input
    if (!language || !["id", "en"].includes(language)) {
      return NextResponse.json({ error: "Valid language (id or en) is required" }, { status: 400 })
    }

    // Update preferensi bahasa
    const { data, error } = await supabase
      .from("users")
      .update({ preferred_language: language })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Language preference updated successfully",
      language: data.preferred_language,
    })
  } catch (error) {
    console.error("Error updating language preference:", error)
    return NextResponse.json({ error: "An error occurred while updating language preference" }, { status: 500 })
  }
}
