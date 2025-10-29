"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  BookOpen,
  User,
  MessageSquare,
  Brain,
  Settings,
  Users,
  GraduationCap,
  DollarSign,
  BarChart3,
  Activity,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
} from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

// Mock data for analytics
const studentStats = {
  total: 25,
  borderline: 25,
  receiving_support: 22,
  improvement_rate: 78,
}

const monthlyTrends = [
  { month: "4월", students: 35, interventions: 28, success: 22 },
  { month: "5월", students: 37, interventions: 31, success: 25 },
  { month: "6월", students: 39, interventions: 34, success: 28 },
  { month: "7월", students: 40, interventions: 36, success: 30 },
  { month: "8월", students: 41, interventions: 37, success: 31 },
  { month: "9월", students: 42, interventions: 38, success: 33 },
]

const interventionTypes = [
  { name: "학습 지원", value: 45, color: "#3b82f6" },
  { name: "정서 지원", value: 28, color: "#ef4444" },
  { name: "사회성 지원", value: 18, color: "#a855f7" },
  { name: "행동 지원", value: 9, color: "#f97316" },
]

const schoolPerformance = [
  { school: "강원초", students: 12, success: 85, budget: 15000000 },
  { school: "설악초", students: 8, success: 92, budget: 12000000 },
  { school: "태백초", students: 15, success: 73, budget: 18000000 },
  { school: "춘천초", students: 7, success: 88, budget: 10000000 },
]

const budgetAllocation = [
  { category: "인력", current: 45000000, proposed: 50000000 },
  { category: "교재/자료", current: 15000000, proposed: 18000000 },
  { category: "전문가 연수", current: 8000000, proposed: 10000000 },
  { category: "평가/검사", current: 12000000, proposed: 12000000 },
]

