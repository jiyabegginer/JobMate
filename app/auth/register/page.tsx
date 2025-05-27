"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Briefcase, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState("register") // register, otp, success
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    special: false,
    match: false,
  })

  // Validate phone number format
  const isValidPhoneNumber = (phone: string) => {
    // Basic Indonesian phone number validation
    // Starts with 08 or +62, followed by 8-12 digits
    const phoneRegex = /^(08|\+62)[0-9]{8,12}$/
    return phoneRegex.test(phone)
  }

  // Validate password as user types
  const validatePassword = (pass: string, confirm: string = confirmPassword) => {
    setPasswordValidation({
      length: pass.length >= 8,
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      match: pass === confirm,
    })
  }

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    validatePassword(newPassword, confirmPassword)
  }

  // Handle confirm password change
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value
    setConfirmPassword(newConfirmPassword)
    validatePassword(password, newConfirmPassword)
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate phone number
    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Nomor telepon tidak valid. Gunakan format 08xx atau +62xx")
      return
    }

    // Validate password
    if (!passwordValidation.length || !passwordValidation.number || !passwordValidation.special) {
      setError("Password tidak memenuhi persyaratan keamanan")
      return
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok")
      return
    }

    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
    }, 1500)
  }

  // Handle OTP verification
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
      setStep("success")
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
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
        {step === "register" && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Daftar Akun</CardTitle>
              <CardDescription>Buat akun JobMate untuk mulai mencari pekerjaan</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Buat password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Konfirmasi password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-medium">Password harus memenuhi kriteria berikut:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full flex items-center justify-center ${
                          passwordValidation.length ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>Minimal 8 karakter</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full flex items-center justify-center ${
                          passwordValidation.number ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>Mengandung minimal 1 angka</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full flex items-center justify-center ${
                          passwordValidation.special ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>Mengandung minimal 1 karakter khusus (!@#$%^&*)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full flex items-center justify-center ${
                          passwordValidation.match && confirmPassword
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>Password dan konfirmasi cocok</span>
                    </li>
                  </ul>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" style={{ backgroundColor: "#f7564e" }} disabled={isLoading}>
                  {isLoading ? "Memproses..." : "Daftar"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Sudah punya akun?{" "}
                <Link href="/auth/login" className="font-medium underline" style={{ color: "#f7564e" }}>
                  Masuk
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}

        {step === "otp" && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Verifikasi Nomor Telepon</CardTitle>
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

        {step === "success" && (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Pendaftaran Berhasil!</CardTitle>
              <CardDescription>
                Akun Anda telah berhasil dibuat. Sekarang Anda dapat masuk dan mulai mencari pekerjaan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/auth/login")}
                className="w-full"
                style={{ backgroundColor: "#f7564e" }}
              >
                Masuk ke Akun
              </Button>
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
