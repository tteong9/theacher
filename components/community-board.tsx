"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  MessageSquare,
  BookOpen,
  User,
  Brain,
  TrendingUp,
  Settings,
  Search,
  Plus,
  Activity,
  MessagesSquare,
  ThumbsUp,
  MessageCircle,
  Eye,
  Pin,
  Award,
  Target,
} from "lucide-react"

interface Post {
  id: string
  title: string
  author: string
  role: string
  content: string
  category: string
  timestamp: string
  views: number
  likes: number
  comments: number
  isPinned?: boolean
  isBestCase?: boolean
}

const posts: Post[] = [
  {
    id: "1",
    title: "시각적 학습 자료 활용 성공 사례",
    author: "이지은",
    role: "초등교사",
    content:
      "경계선 지적기능 학생에게 시각적 자료를 활용한 수학 수업을 진행한 결과, 학습 이해도가 크게 향상되었습니다...",
    category: "우수 케이스",
    timestamp: "2시간 전",
    views: 124,
    likes: 28,
    comments: 15,
    isPinned: true,
    isBestCase: true,
  },
  {
    id: "2",
    title: "학생 정서 지원을 위한 상담 기법 공유",
    author: "김태희",
    role: "상담사",
    content: "경계선 지적기능 학생들의 자존감 향상을 위한 상담 기법과 실제 적용 사례를 공유합니다...",
    category: "상담사",
    timestamp: "5시간 전",
    views: 89,
    likes: 19,
    comments: 8,
  },
  {
    id: "3",
    title: "2학년 3반 학급 운영 노하우",
    author: "박수진",
    role: "초등교사",
    content: "다양한 학습 수준의 학생들이 함께하는 학급에서 효과적인 학급 운영 방법을 소개합니다...",
    category: "학교 선생님",
    timestamp: "1일 전",
    views: 156,
    likes: 34,
    comments: 22,
    isPinned: true,
  },
  {
    id: "4",
    title: "가정-학교 연계 지원 프로그램 성과",
    author: "최민호",
    role: "사회복지사",
    content: "학부모와 학교가 협력하여 학생을 지원한 사례와 그 성과를 공유합니다...",
    category: "우수 케이스",
    timestamp: "1일 전",
    views: 203,
    likes: 45,
    comments: 31,
    isBestCase: true,
  },
  {
    id: "5",
    title: "개별화 교육 계획(IEP) 작성 팁",
    author: "정서연",
    role: "특수교사",
    content: "효과적인 IEP 작성을 위한 실용적인 팁과 체크리스트를 공유합니다...",
    category: "학교 선생님",
    timestamp: "2일 전",
    views: 178,
    likes: 41,
    comments: 19,
  },
  {
    id: "6",
    title: "학생 행동 관찰 기록 방법",
    author: "이민정",
    role: "상담사",
    content: "체계적인 행동 관찰과 기록을 통한 학생 이해 방법을 소개합니다...",
    category: "상담사",
    timestamp: "3일 전",
    views: 142,
    likes: 27,
    comments: 14,
  },
  {
    id: "7",
    title: "또래 관계 형성 지원 프로그램",
    author: "강민수",
    role: "초등교사",
    content: "경계선 지적기능 학생의 또래 관계 형성을 돕는 프로그램 운영 사례입니다...",
    category: "우수 케이스",
    timestamp: "4일 전",
    views: 167,
    likes: 38,
    comments: 25,
    isBestCase: true,
  },
  {
    id: "8",
    title: "학습 동기 부여 전략",
    author: "윤지혜",
    role: "초등교사",
    content: "학습에 흥미를 잃은 학생들의 동기를 높이는 다양한 전략을 공유합니다...",
    category: "학교 선생님",
    timestamp: "5일 전",
    views: 134,
    likes: 29,
    comments: 17,
  },
]

export function CommunityBoard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: "all", label: "전체", count: posts.length },
    { id: "학교 선생님", label: "학교 선생님", count: posts.filter((p) => p.category === "학교 선생님").length },
    { id: "상담사", label: "상담사", count: posts.filter((p) => p.category === "상담사").length },
    { id: "우수 케이스", label: "우수 케이스", count: posts.filter((p) => p.category === "우수 케이스").length },
  ]

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
            <Button variant="secondary" className="w-full justify-start">
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
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">커뮤니티</h1>
            <p className="text-muted-foreground">교사와 전문가들이 경험과 지식을 공유하는 공간입니다</p>
          </div>

          {/* Search and Create */}
          <div className="mb-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="게시글 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              글쓰기
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Posts List */}
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div key={post.id} className="rounded-lg border bg-card p-5 transition-colors hover:bg-accent/50">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {post.isPinned && (
                        <Badge variant="default" className="gap-1">
                          <Pin className="h-3 w-3" />
                          공지
                        </Badge>
                      )}
                      {post.isBestCase && (
                        <Badge variant="default" className="gap-1 bg-amber-500 hover:bg-amber-600">
                          <Award className="h-3 w-3" />
                          우수사례
                        </Badge>
                      )}
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-tight hover:text-primary">{post.title}</h3>
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{post.author}</span>
                        <Badge variant="secondary" className="text-xs">
                          {post.role}
                        </Badge>
                      </div>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-t pt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
