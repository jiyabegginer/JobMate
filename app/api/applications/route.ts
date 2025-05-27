import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") || ""

    let query = supabase
      .from("job_applications")
      .select(`
        *,
        job:jobs(
          id,
          title,
          company:companies(id, name, logo),
          location:locations(city, province)
        )
      `)
      .eq("user_id", userId)

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query.order("application_date", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      applications: data,
    })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "An error occurred while fetching applications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id
    const { jobId, resumeId, coverLetter } = await request.json()

    // Validasi input
    if (!jobId || !resumeId) {
      return NextResponse.json({ error: "Job ID and Resume ID are required" }, { status: 400 })
    }

    // Cek apakah sudah pernah melamar
    const { data: existingApplication } = await supabase
      .from("job_applications")
      .select("id")
      .eq("job_id", jobId)
      .eq("user_id", userId)
      .single()

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied for this job" }, { status: 400 })
    }

    // Tambahkan aplikasi baru
    const { data, error } = await supabase
      .from("job_applications")
      .insert({
        job_id: jobId,
        user_id: userId,
        resume_id: resumeId,
        cover_letter: coverLetter,
        status: "applied",
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Update application count
    await supabase.rpc("increment_applications_count", { job_id: jobId })

    // Tambahkan status history
    await supabase.from("application_status_history").insert({
      application_id: data.id,
      status: "applied",
      notes: "Application submitted",
    })

    // Tambahkan notifikasi
    await supabase.from("notifications").insert({
      user_id: userId,
      title: "Application Submitted",
      message: "Your job application has been submitted successfully.",
      type: "application_update",
      related_entity_type: "application",
      related_entity_id: data.id,
    })

    return NextResponse.json({
      message: "Application submitted successfully",
      application: data,
    })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ error: "An error occurred while submitting application" }, { status: 500 })
  }
}
