"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Briefcase, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ForgotPasswordPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [step, setStep] = useState("request") // request, otp, reset, success
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("phone")

  // Validate phone number format
  const isValidPhoneNumber = (phone: string) => {
    // Basic Indonesian phone number validation
    // Starts with 08 or +62, followed by 8-12 digits
    const phoneRegex = /^(08|\+62)[0-9]{8,12}$/
    return phoneRegex.test(phone)
  }

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  // Handle OTP input keydown for backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  // Handle request password reset
  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate phone number
    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Nomor telepon tidak valid. Gunakan format 08xx atau +62xx")
      return
    }

    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
    }, 1500)
  }

  // Handle verify OTP
  const handleVerifyOtp = () => {
    const otpValue = otp.join("")

    // Check if OTP is complete
    if (otpValue.length !== 6) {
      setError("Masukkan kode OTP 6 digit")
      return
    }

    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("reset")
    }, 1500)
  }

  // Handle resend OTP
  const handleResendOtp = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Reset OTP fields
      setOtp(["", "", "", "", "", ""])
      setError("")
    }, 1500)
  }

  // Handle reset password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate password
    if (newPassword.length < 8) {
      setError("Password harus minimal 8 karakter")
      return
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok")
      return
    }

    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/auth/login" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6" style={{ color: "#f7564e" }} />
              <span className="text-xl font-bold">JobMate</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {step === "request" && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Lupa Password</CardTitle>
              <CardDescription>Masukkan nomor telepon atau email Anda untuk mengatur ulang password</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="phone" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="phone">Nomor Telepon</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>

                <TabsContent value="phone">
                  <form onSubmit={handleRequestReset} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="08xx atau +62xx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      style={{ backgroundColor: "#f7564e" }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Memproses..." : "Kirim Kode OTP"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="email">
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="nama@email.com" required />
                    </div>

                    <Button type="submit" className="w-full" style={{ backgroundColor: "#f7564e" }}>
                      Kirim Link Reset
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Ingat password Anda?{" "}
                <Link href="/auth/login" className="font-medium underline" style={{ color: "#f7564e" }}>
                  Kembali ke halaman login
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}

        {step === "otp" && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Verifikasi OTP</CardTitle>
              <CardDescription>
                Kode OTP telah dikirim ke nomor {phoneNumber}. Masukkan kode 6 digit untuk verifikasi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleVerifyOtp}
                  className="w-full"
                  style={{ backgroundColor: "#f7564e" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Memverifikasi..." : "Verifikasi"}
                </Button>

                <div className="text-center text-sm">
                  Tidak menerima kode?{" "}
                  <button
                    type="button"
                    className="font-medium underline"
                    style={{ color: "#f7564e" }}
                    onClick={handleResendOtp}
                    disabled={isLoading}
                  >
                    Kirim Ulang
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "reset" && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Atur Ulang Password</CardTitle>
              <CardDescription>Buat password baru untuk akun Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Konfirmasi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" style={{ backgroundColor: "#f7564e" }} disabled={isLoading}>
                  {isLoading ? "Memproses..." : "Atur Ulang Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Password Berhasil Diubah!</CardTitle>
              <CardDescription>
                Password Anda telah berhasil diubah. Silakan masuk dengan password baru Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/login">
                <Button className="w-full" style={{ backgroundColor: "#f7564e" }}>
                  Kembali ke Halaman Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="py-6 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} JobMate. Hak Cipta Dilindungi.
        </div>
      </footer>
    </div>
  )
}
