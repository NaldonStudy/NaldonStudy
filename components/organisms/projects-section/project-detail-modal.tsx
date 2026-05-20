'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  X, 
  ExternalLink, 
  Github, 
  Trophy,
  ListChecks,
  Code2,
  Zap,
  ImageIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { withBasePath } from '@/lib/utils'
import { Project } from './projects-data'

import { OverviewTab } from './tabs/overview-tab'
import { TechnicalTab } from './tabs/technical-tab'
import { ProblemSolvingTab } from './tabs/problem-solving-tab'
import { GalleryTab } from './tabs/gallery-tab'

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-7xl w-full p-0 overflow-hidden border-border bg-card shadow-2xl rounded-2xl gap-0 max-h-[90vh] overflow-y-auto"
      >
        <DialogTitle className="sr-only">{project.title} 상세정보</DialogTitle>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors border border-border shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-48 md:h-56 bg-gradient-to-br from-primary/10 to-accent/10">
          {project.thumbnail ? (
            <Image
              src={withBasePath(project.thumbnail)}
              alt={project.title}
              fill
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-10">
              <span className="text-9xl font-bold">{project.title.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          <div className="absolute bottom-6 left-8 right-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
                {project.period}
              </Badge>
              {project.role && (
                <Badge className="bg-primary/90 hover:bg-primary">
                  {project.role}
                </Badge>
              )}
              {project.award && (
                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 text-primary gap-1.5 flex items-center">
                  <Trophy className="w-3.5 h-3.5" />
                  {project.award}
                </Badge>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight whitespace-pre-line">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${project.details.screenshots ? 'grid-cols-4' : 'grid-cols-3'} mb-8`}>
              <TabsTrigger value="overview" className="gap-2">
                <ListChecks className="w-4 h-4" />
                <span className="hidden sm:inline">개요</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="gap-2">
                <Code2 className="w-4 h-4" />
                <span className="hidden sm:inline">기술 & 기능</span>
              </TabsTrigger>
              <TabsTrigger value="problem-solving" className="gap-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">문제 해결 & 회고</span>
              </TabsTrigger>
              {project.details.screenshots && (
                <TabsTrigger value="gallery" className="gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">갤러리</span>
                </TabsTrigger>
              )}
            </TabsList>

            <div className="min-h-[400px]">
              <TabsContent value="overview">
                <OverviewTab project={project} />
              </TabsContent>
              <TabsContent value="technical">
                <TechnicalTab project={project} />
              </TabsContent>
              <TabsContent value="problem-solving">
                <ProblemSolvingTab project={project} />
              </TabsContent>
              {project.details.screenshots && (
                <TabsContent value="gallery">
                  <GalleryTab project={project} />
                </TabsContent>
              )}
            </div>
          </Tabs>

          {(project.links?.github || project.links?.demo || project.links?.video) && (
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
              {project.links.github && (
                <Button asChild variant="outline" size="lg" className="rounded-xl border-2 hover:bg-secondary">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub Repository
                  </a>
                </Button>
              )}
              {project.links?.demo && (
                <Button asChild size="lg" className="rounded-xl shadow-lg shadow-primary/20">
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
