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
  MessagesSquare,
  ChevronLeft,
  Target,
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
  studentName: string
  participants: number
  lastMessage: string
  unread: number
}

const studentChannels: Channel[] = [
  {
    id: "1",
    studentName: "김민준",
    participants: 5,
    lastMessage: "수학 학습 전략 수정안 공유드립니다",
    unread: 0,
  },
  {
    id: "2",
    studentName: "박서연",
    participants: 4,
    lastMessage: "다음 주 화요일 회의 일정 확인 부탁드립니다",
    unread: 0,
  },
  {
    id: "3",
    studentName: "이준호",
    participants: 6,
    lastMessage: "긍정적 행동 지원 계획서 업로드했습니다",
    unread: 2,
  },
  {
    id: "4",
    studentName: "최지우",
    participants: 4,
    lastMessage: "학습 자료 검토 완료했습니다",
    unread: 0,
  },
  {
    id: "5",
    studentName: "정수아",
    participants: 5,
    lastMessage: "상담 일정 조율이 필요합니다",
    unread: 0,
  },
  {
    id: "6",
    studentName: "김민주",
    participants: 4,
    lastMessage: "IEP 회의 자료 준비 중입니다",
    unread: 2,
  },
  {
    id: "7",
    studentName: "김민지",
    participants: 4,
    lastMessage: "학습 진도 점검이 필요합니다",
    unread: 0,
  },
]

const specialistChannels: Channel[] = [
  {
    id: "s1",
    studentName: "사회복지사 김태희",
    participants: 8,
    lastMessage: "가정 방문 일정 공유드립니다",
    unread: 1,
  },
  {
    id: "s2",
    studentName: "상담사 이민정",
    participants: 6,
    lastMessage: "정서 지원 프로그램 안내",
    unread: 0,
  },
  {
    id: "s3",
    studentName: "평생교육원 박수진",
    participants: 7,
    lastMessage: "경계선지능인 교육 자료 공유",
    unread: 0,
  },
]

