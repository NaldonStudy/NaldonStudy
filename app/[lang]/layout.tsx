import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/atoms/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'
import { Locale } from '@/lib/dictionaries/types'
import { getDictionary } from '@/lib/dictionaries/get-dictionary'
import { I18nProvider } from '@/components/atoms/i18n-provider'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return (
    <html lang={lang} suppressHydrationWarning className="bg-background snap-y snap-proximity">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider dict={dict} lang={lang as Locale}>
            {children}
          </I18nProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
