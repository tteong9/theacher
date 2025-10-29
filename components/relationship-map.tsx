"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RelationshipNode {
  name: string
  role: string
  relationship: string
  color: string
}

const relationships: RelationshipNode[] = [
  { name: "이지은", role: "담임교사", relationship: "주 지원자", color: "bg-blue-500" },
  { name: "박수진", role: "특수교사", relationship: "학습 지원", color: "bg-green-500" },
  { name: "김태희", role: "상담교사", relationship: "정서 지원", color: "bg-red-500" },
  { name: "최민호", role: "학교사회복지사", relationship: "가정 연계", color: "bg-purple-500" },
  { name: "정서연", role: "또래 도우미", relationship: "사회성 지원", color: "bg-orange-500" },
  { name: "김민준 부모", role: "보호자", relationship: "가정 협력", color: "bg-pink-500" },
]

export function RelationshipMap({ studentName }: { studentName: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>지원 관계망</CardTitle>
        <CardDescription>학생을 지원하는 교사 및 전문가 네트워크</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex min-h-[400px] items-center justify-center">
          {/* Center - Student */}
          <div className="absolute flex flex-col items-center">
            <Avatar className="h-16 w-16 border-4 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                {studentName[0]}
              </AvatarFallback>
            </Avatar>
            <p className="mt-2 font-semibold">{studentName}</p>
            <Badge variant="outline" className="mt-1">
              학생
            </Badge>
          </div>

          {/* Surrounding nodes */}
          {relationships.map((person, index) => {
            const angle = (index * 360) / relationships.length
            const radius = 180
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {/* Connection line */}
                <svg
                  className="pointer-events-none absolute"
                  style={{
                    left: -x,
                    top: -y,
                    width: Math.abs(x) * 2,
                    height: Math.abs(y) * 2,
                  }}
                >
                  <line
                    x1={x > 0 ? 0 : Math.abs(x) * 2}
                    y1={y > 0 ? 0 : Math.abs(y) * 2}
                    x2={x > 0 ? Math.abs(x) * 2 : 0}
                    y2={y > 0 ? Math.abs(y) * 2 : 0}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>

                <Avatar className={`h-12 w-12 border-2 ${person.color}`}>
                  <AvatarFallback className="bg-muted">{person.name[0]}</AvatarFallback>
                </Avatar>
                <p className="mt-2 text-center text-sm font-medium">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.role}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {person.relationship}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
