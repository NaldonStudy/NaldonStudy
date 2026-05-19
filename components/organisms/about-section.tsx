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

interface AboutInfo {
  name: string
  email: string
  github: string
  linkedin: string
  velog: string
  location: string
  education: string
  birthYear: string
  profileImages: string[]
  keywords: string[]
}

const aboutInfo: AboutInfo = {
  name: '김도훈',
  email: 'luckyboyhoon@naver.com',
  github: 'github.com/NaldonStudy',
  linkedin: 'linkedin.com/in/도훈-김-6b56993a2',
  velog: 'velog.io/@naldon_study',
  location: '대한민국 경기도 (Gyeonggi-do, South Korea)',
  education: '고려대학교 세종캠퍼스 전자및정보공학과',
  birthYear: '2019학번 (2025년 졸업)',
  profileImages: [
    '/assets/profile/DoHun1.jpg',
    '/assets/profile/DoHun2.jpg',
    '/assets/profile/DoHun3.jpg',
    '/assets/profile/DoHun4.jpg',
  ],
  keywords: ['소통형 개발자', '빠른 적응력', '문제 해결 중심', '책임감 있는', '지속적 성장'],
}

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
        <p className="text-sm font-medium text-foreground">{value}</p>
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutInfo.profileImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <SectionWrapper id="about" className="snap-start">
      <SectionHeader title="About Me" subtitle="끊임없이 배우고 소통하는 개발자입니다" />

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
                        src={withBasePath(aboutInfo.profileImages[currentImageIndex])}
                        alt={`${aboutInfo.name} 프로필 ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        priority={currentImageIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Slider Progress Indicator */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {aboutInfo.profileImages.map((_, index) => (
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
                  <h3 className="text-3xl font-bold text-foreground">{aboutInfo.name}</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary">Backend</Badge>
                    <Badge variant="outline" className="text-xs border-accent/20 text-accent">Infra</Badge>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                  <InfoItem
                    icon={<Mail className="w-4 h-4" />}
                    label="Email"
                    value={aboutInfo.email}
                    href={`mailto:${aboutInfo.email}`}
                  />
                  <InfoItem
                    icon={<MapPin className="w-4 h-4" />}
                    label="Location"
                    value={aboutInfo.location}
                  />
                  <InfoItem
                    icon={<GraduationCap className="w-4 h-4" />}
                    label="Education"
                    value={aboutInfo.education}
                  />
                  <InfoItem
                    icon={<Calendar className="w-4 h-4" />}
                    label="Academic"
                    value={aboutInfo.birthYear}
                  />
                  <div className="sm:col-span-2 grid sm:grid-cols-3 gap-4">
                    <InfoItem
                      icon={<Github className="w-4 h-4" />}
                      label="GitHub"
                      value={aboutInfo.github}
                      href={`https://${aboutInfo.github}`}
                    />
                    <InfoItem
                      icon={<Linkedin className="w-4 h-4" />}
                      label="LinkedIn"
                      value="Dohun Kim"
                      href={`https://${aboutInfo.linkedin}`}
                    />
                    <InfoItem
                      icon={<BookOpen className="w-4 h-4" />}
                      label="Velog"
                      value={aboutInfo.velog}
                      href={`https://${aboutInfo.velog}`}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Core Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {aboutInfo.keywords.map((keyword) => (
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
