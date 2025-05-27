import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function PUT(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id
    const settings = await request.json()

    // Update pengaturan aksesibilitas
    const { data, error } = await supabase
      .from("users")
      .update({ accessibility_settings: settings })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Accessibility settings updated successfully",
      settings: data.accessibility_settings,
    })
  } catch (error) {
    console.error("Error updating accessibility settings:", error)
    return NextResponse.json({ error: "An error occurred while updating accessibility settings" }, { status: 500 })
  }
}
