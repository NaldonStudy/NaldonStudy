'use client'

import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  containerClassName?: string
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, children, className, containerClassName }, ref) => (
    <section id={id} ref={ref} className={cn("py-24 px-4", className)}>
      <div className={cn("container mx-auto max-w-6xl", containerClassName)}>
        {children}
      </div>
    </section>
  )
)

SectionWrapper.displayName = "SectionWrapper"
