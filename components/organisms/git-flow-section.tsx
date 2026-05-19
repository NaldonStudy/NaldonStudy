'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { X } from 'lucide-react'

import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'

interface HistoryItem {
  id: string
  date: string
  title: string
  description: string
  type: 'main' | 'branch' | 'merge'
  details?: string[]
}

const historyData: HistoryItem[] = [
  {
    id: 'univ-entry',
    date: '2019.03',
    title: '고려대학교 세종캠퍼스 전자정보공학과 입학',
    description: '전자공학 전공을 통해 하드웨어와 소프트웨어의 기초를 다지기 시작했습니다.',
    type: 'main',
    details: [
      'C, Python 프로그래밍 언어 습득',
      '수학적 논리 사고 및 기초 공학 지식 학습',
      '회로 이론 및 디지털 논리 설계 이수',
    ],
  },
  {
    id: 'metaverse',
    date: '2023.03',
    title: '메타버스 학회 (유나이티드)',
    description: '교내 메타버스 학회 활동을 통한 협업 및 신기술 연구 역량 강화',
    type: 'branch',
    details: [
      'Unity 기반 메타버스 환경 구축 프로젝트 수행',
      'Blender를 활용한 3D 모델링 및 최적화',
      '사용자 경험(UX) 중심의 가상 환경 설계 학습',
    ],
  },
  {
    id: 'ai-lab',
    date: '2024.01',
    title: 'AI 비전시스템 연구실 학부연구생',
    description: '컴퓨터 비전과 인공지능 기술의 실무 적용을 탐구했습니다.',
    type: 'branch',
    details: [
      'OpenCV를 이용한 실시간 객체 인식 모델 개발',
      '딥러닝 프레임워크(TensorFlow/PyTorch) 활용 능력 배양',
      '이미지 처리 알고리즘 최적화 연구 참여',
    ],
  },
  {
    id: 'graduation',
    date: '2025.02',
    title: '고려대학교 세종캠퍼스 졸업',
    description: '4년간의 학업을 마무리하고 전자공학 학사 학위를 취득했습니다.',
    type: 'main',
    details: [
      '전자공학 전공 성적 우수 졸업 (평점 4.5/4.5)',
      '졸업 프로젝트: 임베디드 시스템 제어 구현',
    ],
  },
  {
    id: 'ssafy-13',
    date: '2025.01',
    title: '삼성 청년 SW 아카데미(SSAFY) 13기 교육생',
    description: '백엔드 및 인프라 심화 역량을 갖춘 개발자로 성장하기 위한 집중 교육 과정을 이수했습니다.',
    type: 'main',
    details: [
      'Java/Spring Boot 기반 백엔드 아키텍처 학습',
      'React/Next.js 기반 프론트엔드 개발 역량 확보',
      '대규모 팀 프로젝트를 통한 실무 협업 프로세스 경험',
    ],
  },
  {
    id: 'ssafy-14-coach',
    date: '2026.01',
    title: 'SSAFY 14기 실습코치',
    description: '교육생에서 코치로 성장하여, 후배 교육생들의 기술적 성장을 지원하고 있습니다.',
    type: 'main',
    details: [
      '후배 교육생들의 코드 리뷰 및 기술 멘토링 수행',
      '실습 과제 설계 보조 및 기술적 문제 해결 가이드',
      '협업 도구 활용 및 프로젝트 관리 노하우 공유',
    ],
  },
  {
    id: 'present',
    date: 'Present',
    title: '현재',
    description: '지속적인 학습과 도전을 이어가고 있습니다.',
    type: 'main',
    details: ['노래로 답해줘 프로젝트 고도화 및 운영', '클라우드 인프라 보안 및 성능 최적화'],
  },
]

