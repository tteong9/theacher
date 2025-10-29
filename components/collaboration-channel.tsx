"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import {
  MessageSquare,
  Send,
  Paperclip,
  Video,
  Users,
  BookOpen,
  User,
  Brain,
  TrendingUp,
  Settings,
  Search,
  Plus,
  FileText,
  ImageIcon,
  Download,
  Activity,
} from "lucide-react"

interface Message {
  id: string
  sender: string
  role: string
  content: string
  timestamp: string
  attachments?: { name: string; type: string }[]
}

interface Channel {
  id: string
  name: string
  studentName: string
  participants: number
  lastMessage: string
  unread: number
}

const channels: Channel[] = [
  {
    id: "1",
    name: "김민준 지원팀",
    studentName: "김민준",
    participants: 5,
    lastMessage: "수학 학습 전략 수정안 공유드립니다",
    unread: 2,
  },
  {
    id: "2",
    name: "박서연 IEP 회의",
    studentName: "박서연",
    participants: 4,
    lastMessage: "다음 주 화요일 회의 일정 확인 부탁드립니다",
    unread: 0,
  },
  {
    id: "3",
    name: "이준호 행동 중재",
    studentName: "이준호",
    participants: 6,
    lastMessage: "긍정적 행동 지원 계획서 업로드했습니다",
    unread: 1,
  },
]

const messages: Message[] = [
  {
    id: "1",
    sender: "이지은",
    role: "담임교사",
    content:
      "안녕하세요. 김민준 학생의 최근 수학 수업 참여도가 많이 향상되었습니다. 특히 시각적 자료를 활용한 설명에 집중력이 높아졌어요.",
    timestamp: "오전 9:30",
  },
  {
    id: "2",
    sender: "박수진",
    role: "특수교사",
    content:
      "좋은 소식이네요! 시각적 학습 전략이 효과적인 것 같습니다. 다음 주부터 수학 학습지에도 더 많은 그림과 도표를 추가해보겠습니다.",
    timestamp: "오전 10:15",
    attachments: [{ name: "수학_학습지_샘플.pdf", type: "pdf" }],
  },
  {
    id: "3",
    sender: "김태희",
    role: "상담교사",
    content: "정서적으로도 안정감을 보이고 있습니다. 지난주 상담에서 학교생활에 대한 긍정적인 이야기를 많이 했어요.",
    timestamp: "오전 11:20",
  },
  {
    id: "4",
    sender: "최민호",
    role: "학교사회복지사",
    content:
      "가정 방문 결과 공유드립니다. 부모님께서도 학교 지원에 매우 만족하고 계시며, 가정에서도 시각적 학습 자료를 활용하고 싶다고 하셨습니다.",
    timestamp: "오후 2:45",
    attachments: [
      { name: "가정방문_보고서.docx", type: "doc" },
      { name: "학부모_면담_사진.jpg", type: "image" },
    ],
  },
]

export function CollaborationChannel() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [messageInput, setMessageInput] = useState("")
  const [readChannels, setReadChannels] = useState<Set<string>>(new Set([channels[0].id]))

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel)
    setReadChannels((prev) => new Set(prev).add(channel.id))
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
            <Button variant="secondary" className="w-full justify-start">
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
      <main className="ml-64 flex h-screen">
        {/* Channel List */}
        <div className="w-80 border-r bg-card">
          <div className="border-b p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">협업 채널</h2>
              <Button size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="채널 검색..." className="pl-9" />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-9rem)]">
            <div className="space-y-1 p-2">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => handleChannelSelect(channel)}
                  className={`w-full rounded-lg p-3 text-left transition-colors hover:bg-accent ${
                    selectedChannel.id === channel.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="mb-1 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    {channel.unread > 0 && !readChannels.has(channel.id) && (
                      <Badge variant="default" className="h-5 min-w-5 px-1 text-xs">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="mb-2 text-xs text-muted-foreground">학생: {channel.studentName}</p>
                  <p className="truncate text-sm text-muted-foreground">{channel.lastMessage}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{channel.participants}명</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b bg-card p-4">
            <div>
              <h3 className="font-semibold">{selectedChannel.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedChannel.participants}명의 참여자</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Video className="mr-2 h-4 w-4" />
                화상 회의
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                문서
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-semibold">{message.sender}</span>
                      <Badge variant="secondary" className="text-xs">
                        {message.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center gap-2 rounded border bg-background p-2">
                              {attachment.type === "pdf" && <FileText className="h-4 w-4 text-red-500" />}
                              {attachment.type === "doc" && <FileText className="h-4 w-4 text-blue-500" />}
                              {attachment.type === "image" && <ImageIcon className="h-4 w-4 text-green-500" />}
                              <span className="flex-1 text-sm">{attachment.name}</span>
                              <Button variant="ghost" size="sm">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t bg-card p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="메시지를 입력하세요..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Channel Info */}
        <div className="w-80 border-l bg-card">
          <Tabs defaultValue="participants" className="h-full">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="participants" className="flex-1">
                참여자
              </TabsTrigger>
              <TabsTrigger value="files" className="flex-1">
                파일
              </TabsTrigger>
            </TabsList>

            <TabsContent value="participants" className="p-4">
              <div className="space-y-3">
                {[
                  { name: "이지은", role: "담임교사", status: "online" },
                  { name: "박수진", role: "특수교사", status: "online" },
                  { name: "김태희", role: "상담교사", status: "away" },
                  { name: "최민호", role: "학교사회복지사", status: "offline" },
                  { name: "정서연", role: "또래 도우미", status: "online" },
                ].map((participant, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                          participant.status === "online"
                            ? "bg-green-500"
                            : participant.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">{participant.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="files" className="p-4">
              <div className="space-y-2">
                {[
                  { name: "수학_학습지_샘플.pdf", date: "오늘", size: "2.4 MB" },
                  { name: "가정방문_보고서.docx", date: "오늘", size: "156 KB" },
                  { name: "학부모_면담_사진.jpg", date: "어제", size: "3.1 MB" },
                  { name: "IEP_계획서_2024.pdf", date: "2024-10-01", size: "1.8 MB" },
                ].map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.date} • {file.size}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
