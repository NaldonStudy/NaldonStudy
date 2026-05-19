'use client'

import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'

interface Skill {
  name: string
  level: 1 | 2 | 3
  description: string
  icon?: string
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

const batteryLevelDescriptions = {
  1: '하: 기본 이해 및 학습',
  2: '중: 프로젝트 활용 및 구현',
  3: '상: 핵심 설계 및 실무 운영',
}

const skillsData: SkillCategory[] = [
  {
    category: 'Core (주력)',
    skills: [
      { name: 'Java', level: 3, description: '객체지향 기반으로 핵심 도메인 로직과 유지보수성 높은 백엔드 코드를 설계·구현', icon: '/assets/skills/core/java.svg' },
      { name: 'Spring', level: 3, description: 'REST API 설계 및 계층 구조 표준화를 적용하며, Spring Security와 JWT를 활용한 보안 인증 체계 구축', icon: '/assets/skills/core/spring.svg' },
      { name: 'MySQL', level: 3, description: '스키마 설계 및 Flyway를 활용한 데이터베이스 형상 관리를 통해 안정적인 마이그레이션 환경 운영', icon: '/assets/skills/core/mysql.svg' },
    ],
  },
  {
    category: 'Experienced (프로젝트 적용)',
    skills: [
      { name: 'Python', level: 3, description: '데이터 처리 전문성을 바탕으로 대규모 데이터 가공 및 서버/AI 핵심 로직 설계·구현', icon: '/assets/skills/experienced/python.svg' },
      { name: 'PyTorch', level: 2, description: '모델 학습·추론 실험을 구성하고 성능 비교 및 개선 과정을 경험', icon: '/assets/skills/experienced/pytorch.svg' },
      { name: 'MongoDB', level: 2, description: '문서형 데이터 특성에 맞춘 구조 설계와 기능 구현 경험', icon: '/assets/skills/experienced/mongodb.svg' },
      { name: 'Redis', level: 3, description: '캐시 전략 수립 및 Refresh Token 저장소 활용을 통해 시스템 성능과 보안을 동시 개선', icon: '/assets/skills/experienced/redis.svg' },
      { name: 'FastAPI', level: 2, description: 'AI 기능 서바이빙을 위한 고성능 API를 구성하고 백엔드 시스템과 유기적으로 연동', icon: '/assets/skills/experienced/fastapi.svg' },
    ],
  },
  {
    category: 'Infra (인프라 적용)',
    skills: [
      { name: 'AWS', level: 2, description: 'EC2, S3, CodeDeploy 기반의 CI/CD를 구축하고 IAM Role을 활용한 보안 최적화 수행', icon: '/assets/skills/infra/aws.svg' },
      { name: 'Docker', level: 2, description: '개발·실행 환경을 컨테이너로 표준화해 재현성과 배포 편의성 향상', icon: '/assets/skills/infra/docker.svg' },
      { name: 'Nginx', level: 2, description: '리버스 프록시 및 client_max_body_size 등 서버 설정을 최적화하여 대용량 요청 처리 안정화', icon: '/assets/skills/infra/nginx.svg' },
    ],
  },
  {
    category: 'Tools & Learning',
    skills: [
      { name: 'Jira', level: 3, description: '이슈 기반의 체계적인 작업 관리로 팀의 개발 생산성을 높이고 협업 프로세스 주도', icon: '/assets/skills/tools/jira.svg' },
      { name: 'Figma', level: 2, description: '기획/디자인 산출물을 이해하고 개발 요구사항으로 해석해 협업', icon: '/assets/skills/tools/figma.svg' },
      { name: 'TypeScript', level: 1, description: '프론트/풀스택 확장을 위해 기본 문법과 활용 흐름을 학습 중', icon: '/assets/skills/tools/typescript.svg' },
      { name: 'Kubernetes', level: 1, description: '컨테이너 오케스트레이션 개념을 학습하며 배포/운영 역량 확장 중', icon: '/assets/skills/tools/kubernetes.svg' },
    ],
  },
]

const BatteryIndicator = memo(({ level, size = 'md' }: { level: 1 | 2 | 3; size?: 'sm' | 'md' }) => {
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
                src={skill.icon} 
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
      <p className="text-sm text-muted-foreground leading-relaxed pl-11">
        {skill.description}
      </p>
    </motion.div>
  )
})
SkillItem.displayName = 'SkillItem'

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeader title="Skills" subtitle="보유 기술 스택">
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
