"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  User,
  MessageSquare,
  Brain,
  TrendingUp,
  Settings,
  Activity,
  Search,
  AlertCircle,
  CheckCircle,
  MessagesSquare,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"
import { StudentProfileDashboard } from "@/components/student-profile-dashboard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const supportStudents = [
  { id: "1", name: "김민준", grade: "초등 4학년", status: "지원 중", priority: "normal", urgency: 3 },
  { id: "2", name: "박서연", grade: "초등 3학년", status: "지원 중", priority: "normal", urgency: 3 },
  { id: "3", name: "이준호", grade: "초등 5학년", status: "주의 필요", priority: "high", urgency: 1 },
  { id: "4", name: "최지우", grade: "초등 4학년", status: "지원 중", priority: "normal", urgency: 3 },
  { id: "5", name: "정수아", grade: "초등 3학년", status: "주의 필요", priority: "medium", urgency: 2 },
  { id: "6", name: "김민주", grade: "초등 4학년", status: "지원 중", priority: "normal", urgency: 3 },
]

const allStudents = [
  ...supportStudents,
  { id: "7", name: "강태민", grade: "초등 5학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "8", name: "윤서아", grade: "초등 3학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "9", name: "장민호", grade: "초등 4학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "10", name: "한지민", grade: "초등 5학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "11", name: "오수진", grade: "초등 3학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "12", name: "임재현", grade: "초등 4학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "13", name: "송하은", grade: "초등 5학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "14", name: "배준서", grade: "초등 3학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "15", name: "신예린", grade: "초등 4학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "16", name: "홍지훈", grade: "초등 5학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "17", name: "조민서", grade: "초등 3학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "18", name: "권도윤", grade: "초등 4학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "19", name: "안서현", grade: "초등 5학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "20", name: "유준혁", grade: "초등 3학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "21", name: "서지안", grade: "초등 4학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "22", name: "노시우", grade: "초등 5학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "23", name: "문채원", grade: "초등 3학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "24", name: "황민재", grade: "초등 4학년", status: "관찰 중", priority: "low", urgency: 4 },
  { id: "25", name: "진서연", grade: "초등 5학년", status: "관찰 중", priority: "low", urgency: 4 },
]

export default function StudentProfilePage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"support" | "all">("support")
  const [sortBy, setSortBy] = useState<"name" | "urgency">("name")

  if (selectedStudent) {
    return <StudentProfileDashboard studentId={selectedStudent} onBack={() => setSelectedStudent(null)} />
  }

  const displayStudents = viewMode === "support" ? supportStudents : allStudents
  const filteredStudents = displayStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name, "ko")
    } else {
      return a.urgency - b.urgency
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-6">
          <BookOpen className="mr-2 h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">학생 지원 플랫폼</span>
        </div>
        <nav className="space-y-1 p-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              <Activity className="mr-2 h-4 w-4" />
              전체 현황
            </Button>
          </Link>
          <Link href="/student-profile">
            <Button variant="secondary" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              학생 프로필
            </Button>
          </Link>
          <Link href="/collaboration">
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              협업 채널
            </Button>
          </Link>
          <Link href="/ai-intervention">
            <Button variant="ghost" className="w-full justify-start">
              <Brain className="mr-2 h-4 w-4" />
              AI 추천 도구
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="ghost" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              프로젝트 분석
            </Button>
          </Link>
          <Link href="/community">
            <Button variant="ghost" className="w-full justify-start">
              <MessagesSquare className="mr-2 h-4 w-4" />
              커뮤니티
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            설정
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">학생 프로필</h1>
              <p className="text-muted-foreground">학생별 상세 정보 및 발달 현황</p>
            </div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "support" | "all")} className="mb-6">
          <TabsList>
            <TabsTrigger value="support">지원 중인 학생 ({supportStudents.length}명)</TabsTrigger>
            <TabsTrigger value="all">전체 학생 ({allStudents.length}명)</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search Bar and Sort */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="학생 이름으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as "name" | "urgency")}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">이름순</SelectItem>
                  <SelectItem value="urgency">긴급도순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {sortedStudents.map((student) => (
            <Card
              key={student.id}
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
              onClick={() => setSelectedStudent(student.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <span className="text-sm text-muted-foreground">{student.grade}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline">{student.status}</Badge>
                        {student.priority === "high" && (
                          <Badge variant="destructive">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            긴급
                          </Badge>
                        )}
                        {student.priority === "medium" && (
                          <Badge variant="secondary">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            주의
                          </Badge>
                        )}
                        {student.priority === "normal" && (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            보통
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost">상세보기</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedStudents.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <User className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-semibold">검색 결과가 없습니다</p>
              <p className="text-sm text-muted-foreground">다른 검색어를 입력해보세요</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