export function GitFlowSection() {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const [hoveredItem, setHoveredItem] = useState<HistoryItem | null>(null)
  const [visibleNodes, setVisibleNodes] = useState<string[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      historyData.forEach((item, index) => {
        setTimeout(() => {
          setVisibleNodes((prev) => [...prev, item.id])
        }, index * 300)
      })
    }
  }, [isInView])

  const displayedItem = selectedItem || hoveredItem

  // Configuration for the graph layout
  const NODE_HEIGHT = 80
  const MAIN_X = 24
  const BRANCH_X = 64

  return (
    <SectionWrapper id="history" ref={sectionRef} className="bg-secondary/30 overflow-hidden">
      <SectionHeader title="History" subtitle="git log --graph --all" />

      <div className="flex flex-col md:flex-row gap-12 items-start relative min-h-[600px]">
          {/* Left Side: Git Graph Area */}
          <div className="relative flex-shrink-0 w-full md:w-[400px] lg:w-[500px]">
            {/* SVG Connector Layer */}
            <svg 
              className="absolute left-0 top-0 w-full h-full pointer-events-none"
              style={{ minHeight: historyData.length * NODE_HEIGHT }}
            >
              {/* Main Line (Full length) */}
              <line 
                x1={MAIN_X} y1={0} x2={MAIN_X} y2="100%" 
                stroke="var(--color-git-main)" strokeWidth="2" 
                className="opacity-20"
              />

              {historyData.map((item, i) => {
                if (i === historyData.length - 1) return null
                const nextItem = historyData[i + 1]
                const currentY = i * NODE_HEIGHT + 40
                const nextY = (i + 1) * NODE_HEIGHT + 40

                // Case: Main to Branch (Branch Out)
                if (item.type === 'main' && nextItem.type === 'branch') {
                  return (
                    <path 
                      key={`path-${i}`}
                      d={`M ${MAIN_X} ${currentY} C ${MAIN_X} ${currentY + 30}, ${BRANCH_X} ${nextY - 30}, ${BRANCH_X} ${nextY}`}
                      fill="none" stroke="var(--color-git-branch)" strokeWidth="2"
                      className={`transition-opacity duration-500 ${visibleNodes.includes(nextItem.id) ? 'opacity-60' : 'opacity-0'}`}
                    />
                  )
                }

                // Case: Branch to Branch (Keep on branch line)
                if (item.type === 'branch' && nextItem.type === 'branch') {
                  return (
                    <line 
                      key={`path-${i}`}
                      x1={BRANCH_X} y1={currentY} x2={BRANCH_X} y2={nextY}
                      stroke="var(--color-git-branch)" strokeWidth="2"
                      className={`transition-opacity duration-500 ${visibleNodes.includes(nextItem.id) ? 'opacity-60' : 'opacity-0'}`}
                    />
                  )
                }

                // Case: Branch to Merge (Merge back to main)
                if (item.type === 'branch' && nextItem.type === 'merge') {
                  return (
                    <path 
                      key={`path-${i}`}
                      d={`M ${BRANCH_X} ${currentY} C ${BRANCH_X} ${currentY + 30}, ${MAIN_X} ${nextY - 30}, ${MAIN_X} ${nextY}`}
                      fill="none" stroke="var(--color-git-merge)" strokeWidth="2"
                      className={`transition-opacity duration-500 ${visibleNodes.includes(nextItem.id) ? 'opacity-60' : 'opacity-0'}`}
                    />
                  )
                }

                // Case: Main to Main or Merge to Main (Stay on main line)
                if ((item.type === 'main' || item.type === 'merge') && nextItem.type === 'main') {
                  return (
                    <line 
                      key={`path-${i}`}
                      x1={MAIN_X} y1={currentY} x2={MAIN_X} y2={nextY}
                      stroke="var(--color-git-main)" strokeWidth="2"
                      className={`transition-opacity duration-500 ${visibleNodes.includes(nextItem.id) ? 'opacity-60' : 'opacity-0'}`}
                    />
                  )
                }

                // Default connection for other cases
                return (
                  <line 
                    key={`path-${i}`}
                    x1={item.type === 'branch' ? BRANCH_X : MAIN_X} 
                    y1={currentY} 
                    x2={nextItem.type === 'branch' ? BRANCH_X : MAIN_X} 
                    y2={nextY}
                    stroke="currentColor" strokeWidth="2"
                    className={`text-border/40 transition-opacity duration-500 ${visibleNodes.includes(nextItem.id) ? 'opacity-40' : 'opacity-0'}`}
                  />
                )
              })}
            </svg>

            {/* Nodes and Labels */}
            <div className="relative">
              {historyData.map((item, index) => {
                const isSelected = selectedItem?.id === item.id
                const isHovered = hoveredItem?.id === item.id
                
                return (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-6"
                    style={{ height: NODE_HEIGHT }}
                  >
                    <div className="relative flex-shrink-0 w-20 flex justify-center">
                      <GitNode
                        item={item}
                        isVisible={visibleNodes.includes(item.id)}
                        isSelected={isSelected}
                        isHovered={isHovered}
                        onHover={() => setHoveredItem(item)}
                        onLeave={() => setHoveredItem(null)}
                        onClick={() => setSelectedItem(isSelected ? null : item)}
                        offsetX={item.type === 'branch' ? BRANCH_X - MAIN_X : 0}
                      />
                    </div>
                    
                    <div 
                      className={`flex-1 cursor-pointer transition-all duration-300 ${
                        isSelected || isHovered ? 'translate-x-2' : ''
                      }`}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => setSelectedItem(isSelected ? null : item)}
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-muted-foreground leading-none mb-1">
                          {item.date}
                        </span>
                        <h4 className={`font-bold text-sm md:text-base transition-colors whitespace-pre-line ${
                          isSelected || isHovered ? 'text-primary' : 'text-foreground/80'
                        }`}>
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Side: Detail Panel */}
          <div className="flex-1 w-full md:sticky md:top-32 self-start min-h-[300px]">
            {displayedItem ? (
              <motion.div
                key={displayedItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-card border border-border rounded-xl p-8 shadow-xl relative"
              >
                {selectedItem && (
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2 py-1 bg-secondary rounded text-primary">
                      {displayedItem.date}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      displayedItem.type === 'main' ? 'text-git-main' : 
                      displayedItem.type === 'branch' ? 'text-git-branch' : 'text-git-merge'
                    }`}>
                      {displayedItem.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 whitespace-pre-line">
                      {displayedItem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {displayedItem.description}
                    </p>
                  </div>

                  {displayedItem.details && (
                    <div className="pt-4 border-t border-border/50">
                      <ul className="space-y-3">
                        {displayedItem.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-border/30 rounded-xl p-12">
                <p className="text-muted-foreground font-mono text-sm text-center">
                  Select a node to view details
                </p>
              </div>
            )}
          </div>
        </div>
    </SectionWrapper>
  )
}

function GitNode({
  item,
  isVisible,
  isSelected,
  isHovered,
  onHover,
  onLeave,
  onClick,
  offsetX = 0,
}: {
  item: HistoryItem
  isVisible: boolean
  isSelected: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  offsetX?: number
}) {
  const getNodeColor = () => {
    switch (item.type) {
      case 'main': return 'bg-git-main border-git-main'
      case 'branch': return 'bg-git-branch border-git-branch'
      case 'merge': return 'bg-git-merge border-git-merge'
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        x: offsetX,
      }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 ${getNodeColor()} ${
        isSelected || isHovered ? 'ring-4 ring-primary/20 scale-125' : ''
      }`}
    />
  )
}
