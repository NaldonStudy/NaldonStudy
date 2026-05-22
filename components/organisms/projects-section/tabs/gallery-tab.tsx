'use client'

import { memo } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { withBasePath } from '@/lib/utils'
import { Project } from '../projects-data'
import { useI18n } from '@/hooks/use-i18n'

export const GalleryTab = memo(({ project }: { project: Project }) => {
  const { dict } = useI18n()
  if (!project.details.screenshots) return null

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          {dict.projects.gallery.screenshots}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.details.screenshots.map((screenshot, i) => (
            <div key={i} className="group flex flex-col gap-3">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border bg-secondary/10">
                <Image
                  src={withBasePath(screenshot.src)}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  priority={i < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform transform-gpu"
                  style={{ objectPosition: 'top' }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" asChild>
                    <a href={withBasePath(screenshot.src)} target="_blank" rel="noopener noreferrer">{dict.projects.gallery.viewOriginal}</a>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground px-1 leading-relaxed">
                {screenshot.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
})
GalleryTab.displayName = 'GalleryTab'
