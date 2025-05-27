import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const location = searchParams.get("location") || ""
    const jobType = searchParams.get("jobType") || ""
    const ageFilter = searchParams.get("ageFilter") || ""
    const disabilityFriendly = searchParams.get("disabilityFriendly") === "true"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

    let query = supabase.from("active_jobs").select("*", { count: "exact" })

    // Tambahkan filter pencarian
    if (search) {
      query = query.textSearch("title", search, {
        type: "websearch",
        config: "indonesian",
      })
    }

    // Tambahkan filter kategori
    if (category && category !== "all") {
      query = query.eq("category_id", category)
    }

    // Tambahkan filter lokasi
    if (location && location !== "all") {
      query = query.eq("location_id", location)
    }

    // Tambahkan filter tipe pekerjaan
    if (jobType && jobType !== "all") {
      query = query.eq("job_type", jobType)
    }

    // Tambahkan filter usia
    if (ageFilter) {
      if (ageFilter === "noLimit") {
        query = query.eq("no_age_limit", true)
      } else if (ageFilter === "freshgrad") {
        query = query.eq("suitable_for", "freshgrad")
      } else if (ageFilter === "intern") {
        query = query.eq("suitable_for", "intern")
      }
    }

    // Tambahkan filter ramah disabilitas
    if (disabilityFriendly) {
      query = query.eq("disability_friendly", true)
    }

    // Tambahkan pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await query.order("created_at", { ascending: false }).range(from, to)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      jobs: data,
      pagination: {
        total: count,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "An error occurred while fetching jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobData = await request.json()

    // Validasi input
    if (!jobData.title || !jobData.description || !jobData.company_id) {
      return NextResponse.json({ error: "Title, description, and company_id are required" }, { status: 400 })
    }

    // Tambahkan job baru
    const { data, error } = await supabase.from("jobs").insert(jobData).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Job created successfully",
      job: data,
    })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "An error occurred while creating job" }, { status: 500 })
  }
}
