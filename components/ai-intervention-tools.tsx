"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  BookOpen,
  User,
  MessageSquare,
  TrendingUp,
  Settings,
  Sparkles,
  FileText,
  Target,
  Lightbulb,
  Download,
  RefreshCw,
  CheckCircle2,
  Clock,
  Star,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface Recommendation {
  id: string
  title: string
  type: "material" | "strategy" | "activity"
  subject: string
  difficulty: string
  matchScore: number
  description: string
  tags: string[]
}

interface IEPGoal {
  id: string
  domain: string
  goal: string
  currentLevel: number
  targetLevel: number
  deadline: string
  status: "on-track" | "needs-attention" | "completed"
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "시각적 수학 학습 카드",
    type: "material",
    subject: "수학",
    difficulty: "초급",
    matchScore: 95,
    description: "그림과 숫자를 결합한 덧셈/뺄셈 학습 자료. 구체물 조작 활동 포함.",
    tags: ["시각적 학습", "구체물", "기초 연산"],
  },
  {
    id: "2",
    title: "또래 협력 학습 전략",
    type: "strategy",
    subject: "사회성",
    difficulty: "중급",
    matchScore: 88,
    description: "소그룹 활동을 통한 사회적 상호작용 증진. 구조화된 역할 분담 포함.",
    tags: ["협력 학습", "사회성", "의사소통"],
  },
  {
    id: "3",
    title: "감정 인식 게임",
    type: "activity",
    subject: "정서",
    difficulty: "초급",
    matchScore: 92,
    description: "다양한 표정 카드를 활용한 감정 이해 및 표현 활동.",
    tags: ["정서 발달", "감정 표현", "자기 인식"],
  },
  {
    id: "4",
    title: "단계별 읽기 프로그램",
    type: "material",
    subject: "국어",
    difficulty: "초급",
    matchScore: 85,
    description: "학생의 읽기 수준에 맞춘 단계별 읽기 자료와 이해도 확인 활동.",
    tags: ["읽기", "언어 발달", "단계별 학습"],
  },
]

const iepGoals: IEPGoal[] = [
  {
    id: "1",
    domain: "인지",
    goal: "10 이하의 덧셈과 뺄셈을 90% 정확도로 수행",
    currentLevel: 65,
    targetLevel: 90,
    deadline: "2024-12-31",
    status: "on-track",
  },
  {
    id: "2",
    domain: "사회성",
    goal: "또래와 5분 이상 협력 활동 참여",
    currentLevel: 68,
    targetLevel: 85,
    deadline: "2024-12-31",
    status: "on-track",
  },
  {
    id: "3",
    domain: "정서",
    goal: "자신의 감정을 언어로 표현하기",
    currentLevel: 72,
    targetLevel: 85,
    deadline: "2024-12-31",
    status: "needs-attention",
  },
  {
    id: "4",
    domain: "학습",
    goal: "20분 동안 과제에 집중하기",
    currentLevel: 58,
    targetLevel: 80,
    deadline: "2024-12-31",
    status: "needs-attention",
  },
]

