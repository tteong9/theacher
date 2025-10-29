"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  BookOpen,
  User,
  MessageSquare,
  Brain,
  Settings,
  Users,
  GraduationCap,
  Activity,
  ArrowUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MessagesSquare,
  Target,
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
} from "recharts"

const overviewStats = {
  totalStudents: 25,
  borderlineStudents: 25,
  receivingSupport: 6,
  needsAttention: 2,
}

const recentActivity = [
  { student: "김민준", action: "IEP 업데이트", time: "10분 전", type: "update" },
  { student: "박서연", action: "새로운 평가 완료", time: "1시간 전", type: "assessment" },
  { student: "이준호", action: "협업 채널 메시지", time: "2시간 전", type: "message" },
  { student: "최지우", action: "AI 추천 자료 확인", time: "3시간 전", type: "ai" },
]

const weeklyProgress = [
  { day: "월", completed: 4, planned: 6 },
  { day: "화", completed: 5, planned: 6 },
  { day: "수", completed: 4, planned: 6 },
  { day: "목", completed: 6, planned: 6 },
  { day: "금", completed: 3, planned: 6 },
]

const supportDistribution = [
  { name: "학습 지원", value: 3, color: "#3b82f6" },
  { name: "정서 지원", value: 1, color: "#ef4444" },
  { name: "사회성 지원", value: 1, color: "#a855f7" },
  { name: "행동 지원", value: 1, color: "#f97316" },
]

export function OverviewDashboard() {
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
            <Button variant="secondary" className="w-full justify-start">
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
            <Button variant="ghost" className="w-full justify-start">
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
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">전체 현황</h1>
              <p className="text-muted-foreground">강원도 추천초등학교 2학년 3반</p>
            </div>
          </div>
        </div>

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
              <div className="text-3xl font-bold">{overviewStats.totalStudents}</div>
              <p className="mt-1 text-sm text-muted-foreground">경계선 지적기능 학생</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                지원 중인 학생
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overviewStats.receivingSupport}</div>
              <p className="mt-1 flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                전체의 {((overviewStats.receivingSupport / overviewStats.totalStudents) * 100).toFixed(0)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                주의 필요
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overviewStats.needsAttention}</div>
              <p className="mt-1 text-sm text-muted-foreground">즉각적인 개입 필요</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                평균 개선율
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78%</div>
              <p className="mt-1 flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                +3.2% 전월 대비
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>주간 중재 활동</CardTitle>
              <CardDescription>이번 주 계획 대비 완료 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#22c55e" name="완료" />
                  <Bar dataKey="planned" fill="#94a3b8" name="계획" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Support Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>지원 유형별 분포</CardTitle>
              <CardDescription>현재 진행 중인 지원 프로그램</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={supportDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}명)`}
                  >
                    {supportDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>실시간 학생 지원 활동 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg border p-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        activity.type === "update"
                          ? "bg-blue-500/10 text-blue-500"
                          : activity.type === "assessment"
                            ? "bg-green-500/10 text-green-500"
                            : activity.type === "message"
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-orange-500/10 text-orange-500"
                      }`}
                    >
                      {activity.type === "update" && <User className="h-5 w-5" />}
                      {activity.type === "assessment" && <CheckCircle className="h-5 w-5" />}
                      {activity.type === "message" && <MessageSquare className="h-5 w-5" />}
                      {activity.type === "ai" && <Brain className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.student}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
              <CardDescription>자주 사용하는 기능</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/student-profile">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <User className="mr-2 h-4 w-4" />
                  학생 프로필 보기
                </Button>
              </Link>
              <Link href="/collaboration">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  협업 채널 열기
                </Button>
              </Link>
              <Link href="/ai-intervention">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Brain className="mr-2 h-4 w-4" />
                  AI 추천 받기
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  프로젝트 분석 보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Students Needing Attention */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              주의가 필요한 학생
            </CardTitle>
            <CardDescription>즉각적인 개입이 필요한 학생 목록</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "이준호",
                  issue: "행동 문제 증가",
                  lastUpdate: "2일 전",
                  priority: "high",
                },
                {
                  name: "정수아",
                  issue: "학습 참여도 감소",
                  lastUpdate: "3일 전",
                  priority: "medium",
                },
              ].map((student, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                      <User className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{student.lastUpdate}</span>
                    <Badge variant={student.priority === "high" ? "destructive" : "secondary"}>
                      {student.priority === "high" ? "긴급" : "주의"}
                    </Badge>
                    <Link href="/student-profile">
                      <Button size="sm">상세보기</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
