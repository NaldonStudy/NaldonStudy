'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { withBasePath } from '@/lib/utils'
import { useI18n } from '@/hooks/use-i18n'
import { siteConfig } from '@/config/site'

export function HeroSection() {
  const { dict } = useI18n()
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    const sequence = dict.hero.typingSequence
    let currentStep = 0
    let currentText = ''
    let timeoutId: NodeJS.Timeout

    const type = () => {
      const targetText = sequence[currentStep]
      let nextText = currentText
      let pause = 150

      if (currentText === targetText) {
        if (currentStep < sequence.length - 1) {
          currentStep++
          if (currentStep === 1) pause = 700
          else if (currentStep > 1 && currentStep < 5) pause = 80
          else if (currentStep === 5) pause = 400
        } else {
          setIsTypingComplete(true)
          return
        }
      } else {
        if (currentText.length > targetText.length || !targetText.startsWith(currentText)) {
          if (currentStep > 0 && currentStep < 5) {
            nextText = targetText
          } else {
            nextText = currentText.slice(0, -1)
          }
          pause = 70
        } else {
          nextText = targetText.slice(0, currentText.length + 1)
          pause = 130
        }
      }

      currentText = nextText
      setDisplayedText(currentText)
      timeoutId = setTimeout(type, pause)
    }

    timeoutId = setTimeout(type, 500)
    return () => clearTimeout(timeoutId)
  }, [dict.hero.typingSequence])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 snap-start">
      <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Profile Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTypingComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative w-64 h-64 md:w-80 md:h-80 shrink-0"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 p-2 bg-background shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-secondary relative">
              <Image
                src={withBasePath(siteConfig.profile.main)}
                alt={dict.hero.profileAlt}
                fill
                priority
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
              />
            </div>
          </div>
          {/* Decorative Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-full"
          />
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isTypingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="absolute -bottom-2 -right-2 bg-card/95 border border-border px-4 py-2 rounded-2xl shadow-xl"
          >
            <p className="text-xs font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {dict.hero.profileBadge}
            </p>
          </motion.div>
        </motion.div>

        {/* Text Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left flex-1"
        >
          <h1 className="text-2xl min-[390px]:text-3xl md:text-5xl lg:text-5xl font-bold text-foreground mb-8 min-h-[1.5em] whitespace-pre-line leading-tight break-keep">
            {displayedText}
            {!isTypingComplete && (
              <span className="typing-cursor text-primary">|</span>
            )}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTypingComplete ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4 break-keep">
              <p>
                {dict.hero.description1}
              </p>
              <p>
                {dict.hero.description2}
              </p>              
              <div className="pt-4 border-l-4 border-primary/50 pl-6 bg-primary/5 py-4 rounded-r-xl">
                <p className="text-foreground font-semibold text-lg mb-1">
                  {dict.hero.motto}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dict.hero.mottoSub}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-6 flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  const element = document.querySelector('#about')
                  if (element) {
                    const offset = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - offset
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all group font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
              >
                <span>{dict.hero.viewProfile}</span>
                <motion.svg
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </button>
              
              <button
                onClick={() => {
                  const element = document.querySelector('#projects')
                  if (element) {
                    const offset = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - offset
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-bold hover:scale-105 active:scale-95 border border-border"
              >
                <span>{dict.hero.viewProjects}</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
