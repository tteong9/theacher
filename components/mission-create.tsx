"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  User,
  MessageSquare,
  Brain,
  Settings,
  TrendingUp,
  MessagesSquare,
  Target,
  Activity,
} from "lucide-react"
import Link from "next/link"

const supportStudents = [
  { id: "1", name: "김민준", grade: "2학년 3반" },
  { id: "2", name: "박서연", grade: "2학년 3반" },
  { id: "3", name: "최지우", grade: "2학년 3반" },
  { id: "4", name: "이준호", grade: "2학년 3반" },
  { id: "5", name: "김민주", grade: "2학년 3반" },
  { id: "6", name: "정수아", grade: "2학년 3반" },
  { id: "7", name: "김민지", grade: "2학년 3반" },
]

export function MissionCreate() {
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [scenario, setScenario] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedStudent || !scenario.trim()) {
      alert("학생과 시나리오를 모두 입력해주세요.")
      return
    }

    // Show success alert
    alert("응답완료")

    // Reset form
    setSelectedStudent("")
    setScenario("")
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
          <Link href="/mission-create">
            <Button variant="secondary" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              미션 생성
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
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">미션 생성</h1>
              <p className="text-muted-foreground">학생별 맞춤 시나리오 미션 생성</p>
            </div>
          </div>
        </div>

        {/* Mission Creation Form */}
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>새로운 미션 만들기</CardTitle>
            <CardDescription>학생을 선택하고 시나리오를 입력하여 맞춤형 미션을 생성하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Selection */}
              <div className="space-y-2">
                <Label htmlFor="student">학생 선택</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger id="student">
                    <SelectValue placeholder="학생을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.grade})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Scenario Input */}
              <div className="space-y-2">
                <Label htmlFor="scenario">시나리오</Label>
                <Textarea
                  id="scenario"
                  placeholder="학생에게 제공할 시나리오를 입력하세요...&#10;&#10;예시:&#10;- 친구와 함께 놀이터에서 놀고 있습니다. 친구가 당신의 장난감을 빌려달라고 합니다. 어떻게 대답하시겠습니까?&#10;- 수업 시간에 선생님이 질문을 하셨습니다. 답을 알고 있지만 손을 들기가 부끄럽습니다. 어떻게 하시겠습니까?"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  학생의 사회성, 의사소통, 문제해결 능력을 평가할 수 있는 시나리오를 작성해주세요.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedStudent("")
                    setScenario("")
                  }}
                >
                  초기화
                </Button>
                <Button type="submit">미션 생성</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="mx-auto mt-6 grid max-w-3xl gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">미션 생성 가이드</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• 학생의 현재 발달 수준을 고려하여 시나리오를 작성하세요</p>
              <p>• 구체적이고 명확한 상황을 제시하세요</p>
              <p>• 학생이 선택할 수 있는 여지를 남겨두세요</p>
              <p>• 긍정적이고 안전한 환경을 전제로 하세요</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">평가 영역</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• 사회성: 타인과의 상호작용 능력</p>
              <p>• 의사소통: 자신의 생각과 감정 표현</p>
              <p>• 문제해결: 상황에 대한 대처 능력</p>
              <p>• 정서조절: 감정 인식 및 관리 능력</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
