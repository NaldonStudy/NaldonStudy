'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MessageCircle, FileText, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'

interface ContactInfo {
  email: string
  github: string
  linkedin?: string
  blog?: string
  kakao?: string
}

const contactInfo: ContactInfo = {
  email: 'luckyboyhoon@naver.com',
  github: 'https://github.com/NaldonStudy',
  linkedin: 'https://www.linkedin.com/in/도훈-김-6b56993a2',
}

const contactLinks = [
  {
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    color: 'hover:bg-primary/10 hover:text-primary',
  },
  {
    icon: <Github className="w-6 h-6" />,
    label: 'GitHub',
    value: 'NaldonStudy',
    href: contactInfo.github,
    color: 'hover:bg-foreground/10 hover:text-foreground',
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    label: 'LinkedIn',
    value: '김도훈 (Dohun Kim)',
    href: contactInfo.linkedin,
    color: 'hover:bg-blue-500/10 hover:text-blue-500',
  },
  ...(contactInfo.blog
    ? [
        {
          icon: <FileText className="w-6 h-6" />,
          label: 'Blog',
          value: 'Tech Blog',
          href: contactInfo.blog,
          color: 'hover:bg-accent/10 hover:text-accent',
        },
      ]
    : []),
  ...(contactInfo.kakao
    ? [
        {
          icon: <MessageCircle className="w-6 h-6" />,
          label: 'KakaoTalk',
          value: contactInfo.kakao,
          href: `https://open.kakao.com/me/${contactInfo.kakao}`,
          color: 'hover:bg-yellow-500/10 hover:text-yellow-600',
        },
      ]
    : []),
]

export function ContactSection() {
  return (
    <SectionWrapper id="contact" className="bg-secondary/20">
      <SectionHeader title="Contact" subtitle="언제든지 연락 주세요" />

      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  함께 성장하고 싶습니다
                </h3>
                <p className="text-muted-foreground">
                  프로젝트 협업, 채용 문의, 또는 단순한 대화까지
                  <br />
                  편하게 연락해 주세요.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-border/50 transition-all duration-300 ${link.color}`}
                  >
                    <div className="flex-shrink-0">{link.icon}</div>
                    <div>
                      <p className="text-xs text-muted-foreground">{link.label}</p>
                      <p className="text-sm font-medium text-foreground">{link.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="gap-2">
                  <a href={`mailto:${contactInfo.email}`}>
                    <Send className="w-4 h-4" />
                    이메일 보내기
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
    </SectionWrapper>
  )
}
