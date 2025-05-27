"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, Star, BookOpen, Award, Users } from "lucide-react"

export default function TrainingCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  // Mock data untuk pelatihan dan sertifikasi
  const trainings = [
    {
      id: 1,
      title: "UI/UX Design Fundamentals",
      provider: "Dicoding Indonesia",
      category: "Design",
      level: "Beginner",
      duration: "40 jam",
      price: "Rp 350.000",
      rating: 4.8,
      students: 1250,
      relatedJobs: ["UI Designer", "UX Designer", "Product Designer"],
      relatedSkills: ["Figma", "User Research", "Wireframing"],
      description:
        "Pelajari dasar-dasar UI/UX design dan prinsip desain yang baik untuk membuat produk digital yang user-friendly.",
      image: "/placeholder.svg?height=200&width=300",
      type: "course",
    },
    {
      id: 2,
      title: "Full-Stack JavaScript Developer",
      provider: "Progate",
      category: "Programming",
      level: "Intermediate",
      duration: "120 jam",
      price: "Rp 1.200.000",
      rating: 4.7,
      students: 890,
      relatedJobs: ["Frontend Developer", "Backend Developer", "Full-Stack Developer"],
      relatedSkills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
      description: "Kursus komprehensif untuk menjadi Full-Stack JavaScript Developer dengan React dan Node.js.",
      image: "/placeholder.svg?height=200&width=300",
      type: "course",
    },
    {
      id: 3,
      title: "AWS Certified Solutions Architect",
      provider: "Amazon Web Services",
      category: "Cloud Computing",
      level: "Advanced",
      duration: "100 jam",
      price: "Rp 2.500.000",
      rating: 4.9,
      students: 567,
      relatedJobs: ["Cloud Architect", "DevOps Engineer", "Solutions Architect"],
      relatedSkills: ["AWS", "Cloud Architecture", "Networking", "Security"],
      description:
        "Persiapan untuk sertifikasi AWS Solutions Architect dengan materi komprehensif dan latihan praktis.",
      image: "/placeholder.svg?height=200&width=300",
      type: "certification",
    },
    {
      id: 4,
      title: "Data Science with Python",
      provider: "DQLab",
      category: "Data Science",
      level: "Intermediate",
      duration: "80 jam",
      price: "Rp 900.000",
      rating: 4.6,
      students: 1100,
      relatedJobs: ["Data Analyst", "Data Scientist", "Business Intelligence Analyst"],
      relatedSkills: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
      description: "Pelajari cara menganalisis data dan membuat model machine learning dengan Python.",
      image: "/placeholder.svg?height=200&width=300",
      type: "course",
    },
    {
      id: 5,
      title: "Google Analytics Certified",
      provider: "Google",
      category: "Marketing",
      level: "Beginner",
      duration: "20 jam",
      price: "Gratis",
      rating: 4.5,
      students: 2340,
      relatedJobs: ["Digital Marketing Specialist", "Marketing Analyst", "Growth Hacker"],
      relatedSkills: ["Google Analytics", "Data Analysis", "Marketing Metrics"],
      description: "Sertifikasi resmi Google Analytics untuk memahami web analytics dan digital marketing.",
      image: "/placeholder.svg?height=200&width=300",
      type: "certification",
    },
    {
      id: 6,
      title: "Project Management Professional (PMP)",
      provider: "PMI Indonesia",
      category: "Management",
      level: "Advanced",
      duration: "120 jam",
      price: "Rp 3.500.000",
      rating: 4.8,
      students: 445,
      relatedJobs: ["Project Manager", "Program Manager", "Scrum Master"],
      relatedSkills: ["Project Planning", "Risk Management", "Team Leadership", "Agile"],
      description: "Persiapan untuk sertifikasi PMP dengan materi sesuai standar PMI dan latihan soal.",
      image: "/placeholder.svg?height=200&width=300",
      type: "certification",
    },
  ]

  // Filter pelatihan berdasarkan pencarian dan filter
  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || training.category === categoryFilter
    const matchesLevel = levelFilter === "all" || training.level === levelFilter

    return matchesSearch && matchesCategory && matchesLevel
  })

  const getTypeIcon = (type) => {
    return type === "certification" ? (
      <Award className="h-4 w-4 text-yellow-600" />
    ) : (
      <BookOpen className="h-4 w-4 text-blue-600" />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Katalog Pelatihan & Sertifikasi</h1>
          <p className="text-muted-foreground mt-2">
            Tingkatkan keterampilan Anda dengan pelatihan dan sertifikasi yang relevan dengan karir Anda
          </p>
        </div>
        <Button style={{ backgroundColor: "#f7564e" }}>
          <Star className="h-4 w-4 mr-2" />
          Rekomendasi Untuk Anda
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Cari pelatihan atau sertifikasi..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="Programming">Programming</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
            <SelectItem value="Management">Management</SelectItem>
          </SelectContent>
        </Select>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Level</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="recommended">Direkomendasikan</TabsTrigger>
          <TabsTrigger value="popular">Populer</TabsTrigger>
          <TabsTrigger value="free">Gratis</TabsTrigger>
          <TabsTrigger value="certification">Sertifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings.length > 0 ? (
              filteredTrainings.map((training) => (
                <Card key={training.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={training.image || "/placeholder.svg"}
                      alt={training.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(training.type)}
                        <Badge
                          variant={
                            training.level === "Beginner"
                              ? "outline"
                              : training.level === "Intermediate"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {training.level}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {training.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{training.title}</CardTitle>
                    <CardDescription>{training.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {training.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {training.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {training.students}
                      </div>
                    </div>
                    <p className="text-sm mb-3 line-clamp-2">{training.description}</p>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium mb-1">Pekerjaan Terkait:</p>
                        <div className="flex flex-wrap gap-1">
                          {training.relatedJobs.slice(0, 2).map((job, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {job}
                            </Badge>
                          ))}
                          {training.relatedJobs.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{training.relatedJobs.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {training.relatedSkills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {training.relatedSkills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{training.relatedSkills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="font-medium text-lg">{training.price}</div>
                    <Button size="sm" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                      Lihat Detail
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">Tidak ada pelatihan yang ditemukan</h3>
                <p className="text-muted-foreground">Coba ubah filter atau kata kunci pencarian Anda</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Other tab contents would be similar with different filtering logic */}
        <TabsContent value="recommended" className="mt-6">
          <div className="text-center py-12">
            <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Rekomendasi Berdasarkan Profil Anda</h3>
            <p className="text-muted-foreground mb-4">
              Lengkapi profil Anda untuk mendapatkan rekomendasi yang lebih akurat
            </p>
            <Button style={{ backgroundColor: "#f7564e" }}>Lengkapi Profil</Button>
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings
              .sort((a, b) => b.students - a.students)
              .slice(0, 6)
              .map((training) => (
                <Card key={training.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Same card content as above */}
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={training.image || "/placeholder.svg"}
                      alt={training.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(training.type)}
                        <Badge variant="outline">Popular</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{training.title}</CardTitle>
                    <CardDescription>{training.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {training.students} siswa
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {training.rating}
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2">{training.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="font-medium text-lg">{training.price}</div>
                    <Button size="sm" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                      Lihat Detail
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="free" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings
              .filter((training) => training.price === "Gratis")
              .map((training) => (
                <Card key={training.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={training.image || "/placeholder.svg"}
                      alt={training.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Gratis</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{training.title}</CardTitle>
                    <CardDescription>{training.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm line-clamp-2">{training.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                      Mulai Belajar Gratis
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="certification" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings
              .filter((training) => training.type === "certification")
              .map((training) => (
                <Card key={training.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={training.image || "/placeholder.svg"}
                      alt={training.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-600" />
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Sertifikasi</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{training.title}</CardTitle>
                    <CardDescription>{training.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm line-clamp-2">{training.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="font-medium text-lg">{training.price}</div>
                    <Button size="sm" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                      Lihat Detail
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
