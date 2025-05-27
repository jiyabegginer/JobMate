"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Search,
  Briefcase,
  Users,
  Clock,
  Filter,
  Building,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  TrendingUp,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import JobSearchPage from "@/components/job-search-page"
import LanguageSwitcher from "@/components/language-switcher"
import AccessibilityMenu from "@/components/accessibility-menu"
import { useI18n } from "@/contexts/i18n-context"

export default function LandingPage() {
  const { t } = useI18n()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("search")
  const { language } = useI18n()

  // Alternatif: Gunakan array fitur yang didefinisikan langsung
  const getFreshGradFeatures = () => {
    return language === "en"
      ? [
          "Special filters for entry-level jobs",
          "CV templates optimized for fresh graduates",
          "Interview tips and career preparation",
          "Job recommendations suitable for new graduates",
        ]
      : [
          "Filter khusus untuk pekerjaan entry-level",
          "Template CV yang dioptimalkan untuk fresh graduate",
          "Tips wawancara dan persiapan karir",
          "Rekomendasi pekerjaan yang cocok untuk lulusan baru",
        ]
  }

  const getStudentFeatures = () => {
    return language === "en"
      ? [
          "Best internship programs",
          "Flexible part-time jobs",
          "Schedules that can be adjusted to your classes",
          "Internship opportunities that can be converted to academic credits",
        ]
      : [
          "Program magang dan internship terbaik",
          "Pekerjaan paruh waktu yang fleksibel",
          "Jadwal yang dapat disesuaikan dengan kuliah",
          "Kesempatan magang yang dapat dikonversi menjadi kredit akademik",
        ]
  }

  const getProfessionalFeatures = () => {
    return language === "en"
      ? [
          "Jobs without age restrictions",
          "Special filters: freelance, remote, and part-time",
          '"Open to any age" label on job listings',
          "CV templates that emphasize experience and skills",
        ]
      : [
          "Pekerjaan tanpa batasan usia",
          "Filter khusus: freelance, remote, dan part-time",
          'Label "Terbuka untuk usia berapa pun" pada lowongan',
          "Template CV yang menekankan pengalaman dan keahlian",
        ]
  }

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#f7564e" }}>
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50">
        {t("accessibility.skipToContent")}
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-8 w-8" style={{ color: "#f7564e" }} aria-hidden="true" />
            <span className="text-2xl font-bold">JobMate</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-gray-600">
              {t("common.features")}
            </Link>
            <Link href="#target-users" className="text-sm font-medium hover:text-gray-600">
              {t("common.users")}
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-gray-600">
              {t("common.howItWorks")}
            </Link>
            <Link href="#differentiation" className="text-sm font-medium hover:text-gray-600">
              {t("common.advantages")}
            </Link>
            <Link href="#mobile-app" className="text-sm font-medium hover:text-gray-600">
              {t("common.mobileApp")}
            </Link>
            <Link href="/training-catalog" className="text-sm font-medium hover:text-gray-600">
              Pelatihan
            </Link>
            <Link href="/skill-audit" className="text-sm font-medium hover:text-gray-600">
              Skill Audit
            </Link>
            <Link href="/work-tracker" className="text-sm font-medium hover:text-gray-600">
              Progress Tracker
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <AccessibilityMenu />
              <LanguageSwitcher />
            </div>
            <Link href="/auth/login">
              <Button variant="outline">{t("common.login")}</Button>
            </Link>
            <Link href="/auth/register">
              <Button style={{ backgroundColor: "#f6c07c", color: "#000000" }}>{t("common.register")}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <AccessibilityMenu />
            <LanguageSwitcher />
            <button
              className="ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("common.features")}
              </Link>
              <Link
                href="#target-users"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("common.users")}
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("common.howItWorks")}
              </Link>
              <Link
                href="#differentiation"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("common.advantages")}
              </Link>
              <Link
                href="#mobile-app"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("common.mobileApp")}
              </Link>
              <Link
                href="/training-catalog"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pelatihan
              </Link>
              <Link
                href="/skill-audit"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Skill Audit
              </Link>
              <Link
                href="/work-tracker"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Progress Tracker
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    {t("common.login")}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button style={{ backgroundColor: "#f6c07c", color: "#000000" }} className="w-full">
                    {t("common.register")}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {/* App Demo Section */}
        <section className="w-full py-6 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                {t("home.hero.title")}
              </h1>
              <p className="max-w-[900px] text-white md:text-xl/relaxed">{t("home.hero.subtitle")}</p>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto">
              <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-4 bg-gray-100 rounded-none h-14">
                  <TabsTrigger value="search" className="data-[state=active]:bg-white rounded-none h-full">
                    <div className="flex flex-col items-center">
                      <Search className="h-5 w-5 mb-1" aria-hidden="true" />
                      <span className="text-xs">{t("common.search")}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="data-[state=active]:bg-white rounded-none h-full">
                    <div className="flex flex-col items-center">
                      <Star className="h-5 w-5 mb-1" aria-hidden="true" />
                      <span className="text-xs">{t("common.saved")}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="data-[state=active]:bg-white rounded-none h-full">
                    <div className="flex flex-col items-center">
                      <Briefcase className="h-5 w-5 mb-1" aria-hidden="true" />
                      <span className="text-xs">{t("common.applications")}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="data-[state=active]:bg-white rounded-none h-full">
                    <div className="flex flex-col items-center">
                      <Users className="h-5 w-5 mb-1" aria-hidden="true" />
                      <span className="text-xs">{t("common.profile")}</span>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="search" className="m-0 p-0 h-[700px] overflow-hidden">
                  <JobSearchPage />
                </TabsContent>

                <TabsContent value="saved" className="m-0 p-4 h-[700px] overflow-auto">
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Star className="h-8 w-8 text-gray-400" aria-hidden="true" />
                    </div>
                    <h3 className="font-medium">{t("common.noSavedJobs")}</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">{t("common.saveJobsToView")}</p>
                    <Button
                      onClick={() => setActiveTab("search")}
                      style={{ backgroundColor: "#f6c07c", color: "#000000" }}
                    >
                      {t("common.findJobs")}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="applications" className="m-0 p-4 h-[700px] overflow-auto">
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Briefcase className="h-8 w-8 text-gray-400" aria-hidden="true" />
                    </div>
                    <h3 className="font-medium">{t("common.noActiveApplications")}</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">{t("common.startApplying")}</p>
                    <Button
                      onClick={() => setActiveTab("search")}
                      style={{ backgroundColor: "#f6c07c", color: "#000000" }}
                    >
                      {t("common.findJobs")}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="profile" className="m-0 p-4 h-[700px] overflow-auto">
                  <div className="flex flex-col items-center py-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 mb-3 flex items-center justify-center">
                      <Users className="h-10 w-10 text-gray-400" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg">{t("common.loginOrRegister")}</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-6 text-center max-w-xs">{t("common.loginToAccess")}</p>
                    <div className="flex gap-3 w-full max-w-xs">
                      <Link href="/auth/register" className="flex-1">
                        <Button className="w-full" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                          {t("common.register")}
                        </Button>
                      </Link>
                      <Link href="/auth/login" className="flex-1">
                        <Button variant="outline" className="w-full">
                          {t("common.login")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-center mt-8">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                {t("common.downloadApp")}
                <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>

        {/* Target User Segmentation */}
        <section id="target-users" className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t("home.targetUsers.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">{t("home.targetUsers.subtitle")}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <div className="h-2 bg-blue-500"></div>
                <CardHeader>
                  <CardTitle>{t("home.targetUsers.freshGrad.title")}</CardTitle>
                  <CardDescription>{t("home.targetUsers.freshGrad.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {getFreshGradFeatures().map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                          <svg
                            className="h-3 w-3 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4" style={{ backgroundColor: "#f7564e" }}>
                    {t("home.targetUsers.freshGrad.cta")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-2 bg-purple-500"></div>
                <CardHeader>
                  <CardTitle>{t("home.targetUsers.students.title")}</CardTitle>
                  <CardDescription>{t("home.targetUsers.students.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {getStudentFeatures().map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-purple-100 p-1 mt-0.5">
                          <svg
                            className="h-3 w-3 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4" style={{ backgroundColor: "#f7564e" }}>
                    {t("home.targetUsers.students.cta")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-2 bg-green-500"></div>
                <CardHeader>
                  <CardTitle>{t("home.targetUsers.professionals.title")}</CardTitle>
                  <CardDescription>{t("home.targetUsers.professionals.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {getProfessionalFeatures().map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-green-100 p-1 mt-0.5">
                          <svg
                            className="h-3 w-3 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4" style={{ backgroundColor: "#f7564e" }}>
                    {t("home.targetUsers.professionals.cta")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t("home.features.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">{t("home.features.subtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Filter className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                  <CardTitle>{t("home.features.jobFilter.title")}</CardTitle>
                  <CardDescription>{t("home.features.jobFilter.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-gray-100 p-3">
                    <div className="flex gap-2 mb-2">
                      <Badge>Location</Badge>
                      <Badge>Salary</Badge>
                      <Badge>Category</Badge>
                    </div>
                    <div className="text-sm text-gray-600">{t("home.features.jobFilter.detail")}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                  <CardTitle>{t("home.features.realtimeTracking.title")}</CardTitle>
                  <CardDescription>{t("home.features.realtimeTracking.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t("common.sent")}</Badge>
                      <div className="h-0.5 flex-1 bg-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        {t("common.processed")}
                      </Badge>
                      <div className="h-0.5 flex-1 bg-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("common.accepted")}</Badge>
                      <div className="h-0.5 flex-1 bg-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{t("common.rejected")}</Badge>
                      <div className="h-0.5 flex-1 bg-gray-200"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Building className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                  <CardTitle>{t("home.features.jobCategorization.title")}</CardTitle>
                  <CardDescription>{t("home.features.jobCategorization.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-gray-100 p-2 text-center">
                      <span className="text-sm font-medium">{t("common.general")}</span>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-2 text-center">
                      <span className="text-sm font-medium">{t("common.highSkill")}</span>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-2 text-center">
                      <span className="text-sm font-medium">{t("common.freelance")}</span>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-2 text-center">
                      <span className="text-sm font-medium">{t("common.internship")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BookOpen className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                  <CardTitle>Katalog Pelatihan & Sertifikasi</CardTitle>
                  <CardDescription>Temukan pelatihan dan sertifikasi yang relevan dengan karir Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Programming</Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Design</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Data Science</Badge>
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Marketing</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Rekomendasi berdasarkan pekerjaan yang Anda lamar</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                  <CardTitle>Skill Audit Berkala</CardTitle>
                  <CardDescription>Evaluasi dan kembangkan keterampilan Anda setiap 3-6 bulan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">JavaScript</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <span className="text-xs text-green-600">+10</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Communication</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                        <span className="text-xs text-green-600">+5</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">Audit berikutnya: Jan 2024</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                  <CardTitle>Work Progress Tracker</CardTitle>
                  <CardDescription>Dokumentasikan perjalanan profesional dan bangun portofolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Proyek Aktif</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pencapaian</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Log Pekerjaan</span>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">45</Badge>
                    </div>
                    <Button size="sm" className="w-full mt-2" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                      Lihat Portofolio Publik
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                  {t("home.cta.title")}
                </h2>
                <p className="max-w-[600px] text-white md:text-xl/relaxed">{t("home.cta.subtitle")}</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/register">
                  <Button size="lg" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                    {t("common.signUpNow")}
                    <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/cv-template">
                  <Button variant="outline" className="bg-white" size="lg">
                    {t("common.createCV")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/20 py-6 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">JobMate</span>
              </div>
              <p className="text-sm text-white/80">
                Platform yang menghubungkan pencari kerja dan perusahaan secara efisien, transparan, dan user-friendly.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Fitur</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Pencarian Pekerjaan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Pelacakan Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Rating Perusahaan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Chatbot
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Perusahaan</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Karir
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Kebijakan Cookie
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-white/80 mb-4 md:mb-0">
              © {new Date().getFullYear()} JobMate. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/80 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
