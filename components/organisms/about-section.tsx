'use client'

import { useState, useEffect, memo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, BookOpen, MapPin, Calendar, GraduationCap, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'
import { withBasePath } from '@/lib/utils'
import { useI18n } from '@/hooks/use-i18n'
import { siteConfig } from '@/config/site'

const InfoItem = memo(({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) => {
  const content = (
    <div className="flex items-center gap-4">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-words">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-secondary/50 -mx-2 px-2 py-2 rounded-lg transition-colors"
      >
        {content}
      </a>
    )
  }

  return <div className="py-2">{content}</div>
})
InfoItem.displayName = 'InfoItem'

export function AboutSection() {
  const { dict } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % siteConfig.profile.slider.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <SectionWrapper id="about" className="snap-start">
      <SectionHeader title={dict.about.title} subtitle={dict.about.subtitle} />

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Profile Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-primary/20 via-background to-accent/20 p-1">
                <div className="w-full h-full rounded-[1.4rem] bg-card overflow-hidden border border-border/50 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={withBasePath(siteConfig.profile.slider[currentImageIndex])}
                        alt={`${dict.about.profileAlt} ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        priority={currentImageIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Slider Progress Indicator */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {siteConfig.profile.slider.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? "bg-white w-4" 
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full -z-10 blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/5 rounded-full -z-10 blur-2xl" />
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="border-border/50 bg-card/95 shadow-sm overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-foreground">{dict.about.name}</h3>
                  <div className="flex gap-2">
                    {siteConfig.roles.map((role) => (
                      <Badge key={role} variant="outline" className="text-xs border-primary/20 text-primary">{role}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                  <InfoItem
                    icon={<Mail className="w-4 h-4" />}
                    label={dict.about.email}
                    value={siteConfig.email}
                    href={`mailto:${siteConfig.email}`}
                  />
                  <InfoItem
                    icon={<MapPin className="w-4 h-4" />}
                    label={dict.about.location}
                    value={dict.about.locationValue}
                  />
                  <InfoItem
                    icon={<GraduationCap className="w-4 h-4" />}
                    label={dict.about.education}
                    value={dict.about.educationValue}
                  />
                  <InfoItem
                    icon={<Calendar className="w-4 h-4" />}
                    label={dict.about.academic}
                    value={dict.about.academicValue}
                  />
                  <InfoItem
                    icon={<Github className="w-4 h-4" />}
                    label={dict.about.github}
                    value={siteConfig.links.github.replace('https://', '')}
                    href={siteConfig.links.github}
                  />
                  <InfoItem
                    icon={<Linkedin className="w-4 h-4" />}
                    label={dict.about.linkedin}
                    value={siteConfig.englishName}
                    href={siteConfig.links.linkedin}
                  />
                  <InfoItem
                    icon={<BookOpen className="w-4 h-4" />}
                    label={dict.about.velog}
                    value={siteConfig.links.velog.replace('https://', '')}
                    href={siteConfig.links.velog}
                  />
                </div>

                <div className="pt-6 border-t border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{dict.about.coreKeywords}</p>
                  <div className="flex flex-wrap gap-2">
                    {dict.about.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="px-3 py-1 bg-primary/5 hover:bg-primary/10 text-primary border-none flex gap-1.5 items-center">
                        <CheckCircle2 className="w-3 h-3" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>
  )
}
