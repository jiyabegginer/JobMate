import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Pastikan variabel lingkungan ini tersedia
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Buat client Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Fungsi helper untuk autentikasi
export const signUpWithPhone = async (phone: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    phone,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  return { data, error }
}

export const signInWithPhone = async (phone: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    phone,
    password,
  })

  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Fungsi helper untuk jobs
export const getJobs = async (
  search?: string,
  filters?: {
    category?: string
    location?: string
    jobType?: string
    ageFilter?: string
    disabilityFriendly?: boolean
  },
  page = 1,
  pageSize = 10,
) => {
  let query = supabase.from("active_jobs").select("*", { count: "exact" })

  // Tambahkan filter pencarian
  if (search) {
    query = query.textSearch("title", search, {
      type: "websearch",
      config: "indonesian",
    })
  }

  // Tambahkan filter kategori
  if (filters?.category && filters.category !== "all") {
    query = query.eq("category_id", filters.category)
  }

  // Tambahkan filter lokasi
  if (filters?.location && filters.location !== "all") {
    query = query.eq("location_id", filters.location)
  }

  // Tambahkan filter tipe pekerjaan
  if (filters?.jobType && filters.jobType !== "all") {
    query = query.eq("job_type", filters.jobType)
  }

  // Tambahkan filter usia
  if (filters?.ageFilter) {
    if (filters.ageFilter === "noLimit") {
      query = query.eq("no_age_limit", true)
    } else if (filters.ageFilter === "freshgrad") {
      query = query.eq("suitable_for", "freshgrad")
    } else if (filters.ageFilter === "intern") {
      query = query.eq("suitable_for", "intern")
    }
  }

  // Tambahkan filter ramah disabilitas
  if (filters?.disabilityFriendly) {
    query = query.eq("disability_friendly", true)
  }

  // Tambahkan pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query.order("created_at", { ascending: false }).range(from, to)

  return { data, error, count, page, pageSize }
}

// Fungsi helper untuk aplikasi pekerjaan
export const applyForJob = async (jobId: string, resumeId: string, coverLetter?: string) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase.from("job_applications").insert({
    job_id: jobId,
    user_id: user.user.id,
    resume_id: resumeId,
    cover_letter: coverLetter,
    status: "applied",
  })

  // Update application count
  if (!error) {
    await supabase.rpc("increment_applications_count", { job_id: jobId })
  }

  return { data, error }
}

// Fungsi helper untuk saved jobs
export const saveJob = async (jobId: string) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase.from("saved_jobs").insert({
    job_id: jobId,
    user_id: user.user.id,
  })

  return { data, error }
}

export const unsaveJob = async (jobId: string) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase.from("saved_jobs").delete().match({ job_id: jobId, user_id: user.user.id })

  return { data, error }
}

// Fungsi helper untuk CV
export const saveResume = async (title: string, fileUrl: string, isDefault = false) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  // Jika isDefault true, atur semua CV lain menjadi non-default
  if (isDefault) {
    await supabase.from("resumes").update({ is_default: false }).eq("user_id", user.user.id)
  }

  const { data, error } = await supabase.from("resumes").insert({
    user_id: user.user.id,
    title,
    file_url: fileUrl,
    is_default: isDefault,
  })

  return { data, error }
}

// Fungsi helper untuk profil pengguna
export const updateUserProfile = async (profile: {
  full_name?: string
  date_of_birth?: string
  address?: string
  bio?: string
  profile_picture?: string
}) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase.from("users").update(profile).eq("id", user.user.id)

  return { data, error }
}

// Fungsi helper untuk pendidikan
export const addEducation = async (education: {
  institution: string
  degree?: string
  field_of_study?: string
  start_year: number
  end_year?: number
  description?: string
}) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase.from("education").insert({
    ...education,
    user_id: user.user.id,
  })

  return { data, error }
}

// Fungsi helper untuk pengalaman kerja
export const addExperience = async (experience: {
  company: string
  position: string
  start_date: string
  end_date?: string
  is_current?: boolean
  description?: string
}) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase.from("experience").insert({
    ...experience,
    user_id: user.user.id,
  })

  return { data, error }
}

// Fungsi helper untuk keahlian
export const addUserSkill = async (skillId: string, proficiencyLevel?: number) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase.from("user_skills").insert({
    user_id: user.user.id,
    skill_id: skillId,
    proficiency_level: proficiencyLevel,
  })

  return { data, error }
}

// Fungsi helper untuk preferensi bahasa
export const updateLanguagePreference = async (language: string) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase.from("users").update({ preferred_language: language }).eq("id", user.user.id)

  return { data, error }
}

// Fungsi helper untuk pengaturan aksesibilitas
export const updateAccessibilitySettings = async (settings: any) => {
  const { data: user } = await supabase.auth.getUser()

  if (!user.user) {
    return { error: { message: "User not authenticated" } }
  }

  const { data, error } = await supabase
    .from("users")
    .update({ accessibility_settings: settings })
    .eq("id", user.user.id)

  return { data, error }
}
