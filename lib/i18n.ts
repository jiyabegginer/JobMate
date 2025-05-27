// Tipe untuk terjemahan
export type Translation = {
  [key: string]: string | Translation
}

// Terjemahan Bahasa Indonesia
export const id: Translation = {
  common: {
    login: "Masuk",
    register: "Daftar",
    search: "Cari",
    saved: "Tersimpan",
    applications: "Lamaran",
    profile: "Profil",
    features: "Fitur",
    users: "Pengguna",
    howItWorks: "Cara Kerja",
    advantages: "Keunggulan",
    mobileApp: "Aplikasi Mobile",
    downloadApp: "Unduh Aplikasi Mobile",
    findJobs: "Cari Lowongan",
    createCV: "Buat CV Template",
    signUpNow: "Daftar Sekarang",
    noSavedJobs: "Belum ada lowongan tersimpan",
    saveJobsToView: "Simpan lowongan yang menarik untuk dilihat nanti",
    noActiveApplications: "Belum ada lamaran aktif",
    startApplying: "Mulai lamar pekerjaan untuk melihat status lamaran Anda",
    loginOrRegister: "Masuk atau Daftar",
    loginToAccess: "Masuk ke akun Anda untuk menyimpan profil, melacak lamaran, dan fitur lainnya",
  },
  home: {
    hero: {
      title: "Temukan Pekerjaan Impianmu dengan JobMate",
      subtitle:
        "Platform yang menghubungkan pencari kerja dan perusahaan secara efisien, transparan, dan user-friendly",
    },
    targetUsers: {
      title: "Solusi untuk Semua Pencari Kerja",
      subtitle: "JobMate menyediakan fitur khusus untuk berbagai segmen pencari kerja",
      freshGrad: {
        title: "Fresh Graduate",
        description:
          "Baru lulus dan mencari pekerjaan pertama? JobMate membantu Anda memulai karir dengan percaya diri.",
        features: [
          "Filter khusus untuk pekerjaan entry-level",
          "Template CV yang dioptimalkan untuk fresh graduate",
          "Tips wawancara dan persiapan karir",
          "Rekomendasi pekerjaan yang cocok untuk lulusan baru",
        ],
        cta: "Lihat Pekerjaan untuk Fresh Graduate",
      },
      students: {
        title: "Mahasiswa",
        description: "Cari magang atau pekerjaan paruh waktu sambil kuliah untuk membangun pengalaman.",
        features: [
          "Program magang dan internship terbaik",
          "Pekerjaan paruh waktu yang fleksibel",
          "Jadwal yang dapat disesuaikan dengan kuliah",
          "Kesempatan magang yang dapat dikonversi menjadi kredit akademik",
        ],
        cta: "Temukan Magang & Part-time",
      },
      professionals: {
        title: "Profesional 25+",
        description: "Fitur inklusif untuk pencari kerja dengan pengalaman dan usia yang lebih matang.",
        features: [
          "Pekerjaan tanpa batasan usia",
          "Filter khusus: freelance, remote, dan part-time",
          'Label "Terbuka untuk usia berapa pun" pada lowongan',
          "Template CV yang menekankan pengalaman dan keahlian",
        ],
        cta: "Jelajahi Pekerjaan Inklusif",
      },
    },
    features: {
      title: "Fitur Utama JobMate",
      subtitle: "Platform yang dirancang untuk memudahkan pencarian pekerjaan dan rekrutmen",
      jobFilter: {
        title: "Filter Pekerjaan Spesifik",
        description: "Cari pekerjaan berdasarkan lokasi, gaji, kategori, dan bidang dengan filter yang detail",
        detail: "Filter cerdas membantu Anda menemukan pekerjaan yang sesuai dengan preferensi dan keahlian",
      },
      statusTracking: {
        title: "Pelacakan Status Real-time",
        description: "Pantau status lamaran Anda secara real-time dengan notifikasi otomatis",
      },
      chatbot: {
        title: "Chatbot Interaktif",
        description: "Dapatkan bantuan dan informasi melalui chatbot dengan maskot JobMate",
      },
      companyRating: {
        title: "Rating Perusahaan",
        description: "Lihat dan berikan rating untuk perusahaan dengan sistem bintang",
        detail: "Dapatkan informasi tentang budaya kerja dan lingkungan perusahaan dari review karyawan",
      },
      jobCategories: {
        title: "Kategorisasi Pekerjaan",
        description: "Pekerjaan dikategorikan berdasarkan jenis dan tingkat keahlian",
      },
      linkedinIntegration: {
        title: "Integrasi LinkedIn",
        description: "Login dan impor data profil dari LinkedIn dengan mudah",
        button: "Hubungkan dengan LinkedIn",
      },
    },
    cta: {
      title: "Siap Memulai Perjalanan Karir Baru?",
      subtitle: "Bergabunglah dengan JobMate sekarang dan temukan pekerjaan impian Anda",
    },
  },
  jobSearch: {
    searchPlaceholder: "Cari posisi, perusahaan, atau kata kunci",
    location: "Lokasi",
    category: "Kategori",
    ageExperience: "Usia/Pengalaman",
    jobType: "Jenis Pekerjaan",
    allLocations: "Semua Lokasi",
    allCategories: "Semua Kategori",
    allAges: "Semua Usia",
    noAgeLimit: "Tanpa Batasan Usia",
    freshGraduate: "Fresh Graduate",
    internship: "Magang/Internship",
    allTypes: "Semua Jenis",
    fullTime: "Full-time",
    partTime: "Part-time",
    freelance: "Freelance",
    remote: "Remote",
    disabilityFriendly: "Ramah Disabilitas",
    filter: "Filter",
    jobsFound: "Lowongan Ditemukan",
    sort: "Urutkan",
    newest: "Terbaru",
    highestSalary: "Gaji Tertinggi",
    highestRating: "Rating Tertinggi",
    openToAllAges: "Terbuka Untuk Semua Usia",
    openToDisability: "Ramah Disabilitas",
    applyNow: "Lamar Sekarang",
    save: "Simpan",
    noJobsFound: "Tidak ada lowongan ditemukan",
    tryChangingSearch: "Coba ubah kata kunci atau filter pencarian Anda",
  },
  auth: {
    register: {
      title: "Daftar Akun",
      subtitle: "Buat akun JobMate untuk mulai mencari pekerjaan",
      phoneNumber: "Nomor Telepon",
      phonePlaceholder: "08xx atau +62xx",
      password: "Password",
      createPassword: "Buat password",
      confirmPassword: "Konfirmasi Password",
      confirmPasswordPlaceholder: "Konfirmasi password",
      passwordRequirements: "Password harus memenuhi kriteria berikut:",
      minChars: "Minimal 8 karakter",
      containNumber: "Mengandung minimal 1 angka",
      containSpecial: "Mengandung minimal 1 karakter khusus (!@#$%^&*)",
      passwordsMatch: "Password dan konfirmasi cocok",
      registerButton: "Daftar",
      processing: "Memproses...",
      alreadyHaveAccount: "Sudah punya akun?",
      login: "Masuk",
    },
    login: {
      title: "Masuk ke JobMate",
      subtitle: "Masuk untuk melanjutkan pencarian pekerjaan Anda",
      phoneTab: "Nomor Telepon",
      emailTab: "Email",
      phoneNumber: "Nomor Telepon",
      phonePlaceholder: "08xx atau +62xx",
      email: "Email",
      emailPlaceholder: "nama@email.com",
      password: "Password",
      passwordPlaceholder: "Masukkan password",
      forgotPassword: "Lupa Password?",
      loginButton: "Masuk",
      processing: "Memproses...",
      orLoginWith: "Atau masuk dengan",
      noAccount: "Belum punya akun?",
      register: "Daftar",
    },
  },
  accessibility: {
    increaseTextSize: "Perbesar Teks",
    decreaseTextSize: "Perkecil Teks",
    highContrast: "Kontras Tinggi",
    skipToContent: "Langsung ke Konten",
    accessibilityOptions: "Opsi Aksesibilitas",
  },
}

