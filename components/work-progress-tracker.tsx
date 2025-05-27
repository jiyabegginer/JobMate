"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  FileText,
  LinkIcon,
  Plus,
  Share2,
  Upload,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  Eye,
  Download,
  Edit,
  Trash2,
} from "lucide-react"

export default function WorkProgressTracker() {
  const [activeTab, setActiveTab] = useState("projects")
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Mock data untuk progress tracker
  const projects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      type: "Web Development",
      status: "completed",
      startDate: "10 Jan 2023",
      endDate: "15 Mar 2023",
      client: "PT Maju Bersama",
      description:
        "Redesign website e-commerce untuk meningkatkan user experience dan conversion rate. Proyek ini melibatkan analisis UX, redesign UI, dan implementasi frontend dengan React.",
      skills: ["UI/UX Design", "React", "Node.js", "MongoDB", "Figma"],
      achievements: [
        "Meningkatkan conversion rate sebesar 25%",
        "Mengurangi bounce rate sebesar 15%",
        "Meningkatkan page load speed sebesar 40%",
        "Implementasi responsive design untuk mobile",
      ],
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      links: [
        { title: "GitHub Repository", url: "https://github.com/username/ecommerce-redesign" },
        { title: "Live Demo", url: "https://ecommerce-demo.com" },
        { title: "Case Study", url: "https://portfolio.com/case-study" },
      ],
      teamSize: 4,
      role: "Frontend Developer & UI Designer",
    },
    {
      id: 2,
      title: "Mobile App Development - TaskMaster",
      type: "Mobile Development",
      status: "in-progress",
      startDate: "5 May 2023",
      endDate: null,
      client: "Startup XYZ",
      description:
        "Pengembangan aplikasi mobile untuk manajemen tugas dan produktivitas menggunakan React Native. Aplikasi ini memiliki fitur real-time sync, offline mode, dan integrasi dengan calendar.",
      skills: ["React Native", "Firebase", "Redux", "Jest", "TypeScript"],
      achievements: [
        "Berhasil merilis versi beta dengan rating 4.5/5",
        "Implementasi fitur real-time notification",
        "Mencapai 1000+ downloads dalam 2 minggu",
        "Implementasi offline-first architecture",
      ],
      images: ["/placeholder.svg?height=200&width=300"],
      links: [
        { title: "Project Management", url: "https://trello.com/board/taskmaster" },
        { title: "Beta Testing", url: "https://testflight.apple.com/taskmaster" },
      ],
      teamSize: 3,
      role: "Lead Mobile Developer",
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      type: "Data Visualization",
      status: "planning",
      startDate: "1 Dec 2023",
      endDate: null,
      client: "Internal Project",
      description:
        "Pembuatan dashboard untuk visualisasi data penjualan dan analisis tren menggunakan D3.js dan Python backend. Dashboard akan menampilkan real-time metrics dan predictive analytics.",
      skills: ["Python", "D3.js", "SQL", "Tableau", "FastAPI"],
      achievements: [],
      images: [],
      links: [{ title: "Project Proposal", url: "https://docs.google.com/document/proposal" }],
      teamSize: 2,
      role: "Full-Stack Developer",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Best Frontend Developer Award",
      date: "Nov 2023",
      organization: "Tech Conference 2023",
      description:
        "Penghargaan untuk kontribusi dalam pengembangan frontend dan inovasi UI/UX. Diberikan berdasarkan portfolio proyek dan presentasi teknis.",
      certificate: "/placeholder.svg?height=200&width=300",
      links: [
        { title: "Certificate Verification", url: "https://techconf2023.com/verify/12345" },
        { title: "Award Announcement", url: "https://techconf2023.com/awards" },
      ],
      type: "award",
    },
    {
      id: 2,
      title: "React Advanced Certification",
      date: "Aug 2023",
      organization: "React Academy",
      description:
        "Sertifikasi untuk penguasaan React tingkat lanjut termasuk performance optimization, advanced patterns, dan testing strategies.",
      certificate: "/placeholder.svg?height=200&width=300",
      links: [
        { title: "Certificate", url: "https://reactacademy.com/certificate/67890" },
        { title: "Verification", url: "https://reactacademy.com/verify/67890" },
      ],
      type: "certification",
    },
    {
      id: 3,
      title: "AWS Solutions Architect Associate",
      date: "Jun 2023",
      organization: "Amazon Web Services",
      description:
        "Sertifikasi AWS untuk kemampuan merancang dan deploy aplikasi yang scalable dan fault-tolerant di AWS cloud platform.",
      certificate: "/placeholder.svg?height=200&width=300",
      links: [{ title: "AWS Certification", url: "https://aws.amazon.com/verification" }],
      type: "certification",
    },
  ]

  const workLogs = [
    {
      id: 1,
      date: "20 Nov 2023",
      hours: 8,
      project: "Mobile App Development - TaskMaster",
      tasks: [
        "Implementasi authentication flow dengan Firebase Auth",
        "Perbaikan UI pada halaman profile dan settings",
        "Code review untuk pull request #42 - notification system",
        "Meeting dengan tim design untuk diskusi UX improvements",
      ],
      learnings:
        "Menemukan cara yang lebih efisien untuk mengelola state dalam aplikasi React Native yang kompleks menggunakan Redux Toolkit. Juga mempelajari best practices untuk Firebase Auth integration.",
      challenges: "Menghadapi issue dengan deep linking di iOS, solved dengan menggunakan React Navigation v6",
      mood: "productive",
    },
    {
      id: 2,
      date: "19 Nov 2023",
      hours: 7,
      project: "Mobile App Development - TaskMaster",
      tasks: [
        "Debugging issue pada iOS device terkait push notifications",
        "Meeting dengan tim design untuk review mockup v2.0",
        "Implementasi feedback dari user testing session",
        "Update dokumentasi API untuk endpoint baru",
      ],
      learnings:
        "Mempelajari teknik debugging yang lebih efektif untuk masalah spesifik di iOS menggunakan Xcode console dan React Native debugger.",
      challenges: "Push notification tidak muncul di iOS production build, fixed dengan proper certificate setup",
      mood: "challenging",
    },
    {
      id: 3,
      date: "18 Nov 2023",
      hours: 6,
      project: "Data Analytics Dashboard",
      tasks: [
        "Research untuk library visualisasi data (D3.js vs Chart.js vs Recharts)",
        "Pembuatan mockup dashboard dengan Figma",
        "Diskusi dengan stakeholder tentang kebutuhan dan requirements",
        "Setup development environment dan project structure",
      ],
      learnings:
        "Mendapatkan insight baru tentang cara menyajikan data kompleks dengan visualisasi yang intuitif. D3.js memberikan flexibility terbaik untuk custom visualizations.",
      challenges: "Menentukan tech stack yang tepat untuk balance antara development speed dan customization",
      mood: "exploratory",
    },
  ]

  const portfolioStats = {
    totalProjects: projects.length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
    totalAchievements: achievements.length,
    totalWorkLogs: workLogs.length,
    totalHours: workLogs.reduce((acc, log) => acc + log.hours, 0),
    publicPortfolioUrl: "https://portfolio.johndoe.dev",
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case "planning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Planning</Badge>
      case "on-hold":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">On Hold</Badge>
      default:
        return null
    }
  }

  const getTypeBadge = (type) => {
    switch (type) {
      case "award":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Award</Badge>
      case "certification":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Certification</Badge>
      default:
        return null
    }
  }

  const getMoodIcon = (mood) => {
    switch (mood) {
      case "productive":
        return "😊"
      case "challenging":
        return "😤"
      case "exploratory":
        return "🤔"
      default:
        return "😐"
    }
  }

  const renderAddDialog = () => {
    const getDialogContent = () => {
      switch (activeTab) {
        case "projects":
          return (
            <>
              <DialogHeader>
                <DialogTitle>Tambah Proyek Baru</DialogTitle>
                <DialogDescription>Tambahkan detail proyek yang telah atau sedang Anda kerjakan.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Proyek</Label>
                    <Input id="title" placeholder="Masukkan judul proyek" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipe Proyek</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Pilih tipe proyek" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                        <SelectItem value="data">Data Analysis</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Tanggal Mulai</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Tanggal Selesai</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Klien / Perusahaan</Label>
                  <Input id="client" placeholder="Masukkan nama klien atau perusahaan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea id="description" placeholder="Jelaskan tentang proyek ini" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Keterampilan yang Digunakan</Label>
                  <Input id="skills" placeholder="Contoh: React, Node.js, MongoDB (pisahkan dengan koma)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievements">Pencapaian</Label>
                  <Textarea id="achievements" placeholder="Masukkan pencapaian dalam proyek ini (satu per baris)" />
                </div>
                <div className="space-y-2">
                  <Label>Gambar Proyek</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop gambar atau klik untuk memilih</p>
                    <Input id="images" type="file" className="hidden" />
                    <Button variant="outline" size="sm" className="mt-2">
                      Pilih File
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Link Proyek</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Judul link" />
                    <Input placeholder="URL" />
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )
        case "achievements":
          return (
            <>
              <DialogHeader>
                <DialogTitle>Tambah Pencapaian Baru</DialogTitle>
                <DialogDescription>Tambahkan penghargaan, sertifikasi, atau pencapaian lainnya.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="achievementTitle">Judul Pencapaian</Label>
                  <Input id="achievementTitle" placeholder="Contoh: JavaScript Advanced Certification" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="achievementDate">Tanggal</Label>
                    <Input id="achievementDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organisasi / Penerbit</Label>
                    <Input id="organization" placeholder="Contoh: Udemy, Google, dsb." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievementDescription">Deskripsi</Label>
                  <Textarea id="achievementDescription" placeholder="Jelaskan tentang pencapaian ini" />
                </div>
                <div className="space-y-2">
                  <Label>Sertifikat / Bukti</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop file atau klik untuk memilih</p>
                    <Input id="certificate" type="file" className="hidden" />
                    <Button variant="outline" size="sm" className="mt-2">
                      Pilih File
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Link Verifikasi</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Judul link" />
                    <Input placeholder="URL" />
                  </div>
                </div>
              </div>
            </>
          )
        case "worklog":
          return (
            <>
              <DialogHeader>
                <DialogTitle>Tambah Log Pekerjaan</DialogTitle>
                <DialogDescription>Catat aktivitas dan pembelajaran harian Anda.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logDate">Tanggal</Label>
                    <Input id="logDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Jam Kerja</Label>
                    <Input id="hours" type="number" min="0" max="24" placeholder="8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logProject">Proyek</Label>
                  <Select>
                    <SelectTrigger id="logProject">
                      <SelectValue placeholder="Pilih proyek" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tasks">Tugas yang Dikerjakan</Label>
                  <Textarea id="tasks" placeholder="Masukkan tugas yang dikerjakan (satu per baris)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="learnings">Pembelajaran / Refleksi</Label>
                  <Textarea id="learnings" placeholder="Apa yang Anda pelajari hari ini?" />
                </div>
              </div>
            </>
          )
        default:
          return null
      }
    }

    return (
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          {getDialogContent()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Batal
            </Button>
            <Button style={{ backgroundColor: "#f7564e" }}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Work Progress Tracker</h1>
          <p className="text-muted-foreground mt-2">
            Dokumentasikan perjalanan profesional Anda dengan mencatat proyek, pencapaian, dan log pekerjaan
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview Portofolio
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Bagikan
          </Button>
          <Button style={{ backgroundColor: "#f7564e" }} onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Baru
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Proyek</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{portfolioStats.totalProjects}</div>
            <p className="text-sm text-muted-foreground">
              {portfolioStats.completedProjects} selesai,{" "}
              {portfolioStats.totalProjects - portfolioStats.completedProjects} aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pencapaian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{portfolioStats.totalAchievements}</div>
            <p className="text-sm text-muted-foreground">Awards & Certifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Log Pekerjaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{portfolioStats.totalWorkLogs}</div>
            <p className="text-sm text-muted-foreground">{portfolioStats.totalHours} jam total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Portofolio Publik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Online</span>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Lihat Portofolio
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="projects">Proyek</TabsTrigger>
          <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
          <TabsTrigger value="worklog">Log Pekerjaan</TabsTrigger>
          <TabsTrigger value="portfolio">Portofolio Publik</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4 mt-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedItem(expandedItem === project.id ? null : project.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">{project.title}</h3>
                    {getStatusBadge(project.status)}
                    <Badge variant="outline" className="text-xs">
                      {project.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      {project.startDate} {project.endDate ? `- ${project.endDate}` : "- Present"}
                    </div>
                    {expandedItem === project.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {project.skills.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.skills.length - 4}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </div>

              {expandedItem === project.id && (
                <div className="px-4 pb-4 border-t pt-4 bg-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Detail Proyek</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 mt-0.5 text-gray-500" />
                            <div>
                              <div className="font-medium">Periode</div>
                              <div>
                                {project.startDate} {project.endDate ? `- ${project.endDate}` : "- Present"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Globe className="h-4 w-4 mt-0.5 text-gray-500" />
                            <div>
                              <div className="font-medium">Klien / Perusahaan</div>
                              <div>{project.client}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-0.5 text-gray-500" />
                            <div>
                              <div className="font-medium">Role</div>
                              <div>{project.role}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Deskripsi</h4>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>

                      {project.achievements.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Pencapaian</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {project.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.links.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Link</h4>
                          <div className="space-y-2">
                            {project.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                              >
                                <LinkIcon className="h-4 w-4" />
                                {link.title}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {project.images.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Gambar Proyek</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {project.images.map((image, index) => (
                            <img
                              key={index}
                              src={image || "/placeholder.svg"}
                              alt={`${project.title} screenshot ${index + 1}`}
                              className="rounded-lg border object-cover aspect-video w-full"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end mt-4 gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 mt-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedItem(expandedItem === achievement.id ? null : achievement.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">{achievement.title}</h3>
                    {getTypeBadge(achievement.type)}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{achievement.date}</div>
                    {expandedItem === achievement.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{achievement.organization}</p>
                <p className="text-sm line-clamp-2">{achievement.description}</p>
              </div>

              {expandedItem === achievement.id && (
                <div className="px-4 pb-4 border-t pt-4 bg-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Detail Pencapaian</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium">Tanggal</div>
                            <div>{achievement.date}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Globe className="h-4 w-4 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium">Organisasi / Penerbit</div>
                            <div>{achievement.organization}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium">Deskripsi</div>
                            <div>{achievement.description}</div>
                          </div>
                        </div>
                      </div>

                      {achievement.links.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Link</h4>
                          <div className="space-y-2">
                            {achievement.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                              >
                                <LinkIcon className="h-4 w-4" />
                                {link.title}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {achievement.certificate && (
                      <div>
                        <h4 className="font-medium mb-2">Sertifikat</h4>
                        <img
                          src={achievement.certificate || "/placeholder.svg"}
                          alt={`${achievement.title} certificate`}
                          className="rounded-lg border object-cover w-full"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end mt-4 gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="worklog" className="space-y-4 mt-6">
          {workLogs.map((log) => (
            <Card key={log.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedItem(expandedItem === log.id ? null : log.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">{log.project}</h3>
                    <Badge variant="outline" className="text-xs">
                      {log.hours} jam
                    </Badge>
                    <span className="text-lg">{getMoodIcon(log.mood)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{log.date}</div>
                    {expandedItem === log.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="text-sm line-clamp-2">
                  {log.tasks.slice(0, 2).join(", ")}
                  {log.tasks.length > 2 && ` dan ${log.tasks.length - 2} tugas lainnya`}
                </div>
              </div>

              {expandedItem === log.id && (
                <div className="px-4 pb-4 border-t pt-4 bg-gray-50">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Tugas yang Dikerjakan</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {log.tasks.map((task, index) => (
                          <li key={index}>{task}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Pembelajaran / Refleksi</h4>
                      <p className="text-sm text-gray-600">{log.learnings}</p>
                    </div>

                    {log.challenges && (
                      <div>
                        <h4 className="font-medium mb-2">Tantangan & Solusi</h4>
                        <p className="text-sm text-gray-600">{log.challenges}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end mt-4 gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="portfolio" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Portofolio Publik</CardTitle>
              <CardDescription>
                Buat dan bagikan portofolio publik yang menampilkan proyek dan pencapaian Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Portofolio Anda sudah online!</div>
                    <div className="text-sm text-muted-foreground">{portfolioStats.publicPortfolioUrl}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buka
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Statistik Portofolio</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Proyek</span>
                      <span className="font-medium">{portfolioStats.totalProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Proyek Selesai</span>
                      <span className="font-medium">{portfolioStats.completedProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pencapaian</span>
                      <span className="font-medium">{portfolioStats.totalAchievements}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Jam Kerja</span>
                      <span className="font-medium">{portfolioStats.totalHours} jam</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Pengaturan Portofolio</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Tema & Layout
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Custom Domain
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share2 className="h-4 w-4 mr-2" />
                      Pengaturan Privasi
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-3">Bagikan Portofolio</h4>
                <div className="flex gap-2">
                  <Input value={portfolioStats.publicPortfolioUrl} readOnly className="flex-1" />
                  <Button>
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Tambah{" "}
              {activeTab === "projects" ? "Proyek" : activeTab === "achievements" ? "Pencapaian" : "Log Pekerjaan"} Baru
            </DialogTitle>
            <DialogDescription>
              {activeTab === "projects" && "Tambahkan detail proyek yang telah atau sedang Anda kerjakan."}
              {activeTab === "achievements" && "Tambahkan penghargaan, sertifikasi, atau pencapaian lainnya."}
              {activeTab === "worklog" && "Catat aktivitas dan pembelajaran harian Anda."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {activeTab === "projects" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Proyek</Label>
                    <Input id="title" placeholder="Masukkan judul proyek" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipe Proyek</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Pilih tipe proyek" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                        <SelectItem value="data">Data Analysis</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Tanggal Mulai</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Tanggal Selesai</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Klien / Perusahaan</Label>
                  <Input id="client" placeholder="Masukkan nama klien atau perusahaan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea id="description" placeholder="Jelaskan tentang proyek ini" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Keterampilan yang Digunakan</Label>
                  <Input id="skills" placeholder="Contoh: React, Node.js, MongoDB (pisahkan dengan koma)" />
                </div>
              </>
            )}

            {activeTab === "achievements" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="achievementTitle">Judul Pencapaian</Label>
                  <Input id="achievementTitle" placeholder="Contoh: JavaScript Advanced Certification" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="achievementDate">Tanggal</Label>
                    <Input id="achievementDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organisasi / Penerbit</Label>
                    <Input id="organization" placeholder="Contoh: Udemy, Google, dsb." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievementDescription">Deskripsi</Label>
                  <Textarea id="achievementDescription" placeholder="Jelaskan tentang pencapaian ini" />
                </div>
              </>
            )}

            {activeTab === "worklog" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logDate">Tanggal</Label>
                    <Input id="logDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Jam Kerja</Label>
                    <Input id="hours" type="number" min="0" max="24" placeholder="8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logProject">Proyek</Label>
                  <Select>
                    <SelectTrigger id="logProject">
                      <SelectValue placeholder="Pilih proyek" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tasks">Tugas yang Dikerjakan</Label>
                  <Textarea id="tasks" placeholder="Masukkan tugas yang dikerjakan (satu per baris)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="learnings">Pembelajaran / Refleksi</Label>
                  <Textarea id="learnings" placeholder="Apa yang Anda pelajari hari ini?" />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Batal
            </Button>
            <Button style={{ backgroundColor: "#f7564e" }}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
