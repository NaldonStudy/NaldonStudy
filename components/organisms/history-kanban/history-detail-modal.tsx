'use client'

import Image from 'next/image'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Layers, CheckCircle2, Info, Calendar, Tag } from 'lucide-react'
import { withBasePath } from '@/lib/utils'
import { HistoryCard as HistoryCardType } from './history-data'

interface HistoryDetailModalProps {
  card: HistoryCardType | null
  isOpen: boolean
  onClose: () => void
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

export function HistoryDetailModal({
  card,
  isOpen,
  onClose,
}: HistoryDetailModalProps) {
  if (!card) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-card/95 backdrop-blur-md">
        <div className="flex flex-col">
          <div className={`h-1.5 w-full ${card.type === 'Story' ? 'bg-green-500' : 'bg-blue-400'}`} />
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getTypeIcon(card.type)}
                <span className="text-xs font-mono text-muted-foreground">{card.id}</span>
              </div>
              <Badge className={`${getStatusColor(card.status)} border-none text-[10px] px-2 py-0`}>
                {card.status}
              </Badge>
            </div>

            <div className="flex items-start justify-between gap-6 mb-6">
              <DialogHeader className="flex-1">
                <DialogTitle className="text-xl font-bold text-foreground mb-1 whitespace-pre-line">
                  {card.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-primary font-medium">
                  {card.subtitle}
                </DialogDescription>
              </DialogHeader>
              {card.logo && (
                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white p-2 border border-border shadow-sm flex items-center justify-center">
                  <Image 
                    src={withBasePath(card.logo)} 
                    alt={card.title} 
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
                  {card.content}
                </p>
              </div>

              {card.details && card.details.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" /> Key Activities
                  </div>
                  <ul className="space-y-2">
                    {card.details.map((detail, i) => (
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
                  <p className="text-xs font-mono text-muted-foreground">{card.period}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/70 uppercase tracking-wider">
                    <Tag className="w-3 h-3" /> Labels
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags?.map((tag) => (
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
              onClick={onClose}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Close Ticket
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
