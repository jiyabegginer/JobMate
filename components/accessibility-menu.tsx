"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accessibility, Type, Eye } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

export default function AccessibilityMenu() {
  const { t } = useI18n()
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)

  // Efek untuk mengubah ukuran font
  useEffect(() => {
    // Cek localStorage untuk preferensi aksesibilitas
    const savedFontSize = localStorage.getItem("fontSize")
    const savedHighContrast = localStorage.getItem("highContrast")

    if (savedFontSize) {
      setFontSize(Number.parseInt(savedFontSize))
      document.documentElement.style.fontSize = `${Number.parseInt(savedFontSize)}%`
    }

    if (savedHighContrast === "true") {
      setHighContrast(true)
      document.documentElement.classList.add("high-contrast")
    }
  }, [])

  // Handler untuk mengubah ukuran font
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0]
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
    localStorage.setItem("fontSize", newSize.toString())
  }

  // Handler untuk mengubah kontras
  const handleContrastChange = (checked: boolean) => {
    setHighContrast(checked)
    if (checked) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
    localStorage.setItem("highContrast", checked.toString())
  }

  // Handler untuk memperbesar font
  const increaseFont = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}%`
      localStorage.setItem("fontSize", newSize.toString())
    }
  }

  // Handler untuk memperkecil font
  const decreaseFont = () => {
    if (fontSize > 80) {
      const newSize = fontSize - 10
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}%`
      localStorage.setItem("fontSize", newSize.toString())
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label={t("accessibility.accessibilityOptions")}
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">{t("accessibility.accessibilityOptions")}</h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="font-size" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                {t("accessibility.increaseTextSize")}
              </Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={decreaseFont}
                  aria-label={t("accessibility.decreaseTextSize")}
                  disabled={fontSize <= 80}
                >
                  <span className="text-lg">-</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={increaseFont}
                  aria-label={t("accessibility.increaseTextSize")}
                  disabled={fontSize >= 150}
                >
                  <span className="text-lg">+</span>
                </Button>
              </div>
            </div>
            <Slider
              id="font-size"
              min={80}
              max={150}
              step={10}
              value={[fontSize]}
              onValueChange={handleFontSizeChange}
              aria-label={t("accessibility.increaseTextSize")}
            />
            <div className="text-xs text-muted-foreground text-center">{fontSize}%</div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="flex items-center gap-2 cursor-pointer">
              <Eye className="h-4 w-4" />
              {t("accessibility.highContrast")}
            </Label>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={handleContrastChange}
              aria-label={t("accessibility.highContrast")}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