const channelMessages: Record<string, Message[]> = {
  "1": [
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
  ],
  "2": [
    {
      id: "1",
      sender: "김태희",
      role: "상담교사",
      content: "박서연 학생의 IEP 회의 일정을 다음 주 화요일 오후 2시로 잡았습니다. 참석 가능하신가요?",
      timestamp: "오전 11:00",
    },
    {
      id: "2",
      sender: "이지은",
      role: "담임교사",
      content: "네, 참석 가능합니다. 회의 전에 준비할 자료가 있을까요?",
      timestamp: "오전 11:30",
    },
    {
      id: "3",
      sender: "김태희",
      role: "상담교사",
      content: "최근 학습 진도 상황과 정서적 변화에 대한 관찰 내용을 간단히 정리해주시면 좋겠습니다.",
      timestamp: "오후 1:15",
    },
  ],
  "3": [
    {
      id: "1",
      sender: "박수진",
      role: "특수교사",
      content: "이준호 학생의 긍정적 행동 지원 계획서를 업로드했습니다. 검토 부탁드립니다.",
      timestamp: "오전 10:00",
      attachments: [{ name: "PBS_계획서_이준호.pdf", type: "pdf" }],
    },
    {
      id: "2",
      sender: "최민호",
      role: "학교사회복지사",
      content: "계획서 잘 받았습니다. 가정과의 연계 부분을 조금 더 구체화하면 좋을 것 같습니다.",
      timestamp: "오후 2:30",
    },
  ],
  "4": [
    {
      id: "1",
      sender: "이지은",
      role: "담임교사",
      content: "최지우 학생의 학습 자료 검토 완료했습니다. 난이도가 적절한 것 같아요.",
      timestamp: "오후 3:00",
    },
  ],
  "5": [
    {
      id: "1",
      sender: "김태희",
      role: "상담교사",
      content: "정수아 학생 상담 일정을 조율하고 싶습니다. 이번 주 금요일 오후는 어떠신가요?",
      timestamp: "오전 9:00",
    },
    {
      id: "2",
      sender: "이지은",
      role: "담임교사",
      content: "금요일 오후 3시 이후면 가능합니다.",
      timestamp: "오전 9:45",
    },
  ],
  "6": [
    {
      id: "1",
      sender: "박수진",
      role: "특수교사",
      content: "김민주 학생의 IEP 회의 자료를 준비 중입니다. 다음 주 월요일까지 완료 예정입니다.",
      timestamp: "오후 4:00",
    },
    {
      id: "2",
      sender: "김태희",
      role: "상담교사",
      content: "감사합니다. 정서 발달 부분도 함께 포함해주시면 좋겠습니다.",
      timestamp: "오후 4:30",
    },
  ],
  "7": [
    {
      id: "1",
      sender: "이지은",
      role: "담임교사",
      content: "김민지 학생의 학습 진도를 점검하고 싶습니다. 최근 국어 과목에서 어려움을 겪고 있는 것 같아요.",
      timestamp: "오전 10:00",
    },
    {
      id: "2",
      sender: "박수진",
      role: "특수교사",
      content:
        "네, 확인했습니다. 읽기 이해 부분에 집중적인 지원이 필요할 것 같습니다. 개별 학습 자료를 준비해보겠습니다.",
      timestamp: "오전 11:30",
    },
  ],
  s1: [
    {
      id: "1",
      sender: "김태희",
      role: "사회복지사",
      content:
        "다음 주 가정 방문 일정을 공유드립니다. 월요일 오전 10시 김민준 학생 가정, 화요일 오후 2시 박서연 학생 가정입니다.",
      timestamp: "오전 11:00",
    },
    {
      id: "2",
      sender: "이지은",
      role: "담임교사",
      content: "일정 확인했습니다. 학부모님께 미리 연락드리겠습니다.",
      timestamp: "오후 1:00",
    },
  ],
  s2: [
    {
      id: "1",
      sender: "이민정",
      role: "상담사",
      content: "정서 지원 프로그램 안내드립니다. 매주 수요일 오후 2시에 진행되며, 소그룹 활동으로 운영됩니다.",
      timestamp: "오전 10:30",
    },
    {
      id: "2",
      sender: "박수진",
      role: "특수교사",
      content: "프로그램 내용이 좋네요. 이준호, 정수아 학생이 참여하면 도움이 될 것 같습니다.",
      timestamp: "오후 2:00",
    },
  ],
  s3: [
    {
      id: "1",
      sender: "박수진",
      role: "평생교육원 강사",
      content: "경계선지능인을 위한 최신 교육 자료를 공유드립니다. 실생활 중심의 학습 활동이 많이 포함되어 있습니다.",
      timestamp: "오전 9:00",
      attachments: [{ name: "경계선지능_교육자료_2024.pdf", type: "pdf" }],
    },
  ],
}

export function CollaborationChannel() {
  const [selectedChannel, setSelectedChannel] = useState(studentChannels[0])
  const [messageInput, setMessageInput] = useState("")
  const [readChannels, setReadChannels] = useState<Set<string>>(new Set([studentChannels[0].id]))
  const [channelType, setChannelType] = useState<"students" | "specialists">("students")
  const [showRightSidebar, setShowRightSidebar] = useState(true)

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel)
    setReadChannels((prev) => new Set(prev).add(channel.id))
  }

  const displayChannels = channelType === "students" ? studentChannels : specialistChannels
  const currentMessages = channelMessages[selectedChannel.id] || []

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

            <Tabs value={channelType} onValueChange={(v) => setChannelType(v as "students" | "specialists")}>
              <TabsList className="mb-3 w-full">
                <TabsTrigger value="students" className="flex-1">
                  지원 학생
                </TabsTrigger>
                <TabsTrigger value="specialists" className="flex-1">
                  전문가
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="채널 검색..." className="pl-9" />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-1 p-2">
              {displayChannels.map((channel) => (
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
                      <span className="font-medium">{channel.studentName}</span>
                    </div>
                    {channel.unread > 0 && !readChannels.has(channel.id) && (
                      <Badge variant="default" className="h-5 min-w-5 px-1 text-xs">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
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
              <h3 className="font-semibold">{selectedChannel.studentName}</h3>
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
              <Button variant="outline" size="sm" onClick={() => setShowRightSidebar(!showRightSidebar)}>
                {showRightSidebar ? <ChevronLeft className="h-4 w-4" /> : <Users className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentMessages.map((message) => (
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
        {showRightSidebar && (
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
        )}
      </main>
    </div>
  )
}
