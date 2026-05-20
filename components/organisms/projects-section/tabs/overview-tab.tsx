'use client'

import { memo } from 'react'
import { 
  MessageSquare, 
  Target, 
  Users, 
  CheckCircle2 
} from 'lucide-react'
import { Project } from '../projects-data'

export const OverviewTab = memo(({ project }: { project: Project }) => {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          프로젝트 소개
        </h3>
        <div className="p-5 rounded-xl bg-secondary/30 border border-border/50 text-muted-foreground leading-relaxed">
          {project.details.fullDescription}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            프로젝트 목표
          </h3>
          <ul className="space-y-3">
            {project.details.goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border/30 hover:border-accent/30 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            팀 구성
          </h3>
          <div className="flex-1 p-5 rounded-xl border border-border/30 flex items-center justify-center bg-secondary/10">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-1">{project.teamSize}명</p>
              <p className="text-sm text-muted-foreground">프로젝트 참여 인원</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
})
OverviewTab.displayName = 'OverviewTab'
