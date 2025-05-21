"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"

export default function ChatbotDemo() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Halo! Saya Matie, asisten virtual JobMate. Ada yang bisa saya bantu?" },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])

    // Simulate bot response
    setTimeout(() => {
      let response = "Maaf, saya tidak mengerti pertanyaan Anda. Bisa dijelaskan lebih detail?"

      if (input.toLowerCase().includes("pekerjaan")) {
        response =
          "Anda dapat mencari pekerjaan dengan menggunakan filter di halaman utama. Anda juga bisa menyesuaikan pencarian berdasarkan lokasi, gaji, dan kategori."
      } else if (input.toLowerCase().includes("profil")) {
        response =
          "Untuk membuat profil, Anda perlu mendaftar terlebih dahulu. Setelah itu, Anda bisa melengkapi informasi profil atau mengimpor data dari LinkedIn."
      } else if (input.toLowerCase().includes("lamaran")) {
        response = "Anda dapat melacak status lamaran Anda di dashboard. Status akan diperbarui secara real-time."
      }

      setMessages((prev) => [...prev, { role: "bot", content: response }])
    }, 1000)

    setInput("")
  }

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col h-[300px]">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${message.role === "user" ? "bg-gray-100" : "bg-blue-100"}`}
            >
              {message.role === "bot" && (
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="h-4 w-4" style={{ color: "#f7564e" }} />
                  <span className="text-xs font-medium">Matie</span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-2 flex gap-2">
        <Input
          placeholder="Tanyakan sesuatu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button size="icon" onClick={handleSendMessage} style={{ backgroundColor: "#f7564e" }}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

