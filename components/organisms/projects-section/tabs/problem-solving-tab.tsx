'use client'

import { memo } from 'react'
import { 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb 
} from 'lucide-react'
import { Project } from '../projects-data'
import { useI18n } from '@/hooks/use-i18n'

export const ProblemSolvingTab = memo(({ project }: { project: Project }) => {
  const { dict } = useI18n()

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          {dict.projects.problem.challenges}
        </h3>
        <div className="space-y-6">
          {project.details.challenges.map((challenge, i) => (
            <div key={i} className="group relative">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-primary/20 rounded-full group-hover:bg-primary transition-colors" />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-destructive/5 border border-destructive/10">
                  <div className="flex items-center gap-2 mb-2 text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">The Problem</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    {challenge.problem}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="flex items-center gap-2 mb-2 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">The Solution</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    {challenge.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          {dict.projects.problem.retrospective}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Zap className="w-12 h-12" />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-battery-mid" />
              {dict.projects.problem.improvements}
            </h4>
            <ul className="space-y-3">
              {project.details.retrospective.improvements.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-primary mt-1 text-xs">0{i+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-primary">
              <Lightbulb className="w-12 h-12" />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-battery-full" />
              {dict.projects.problem.lessons}
            </h4>
            <ul className="space-y-3">
              {project.details.retrospective.lessonsLearned.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-primary mt-1 text-xs">0{i+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
})
ProblemSolvingTab.displayName = 'ProblemSolvingTab'
