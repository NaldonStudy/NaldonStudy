'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { withBasePath } from '@/lib/utils'

const fullText = '소통의 가치를 중요하게 생각하는\n개발자 김도훈입니다'

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    // 한글 자소 단위 삭제를 시뮬레이션하기 위한 정교한 시퀀스
    const sequence = [
      '소통의 같이',    // 1. 오타 입력 완료
      '소통의 같ㅇ',    // 2. 'ㅣ' 삭제
      '소통의 같',      // 3. 'ㅇ' 삭제
      '소통의 가',      // 4. 'ㅌ' 삭제
      '소통의 ',        // 5. '가' 삭제 완료
      '소통의 가치를 중요하게 생각하는\n개발자 김도훈입니다' // 6. 최종 문구
    ]

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
          // 오타 완료 후 대기 (1초 -> 0.7초)
          if (currentStep === 1) pause = 700
          // 자소 단위 삭제 간격 (120ms -> 80ms)
          else if (currentStep > 1 && currentStep < 5) pause = 80
          // 삭제 완료 후 다시 타이핑 시작 전 대기 (600ms -> 400ms)
          else if (currentStep === 5) pause = 400
        } else {
          setIsTypingComplete(true)
          return
        }
      } else {
        // 목표 텍스트와 다를 경우
        if (currentText.length > targetText.length || !targetText.startsWith(currentText)) {
          // 삭제(백스페이스) 로직
          if (currentStep > 0 && currentStep < 5) {
            nextText = targetText // 시퀀스에 정의된 자소 단계로 바로 적용
          } else {
            nextText = currentText.slice(0, -1)
          }
          pause = 70 // 백스페이스 속도 (100ms -> 70ms)
        } else {
          // 글자 추가 로직
          nextText = targetText.slice(0, currentText.length + 1)
          pause = 130 // 타이핑 속도 (180ms -> 130ms)
        }
      }

      // 상태 업데이트와 타이머 설정을 분리하여 중복 실행 방지
      currentText = nextText
      setDisplayedText(currentText)
      timeoutId = setTimeout(type, pause)
    }

    timeoutId = setTimeout(type, 500)
    return () => clearTimeout(timeoutId)
  }, [])

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
                src={withBasePath("/assets/profile/dohun-image.jpg")}
                alt="김도훈 프로필"
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
              Open for Opportunities
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
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-foreground mb-8 min-h-[1.5em] whitespace-pre-line leading-tight">
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
            <div className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                수학을 좋아하여 이과를 선택했고, 전자과에 진학했습니다.
                <br className="hidden xl:block" />
                전자공학 전공에서 하드웨어를 넘어 수학과 유사한 알고리즘의 매력을 느꼈습니다.
              </p>
              <p>
                이후 소프트웨어의 매력에 빠지게 되었고,
                <br className="hidden xl:block" />
                메타버스 학회와 AI 연구실을 거쳐 삼성 청년 SW·AI 아카데미(SSAFY)까지
                <br className="hidden xl:block" />
                개발자가 되기 위해 다양한 경험을 쌓아왔습니다.
              </p>
              <div className="pt-4 border-l-4 border-primary/50 pl-6 bg-primary/5 py-4 rounded-r-xl">
                <p className="text-foreground font-semibold text-lg mb-1">
                  "소통하기 편하고, 함께 일하고 싶은 개발자"
                </p>
                <p className="text-sm text-muted-foreground">
                  동료들에게는 신뢰할 수 있는 코드를, 사용자에게는 최상의 사용성을 제공하겠습니다.
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
                <span>프로필 상세 보기</span>
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
                <span>프로젝트 결과물</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
