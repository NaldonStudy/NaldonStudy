'use client'

import { memo } from 'react'
import { 
  MessageSquare, 
  Target, 
  Users, 
  CheckCircle2 
} from 'lucide-react'
import { Project } from '../projects-data'
import { useI18n } from '@/hooks/use-i18n'

export const OverviewTab = memo(({ project }: { project: Project }) => {
  const { dict } = useI18n()
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          {dict.projects.overview.intro}
        </h3>
        <div className="p-5 rounded-xl bg-secondary/30 border border-border/50 text-muted-foreground leading-relaxed">
          {project.details.fullDescription}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            {dict.projects.overview.goals}
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
            {dict.projects.overview.team}
          </h3>
          <div className="flex-1 p-5 rounded-xl border border-border/30 bg-secondary/10">
            {project.teamMembers ? (
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-primary">{project.teamSize}{dict.projects.teamSize}</p>
                  <p className="text-xs text-muted-foreground">{dict.projects.overview.teamSubtitle}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {project.teamMembers.map((member, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                        member.isMe 
                          ? 'bg-primary/10 border-primary shadow-sm ring-1 ring-primary/20' 
                          : 'bg-background/50 border-border/50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${member.isMe ? 'text-primary font-bold' : 'text-foreground'}`}>
                            {member.role}
                          </span>
                          {member.isMe && (
                            <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                              Me
                            </span>
                          )}
                        </div>
                        {member.description && (
                          <span className={`text-[10px] ${member.isMe ? 'text-primary/90 font-bold' : 'text-muted-foreground font-medium'}`}>
                            {member.description}
                          </span>
                        )}
                      </div>
                      <span className={`text-sm font-bold ${member.isMe ? 'text-primary' : 'text-muted-foreground'}`}>
                        {member.count}{dict.projects.teamSize}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-1">{project.teamSize}{dict.projects.teamSize}</p>
                  <p className="text-sm text-muted-foreground">{dict.projects.overview.teamSubtitle}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
})
OverviewTab.displayName = 'OverviewTab'
