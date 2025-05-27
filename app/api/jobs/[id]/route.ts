import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Increment view count
    await supabase.rpc("increment_view_count", { job_id: id })

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select(`
        *,
        company:companies(*),
        location:locations(*),
        category:job_categories(*),
        skills:job_skills(skill:skills(*))
      `)
      .eq("id", id)
      .single()

    if (jobError) {
      return NextResponse.json({ error: jobError.message }, { status: 400 })
    }

    // Get similar jobs
    const { data: similarJobs } = await supabase
      .from("jobs")
      .select(
        "id, title, company:companies(name), location:locations(city, province), job_type, salary_min, salary_max",
      )
      .eq("category_id", job.category_id)
      .neq("id", id)
      .limit(3)

    return NextResponse.json({
      job,
      similarJobs: similarJobs || [],
    })
  } catch (error) {
    console.error("Error fetching job details:", error)
    return NextResponse.json({ error: "An error occurred while fetching job details" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const jobData = await request.json()

    // Validasi input
    if (!jobData.title || !jobData.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    // Update job
    const { data, error } = await supabase.from("jobs").update(jobData).eq("id", id).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Job updated successfully",
      job: data,
    })
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json({ error: "An error occurred while updating job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Delete job
    const { error } = await supabase.from("jobs").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Job deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting job:", error)
    return NextResponse.json({ error: "An error occurred while deleting job" }, { status: 500 })
  }
}