// Terjemahan Bahasa Inggris
export const en: Translation = {
  common: {
    login: "Login",
    register: "Register",
    search: "Search",
    saved: "Saved",
    applications: "Applications",
    profile: "Profile",
    features: "Features",
    users: "Users",
    howItWorks: "How It Works",
    advantages: "Advantages",
    mobileApp: "Mobile App",
    downloadApp: "Download Mobile App",
    findJobs: "Find Jobs",
    createCV: "Create CV Template",
    signUpNow: "Sign Up Now",
    noSavedJobs: "No saved jobs yet",
    saveJobsToView: "Save interesting jobs to view later",
    noActiveApplications: "No active applications",
    startApplying: "Start applying for jobs to see your application status",
    loginOrRegister: "Login or Register",
    loginToAccess: "Login to your account to save your profile, track applications, and more",
  },
  home: {
    hero: {
      title: "Find Your Dream Job with JobMate",
      subtitle: "A platform that connects job seekers and companies efficiently, transparently, and user-friendly",
    },
    targetUsers: {
      title: "Solutions for All Job Seekers",
      subtitle: "JobMate provides specialized features for various job seeker segments",
      freshGrad: {
        title: "Fresh Graduate",
        description:
          "Just graduated and looking for your first job? JobMate helps you start your career with confidence.",
        features: [
          "Special filters for entry-level jobs",
          "CV templates optimized for fresh graduates",
          "Interview tips and career preparation",
          "Job recommendations suitable for new graduates",
        ],
        cta: "View Jobs for Fresh Graduates",
      },
      students: {
        title: "Students",
        description: "Find internships or part-time jobs while studying to build experience.",
        features: [
          "Best internship programs",
          "Flexible part-time jobs",
          "Schedules that can be adjusted to your classes",
          "Internship opportunities that can be converted to academic credits",
        ],
        cta: "Find Internships & Part-time Jobs",
      },
      professionals: {
        title: "Professionals 25+",
        description: "Inclusive features for job seekers with more experience and mature age.",
        features: [
          "Jobs without age restrictions",
          "Special filters: freelance, remote, and part-time",
          '"Open to any age" label on job listings',
          "CV templates that emphasize experience and skills",
        ],
        cta: "Explore Inclusive Jobs",
      },
    },
    features: {
      title: "JobMate Main Features",
      subtitle: "A platform designed to facilitate job search and recruitment",
      jobFilter: {
        title: "Specific Job Filters",
        description: "Search for jobs based on location, salary, category, and field with detailed filters",
        detail: "Smart filters help you find jobs that match your preferences and skills",
      },
      statusTracking: {
        title: "Real-time Status Tracking",
        description: "Monitor your application status in real-time with automatic notifications",
      },
      chatbot: {
        title: "Interactive Chatbot",
        description: "Get help and information through a chatbot with JobMate mascot",
      },
      companyRating: {
        title: "Company Ratings",
        description: "View and give ratings to companies with a star system",
        detail: "Get information about work culture and company environment from employee reviews",
      },
      jobCategories: {
        title: "Job Categorization",
        description: "Jobs are categorized by type and skill level",
      },
      linkedinIntegration: {
        title: "LinkedIn Integration",
        description: "Login and import profile data from LinkedIn easily",
        button: "Connect with LinkedIn",
      },
    },
    cta: {
      title: "Ready to Start Your New Career Journey?",
      subtitle: "Join JobMate now and find your dream job",
    },
  },
  jobSearch: {
    searchPlaceholder: "Search for position, company, or keywords",
    location: "Location",
    category: "Category",
    ageExperience: "Age/Experience",
    jobType: "Job Type",
    allLocations: "All Locations",
    allCategories: "All Categories",
    allAges: "All Ages",
    noAgeLimit: "No Age Limit",
    freshGraduate: "Fresh Graduate",
    internship: "Internship",
    allTypes: "All Types",
    fullTime: "Full-time",
    partTime: "Part-time",
    freelance: "Freelance",
    remote: "Remote",
    disabilityFriendly: "Disability Friendly",
    filter: "Filter",
    jobsFound: "Jobs Found",
    sort: "Sort",
    newest: "Newest",
    highestSalary: "Highest Salary",
    highestRating: "Highest Rating",
    openToAllAges: "Open To All Ages",
    openToDisability: "Disability Friendly",
    applyNow: "Apply Now",
    save: "Save",
    noJobsFound: "No jobs found",
    tryChangingSearch: "Try changing your search keywords or filters",
  },
  auth: {
    register: {
      title: "Register Account",
      subtitle: "Create a JobMate account to start looking for jobs",
      phoneNumber: "Phone Number",
      phonePlaceholder: "08xx or +62xx",
      password: "Password",
      createPassword: "Create password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm password",
      passwordRequirements: "Password must meet the following criteria:",
      minChars: "Minimum 8 characters",
      containNumber: "Contains at least 1 number",
      containSpecial: "Contains at least 1 special character (!@#$%^&*)",
      passwordsMatch: "Password and confirmation match",
      registerButton: "Register",
      processing: "Processing...",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
    },
    login: {
      title: "Login to JobMate",
      subtitle: "Login to continue your job search",
      phoneTab: "Phone Number",
      emailTab: "Email",
      phoneNumber: "Phone Number",
      phonePlaceholder: "08xx or +62xx",
      email: "Email",
      emailPlaceholder: "name@email.com",
      password: "Password",
      passwordPlaceholder: "Enter password",
      forgotPassword: "Forgot Password?",
      loginButton: "Login",
      processing: "Processing...",
      orLoginWith: "Or login with",
      noAccount: "Don't have an account?",
      register: "Register",
    },
  },
  accessibility: {
    increaseTextSize: "Increase Text Size",
    decreaseTextSize: "Decrease Text Size",
    highContrast: "High Contrast",
    skipToContent: "Skip to Content",
    accessibilityOptions: "Accessibility Options",
  },
}

// Tipe untuk konteks i18n
export type I18nContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, options?: { returnObjects?: boolean }) => string | any
}

// Fungsi untuk mendapatkan terjemahan berdasarkan kunci
export const getTranslation = (obj: Translation, path: string): string | any => {
  const keys = path.split(".")
  let current: any = obj

  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Translation key not found: ${path}`)
      return path
    }
    current = current[key]
  }

  return current
}
