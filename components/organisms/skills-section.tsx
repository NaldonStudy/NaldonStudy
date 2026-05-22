'use client'

import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { withBasePath } from '@/lib/utils'
import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'
import { useI18n } from '@/hooks/use-i18n'

interface Skill {
  name: string
  level: number
  description: string
  icon?: string
}

const BatteryIndicator = memo(({ level, size = 'md' }: { level: number; size?: 'sm' | 'md' }) => {
  const getColor = () => {
    switch (level) {
      case 3:
        return 'bg-battery-full'
      case 2:
        return 'bg-battery-mid'
      case 1:
        return 'bg-battery-low'
    }
  }

  const dimensions = size === 'sm' ? 'w-8 h-4' : 'w-10 h-5'
  const barDimensions = size === 'sm' ? 'w-1.5 h-2' : 'w-2 h-3'
  const tipDimensions = size === 'sm' ? 'w-0.5 h-1.5' : 'w-1 h-2'

  return (
    <div className="flex items-center gap-1">
      <div
        className={`${dimensions} border-2 border-muted-foreground/30 rounded flex items-center justify-start gap-0.5 p-0.5`}
      >
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={`${barDimensions} rounded-sm transition-all duration-300 ${
              bar <= level ? getColor() : 'bg-muted-foreground/10'
            }`}
          />
        ))}
      </div>
      <div className={`${tipDimensions} bg-muted-foreground/30 rounded-r`} />
    </div>
  )
})
BatteryIndicator.displayName = 'BatteryIndicator'

const SkillItem = memo(({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group p-5 hover:bg-secondary/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {skill.icon && (
            <div className="w-8 h-8 flex items-center justify-center p-1 rounded-md bg-background border border-border group-hover:border-primary/50 transition-colors">
              <Image 
                src={withBasePath(skill.icon)} 
                alt={skill.name} 
                width={32} 
                height={32} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          <span className="font-bold text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
        </div>
        <BatteryIndicator level={skill.level} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed pl-11 break-keep">
        {skill.description}
      </p>
    </motion.div>
  )
})
SkillItem.displayName = 'SkillItem'

export function SkillsSection() {
  const { dict } = useI18n()
  const batteryLevelDescriptions = dict.skills.levels
  const skillsData = dict.skills.categories

  return (
    <SectionWrapper id="skills">
      <SectionHeader title={dict.skills.title} subtitle={dict.skills.subtitle}>
        <div className="inline-flex flex-col md:flex-row gap-4 md:gap-8 p-4 rounded-xl bg-secondary/50">
          {([3, 2, 1] as const).map((level) => (
            <div key={level} className="flex items-center gap-3">
              <BatteryIndicator level={level} size="sm" />
              <span className="text-sm text-muted-foreground">{batteryLevelDescriptions[level]}</span>
            </div>
          ))}
        </div>
      </SectionHeader>

      <div className="grid md:grid-cols-2 gap-6">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/90 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-secondary/10">
                  <CardTitle className="text-xl text-foreground">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillItem key={skill.name} skill={skill} index={skillIndex} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
    </SectionWrapper>
  )
}
