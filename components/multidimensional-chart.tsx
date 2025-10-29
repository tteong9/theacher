"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface ProgressData {
  date: string
  cognitive: number
  learning: number
  emotional: number
  social: number
}

export function MultidimensionalChart({ data }: { data: ProgressData[] }) {
  const latestData = data[0]
  const radarData = [
    { dimension: "인지", value: latestData.cognitive, fullMark: 100 },
    { dimension: "학습", value: latestData.learning, fullMark: 100 },
    { dimension: "정서", value: latestData.emotional, fullMark: 100 },
    { dimension: "사회성", value: latestData.social, fullMark: 100 },
    { dimension: "행동", value: 75, fullMark: 100 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>발달 영역별 추이</CardTitle>
          <CardDescription>최근 4개월간 변화 추이</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[...data].reverse()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cognitive" stroke="#3b82f6" name="인지" strokeWidth={2} />
              <Line type="monotone" dataKey="learning" stroke="#22c55e" name="학습" strokeWidth={2} />
              <Line type="monotone" dataKey="emotional" stroke="#ef4444" name="정서" strokeWidth={2} />
              <Line type="monotone" dataKey="social" stroke="#a855f7" name="사회성" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>다차원 분석</CardTitle>
          <CardDescription>현재 발달 영역별 수준</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="현재 수준" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
