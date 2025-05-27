"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type I18nContextType, getTranslation, id, en } from "@/lib/i18n"

// Buat konteks i18n
const I18nContext = createContext<I18nContextType>({
  language: "id",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Hook untuk menggunakan i18n
export const useI18n = () => useContext(I18nContext)

// Provider untuk i18n
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // Gunakan localStorage untuk menyimpan preferensi bahasa jika tersedia
  const [language, setLanguageState] = useState("id")

  useEffect(() => {
    // Cek localStorage untuk preferensi bahasa
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    } else {
      // Cek bahasa browser
      const browserLanguage = navigator.language.split("-")[0]
      if (browserLanguage === "en") {
        setLanguageState("en")
      }
    }
  }, [])

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Ubah fungsi t untuk mendukung returnObjects
  const t = (key: string, options?: { returnObjects?: boolean }): string | any => {
    const translations = language === "en" ? en : id
    const value = getTranslation(translations, key)

    // Jika returnObjects true dan nilai adalah objek/array, kembalikan nilai asli
    if (options?.returnObjects && typeof value === "object") {
      return value
    }

    return value
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}
