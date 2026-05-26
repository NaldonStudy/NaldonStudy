import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Next.js의 basePath를 고려하여 절대 경로 앞에 basePath를 추가합니다.
 * 로컬 개발 환경에서는 추가하지 않고, 프로덕션(빌드) 환경에서만 추가합니다.
 */
export function withBasePath(path: string) {
  if (!path) return path
  if (path.startsWith('http') || path.startsWith('https') || path.startsWith('data:')) return path

  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // 로컬 개발 환경(next dev)에서는 basePath 없이 접근 가능해야 합니다.
  // GitHub Pages 배포를 위한 빌드 시(production)에만 basePath를 추가합니다.
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? '/NaldonStudy' : ''

  if (basePath && cleanPath.startsWith(basePath)) return cleanPath

  return `${basePath}${cleanPath}`
}

