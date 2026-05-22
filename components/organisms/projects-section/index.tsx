'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'
import { ProjectCard } from './project-card'
import { getProjectsData, Project } from './projects-data'
import { Skeleton } from '@/components/ui/skeleton'
import { useI18n } from '@/hooks/use-i18n'

// 모달을 지연 로딩하여 초기 번들 크기 감소 및 오픈 시점 최적화
const ProjectDetailModal = dynamic(
  () => import('./project-detail-modal').then((mod) => mod.ProjectDetailModal),
  {
    loading: () => null, // 또는 간단한 스피너
    ssr: false
  }
)

export function ProjectsSection() {
  const { dict, lang } = useI18n()
  const projectsData = getProjectsData(lang)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <SectionWrapper id="projects" className="bg-secondary/30">
      <SectionHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionWrapper>
  )
}
