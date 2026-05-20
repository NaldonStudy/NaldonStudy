'use client'

import { memo } from 'react'
import { Code2, ListChecks } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Project } from '../projects-data'

export const TechnicalTab = memo(({ project }: { project: Project }) => {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          사용 기술 스택
        </h3>
        <div className="flex flex-wrap gap-2 p-5 rounded-xl bg-secondary/30 border border-border/50">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm bg-background border border-border/50">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" />
          주요 구현 기능
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {project.details.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card hover:bg-secondary/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
})
TechnicalTab.displayName = 'TechnicalTab'
