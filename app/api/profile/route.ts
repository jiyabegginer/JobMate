import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id

    // Ambil data profil
    const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("id", userId).single()

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    // Ambil data pendidikan
    const { data: education } = await supabase
      .from("education")
      .select("*")
      .eq("user_id", userId)
      .order("start_year", { ascending: false })

    // Ambil data pengalaman
    const { data: experience } = await supabase
      .from("experience")
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: false })

    // Ambil data keahlian
    const { data: skills } = await supabase.from("user_skills").select("*, skill:skills(*)").eq("user_id", userId)

    return NextResponse.json({
      profile,
      education: education || [],
      experience: experience || [],
      skills: skills || [],
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "An error occurred while fetching profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id
    const profileData = await request.json()

    // Update profil
    const { data, error } = await supabase.from("users").update(profileData).eq("id", userId).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: data,
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "An error occurred while updating profile" }, { status: 500 })
  }
}
