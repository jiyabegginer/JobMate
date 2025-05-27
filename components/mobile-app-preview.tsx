import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Home, Search, User, Bell } from "lucide-react"

export default function MobileAppPreview() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[280px] h-[580px] bg-white rounded-[36px] shadow-xl overflow-hidden border-8 border-gray-800">
        {/* Status Bar */}
        <div className="h-6 w-full bg-gray-800 flex justify-between items-center px-4">
          <div className="text-white text-[10px]">9:41</div>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-white opacity-80"></div>
            <div className="w-3 h-3 rounded-full bg-white opacity-80"></div>
            <div className="w-3 h-3 rounded-full bg-white opacity-80"></div>
          </div>
        </div>

        {/* App Content */}
        <Tabs defaultValue="home" className="w-full h-[calc(100%-96px)]">
          <TabsContent value="home" className="h-full m-0 overflow-auto">
            {/* Header */}
            <div className="p-4" style={{ backgroundColor: "#f7564e" }}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-white" />
                  <span className="text-lg font-bold text-white">JobMate</span>
                </div>
                <div className="relative">
                  <Bell className="h-5 w-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Cari pekerjaan...</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-3">Rekomendasi Pekerjaan</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((job) => (
                  <Card key={job} className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-sm">UI/UX Designer</h3>
                            <span className="text-xs" style={{ color: "#f7564e" }}>
                              1 jam lalu
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">TechCorp Indonesia</p>
                          <div className="flex gap-1">
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Full-time</span>
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Jakarta</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-medium">Rp 8-12 juta/bulan</span>
                            <Button
                              size="sm"
                              className="h-7 text-xs"
                              style={{ backgroundColor: "#f6c07c", color: "#000000" }}
                            >
                              Lamar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-lg font-bold mt-6 mb-3">Kategori Pekerjaan</h2>
              <div className="grid grid-cols-4 gap-2">
                {["General", "High-Skill", "Freelance", "Internship"].map((category) => (
                  <div key={category} className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                      style={{ backgroundColor: "#f7564e20" }}
                    >
                      <Briefcase className="h-5 w-5" style={{ color: "#f7564e" }} />
                    </div>
                    <span className="text-xs text-center">{category}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-bold mt-6 mb-3">Status Lamaran</h2>
              <Card>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">Frontend Developer</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Diproses</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">StartupXYZ Indonesia</p>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-yellow-400" style={{ width: "50%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Dikirim</span>
                    <span className="text-xs text-gray-500">Diproses</span>
                    <span className="text-xs text-gray-500">Wawancara</span>
                    <span className="text-xs text-gray-500">Selesai</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="search" className="h-full m-0 p-4 overflow-auto">
            <h2 className="text-lg font-bold mb-4">Pencarian Pekerjaan</h2>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                  placeholder="Posisi atau keahlian"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400">📍</div>
                <input className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm" placeholder="Lokasi" />
              </div>
              <select className="w-full px-4 py-2 border rounded-lg text-sm appearance-none bg-white">
                <option value="">Pilih kategori</option>
                <option value="general">General</option>
                <option value="high-skill">High-Skill</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
              <div>
                <label className="block text-sm mb-1">Rentang Gaji</label>
                <input type="range" className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Rp 3 juta</span>
                  <span>Rp 20 juta</span>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Tipe Pekerjaan</label>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs border px-2 py-1 rounded-full">Full-time</span>
                  <span className="text-xs border px-2 py-1 rounded-full">Part-time</span>
                  <span className="text-xs border px-2 py-1 rounded-full">Freelance</span>
                  <span className="text-xs border px-2 py-1 rounded-full">Internship</span>
                </div>
              </div>
              <Button className="w-full mt-2" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                Cari Pekerjaan
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="h-full m-0 p-4 overflow-auto">
            <h2 className="text-lg font-bold mb-4">Lamaran Saya</h2>
            <div className="space-y-3">
              {[
                { title: "UI/UX Designer", company: "TechCorp", status: "Diterima", color: "green" },
                { title: "Frontend Developer", company: "StartupXYZ", status: "Diproses", color: "yellow" },
                { title: "Product Manager", company: "BigCompany", status: "Ditolak", color: "red" },
              ].map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-sm">{job.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          job.color === "green"
                            ? "bg-green-100 text-green-800"
                            : job.color === "yellow"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{job.company} Indonesia</p>
                    <div className="text-xs text-gray-500">Dilamar pada 12 Mar 2023</div>
                    <Button variant="outline" size="sm" className="w-full mt-2 text-xs h-7">
                      Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="h-full m-0 p-4 overflow-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 mb-3 flex items-center justify-center">
                <User className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="font-bold">Budi Santoso</h2>
              <p className="text-sm text-gray-500">UI/UX Designer</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Informasi Profil</h3>
                <Card>
                  <CardContent className="p-3 space-y-2">
                    <div>
                      <label className="text-xs text-gray-500">Email</label>
                      <p className="text-sm">budi.santoso@email.com</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Telepon</label>
                      <p className="text-sm">+62 812 3456 7890</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Lokasi</label>
                      <p className="text-sm">Jakarta, Indonesia</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Keahlian</h3>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">UI Design</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">UX Research</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Figma</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Prototyping</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">HTML/CSS</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button className="w-full" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                Edit Profil
              </Button>

              <Button variant="outline" className="w-full">
                Keluar
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t flex justify-around items-center">
          <TabsList className="bg-transparent h-full w-full grid grid-cols-4 gap-0">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none"
            >
              <div className="flex flex-col items-center">
                <Home className="h-4 w-4" />
                <span className="text-[10px]">Beranda</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none"
            >
              <div className="flex flex-col items-center">
                <Search className="h-4 w-4" />
                <span className="text-[10px]">Cari</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none"
            >
              <div className="flex flex-col items-center">
                <Briefcase className="h-4 w-4" />
                <span className="text-[10px]">Lamaran</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none"
            >
              <div className="flex flex-col items-center">
                <User className="h-4 w-4" />
                <span className="text-[10px]">Profil</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-gray-800 rounded-b-xl"></div>
      </div>

      <div className="mt-8 text-center max-w-xs">
        <h3 className="font-bold text-lg mb-2">Aplikasi Mobile JobMate</h3>
        <p className="text-sm text-gray-600 mb-4">
          Akses JobMate kapan saja dan di mana saja dengan aplikasi mobile kami yang tersedia untuk Android dan iOS.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M17.9 5c-.7.4-1.9 1-3.2 1-1.6 0-2.8-.6-3.6-1-1.2-.6-1.8-.6-2.8-.6-1.5 0-2.6.6-3.4 1.2l-.3.2v13.5c0 .4.3.8.8.8.2 0 .4-.1.6-.2.7-.5 1.8-1 3.1-1 1.5 0 2.7.6 3.4 1 1.3.6 1.8.6 2.8.6 1.5 0 2.6-.6 3.3-1.1l.3-.2V5.8c0-.4-.3-.8-.8-.8-.1 0-.1 0-.2 0z" />
              <path d="M13 0L8.4 4.8l4.6 4.7L18.5 4z" />
            </svg>
            App Store
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.293-.707V2.521c0-.265.106-.52.293-.707zM14.5 12.707l2.302 2.302-8.557 4.883L14.5 12.707zm0-1.414L8.245 4.107l8.557 4.883L14.5 11.293zm3.366-2.9l-2.302 2.302 2.302 2.302 1.296-1.296a1 1 0 0 0 0-1.414l-.296-.296-1-.598z" />
            </svg>
            Play Store
          </Button>
        </div>
      </div>
    </div>
  )
}
