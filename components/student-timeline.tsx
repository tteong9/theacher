"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Users, Brain } from "lucide-react"

interface TimelineEvent {
  date: string
  title: string
  description: string
  type: "assessment" | "intervention" | "meeting" | "milestone"
  icon: React.ReactNode
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "2024-10-15",
    title: "2학기 종합 평가 완료",
    description: "인지 영역 5점 향상, 학습 영역 3점 향상",
    type: "assessment",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    date: "2024-09-20",
    title: "특수교사 협의회",
    description: "수학 학습 전략 수정 및 보완 논의",
    type: "meeting",
    icon: <Users className="h-4 w-4" />,
  },
  {
    date: "2024-09-01",
    title: "개별화 교육 계획 수립",
    description: "2학기 IEP 목표 설정 및 중재 계획 수립",
    type: "intervention",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    date: "2024-07-15",
    title: "1학기 평가 완료",
    description: "전반적인 발달 영역에서 긍정적 변화 관찰",
    type: "assessment",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    date: "2024-06-10",
    title: "사회성 향상 프로그램 참여",
    description: "또래 관계 형성 프로그램 8주 과정 시작",
    type: "intervention",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    date: "2024-04-20",
    title: "학부모 상담",
    description: "가정 연계 학습 전략 공유 및 협력 방안 논의",
    type: "meeting",
    icon: <Users className="h-4 w-4" />,
  },
]

const typeColors = {
  assessment: "bg-blue-500",
  intervention: "bg-green-500",
  meeting: "bg-purple-500",
  milestone: "bg-orange-500",
}

const typeLabels = {
  assessment: "평가",
  intervention: "중재",
  meeting: "회의",
  milestone: "이정표",
}

export function StudentTimeline({ studentId }: { studentId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>성장 타임라인</CardTitle>
        <CardDescription>학생의 주요 평가, 중재, 회의 기록</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 pl-6">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 h-[calc(100%-2rem)] w-0.5 bg-border" />

          {timelineEvents.map((event, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className={`absolute -left-6 mt-1.5 h-3 w-3 rounded-full ${typeColors[event.type]}`} />

              <div className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">{event.icon}</div>
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{typeLabels[event.type]}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
