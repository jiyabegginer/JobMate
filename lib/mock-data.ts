// Mock data service to replace database functionality
export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  requirements: string[]
  posted: string
}

export interface Training {
  id: string
  title: string
  provider: string
  category: string
  level: string
  duration: string
  rating: number
  students: number
  price: string
  skills: string[]
  relatedJobs: string[]
}

export interface SkillAudit {
  id: string
  skillName: string
  category: string
  currentLevel: number
  targetLevel: number
  lastAssessed: string
  nextAssessment: string
  status: "on-track" | "needs-attention" | "improving"
}

export interface WorkLog {
  id: string
  date: string
  project: string
  tasks: string[]
  achievements: string[]
  mood: "excellent" | "good" | "neutral" | "challenging"
  hours: number
}

// Mock Jobs Data
export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Startup",
    location: "Jakarta",
    type: "Full-time",
    salary: "Rp 8-12 juta",
    description: "Mencari frontend developer berpengalaman dengan React dan TypeScript",
    requirements: ["React", "TypeScript", "Tailwind CSS"],
    posted: "2 hari yang lalu",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Digital Agency",
    location: "Bandung",
    type: "Full-time",
    salary: "Rp 6-10 juta",
    description: "Desainer UI/UX untuk produk digital dan aplikasi mobile",
    requirements: ["Figma", "Adobe Creative Suite", "User Research"],
    posted: "1 minggu yang lalu",
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "E-commerce",
    location: "Surabaya",
    type: "Full-time",
    salary: "Rp 7-11 juta",
    description: "Analisis data untuk mendukung keputusan bisnis",
    requirements: ["Python", "SQL", "Tableau"],
    posted: "3 hari yang lalu",
  },
]

// Mock Training Data
export const mockTrainings: Training[] = [
  {
    id: "1",
    title: "React Development Masterclass",
    provider: "TechEdu",
    category: "Programming",
    level: "Intermediate",
    duration: "40 jam",
    rating: 4.8,
    students: 1250,
    price: "Rp 299.000",
    skills: ["React", "JavaScript", "Redux"],
    relatedJobs: ["Frontend Developer", "Full Stack Developer"],
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    provider: "DesignHub",
    category: "Design",
    level: "Beginner",
    duration: "25 jam",
    rating: 4.6,
    students: 890,
    price: "Gratis",
    skills: ["Figma", "User Research", "Prototyping"],
    relatedJobs: ["UI/UX Designer", "Product Designer"],
  },
  {
    id: "3",
    title: "Data Science with Python",
    provider: "DataLearn",
    category: "Data Science",
    level: "Intermediate",
    duration: "60 jam",
    rating: 4.9,
    students: 2100,
    price: "Rp 499.000",
    skills: ["Python", "Pandas", "Machine Learning"],
    relatedJobs: ["Data Analyst", "Data Scientist"],
  },
]

// Mock Skill Audit Data
export const mockSkillAudits: SkillAudit[] = [
  {
    id: "1",
    skillName: "React",
    category: "Technical",
    currentLevel: 3,
    targetLevel: 4,
    lastAssessed: "2024-01-15",
    nextAssessment: "2024-04-15",
    status: "on-track",
  },
  {
    id: "2",
    skillName: "Communication",
    category: "Soft Skills",
    currentLevel: 2,
    targetLevel: 4,
    lastAssessed: "2024-01-10",
    nextAssessment: "2024-04-10",
    status: "needs-attention",
  },
  {
    id: "3",
    skillName: "TypeScript",
    category: "Technical",
    currentLevel: 2,
    targetLevel: 3,
    lastAssessed: "2024-01-20",
    nextAssessment: "2024-04-20",
    status: "improving",
  },
]

// Mock Work Log Data
export const mockWorkLogs: WorkLog[] = [
  {
    id: "1",
    date: "2024-01-28",
    project: "E-commerce Website",
    tasks: ["Implemented shopping cart", "Fixed responsive issues", "Code review"],
    achievements: ["Completed cart functionality", "Improved mobile UX"],
    mood: "excellent",
    hours: 8,
  },
  {
    id: "2",
    date: "2024-01-27",
    project: "Mobile App",
    tasks: ["API integration", "Unit testing", "Bug fixes"],
    achievements: ["Successfully integrated payment API"],
    mood: "good",
    hours: 7,
  },
  {
    id: "3",
    date: "2024-01-26",
    project: "Dashboard",
    tasks: ["Data visualization", "Performance optimization"],
    achievements: ["Improved chart loading speed by 40%"],
    mood: "excellent",
    hours: 8,
  },
]

// Local Storage Helpers
export const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }
  return null
}

// Mock API Functions
export const searchJobs = (query: string, filters: any = {}) => {
  return new Promise<Job[]>((resolve) => {
    setTimeout(() => {
      let filteredJobs = mockJobs

      if (query) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.toLowerCase().includes(query.toLowerCase()),
        )
      }

      resolve(filteredJobs)
    }, 500)
  })
}

export const getTrainings = (category?: string) => {
  return new Promise<Training[]>((resolve) => {
    setTimeout(() => {
      let filteredTrainings = mockTrainings

      if (category && category !== "all") {
        filteredTrainings = filteredTrainings.filter(
          (training) => training.category.toLowerCase() === category.toLowerCase(),
        )
      }

      resolve(filteredTrainings)
    }, 300)
  })
}

export const getSkillAudits = () => {
  return new Promise<SkillAudit[]>((resolve) => {
    setTimeout(() => {
      resolve(mockSkillAudits)
    }, 200)
  })
}

export const getWorkLogs = () => {
  return new Promise<WorkLog[]>((resolve) => {
    setTimeout(() => {
      resolve(mockWorkLogs)
    }, 200)
  })
}
