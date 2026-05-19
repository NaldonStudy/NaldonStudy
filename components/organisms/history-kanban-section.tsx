'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog'
import { Layers, CheckCircle2, Calendar, Tag, Info } from 'lucide-react'

import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'

interface HistoryCard {
  id: string
  type: 'Story' | 'Task'
  title: string
  subtitle: string
  content?: string
  details?: string[]
  tags?: string[]
  status: 'Done' | 'In Progress' | 'To Do'
  period: string
  logo?: string
}

interface HistoryColumn {
  epic: string
  period: string
  cards: HistoryCard[]
}

const historyData: HistoryColumn[] = [
  {
    epic: 'Core Engineering',
    period: '2019.03 ~ 2024.12',
    cards: [
      {
        id: 'DH-101',
        type: 'Story',
        title: '고려대학교 세종캠퍼스',
        subtitle: '전자및정보공학과 (2019.03 ~ 2025.02)',
        logo: '/assets/history/korea-univ-1-removebg.png',
        content: '전자공학 및 컴퓨터 공학 전공을 통해 하드웨어와 소프트웨어의 통합적 엔지니어링 기반 구축',
        details: [
          '전공 평점: 4.5/4.5 (우수한 학업 성취도)',
          '디지털 논리 회로 및 임베디드 시스템 설계 역량 확보',
          'C, Python, Java 등 다양한 프로그래밍 언어 및 알고리즘 학습'
        ],
        tags: ['CS기초', '전자정보공학', 'Academic'],
        status: 'Done',
        period: '2019.03 ~ 2025.02'
      },
      {
        id: 'DH-102',
        type: 'Task',
        title: '유나이티드 (United) 학회원',
        subtitle: '교내 메타버스 학회 (2023.03 ~ 2024.02)',
        content: '교내 메타버스 학회 활동을 통한 협업 및 신기술 연구 역량 강화',
        details: [
          'VR/AR 및 메타버스 환경 구축 프로젝트 참여',
          '팀 프로젝트를 통한 Git-flow 협업 프로세스 숙달',
          '학회 내 기술 세미나 진행 및 지식 공유'
        ],
        tags: ['Metaverse', 'Collaboration', 'GitFlow'],
        status: 'Done',
        period: '2023.03 ~ 2024.02'
      },
      {
        id: 'DH-103',
        type: 'Task',
        title: '고려대학교 AIVS 연구실 학부연구생',
        subtitle: '인공지능 비전시스템 연구실 (2024.01 ~ 2024.08)',
        logo: '/assets/history/korea-univ-1-removebg.png',
        tags: ['AI', 'ComputerVision', 'Python'],
        content: '인공지능 및 컴퓨터 비전 시스템 연구 실무 경험',
        details: [
          '이미지 처리 및 객체 인식 모델 학습 파이프라인 구축',
          '최신 AI 논문 리뷰 및 연구실 정기 세미나 참여',
          '연구실 내부 프로젝트 관리 및 기술 지원'
        ],
        status: 'Done',
        period: '2024.01 ~ 2024.08'
      },
      {
        id: 'DH-104',
        type: 'Task',
        title: '4IR EDU 인턴',
        subtitle: '대학교 현장실습 (2024.09 ~ 2024.12)',
        content: '4차 산업혁명 교육 전문 기업에서의 실무 프로세스 경험',
        details: [
          '실무 개발 환경에서의 협업 툴(Jira, Confluence) 활용 능력 확보',
          '교육용 IT 콘텐츠 개발 보조 및 기술 지원',
          '비즈니스 커뮤니케이션 및 팀 협업 역량 강화'
        ],
        status: 'Done',
        period: '2024.09 ~ 2024.12'
      },
    ],
  },
  {
    epic: 'Advanced Architecture',
    period: '2025.01 ~ 2025.12',
    cards: [
      {
        id: 'DH-201',
        type: 'Story',
        title: '삼성청년 SW-AI 아카데미 13기 \nJAVA트랙 수료',
        subtitle: '우수 수료 (2025.01 ~ 2025.12)',
        logo: '/assets/history/ssafy-blue.jpg',
        content: '백엔드 및 인프라 심화 역량을 갖춘 개발자로 성장.',
        details: [
          '공통/특화 프로젝트 팀장 및 백엔드 파트장 역임',
          'SSAFY 공통 프로젝트 및 특화 프로젝트 연속 우수상 수상',
          'Docker, AWS 기반의 CI/CD 파이프라인 구축 및 운영',
          'Java/SpringBoot 기반 고성능 서버 아키텍처 설계'
        ],
        tags: ['Java', 'SpringBoot', 'MySQL', 'Docker', 'AWS'],
        status: 'Done',
        period: '2025.01 ~ 2025.12'
      },
    ],
  },
  {
    epic: 'Mentoring & Scale-out',
    period: '2026.01 ~ Present',
    cards: [
      {
        id: 'DH-301',
        type: 'Story',
        title: '삼성청년 SW-AI 아카데미 14기 \n실습코치',
        subtitle: 'SW Practice Coach (2026.01 ~ 현재)',
        logo: '/assets/history/ssafy-blue.jpg',
        content: '교육생 대상 프로젝트 아키텍처 설계 멘토링 및 코드 리뷰 진행.',
        details: [
          '교육생들의 기술적 문제 해결(Troubleshooting) 지원 및 가이드',
          '코드 퀄리티 향상을 위한 코드 리뷰 및 기술 멘토링 수행',
          '프로젝트 관리 노하우 및 협업 프로세스 전파',
          '실습 과제 설계 보조 및 기술적 가이드라인 제공'
        ],
        tags: ['Mentoring', 'CodeReview', 'Leadership', 'Architecture'],
        status: 'In Progress',
        period: '2026.01 ~ Present'
      },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Done':
      return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
    case 'In Progress':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    default:
      return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
  }
}

const getTypeIcon = (type: 'Story' | 'Task') => {
  if (type === 'Story') return <Layers className="w-3 h-3 text-green-500" />
  return <CheckCircle2 className="w-3 h-3 text-blue-400" />
}

const KanbanCard = memo(({ card, onClick }: { card: HistoryCard; onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className={`border-border/60 shadow-sm hover:shadow-md transition-all bg-card/95 relative overflow-hidden ${card.type === 'Story' ? 'border-l-4 border-l-green-500' : ''}`}>
        <div className={`absolute top-0 right-0 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border-l border-b rounded-bl-md ${getStatusColor(card.status)}`}>
          {card.status}
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {getTypeIcon(card.type)}
                <span className="text-[10px] font-mono text-muted-foreground">{card.id}</span>
              </div>
              <CardTitle className={`font-bold text-foreground leading-tight whitespace-pre-line ${card.type === 'Story' ? 'text-base' : 'text-sm'}`}>
                {card.title}
              </CardTitle>
            </div>
            {card.logo && (
              <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-white p-1 border border-border/50 flex items-center justify-center">
                <Image 
                  src={card.logo} 
                  alt={card.title} 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>
          <CardDescription className="text-[11px] text-primary/80 font-medium">
            {card.subtitle}
          </CardDescription>
        </CardHeader>
        {card.content && (
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal line-clamp-2">
              {card.content}
            </p>
          </CardContent>
        )}
        {card.tags && card.tags.length > 0 && (
          <div className="px-4 pb-4 flex flex-wrap gap-1.5">
            {card.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] bg-primary/10 text-primary border-primary/20"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  )
})

KanbanCard.displayName = 'KanbanCard'

export function HistoryKanbanSection() {
  const [selectedCard, setSelectedCard] = useState<HistoryCard | null>(null)

  return (
    <SectionWrapper id="history" className="bg-background">
      <SectionHeader title="History">
        <div className="flex items-center justify-center gap-4 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-green-500" /> Story (Main Event)</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-400" /> Task (Activity)</span>
        </div>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {historyData.map((column, colIndex) => (
            <motion.div
              key={column.epic}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: colIndex * 0.1 }}
              className="flex flex-col gap-4 bg-secondary/20 rounded-xl p-6 border border-border/50 h-full"
            >
              <div className="px-2 py-1 mb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Epic</span>
                    <h3 className="font-bold text-foreground text-xl leading-tight">{column.epic}</h3>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono h-5">
                    {column.cards.length} ISSUES
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">{column.period}</p>
              </div>

              <div className="flex flex-col gap-4">
                {column.cards.map((card) => (
                  <KanbanCard 
                    key={card.id} 
                    card={card} 
                    onClick={() => setSelectedCard(card)} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-card/95 backdrop-blur-md">
          {selectedCard && (
            <div className="flex flex-col">
              <div className={`h-1.5 w-full ${selectedCard.type === 'Story' ? 'bg-green-500' : 'bg-blue-400'}`} />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedCard.type)}
                    <span className="text-xs font-mono text-muted-foreground">{selectedCard.id}</span>
                  </div>
                  <Badge className={`${getStatusColor(selectedCard.status)} border-none text-[10px] px-2 py-0`}>
                    {selectedCard.status}
                  </Badge>
                </div>

                <div className="flex items-start justify-between gap-6 mb-6">
                  <DialogHeader className="flex-1">
                    <DialogTitle className="text-xl font-bold text-foreground mb-1 whitespace-pre-line">
                      {selectedCard.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-primary font-medium">
                      {selectedCard.subtitle}
                    </DialogDescription>
                  </DialogHeader>
                  {selectedCard.logo && (
                    <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white p-2 border border-border shadow-sm flex items-center justify-center">
                      <Image 
                        src={selectedCard.logo} 
                        alt={selectedCard.title} 
                        width={64} 
                        height={64} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider">
                      <Info className="w-3 h-3" /> Description
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal">
                      {selectedCard.content}
                    </p>
                  </div>

                  {selectedCard.details && selectedCard.details.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" /> Key Activities
                      </div>
                      <ul className="space-y-2">
                        {selectedCard.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/70 uppercase tracking-wider">
                        <Calendar className="w-3 h-3" /> Period
                      </div>
                      <p className="text-xs font-mono text-muted-foreground">{selectedCard.period}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/70 uppercase tracking-wider">
                        <Tag className="w-3 h-3" /> Labels
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCard.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-secondary/20 border-t border-border/50 flex justify-end">
                <button 
                  onClick={() => setSelectedCard(null)}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Close Ticket
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  )
}
