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
      .from("saved_jobs")
      .select(`
        id,
        job:jobs(
          id,
          title,
          company:companies(id, name, logo),
          location:locations(city, province),
          job_type,
          salary_min,
          salary_max,
          salary_currency,
          created_at
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      savedJobs: data,
    })
  } catch (error) {
    console.error("Error fetching saved jobs:", error)
    return NextResponse.json({ error: "An error occurred while fetching saved jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id
    const { jobId } = await request.json()

    // Validasi input
    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    // Cek apakah sudah disimpan
    const { data: existingSaved } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("job_id", jobId)
      .eq("user_id", userId)
      .single()

    if (existingSaved) {
      return NextResponse.json({ error: "Job already saved" }, { status: 400 })
    }

    // Simpan job
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert({
        job_id: jobId,
        user_id: userId,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Job saved successfully",
      savedJob: data,
    })
  } catch (error) {
    console.error("Error saving job:", error)
    return NextResponse.json({ error: "An error occurred while saving job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.session.user.id
    const searchParams = request.nextUrl.searchParams
    const jobId = searchParams.get("jobId")

    // Validasi input
    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    // Hapus saved job
    const { error } = await supabase.from("saved_jobs").delete().eq("job_id", jobId).eq("user_id", userId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Job removed from saved successfully",
    })
  } catch (error) {
    console.error("Error removing saved job:", error)
    return NextResponse.json({ error: "An error occurred while removing saved job" }, { status: 500 })
  }
}
