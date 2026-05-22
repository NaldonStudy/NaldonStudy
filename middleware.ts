import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // / 로 접속했을 때만 리다이렉트
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language')
    const lang = acceptLanguage?.startsWith('ko') ? 'ko' : 'en'
    
    return NextResponse.redirect(new URL(`/${lang}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // / 경로만 매칭
    '/',
    // 내부 요청 제외
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
}
