'use client'

import { useState } from 'react'
import { Navigation } from '@/components/organisms/navigation'
import { HeroSection } from '@/components/organisms/hero-section'
import { AboutSection } from '@/components/organisms/about-section'
import { HistoryKanbanSection } from '@/components/organisms/history-kanban-section'
import { SkillsSection } from '@/components/organisms/skills-section'
import { ProjectsSection } from '@/components/organisms/projects-section'
import { GallerySection } from '@/components/organisms/gallery-section'
import { ContactSection } from '@/components/organisms/contact-section'
import { Footer } from '@/components/organisms/footer'
import { IdeLoadingScreen } from '@/components/organisms/ide-loading-screen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <IdeLoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="min-h-screen overflow-x-hidden scroll-smooth">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <HistoryKanbanSection />
      <SkillsSection />
      <ProjectsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
