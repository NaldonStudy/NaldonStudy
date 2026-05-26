'use client'

import { useEffect } from 'react'

export default function RootPage() {
  useEffect(() => {
    // 브라우저 언어 감지 (ko-KR 등 포함)
    const userLang = navigator.language || 'en'
    const targetLang = userLang.toLowerCase().startsWith('ko') ? 'ko' : 'en'
    
    // 정적 환경에서 확실한 이동을 위해 window.location.replace 사용
    window.location.replace(`/${targetLang}`)
  }, [])

  // 리다이렉트 중 깜빡임을 방지하기 위해 빈 화면 또는 간단한 로딩 표시
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}
