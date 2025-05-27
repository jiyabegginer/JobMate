"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Briefcase, Filter, Clock, Star, ChevronDown, ChevronRight } from "lucide-react"

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("Jakarta") // Updated default value
  const [categoryFilter, setCategoryFilter] = useState("IT & Teknologi") // Updated default value
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  // Mock job data
  const jobListings = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Startup",
      location: "Jakarta, DKI Jakarta",
      type: "Full-time",
      category: "IT & Teknologi",
      salary: "Rp 8 - 12 juta/bulan",
      posted: "2 hari yang lalu",
      description: "Mencari frontend developer berpengalaman dengan React dan TypeScript.",
      qualifications: ["React", "TypeScript", "Tailwind CSS", "Git"],
      rating: 4.5,
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Digital Agency",
      location: "Bandung, Jawa Barat",
      type: "Full-time",
      category: "Design",
      salary: "Rp 6 - 10 juta/bulan",
      posted: "1 minggu yang lalu",
      description: "Desainer UI/UX untuk produk digital dan aplikasi mobile.",
      qualifications: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      rating: 4.2,
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "E-commerce Company",
      location: "Surabaya, Jawa Timur",
      type: "Full-time",
      category: "Data Science",
      salary: "Rp 7 - 11 juta/bulan",
      posted: "3 hari yang lalu",
      description: "Analisis data untuk mendukung keputusan bisnis dan strategi pemasaran.",
      qualifications: ["Python", "SQL", "Tableau", "Excel"],
      rating: 4.0,
    },
  ]

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = locationFilter ? job.location.includes(locationFilter) : true
    const matchesCategory = categoryFilter ? job.category === categoryFilter : true

    return matchesSearch && matchesLocation && matchesCategory
  })

  const locations = ["Jakarta", "Bandung", "Surabaya"]
  const categories = ["IT & Teknologi", "Design", "Data Science"]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search Header */}
      <div className="sticky top-0 z-30 w-full p-4" style={{ backgroundColor: "#f7564e" }}>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <Input
              className="pl-10 pr-4 py-6 rounded-lg text-base shadow-md"
              placeholder="Cari pekerjaan, perusahaan, atau kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-9 px-3 text-sm bg-white rounded-full min-w-[120px]">
                <SelectValue placeholder="Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jakarta">Jakarta</SelectItem>
                <SelectItem value="Bandung">Bandung</SelectItem>
                <SelectItem value="Surabaya">Surabaya</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 px-3 text-sm bg-white rounded-full min-w-[140px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT & Teknologi">IT & Teknologi</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
              </SelectContent>
            </Select>

            <Badge className="h-9 px-3 flex items-center gap-1 bg-white text-black hover:bg-gray-100 rounded-full cursor-pointer">
              <Filter className="h-4 w-4" aria-hidden="true" />
              <span>Filter</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="flex-1 bg-gray-50 p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">{filteredJobs.length} pekerjaan ditemukan</h2>
          <Select defaultValue="newest">
            <SelectTrigger className="h-8 w-[130px] text-xs">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="salary-high">Gaji Tertinggi</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className={`overflow-hidden transition-all duration-200`}>
                <CardContent className="p-0">
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-base">{job.title}</h3>
                        <p className="text-sm font-medium">{job.company}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                          <span className="text-xs ml-1">{job.rating}</span>
                        </div>
                        {expandedJob === job.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" aria-hidden="true" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Briefcase className="h-3 w-3 mr-1" aria-hidden="true" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                        {job.posted}
                      </div>
                    </div>

                    <div className="mt-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{job.category}</Badge>
                      <span className="text-sm font-medium ml-2">{job.salary}</span>
                    </div>
                  </div>

                  {expandedJob === job.id && (
                    <div className="px-4 pb-4 border-t pt-3 mt-2">
                      <p className="text-sm mb-3">{job.description}</p>

                      <h4 className="font-medium text-sm mb-2">Kualifikasi:</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                        {job.qualifications.map((qual, index) => (
                          <li key={index}>{qual}</li>
                        ))}
                      </ul>

                      <div className="flex gap-2">
                        <Button className="flex-1" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                          Lamar Sekarang
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Simpan
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Search className="h-8 w-8 text-gray-400" aria-hidden="true" />
              </div>
              <h3 className="font-medium">Tidak ada pekerjaan ditemukan</h3>
              <p className="text-sm text-gray-500 mt-1">Coba ubah kata kunci pencarian atau filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