export function AdminAnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-2학기")

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
              AI 중재 도구
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="secondary" className="w-full justify-start">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">정책 분석 대시보드</h1>
                <p className="text-muted-foreground">강원도 교육청 경계선 지적기능 학생 지원 현황</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                필터
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                보고서 다운로드
              </Button>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">분석 기간</p>
                <p className="font-semibold">{selectedPeriod}</p>
              </div>
            </div>
            <Button variant="outline">기간 변경</Button>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                전체 학생 수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentStats.total}</div>
              <p className="mt-1 flex items-center text-sm text-muted-foreground">
                <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">+5.2%</span>
                <span className="ml-1">전년 대비</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                경계선 학생
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentStats.borderline}</div>
              <p className="mt-1 flex items-center text-sm text-muted-foreground">
                <span>전체의 {((studentStats.borderline / studentStats.total) * 100).toFixed(1)}%</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Activity className="h-4 w-4" />
                지원 중인 학생
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentStats.receiving_support}</div>
              <p className="mt-1 flex items-center text-sm text-muted-foreground">
                <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">+12.3%</span>
                <span className="ml-1">전월 대비</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                개선율
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentStats.improvement_rate}%</div>
              <p className="mt-1 flex items-center text-sm text-muted-foreground">
                <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">+3.1%</span>
                <span className="ml-1">전월 대비</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart3 className="mr-2 h-4 w-4" />
              전체 현황
            </TabsTrigger>
            <TabsTrigger value="effectiveness">
              <Activity className="mr-2 h-4 w-4" />
              정책 효과성
            </TabsTrigger>
            <TabsTrigger value="budget">
              <DollarSign className="mr-2 h-4 w-4" />
              예산 분석
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>월별 학생 지원 추이</CardTitle>
                  <CardDescription>최근 6개월간 지원 학생 수 및 중재 현황</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="students"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        name="전체 학생"
                      />
                      <Area
                        type="monotone"
                        dataKey="interventions"
                        stackId="2"
                        stroke="#22c55e"
                        fill="#22c55e"
                        name="중재 진행"
                      />
                      <Area
                        type="monotone"
                        dataKey="success"
                        stackId="3"
                        stroke="#a855f7"
                        fill="#a855f7"
                        name="목표 달성"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>중재 유형별 분포</CardTitle>
                  <CardDescription>현재 진행 중인 중재 프로그램 유형</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={interventionTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {interventionTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* School Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>학교별 지원 현황</CardTitle>
                <CardDescription>각 학교의 학생 수, 성공률, 예산 집행 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schoolPerformance.map((school, idx) => (
                    <div key={idx} className="rounded-lg border p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{school.school}</h4>
                          <p className="text-sm text-muted-foreground">지원 학생: {school.students}명</p>
                        </div>
                        <Badge
                          variant={school.success >= 85 ? "default" : school.success >= 75 ? "secondary" : "outline"}
                        >
                          성공률 {school.success}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">목표 달성률</span>
                          <span className="font-semibold">{school.success}%</span>
                        </div>
                        <Progress value={school.success} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">예산 집행</span>
                          <span className="font-semibold">{(school.budget / 1000000).toFixed(0)}백만원</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Effectiveness Tab */}
          <TabsContent value="effectiveness" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>정책 효과성 분석</CardTitle>
                <CardDescription>중재 프로그램별 효과성 및 학생 발달 영역별 개선도</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { program: "시각적 학습 지원", effectiveness: 92, students: 28, improvement: 15 },
                    { program: "또래 협력 프로그램", effectiveness: 88, students: 22, improvement: 12 },
                    { program: "정서 안정 프로그램", effectiveness: 85, students: 18, improvement: 10 },
                    { program: "행동 중재 프로그램", effectiveness: 78, students: 15, improvement: 8 },
                  ].map((program, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{program.program}</h4>
                          <p className="text-sm text-muted-foreground">참여 학생: {program.students}명</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{program.effectiveness}%</div>
                          <p className="text-sm text-muted-foreground">효과성</p>
                        </div>
                      </div>
                      <Progress value={program.effectiveness} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">평균 개선도</span>
                        <span className="flex items-center font-semibold text-green-500">
                          <ArrowUp className="mr-1 h-3 w-3" />+{program.improvement}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>발달 영역별 개선도</CardTitle>
                  <CardDescription>6개월간 평균 개선 수치</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { domain: "인지", improvement: 12, color: "bg-blue-500" },
                      { domain: "학습", improvement: 15, color: "bg-green-500" },
                      { domain: "정서", improvement: 10, color: "bg-red-500" },
                      { domain: "사회성", improvement: 13, color: "bg-purple-500" },
                      { domain: "행동", improvement: 8, color: "bg-orange-500" },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.domain}</span>
                          <span className="flex items-center text-sm font-semibold text-green-500">
                            <ArrowUp className="mr-1 h-3 w-3" />+{item.improvement}%
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.improvement * 5}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>교사 만족도</CardTitle>
                  <CardDescription>지원 시스템에 대한 교사 평가</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "사용 편의성", score: 4.5 },
                      { category: "정보 유용성", score: 4.7 },
                      { category: "협업 효율성", score: 4.3 },
                      { category: "AI 추천 정확도", score: 4.6 },
                      { category: "전반적 만족도", score: 4.5 },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.category}</span>
                          <span className="text-sm font-semibold">{item.score} / 5.0</span>
                        </div>
                        <Progress value={item.score * 20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>예산 배분 시뮬레이션</CardTitle>
                <CardDescription>현재 예산 대비 제안 예산 비교 분석</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={budgetAllocation}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `${(value / 1000000).toFixed(0)}백만원`} />
                    <Legend />
                    <Bar dataKey="current" fill="#3b82f6" name="현재 예산" />
                    <Bar dataKey="proposed" fill="#22c55e" name="제안 예산" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>예산 집행 현황</CardTitle>
                  <CardDescription>2024년 2학기 예산 사용률</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold">73%</div>
                      <p className="text-sm text-muted-foreground">전체 예산 집행률</p>
                    </div>
                    <Progress value={73} className="h-3" />
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">80억원</div>
                        <p className="text-sm text-muted-foreground">총 예산</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">58.4억원</div>
                        <p className="text-sm text-muted-foreground">집행액</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>비용 효율성 분석</CardTitle>
                  <CardDescription>학생 1인당 지원 비용 및 효과</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "학생 1인당 평균 비용", value: "1,540만원", change: -5.2 },
                      { metric: "목표 달성 학생당 비용", value: "1,970만원", change: -3.8 },
                      { metric: "중재 프로그램당 비용", value: "420만원", change: -7.1 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="text-sm text-muted-foreground">{item.metric}</p>
                          <p className="text-xl font-bold">{item.value}</p>
                        </div>
                        <div className="flex items-center text-sm font-semibold text-green-500">
                          <ArrowDown className="mr-1 h-3 w-3" />
                          {Math.abs(item.change)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>예산 최적화 제안</CardTitle>
                <CardDescription>AI 기반 예산 배분 개선 제안</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      suggestion: "교재/자료 예산 20% 증액",
                      reason: "시각적 학습 자료의 높은 효과성 (92%)",
                      impact: "예상 개선율 +5%",
                      priority: "high",
                    },
                    {
                      suggestion: "전문가 연수 예산 25% 증액",
                      reason: "교사 역량 강화를 통한 중재 효과 향상",
                      impact: "예상 개선율 +3%",
                      priority: "high",
                    },
                    {
                      suggestion: "평가/검사 예산 유지",
                      reason: "현재 수준에서 충분한 평가 시행 중",
                      impact: "효율성 유지",
                      priority: "medium",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <h4 className="font-semibold">{item.suggestion}</h4>
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
                      <p className="mb-1 text-sm text-muted-foreground">{item.reason}</p>
                      <p className="text-sm font-semibold text-green-500">{item.impact}</p>
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
