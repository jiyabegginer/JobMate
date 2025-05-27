"use client"

import CVTemplate from "@/components/cv-template"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CVTemplatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Template CV JobMate</h1>
          </div>
          <Button style={{ backgroundColor: "#f7564e" }}>Simpan CV</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Keuntungan Template CV JobMate</h2>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-red-100 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Sekali isi, gunakan untuk semua lamaran</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-red-100 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Format profesional yang dioptimalkan untuk ATS (Applicant Tracking System)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-red-100 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Tersedia template khusus untuk fresh graduate, profesional, dan berbagai bidang</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-red-100 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Mudah diperbarui dan diunduh dalam format PDF</span>
              </li>
            </ul>
          </div>
        </div>

        <CVTemplate />
      </main>
    </div>
  )
}
