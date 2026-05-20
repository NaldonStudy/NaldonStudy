'use client'

import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Layers, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { withBasePath } from '@/lib/utils'
import { HistoryCard as HistoryCardType } from './history-data'

interface HistoryCardProps {
  card: HistoryCardType
  onClick: () => void
}

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

export const HistoryCard = memo(({ card, onClick }: HistoryCardProps) => {
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
                  src={withBasePath(card.logo)} 
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

HistoryCard.displayName = 'HistoryCard'
