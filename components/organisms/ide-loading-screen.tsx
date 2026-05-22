'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'

interface IdeLoadingScreenProps {
  onComplete: () => void
}

export function IdeLoadingScreen({ onComplete }: IdeLoadingScreenProps) {
  const { dict, lang } = useI18n()
  const [typedCode, setTypedCode] = useState('')
  const [showTerminal, setShowTerminal] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  
  const welcomeMessage = lang === 'ko' ? '김도훈 포트폴리오에 오신걸 환영합니다' : 'Welcome to Dohun Kim\'s Portfolio'
  const fullMessage = `System.out.println("${welcomeMessage}");`
  const typingSpeed = 50 // ms per character

  useEffect(() => {
    // 1. 초기 지연 후 타이핑 시작
    const startTyping = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= fullMessage.length) {
          setTypedCode(fullMessage.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          // 2. 타이핑 완료 후 터미널 출력
          setTimeout(() => {
            setShowTerminal(true)
            // 3. 터미널 출력 후 페이드 아웃 시작
            setTimeout(() => {
              setIsFadingOut(true)
              // 4. 페이드 아웃 완료 후 콜백 호출
              setTimeout(() => {
                onComplete()
              }, 1000)
            }, 1500)
          }, 500)
        }
      }, typingSpeed)
    }, 800)

    return () => clearTimeout(startTyping)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1e1e1e] font-mono transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="fixed top-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-[#bbbbbb] transition-all hover:bg-white/10 hover:text-white"
        aria-label="Skip Intro"
      >
        <span>SKIP</span>
        <X className="h-4 w-4" />
      </button>

      {/* IDE Window Container */}
      <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-[#3c3f41] bg-[#2b2b2b] shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center justify-between bg-[#3c3f41] px-4 py-2">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-xs text-[#bbbbbb]">Main.java — IntelliJ IDEA</div>
          <div className="w-12"></div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-[#3c3f41] bg-[#2b2b2b]">
          <div className="flex items-center border-r border-[#3c3f41] bg-[#3c3f41] px-4 py-1 text-xs text-[#bbbbbb]">
            <span className="mr-2 text-[#4e9ed4]">☕</span>
            Main.java
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="relative flex min-h-[300px] p-4 text-sm leading-relaxed text-[#a9b7c6]">
          {/* Line Numbers */}
          <div className="mr-4 flex flex-col text-right text-[#606366] select-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1">
            <div>
              <span className="text-[#cc7832]">public class</span>{' '}
              <span className="text-[#a9b7c6]">Main</span> {'{'}
            </div>
            <div className="ml-4">
              <span className="text-[#cc7832]">public static void</span>{' '}
              <span className="text-[#ffc66d]">main</span>(String[] args) {'{'}
            </div>
            <div className="ml-8 min-h-[1.5rem]">
              <span className="text-[#a9b7c6]">{typedCode.split('(')[0]}</span>
              {typedCode.includes('(') && (
                <>
                  <span className="text-[#a9b7c6]">(</span>
                  <span className="text-[#6a8759]">
                    {typedCode.split('"')[1] ? `"${typedCode.split('"')[1]}"` : typedCode.split('(')[1]}
                  </span>
                  {typedCode.includes(')') && <span className="text-[#a9b7c6]">)</span>}
                  {typedCode.includes(';') && <span className="text-[#cc7832]">;</span>}
                </>
              )}
              <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-[#a9b7c6] align-middle"></span>
            </div>
            <div className="ml-4">{'}'}</div>
            <div>{'}'}</div>
          </div>
        </div>

        {/* Terminal Area */}
        <div
          className={`border-t border-[#3c3f41] transition-all duration-500 ${
            showTerminal ? 'h-32 opacity-100' : 'h-0 opacity-0'
          }`}
        >
          <div className="bg-[#3c3f41] px-4 py-1 text-[10px] uppercase text-[#bbbbbb]">Run: Main.main()</div>
          <div className="p-3 text-xs text-[#bbbbbb]">
            <div className="mb-1 text-[#6a8759]">
              /usr/bin/java -Dfile.encoding=UTF-8 -cp /out/production/Portfolio Main
            </div>
            <div className="font-bold text-[#eeeeee]">{welcomeMessage}</div>
            <div className="mt-2 text-[#4e9ed4]">Process finished with exit code 0</div>
          </div>
        </div>
      </div>
    </div>
  )
}
