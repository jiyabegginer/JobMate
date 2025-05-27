"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("id")

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    // Here you would typically update the app's language context
    console.log("Language changed to:", value)
  }

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[100px] h-9">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="id">ID</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  )
}
