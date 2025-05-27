"use client"

import type React from "react"
import { createContext, useState, useEffect, useCallback, useContext } from "react"

interface I18nContextProps {
  locale: string
  setLocale: (locale: string) => void
}

const I18nContext = createContext<I18nContextProps>({
  locale: "en",
  setLocale: () => {},
})

interface I18nProviderProps {
  children: React.ReactNode
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<string>("en")

  const updateLocale = useCallback((newLocale: string) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
  }, [])

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale")
    if (storedLocale) {
      setLocale(storedLocale)
    }
  }, [])

  return <I18nContext.Provider value={{ locale, setLocale: updateLocale }}>{children}</I18nContext.Provider>
}

const useI18n = () => useContext(I18nContext)

export { I18nProvider, useI18n }
