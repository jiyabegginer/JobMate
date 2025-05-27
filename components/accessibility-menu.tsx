"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accessibility, Type, Eye } from "lucide-react"

export default function AccessibilityMenu() {
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
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

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0]
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
    localStorage.setItem("fontSize", newSize.toString())
  }

  const handleContrastChange = (checked: boolean) => {
    setHighContrast(checked)
    if (checked) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
    localStorage.setItem("highContrast", checked.toString())
  }

  const increaseFont = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}%`
      localStorage.setItem("fontSize", newSize.toString())
    }
  }

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
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Opsi Aksesibilitas">
          <Accessibility className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Opsi Aksesibilitas</h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="font-size" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Ukuran Teks
              </Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={decreaseFont}
                  aria-label="Perkecil teks"
                  disabled={fontSize <= 80}
                >
                  <span className="text-lg">-</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={increaseFont}
                  aria-label="Perbesar teks"
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
              aria-label="Ukuran teks"
            />
            <div className="text-xs text-muted-foreground text-center">{fontSize}%</div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="flex items-center gap-2 cursor-pointer">
              <Eye className="h-4 w-4" />
              Kontras Tinggi
            </Label>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={handleContrastChange}
              aria-label="Kontras tinggi"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
