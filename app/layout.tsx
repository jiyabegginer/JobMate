import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./high-contrast.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/contexts/i18n-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobMate - Find Your Dream Job",
  description: "A platform that connects job seekers and companies efficiently, transparently, and user-friendly",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
