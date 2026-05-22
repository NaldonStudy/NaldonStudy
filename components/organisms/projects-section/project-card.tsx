'use client'

import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Users, 
  ChevronRight,
  Github,
  ExternalLink,
  Trophy
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { withBasePath } from '@/lib/utils'
import { Project } from './projects-data'
import { useI18n } from '@/hooks/use-i18n'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export const ProjectCard = memo(({
  project,
  index,
  onClick,
}: ProjectCardProps) => {
  const { dict } = useI18n()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group h-full cursor-pointer border-border/50 bg-card/90 shadow-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
        onClick={onClick}
      >
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
          {project.thumbnail ? (
            <Image
              src={withBasePath(project.thumbnail)}
              alt={project.title}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform transform-gpu"
              style={{ objectPosition: project.thumbnailPosition || 'center' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          {project.role && (
            <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground">
              {project.role}
            </Badge>
          )}
        </div>

        <CardContent className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors whitespace-pre-line break-keep">
            {project.title}
          </h3>
          {project.award && (
            <div className="flex items-center gap-1.5 mb-3 text-primary/80">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-semibold">{project.award}</span>
            </div>
          )}
          <p className="text-sm text-muted-foreground mb-4 break-keep">
            {project.shortDescription}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.period}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {project.teamSize}{dict.projects.teamSize}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              {dict.projects.viewDetail}
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})
ProjectCard.displayName = 'ProjectCard'
