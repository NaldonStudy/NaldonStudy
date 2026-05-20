'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Layers, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'
import { historyData, HistoryCard as HistoryCardType } from './history-data'
import { HistoryCard } from './history-card'

// 상세 모달을 지연 로딩하여 초기 부하 분산
const HistoryDetailModal = dynamic(
  () => import('./history-detail-modal').then(mod => mod.HistoryDetailModal),
  { ssr: false }
)

export function HistoryKanbanSection() {
  const [selectedCard, setSelectedCard] = useState<HistoryCardType | null>(null)

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
                <HistoryCard 
                  key={card.id} 
                  card={card} 
                  onClick={() => setSelectedCard(card)} 
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <HistoryDetailModal 
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </SectionWrapper>
  )
}
