"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Trash2, Download, Upload, Save, Eye } from "lucide-react"

export default function CVTemplate() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
  })

  const [education, setEducation] = useState([
    { id: 1, institution: "", degree: "", field: "", startYear: "", endYear: "", description: "" },
  ])

  const [experience, setExperience] = useState([
    { id: 1, company: "", position: "", startDate: "", endDate: "", description: "" },
  ])

  const [skills, setSkills] = useState([{ id: 1, name: "" }])

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo({ ...personalInfo, [name]: value })
  }

  const handleEducationChange = (id: number, field: string, value: string) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const handleExperienceChange = (id: number, field: string, value: string) => {
    setExperience(experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const handleSkillChange = (id: number, value: string) => {
    setSkills(skills.map((skill) => (skill.id === id ? { ...skill, name: value } : skill)))
  }

  const addEducation = () => {
    const newId = education.length > 0 ? Math.max(...education.map((edu) => edu.id)) + 1 : 1
    setEducation([
      ...education,
      { id: newId, institution: "", degree: "", field: "", startYear: "", endYear: "", description: "" },
    ])
  }

  const removeEducation = (id: number) => {
    if (education.length > 1) {
      setEducation(education.filter((edu) => edu.id !== id))
    }
  }

  const addExperience = () => {
    const newId = experience.length > 0 ? Math.max(...experience.map((exp) => exp.id)) + 1 : 1
    setExperience([
      ...experience,
      { id: newId, company: "", position: "", startDate: "", endDate: "", description: "" },
    ])
  }

  const removeExperience = (id: number) => {
    if (experience.length > 1) {
      setExperience(experience.filter((exp) => exp.id !== id))
    }
  }

  const addSkill = () => {
    const newId = skills.length > 0 ? Math.max(...skills.map((skill) => skill.id)) + 1 : 1
    setSkills([...skills, { id: newId, name: "" }])
  }

  const removeSkill = (id: number) => {
    if (skills.length > 1) {
      setSkills(skills.filter((skill) => skill.id !== id))
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="edit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Template CV JobMate</h2>
          <TabsList>
            <TabsTrigger value="edit" className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit">
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={personalInfo.fullName}
                      onChange={handlePersonalInfoChange}
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      placeholder="Masukkan nomor telepon Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                      id="address"
                      name="address"
                      value={personalInfo.address}
                      onChange={handlePersonalInfoChange}
                      placeholder="Masukkan alamat Anda"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summary">Ringkasan Profil</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={personalInfo.summary}
                    onChange={handlePersonalInfoChange}
                    placeholder="Tuliskan ringkasan singkat tentang diri Anda"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pendidikan</CardTitle>
                <Button variant="outline" size="sm" onClick={addEducation} className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Tambah
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-4 border-b pb-4 last:border-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Institusi</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                          placeholder="Nama universitas atau sekolah"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gelar</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                          placeholder="Contoh: S1, SMA, dll."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bidang Studi</Label>
                        <Input
                          value={edu.field}
                          onChange={(e) => handleEducationChange(edu.id, "field", e.target.value)}
                          placeholder="Contoh: Teknik Informatika"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Tahun Mulai</Label>
                          <Input
                            value={edu.startYear}
                            onChange={(e) => handleEducationChange(edu.id, "startYear", e.target.value)}
                            placeholder="Contoh: 2018"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tahun Selesai</Label>
                          <Input
                            value={edu.endYear}
                            onChange={(e) => handleEducationChange(edu.id, "endYear", e.target.value)}
                            placeholder="Contoh: 2022 atau Sekarang"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Deskripsi</Label>
                      <Textarea
                        value={edu.description}
                        onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                        placeholder="Prestasi, kegiatan, atau informasi tambahan"
                        rows={3}
                      />
                    </div>
                    {education.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pengalaman Kerja</CardTitle>
                <Button variant="outline" size="sm" onClick={addExperience} className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Tambah
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-4 border-b pb-4 last:border-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Perusahaan</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                          placeholder="Nama perusahaan"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Posisi</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                          placeholder="Jabatan atau posisi"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tanggal Mulai</Label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                          placeholder="Contoh: Jan 2020"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tanggal Selesai</Label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                          placeholder="Contoh: Des 2022 atau Sekarang"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Deskripsi Pekerjaan</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                        placeholder="Jelaskan tanggung jawab dan pencapaian Anda"
                        rows={3}
                      />
                    </div>
                    {experience.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Keahlian</CardTitle>
                <Button variant="outline" size="sm" onClick={addSkill} className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Tambah
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <Input
                        value={skill.name}
                        onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                        placeholder="Contoh: Microsoft Office, Photoshop, dll."
                      />
                      {skills.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(skill.id)}
                          className="h-10 w-10 shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                Import dari File
              </Button>
              <div className="space-x-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button style={{ backgroundColor: "#f7564e" }} className="flex items-center gap-1">
                  <Save className="h-4 w-4" />
                  Simpan CV
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="p-8 bg-white shadow-lg">
            <div className="space-y-6">
              {/* Preview Header */}
              <div className="border-b pb-6">
                <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || "Nama Lengkap"}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
                  {personalInfo.email && <div>{personalInfo.email}</div>}
                  {personalInfo.phone && <div>{personalInfo.phone}</div>}
                  {personalInfo.address && <div>{personalInfo.address}</div>}
                </div>
                {personalInfo.summary && <p className="mt-4">{personalInfo.summary}</p>}
              </div>

              {/* Preview Education */}
              {education.some((edu) => edu.institution || edu.degree) && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold border-b pb-2">Pendidikan</h2>
                  {education.map((edu, index) =>
                    edu.institution || edu.degree ? (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{edu.institution || "Institusi"}</h3>
                          <span>
                            {edu.startYear} - {edu.endYear || "Sekarang"}
                          </span>
                        </div>
                        <div>
                          {edu.degree} {edu.field && `- ${edu.field}`}
                        </div>
                        {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
                      </div>
                    ) : null,
                  )}
                </div>
              )}

              {/* Preview Experience */}
              {experience.some((exp) => exp.company || exp.position) && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold border-b pb-2">Pengalaman Kerja</h2>
                  {experience.map((exp, index) =>
                    exp.company || exp.position ? (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{exp.position || "Posisi"}</h3>
                          <span>
                            {exp.startDate} - {exp.endDate || "Sekarang"}
                          </span>
                        </div>
                        <div className="font-medium">{exp.company || "Perusahaan"}</div>
                        {exp.description && <p className="text-gray-600 mt-1">{exp.description}</p>}
                      </div>
                    ) : null,
                  )}
                </div>
              )}

              {/* Preview Skills */}
              {skills.some((skill) => skill.name) && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold border-b pb-2">Keahlian</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) =>
                      skill.name ? (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {skill.name}
                        </span>
                      ) : null,
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button style={{ backgroundColor: "#f7564e" }} className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              Simpan CV
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
