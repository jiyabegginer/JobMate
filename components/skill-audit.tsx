"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  ChevronUp,
  ChevronDown,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BookOpen,
  Users,
  Target,
  BarChart3,
} from "lucide-react"

export default function SkillAudit() {
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data untuk skill audit
  const auditPeriods = [
    { id: "current", label: "Saat Ini (Jul-Des 2023)" },
    { id: "previous", label: "Jan-Jun 2023" },
    { id: "older", label: "Jul-Des 2022" },
  ]

  const skillCategories = [
    { id: "all", name: "Semua Keterampilan" },
    { id: "technical", name: "Technical Skills" },
    { id: "soft", name: "Soft Skills" },
    { id: "language", name: "Language Skills" },
  ]

  const skillAuditData = {
    current: [
      {
        id: 1,
        name: "JavaScript",
        category: "technical",
        level: 75,
        previousLevel: 65,
        targetLevel: 85,
        status: "in-progress",
        lastUpdated: "15 Nov 2023",
        nextAudit: "15 Feb 2024",
        recommendations: [
          {
            id: 1,
            type: "course",
            name: "Advanced JavaScript Patterns",
            provider: "Frontend Masters",
            priority: "high",
          },
          { id: 2, type: "practice", name: "Build 5 JavaScript Projects", provider: "Self-paced", priority: "medium" },
        ],
        feedback:
          "Menunjukkan kemajuan yang baik dalam pemahaman konsep asynchronous dan ES6+. Perlu lebih banyak latihan dalam penggunaan design patterns.",
        strengths: ["ES6+ Syntax", "Async/Await", "DOM Manipulation"],
        weaknesses: ["Design Patterns", "Performance Optimization", "Testing"],
      },
      {
        id: 2,
        name: "React",
        category: "technical",
        level: 80,
        previousLevel: 70,
        targetLevel: 90,
        status: "in-progress",
        lastUpdated: "20 Nov 2023",
        nextAudit: "20 Feb 2024",
        recommendations: [
          { id: 3, type: "course", name: "React Performance Optimization", provider: "Udemy", priority: "high" },
          {
            id: 4,
            type: "project",
            name: "Build a Full-Stack App with React and Node.js",
            provider: "Self-paced",
            priority: "medium",
          },
        ],
        feedback:
          "Kemampuan membuat komponen yang reusable sudah baik. Perlu peningkatan dalam state management untuk aplikasi yang lebih kompleks.",
        strengths: ["Component Design", "Hooks", "JSX"],
        weaknesses: ["State Management", "Performance", "Testing"],
      },
      {
        id: 3,
        name: "Communication",
        category: "soft",
        level: 85,
        previousLevel: 80,
        targetLevel: 90,
        status: "on-track",
        lastUpdated: "10 Nov 2023",
        nextAudit: "10 Feb 2024",
        recommendations: [
          {
            id: 5,
            type: "workshop",
            name: "Effective Technical Communication",
            provider: "Communication Academy",
            priority: "low",
          },
        ],
        feedback:
          "Komunikasi verbal dan tertulis sudah baik. Perlu peningkatan dalam presentasi teknis dan komunikasi dengan stakeholder non-teknis.",
        strengths: ["Verbal Communication", "Written Communication", "Active Listening"],
        weaknesses: ["Technical Presentations", "Stakeholder Management"],
      },
      {
        id: 4,
        name: "Problem Solving",
        category: "soft",
        level: 70,
        previousLevel: 65,
        targetLevel: 80,
        status: "needs-attention",
        lastUpdated: "5 Nov 2023",
        nextAudit: "5 Feb 2024",
        recommendations: [
          { id: 6, type: "practice", name: "Daily Coding Challenges", provider: "LeetCode", priority: "high" },
          { id: 7, type: "course", name: "Algorithmic Thinking", provider: "Coursera", priority: "high" },
        ],
        feedback:
          "Kemampuan memecahkan masalah sederhana sudah baik, tetapi perlu peningkatan dalam menangani masalah kompleks dan optimasi.",
        strengths: ["Basic Problem Analysis", "Logical Thinking"],
        weaknesses: ["Complex Problem Solving", "Algorithm Optimization", "System Design"],
      },
      {
        id: 5,
        name: "English",
        category: "language",
        level: 90,
        previousLevel: 85,
        targetLevel: 95,
        status: "on-track",
        lastUpdated: "12 Nov 2023",
        nextAudit: "12 Feb 2024",
        recommendations: [
          {
            id: 8,
            type: "practice",
            name: "Weekly English Discussion Group",
            provider: "Language Exchange",
            priority: "low",
          },
        ],
        feedback:
          "Kemampuan komunikasi dalam Bahasa Inggris sudah sangat baik. Perlu sedikit peningkatan dalam penulisan teknis dan presentasi.",
        strengths: ["Speaking", "Reading", "Listening"],
        weaknesses: ["Technical Writing", "Presentation"],
      },
    ],
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "on-track":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case "needs-attention":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Needs Attention</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>
      default:
        return null
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return null
    }
  }

  const getLevelChange = (current, previous) => {
    const change = current - previous
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600">
          <ChevronUp className="h-4 w-4 mr-1" />+{change}
        </div>
      )
    }
    if (change < 0) {
      return (
        <div className="flex items-center text-red-600">
          <ChevronDown className="h-4 w-4 mr-1" />
          {change}
        </div>
      )
    }
    return <div className="text-gray-500">0</div>
  }

  const currentPeriodSkills = skillAuditData[selectedPeriod] || []
  const filteredSkills =
    selectedCategory === "all"
      ? currentPeriodSkills
      : currentPeriodSkills.filter((skill) => skill.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Skill Audit</h1>
          <p className="text-muted-foreground mt-2">
            Lacak dan kembangkan keterampilan Anda dengan audit berkala setiap 3-6 bulan
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Jadwalkan Audit Berikutnya
          </Button>
          <Button style={{ backgroundColor: "#f7564e" }}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Mulai Self-Assessment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rata-rata Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {currentPeriodSkills.length > 0
                ? Math.round(
                    currentPeriodSkills.reduce((acc, skill) => acc + skill.level, 0) / currentPeriodSkills.length,
                  )
                : 0}
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
            <Progress
              value={
                currentPeriodSkills.length > 0
                  ? Math.round(
                      currentPeriodSkills.reduce((acc, skill) => acc + skill.level, 0) / currentPeriodSkills.length,
                    )
                  : 0
              }
              className="h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Peningkatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2 flex items-center">
              {currentPeriodSkills.length > 0
                ? (() => {
                    const avgImprovement =
                      currentPeriodSkills.reduce((acc, skill) => acc + (skill.level - skill.previousLevel), 0) /
                      currentPeriodSkills.length
                    return (
                      <>
                        {avgImprovement > 0 ? "+" : ""}
                        {avgImprovement.toFixed(1)}
                        {avgImprovement > 0 && <TrendingUp className="ml-2 h-6 w-6 text-green-500" />}
                      </>
                    )
                  })()
                : 0}
            </div>
            <p className="text-sm text-muted-foreground">Dibandingkan periode sebelumnya</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Target Tercapai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {currentPeriodSkills.length > 0
                ? Math.round(
                    (currentPeriodSkills.filter((skill) => skill.level >= skill.targetLevel).length /
                      currentPeriodSkills.length) *
                      100,
                  )
                : 0}
              <span className="text-lg text-muted-foreground">%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentPeriodSkills.filter((skill) => skill.level >= skill.targetLevel).length} dari{" "}
              {currentPeriodSkills.length} skills
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Audit Berikutnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">15 Feb</div>
            <p className="text-sm text-muted-foreground">2024</p>
            <div className="flex items-center mt-2 text-sm">
              <Clock className="h-4 w-4 mr-1 text-orange-500" />
              <span>3 bulan lagi</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              {auditPeriods.map((period) => (
                <SelectItem key={period.id} value={period.id}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {skillCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <Card key={skill.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-lg">{skill.name}</h3>
                    {getStatusBadge(skill.status)}
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {skill.lastUpdated}
                    </div>
                    {expandedSkill === skill.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-2">
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Current: {skill.level}/100</span>
                      <span className="text-sm text-muted-foreground">Target: {skill.targetLevel}/100</span>
                    </div>
                    <div className="relative">
                      <Progress value={skill.level} className="h-3" />
                      <div
                        className="absolute top-0 h-3 w-1 bg-red-400 rounded"
                        style={{ left: `${skill.targetLevel}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-center">{getLevelChange(skill.level, skill.previousLevel)}</div>
                </div>

                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Progress: {Math.round((skill.level / skill.targetLevel) * 100)}% to target</span>
                  <span>Next audit: {skill.nextAudit}</span>
                </div>
              </div>

              {expandedSkill === skill.id && (
                <div className="px-4 pb-4 border-t pt-4 bg-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Strengths
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {skill.strengths.map((strength, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-100">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Target className="h-4 w-4 mr-2 text-orange-500" />
                          Areas for Improvement
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {skill.weaknesses.map((weakness, index) => (
                            <Badge key={index} className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Feedback</h4>
                        <p className="text-sm text-gray-600">{skill.feedback}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Rekomendasi Pengembangan</h4>
                      <div className="space-y-3">
                        {skill.recommendations.map((rec) => (
                          <div key={rec.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                            <div className="flex-shrink-0 mt-0.5">
                              {rec.type === "course" && <BookOpen className="h-4 w-4 text-blue-500" />}
                              {rec.type === "practice" && <CheckCircle className="h-4 w-4 text-green-500" />}
                              {rec.type === "project" && <Award className="h-4 w-4 text-purple-500" />}
                              {rec.type === "workshop" && <Users className="h-4 w-4 text-orange-500" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{rec.name}</span>
                                {getPriorityBadge(rec.priority)}
                              </div>
                              <div className="text-xs text-muted-foreground">{rec.provider}</div>
                            </div>
                            <Button size="sm" variant="outline">
                              Lihat
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6 gap-2">
                    <Button size="sm" variant="outline">
                      Update Progress
                    </Button>
                    <Button size="sm" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Tidak ada data audit untuk periode ini</h3>
            <p className="text-muted-foreground mb-4">Pilih periode lain atau mulai audit keterampilan baru</p>
            <Button style={{ backgroundColor: "#f7564e" }}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Mulai Self-Assessment
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
