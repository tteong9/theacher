"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Calendar,
  Brain,
  Heart,
  Users,
  BookOpen,
  TrendingUp,
  FileText,
  MessageSquare,
  Settings,
  Activity,
} from "lucide-react"
import { StudentTimeline } from "@/components/student-timeline"
import { MultidimensionalChart } from "@/components/multidimensional-chart"
import { RelationshipMap } from "@/components/relationship-map"
import Link from "next/link"

// Mock student data
const studentData = {
  id: "2024-001",
  name: "김민준",
  grade: "초등학교 4학년",
  age: 10,
  avatar: "/student-boy.png",
  status: "경계선 지적기능",
  enrollmentDate: "2021-03-02",
  lastAssessment: "2024-10-15",
  dimensions: {
    cognitive: 65,
    learning: 58,
    emotional: 72,
    social: 68,
    behavioral: 75,
  },
  recentProgress: [
    { date: "2024-10", cognitive: 65, learning: 58, emotional: 72, social: 68 },
    { date: "2024-09", cognitive: 62, learning: 55, emotional: 70, social: 65 },
    { date: "2024-08", cognitive: 60, learning: 53, emotional: 68, social: 63 },
    { date: "2024-07", cognitive: 58, learning: 50, emotional: 65, social: 60 },
  ],
}

export function StudentProfileDashboard() {
  const [selectedStudent] = useState(studentData)

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
              AI 중재 도구
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="ghost" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              정책 분석
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
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={selectedStudent.avatar || "/placeholder.svg"} />
              <AvatarFallback>{selectedStudent.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{selectedStudent.name}</h1>
                <Badge variant="outline">{selectedStudent.status}</Badge>
              </div>
              <p className="mt-1 text-muted-foreground">
                {selectedStudent.grade} • 학생 ID: {selectedStudent.id}
              </p>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  입학: {selectedStudent.enrollmentDate}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  최근 평가: {selectedStudent.lastAssessment}
                </span>
              </div>
            </div>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            보고서 생성
          </Button>
        </div>

        {/* Multidimensional Overview */}
        <div className="mb-8 grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Brain className="h-4 w-4 text-blue-500" />
                인지
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedStudent.dimensions.cognitive}%</div>
              <Progress value={selectedStudent.dimensions.cognitive} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4 text-green-500" />
                학습
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedStudent.dimensions.learning}%</div>
              <Progress value={selectedStudent.dimensions.learning} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Heart className="h-4 w-4 text-red-500" />
                정서
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedStudent.dimensions.emotional}%</div>
              <Progress value={selectedStudent.dimensions.emotional} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4 text-purple-500" />
                사회성
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedStudent.dimensions.social}%</div>
              <Progress value={selectedStudent.dimensions.social} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                행동
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedStudent.dimensions.behavioral}%</div>
              <Progress value={selectedStudent.dimensions.behavioral} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Views */}
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="timeline">성장 타임라인</TabsTrigger>
            <TabsTrigger value="analysis">다차원 분석</TabsTrigger>
            <TabsTrigger value="relationships">관계망</TabsTrigger>
            <TabsTrigger value="documents">문서 및 기록</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <StudentTimeline studentId={selectedStudent.id} />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <MultidimensionalChart data={selectedStudent.recentProgress} />
          </TabsContent>

          <TabsContent value="relationships" className="space-y-4">
            <RelationshipMap studentName={selectedStudent.name} />
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>문서 및 기록</CardTitle>
                <CardDescription>평가 보고서, 관찰 일지, 작업 샘플</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "2024년 2학기 종합 평가", date: "2024-10-15", type: "평가" },
                    { title: "수학 수업 관찰 일지", date: "2024-10-10", type: "관찰" },
                    { title: "미술 작품 포트폴리오", date: "2024-10-05", type: "작업물" },
                    { title: "개별화 교육 계획(IEP)", date: "2024-09-01", type: "IEP" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{doc.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
