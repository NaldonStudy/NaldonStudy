'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  children?: React.ReactNode
}

export function SectionHeader({ title, subtitle, className, children }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("text-center mb-16", className)}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && <p className={cn("text-muted-foreground", children ? "mb-8" : "")}>{subtitle}</p>}
      {children}
    </motion.div>
  )
}
