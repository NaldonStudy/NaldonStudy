import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/atoms/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: '김도훈 | 개발자 포트폴리오',
  description: '소통하기 편하고, 함께 일하고 싶은 개발자 김도훈의 포트폴리오입니다.',
  keywords: ['개발자', '포트폴리오', '프론트엔드', 'React', 'Next.js', '김도훈'],
  authors: [{ name: '김도훈' }],
  openGraph: {
    title: '김도훈 | 개발자 포트폴리오',
    description: '소통하기 편하고, 함께 일하고 싶은 개발자 김도훈의 포트폴리오입니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className="bg-background snap-y snap-proximity">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
