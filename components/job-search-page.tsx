"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Briefcase, Filter, Clock, Star, ChevronDown, ChevronRight } from "lucide-react"

// Job data
const jobListings = [
  {
    id: 1,
    title: "Bagian Admin",
    company: "Solaria Margo City",
    location: "Depok, Jawa Barat",
    type: "Full-time",
    category: "Retail & F&B",
    salary: "Rp 3.5 - 4.5 juta/bulan",
    posted: "2 hari yang lalu",
    description:
      "Kami mencari individu yang teliti dan terorganisir untuk bergabung sebagai Admin di Solaria Margo City. Tanggung jawab meliputi pengelolaan administrasi harian, pengaturan jadwal, serta mendukung kebutuhan operasional kantor.",
    qualifications: [
      "Pendidikan minimal SMA/SMK",
      "Memiliki pengalaman di bidang administrasi (lebih diutamakan)",
      "Mampu mengoperasikan komputer dengan baik (MS Office)",
      "Komunikatif dan mampu bekerja dalam tim",
    ],
    rating: 4.2,
  },
  {
    id: 2,
    title: "Waitress",
    company: "Ta Wan The Park Sawangan",
    location: "Depok, Jawa Barat",
    type: "Full-time",
    category: "Retail & F&B",
    salary: "Rp 3 - 4 juta/bulan",
    posted: "3 hari yang lalu",
    description:
      "Ta Wan The Park Sawangan sedang mencari waitress yang ramah dan energik untuk memberikan pelayanan terbaik kepada pelanggan.",
    qualifications: [
      "Usia maksimal 25 tahun",
      "Mempunyai pengalaman di bidang pelayanan makanan dan minuman (lebih diutamakan)",
      "Berpenampilan menarik dan memiliki sikap yang ramah",
      "Mampu bekerja dalam tim dan memiliki kemampuan komunikasi yang baik",
    ],
    rating: 4.0,
  },
  {
    id: 3,
    title: "Kitchen",
    company: "Winglok Dimsum Antasari",
    location: "Jakarta Selatan, DKI Jakarta",
    type: "Full-time",
    category: "Retail & F&B",
    salary: "Rp 3.5 - 4.5 juta/bulan",
    posted: "1 hari yang lalu",
    description:
      "Winglok Dimsum Antasari membutuhkan tenaga kitchen yang berdedikasi untuk membantu operasional dapur dan memastikan kualitas makanan.",
    qualifications: [
      "Pengalaman di dapur restoran atau kitchen lebih diutamakan",
      "Mampu bekerja di bawah tekanan",
      "Teliti, cekatan, dan bertanggung jawab",
    ],
    rating: 3.8,
  },
  {
    id: 4,
    title: "Pastry",
    company: "Dua Coffee Bintaro",
    location: "Tangerang Selatan, Banten",
    type: "Full-time",
    category: "Retail & F&B",
    salary: "Rp 4 - 5 juta/bulan",
    posted: "5 hari yang lalu",
    description: "Dua Coffee Bintaro mencari Pastry untuk membuat aneka kue dan dessert yang enak dan menarik.",
    qualifications: [
      "Memiliki pengalaman di bidang pastry atau perhotelan",
      "Kreatif dan mampu membuat berbagai jenis pastry dan dessert",
      "Dapat bekerja dengan standar kebersihan dan kualitas yang tinggi",
    ],
    rating: 4.5,
  },
  {
    id: 5,
    title: "Pastry",
    company: "Toko Kopi Kiri",
    location: "Jakarta Selatan, DKI Jakarta",
    type: "Full-time",
    category: "Retail & F&B",
    salary: "Rp 4 - 5 juta/bulan",
    posted: "1 minggu yang lalu",
    description:
      "Kami membuka kesempatan untuk bergabung sebagai Pastry di Toko Kopi Kiri. Tanggung jawab meliputi pembuatan roti dan kue untuk menu cafe.",
    qualifications: [
      "Memiliki pengalaman di bidang pastry dan roti",
      "Mampu bekerja dalam tim dan mengikuti instruksi dengan baik",
      "Punya passion di bidang kuliner, khususnya pastry",
    ],
    rating: 4.3,
  },
  {
    id: 6,
    title: "Barista",
    company: "Tokonoma Fatmawati",
    location: "Jakarta Selatan, DKI Jakarta",
    type: "Full-time",
    category: "Retail & F&B",
    salary: "Rp 4 - 5 juta/bulan",
    posted: "4 hari yang lalu",
    description: "Tokonoma Fatmawati mencari Barista yang bersemangat untuk menyajikan kopi terbaik bagi pelanggan.",
    qualifications: [
      "Memiliki pengalaman sebagai barista (diutamakan)",
      "Mampu membuat berbagai jenis kopi dengan baik",
      "Memiliki kemampuan komunikasi yang baik dan ramah",
      "Siap bekerja dalam shift",
    ],
    rating: 4.1,
  },
  {
    id: 7,
    title: "IT Audit",
    company: "BDO",
    location: "Jakarta Pusat, DKI Jakarta",
    type: "Full-time",
    category: "IT & Teknologi",
    salary: "Rp 8 - 12 juta/bulan",
    posted: "1 minggu yang lalu",
    description:
      "BDO mencari profesional IT Audit yang berkompeten untuk melakukan audit terhadap sistem teknologi informasi perusahaan.",
    qualifications: [
      "Pendidikan minimal S1 di bidang Teknologi Informasi atau yang relevan",
      "Memiliki pengalaman di bidang audit IT atau keamanan sistem informasi",
      "Menguasai alat audit dan analisis sistem",
      "Memiliki pemahaman yang baik tentang regulasi IT dan keamanan informasi",
    ],
    rating: 4.4,
  },
  {
    id: 8,
    title: "Network Administrator",
    company: "Bank Central Asia",
    location: "Jakarta Pusat, DKI Jakarta",
    type: "Full-time",
    category: "IT & Teknologi",
    salary: "Rp 10 - 15 juta/bulan",
    posted: "3 hari yang lalu",
    description:
      "Bank Central Asia membuka kesempatan bagi Network Administrator untuk menjaga kelancaran operasional jaringan dan sistem IT perusahaan.",
    qualifications: [
      "Pendidikan minimal S1 di bidang Teknologi Informasi",
      "Memiliki pengalaman dalam manajemen jaringan komputer",
      "Mampu mengelola dan memecahkan masalah jaringan",
      "Bersedia bekerja dengan sistem shift",
    ],
    rating: 4.7,
  },
  {
    id: 9,
    title: "Software Developer",
    company: "Paragon",
    location: "Jakarta Barat, DKI Jakarta",
    type: "Full-time",
    category: "IT & Teknologi",
    salary: "Rp 12 - 18 juta/bulan",
    posted: "2 hari yang lalu",
    description:
      "Paragon sedang mencari Software Developer untuk mengembangkan dan meningkatkan aplikasi perangkat lunak perusahaan.",
    qualifications: [
      "Pendidikan minimal S1 di bidang Informatika atau Teknik Komputer",
      "Menguasai bahasa pemrograman seperti Java, Python, atau C++",
      "Memiliki pengalaman dalam pengembangan perangkat lunak",
      "Mampu bekerja secara tim maupun individu",
    ],
    rating: 4.5,
  },
  {
    id: 10,
    title: "Information Security Specialist",
    company: "Allianz Life",
    location: "Jakarta Selatan, DKI Jakarta",
    type: "Full-time",
    category: "IT & Teknologi",
    salary: "Rp 15 - 20 juta/bulan",
    posted: "1 minggu yang lalu",
    description:
      "Allianz Life membutuhkan Information Security Specialist untuk melindungi sistem informasi perusahaan dari ancaman dan memastikan kepatuhan terhadap regulasi.",
    qualifications: [
      "Pendidikan minimal S1 di bidang Teknologi Informasi atau Keamanan Siber",
      "Memiliki sertifikasi di bidang keamanan informasi (CISSP, CISM, dll.)",
      "Pengalaman di bidang keamanan siber lebih diutamakan",
      "Mampu mengidentifikasi dan mengatasi potensi ancaman terhadap sistem informasi",
    ],
    rating: 4.6,
  },
  {
    id: 11,
    title: "IT Project Manager",
    company: "Ernst & Young",
    location: "Jakarta Selatan, DKI Jakarta",
    type: "Full-time",
    category: "IT & Teknologi",
    salary: "Rp 18 - 25 juta/bulan",
    posted: "5 hari yang lalu",
    description:
      "Ernst & Young membuka lowongan untuk IT Project Manager yang akan mengelola proyek IT dari awal hingga selesai.",
    qualifications: [
      "Pendidikan minimal S1 di bidang Teknologi Informasi atau Manajemen",
      "Pengalaman dalam manajemen proyek IT",
      "Memiliki kemampuan komunikasi dan organisasi yang baik",
      "Menguasai metodologi manajemen proyek (Agile, Scrum, dll.)",
    ],
    rating: 4.8,
  },
  {
    id: 12,
    title: "BI Specialist",
    company: "Shopee",
    location: "Jakarta Utara, DKI Jakarta",
    type: "Full-time",
    category: "IT & Teknologi",
    salary: "Rp 15 - 20 juta/bulan",
    posted: "3 hari yang lalu",
    description:
      "Shopee mencari Business Intelligence Specialist untuk mengelola dan menganalisis data guna mendukung keputusan bisnis yang strategis.",
    qualifications: [
      "Pendidikan minimal S1 di bidang Teknologi Informasi atau Matematika",
      "Pengalaman dengan alat BI (Power BI, Tableau, dll.)",
      "Keterampilan analitis yang kuat dan kemampuan untuk mengolah data besar",
      "Memiliki pengetahuan dasar tentang machine learning dan analisis data",
    ],
    rating: 4.5,
  },
  {
    id: 13,
    title: "Desainer UX/UI",
    company: "WE Event Specialist",
    location: "Jakarta Selatan, DKI Jakarta",
    type: "Full-time",
    category: "IT & Teknologi",
    salary: "Rp 10 - 15 juta/bulan",
    posted: "2 hari yang lalu",
    description:
      "WE Event Specialist mencari Desainer UX/UI untuk merancang pengalaman pengguna yang menarik dan efisien.",
    qualifications: [
      "Pendidikan di bidang Desain Grafis, Desain Interaksi, atau bidang terkait",
      "Pengalaman dalam desain UX/UI, prototyping, dan wireframing",
      "Menguasai alat desain seperti Adobe XD, Figma, atau Sketch",
      "Memiliki pemahaman mendalam tentang pengalaman pengguna",
    ],
    rating: 4.3,
  },
]

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  // Filter jobs based on search term and filters
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = locationFilter ? job.location.includes(locationFilter) : true
    const matchesCategory = categoryFilter ? job.category === categoryFilter : true

    return matchesSearch && matchesLocation && matchesCategory
  })

  // Get unique locations for filter
  const locations = [...new Set(jobListings.map((job) => job.location.split(",")[0].trim()))]

  // Get unique categories for filter
  const categories = [...new Set(jobListings.map((job) => job.category))]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search Header */}
      <div className="sticky top-0 z-30 w-full p-4" style={{ backgroundColor: "#f7564e" }}>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-6 rounded-lg text-base shadow-md"
              placeholder="Cari posisi, perusahaan, atau kata kunci"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-9 px-3 text-sm bg-white rounded-full min-w-[120px]">
                <SelectValue placeholder="Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lokasi</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 px-3 text-sm bg-white rounded-full min-w-[140px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Badge className="h-9 px-3 flex items-center gap-1 bg-white text-black hover:bg-gray-100 rounded-full cursor-pointer">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="flex-1 bg-gray-50 p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">{filteredJobs.length} Lowongan Ditemukan</h2>
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
              <Card
                key={job.id}
                className={`overflow-hidden transition-all duration-200 ${expandedJob === job.id ? "mb-6" : ""}`}
              >
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
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{job.rating}</span>
                        </div>
                        {expandedJob === job.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
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
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium">Tidak ada lowongan ditemukan</h3>
              <p className="text-sm text-gray-500 mt-1">Coba ubah kata kunci atau filter pencarian Anda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

