"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Brain,
  BookOpen,
  User,
  MessageSquare,
  TrendingUp,
  Settings,
  Activity,
  Sparkles,
  Target,
  FileText,
  MessagesSquare,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { AIInterventionTools } from "@/components/ai-intervention-tools"

const supportStudents = [
  { id: "1", name: "김민준", grade: "초등 4학년", status: "보통" },
  { id: "2", name: "박서연", grade: "초등 3학년", status: "보통" },
  { id: "3", name: "이준호", grade: "초등 5학년", status: "긴급" },
  { id: "4", name: "최지우", grade: "초등 4학년", status: "보통" },
  { id: "5", name: "정수아", grade: "초등 3학년", status: "주의" },
  { id: "6", name: "김민주", grade: "초등 4학년", status: "보통" },
  { id: "7", name: "김민지", grade: "초등 4학년", status: "보통" },
]

export default function AIInterventionPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  if (selectedStudent) {
    return <AIInterventionTools studentId={selectedStudent} onBack={() => setSelectedStudent(null)} />
  }

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
            <Button variant="ghost" className="w-full justify-start">
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
            <Button variant="secondary" className="w-full justify-start">
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
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI 추천 도구</h1>
              <p className="text-muted-foreground">전체 지원 학생을 위한 AI 기반 맞춤형 추천</p>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                지원 학생 수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7명</div>
              <p className="mt-1 text-sm text-muted-foreground">활발히 지원 중</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                AI 추천 자료
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24개</div>
              <p className="mt-1 text-sm text-muted-foreground">이번 주 생성</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Target className="h-4 w-4" />
                활성 IEP 목표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18개</div>
              <p className="mt-1 text-sm text-muted-foreground">진행 중인 목표</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4" />
                생성된 보고서
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12개</div>
              <p className="mt-1 text-sm text-muted-foreground">이번 달</p>
            </CardContent>
          </Card>
        </div>

        {/* Common Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              전체 학생 공통 추천 자료
            </CardTitle>
            <CardDescription>모든 지원 학생에게 유용한 학습 자료 및 전략</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  title: "시각적 학습 지원 도구 세트",
                  description: "그림 카드, 색상 코딩, 시각적 일정표 등 시각적 학습자를 위한 종합 자료",
                  applicableStudents: 6,
                },
                {
                  title: "단계별 과제 분할 템플릿",
                  description: "복잡한 과제를 작은 단계로 나누어 제시하는 구조화된 템플릿",
                  applicableStudents: 6,
                },
                {
                  title: "감정 인식 및 표현 프로그램",
                  description: "정서 발달을 위한 체계적인 감정 교육 자료",
                  applicableStudents: 4,
                },
                {
                  title: "또래 협력 학습 가이드",
                  description: "사회성 향상을 위한 구조화된 소그룹 활동 지침",
                  applicableStudents: 5,
                },
              ].map((rec, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex-1">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                  <div className="ml-4 flex items-center gap-3">
                    <Badge variant="secondary">{rec.applicableStudents}명 적용 가능</Badge>
                    <Button size="sm">다운로드</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>지원 학생 목록</CardTitle>
            <CardDescription>학생을 선택하여 개별 맞춤형 추천을 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportStudents.map((student) => (
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
                            {student.status === "긴급" && (
                              <Badge variant="destructive">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                긴급
                              </Badge>
                            )}
                            {student.status === "주의" && (
                              <Badge variant="secondary">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                주의
                              </Badge>
                            )}
                            {student.status === "보통" && (
                              <Badge variant="default" className="bg-green-500">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                보통
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost">AI 추천 보기</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