export function AIInterventionTools() {
  const [selectedStudent] = useState("김민준")
  const [generatingReport, setGeneratingReport] = useState(false)

  const handleGenerateReport = () => {
    setGeneratingReport(true)
    setTimeout(() => setGeneratingReport(false), 2000)
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
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI 중재 도구</h1>
              <p className="text-muted-foreground">인공지능 기반 맞춤형 학습 지원 및 중재 계획</p>
            </div>
          </div>
        </div>

        {/* Student Selector */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">선택된 학생</p>
                <p className="font-semibold">{selectedStudent}</p>
              </div>
            </div>
            <Button variant="outline">학생 변경</Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recommendations">
              <Sparkles className="mr-2 h-4 w-4" />
              AI 추천
            </TabsTrigger>
            <TabsTrigger value="iep">
              <Target className="mr-2 h-4 w-4" />
              디지털 IEP
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="mr-2 h-4 w-4" />
              보고서 생성
            </TabsTrigger>
          </TabsList>

          {/* AI Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      맞춤형 학습 자료 추천
                    </CardTitle>
                    <CardDescription>학생의 발달 수준과 학습 특성을 분석하여 최적의 자료를 추천합니다</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    새로고침
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <Card key={rec.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <h3 className="font-semibold">{rec.title}</h3>
                              <Badge variant="outline">{rec.subject}</Badge>
                              <Badge variant="secondary">{rec.difficulty}</Badge>
                            </div>
                            <p className="mb-3 text-sm text-muted-foreground">{rec.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {rec.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                              <span className="text-sm font-semibold">{rec.matchScore}% 적합</span>
                            </div>
                            <Button size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              다운로드
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Teaching Strategies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  추천 교수 전략
                </CardTitle>
                <CardDescription>학생의 학습 특성에 맞는 효과적인 교수 방법</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      strategy: "시각적 지원 강화",
                      description: "그림, 도표, 색상 코딩을 활용한 정보 제시",
                      effectiveness: 92,
                    },
                    {
                      strategy: "단계별 과제 분할",
                      description: "복잡한 과제를 작은 단계로 나누어 제시",
                      effectiveness: 88,
                    },
                    {
                      strategy: "반복 학습과 연습",
                      description: "충분한 연습 기회와 즉각적인 피드백 제공",
                      effectiveness: 85,
                    },
                    {
                      strategy: "구체물 활용",
                      description: "실물 자료와 조작 활동을 통한 개념 이해",
                      effectiveness: 90,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold">{item.strategy}</h4>
                        <Badge variant="secondary">{item.effectiveness}% 효과</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Digital IEP Tab */}
          <TabsContent value="iep" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      개별화 교육 계획 (IEP)
                    </CardTitle>
                    <CardDescription>2024년 2학기 목표 및 진행 상황</CardDescription>
                  </div>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    IEP 편집
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {iepGoals.map((goal) => (
                    <Card key={goal.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <Badge variant="outline">{goal.domain}</Badge>
                              {goal.status === "on-track" && (
                                <Badge variant="default" className="bg-green-500">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  순조로움
                                </Badge>
                              )}
                              {goal.status === "needs-attention" && (
                                <Badge variant="default" className="bg-yellow-500">
                                  <Clock className="mr-1 h-3 w-3" />
                                  주의 필요
                                </Badge>
                              )}
                              {goal.status === "completed" && (
                                <Badge variant="default" className="bg-blue-500">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  완료
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-semibold">{goal.goal}</h4>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <p>목표일: {goal.deadline}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">진행률</span>
                            <span className="font-semibold">
                              {goal.currentLevel}% / {goal.targetLevel}%
                            </span>
                          </div>
                          <Progress value={goal.currentLevel} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions for IEP */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI 목표 달성 제안
                </CardTitle>
                <CardDescription>현재 진행 상황을 분석한 맞춤형 중재 제안</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      goal: "10 이하의 덧셈과 뺄셈",
                      suggestion: "매일 10분씩 수 카드 게임 활동 추가 권장",
                      priority: "medium",
                    },
                    {
                      goal: "과제 집중 시간 향상",
                      suggestion: "5분 단위로 휴식 시간을 제공하는 포모도로 기법 적용",
                      priority: "high",
                    },
                    {
                      goal: "감정 표현 능력",
                      suggestion: "감정 일기 작성 활동을 주 3회로 증가",
                      priority: "high",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-lg border p-4">
                      <Lightbulb className="mt-1 h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="font-semibold">{item.goal}</h4>
                          {item.priority === "high" && (
                            <Badge variant="destructive" className="text-xs">
                              우선순위 높음
                            </Badge>
                          )}
                          {item.priority === "medium" && (
                            <Badge variant="secondary" className="text-xs">
                              우선순위 중간
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.suggestion}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        적용
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  자동 보고서 생성
                </CardTitle>
                <CardDescription>AI가 학생 데이터를 분석하여 종합 보고서를 자동으로 생성합니다</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "월간 진도 보고서",
                        description: "한 달간의 학습 진행 상황과 성취도 분석",
                        icon: <FileText className="h-5 w-5" />,
                      },
                      {
                        title: "학기말 종합 평가",
                        description: "학기 전체 발달 영역별 성장 분석 및 평가",
                        icon: <FileText className="h-5 w-5" />,
                      },
                      {
                        title: "IEP 진행 보고서",
                        description: "개별화 교육 계획 목표 달성도 및 수정 제안",
                        icon: <Target className="h-5 w-5" />,
                      },
                      {
                        title: "학부모 상담 자료",
                        description: "가정 연계를 위한 학생 발달 상황 요약",
                        icon: <FileText className="h-5 w-5" />,
                      },
                    ].map((report, idx) => (
                      <Card key={idx} className="border-2">
                        <CardContent className="p-4">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              {report.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{report.title}</h4>
                              <p className="text-sm text-muted-foreground">{report.description}</p>
                            </div>
                          </div>
                          <Button className="w-full bg-transparent" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            생성하기
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="border-2 border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 text-lg font-semibold">AI 맞춤형 종합 보고서</h3>
                          <p className="text-sm text-muted-foreground">
                            학생의 모든 데이터를 종합 분석하여 발달 영역별 상세 평가, 강점과 개선 영역, 맞춤형 중재
                            제안을 포함한 전문적인 보고서를 생성합니다.
                          </p>
                        </div>
                      </div>
                      <Button className="w-full" size="lg" onClick={handleGenerateReport} disabled={generatingReport}>
                        {generatingReport ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            보고서 생성 중...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            AI 종합 보고서 생성
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>최근 생성된 보고서</CardTitle>
                <CardDescription>지난 30일간 생성된 보고서 목록</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    {
                      title: "2024년 10월 월간 진도 보고서",
                      date: "2024-10-28",
                      type: "월간 보고서",
                    },
                    {
                      title: "2학기 중간 IEP 진행 보고서",
                      date: "2024-10-15",
                      type: "IEP 보고서",
                    },
                    {
                      title: "학부모 상담 자료 (10월)",
                      date: "2024-10-10",
                      type: "상담 자료",
                    },
                  ].map((report, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{report.type}</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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
