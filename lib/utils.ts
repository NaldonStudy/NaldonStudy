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

  // 환경 변수로 설정된 basePath를 사용합니다. (로컬 테스트 및 배포 환경 모두 지원)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  if (basePath && cleanPath.startsWith(basePath)) return cleanPath

  return `${basePath}${cleanPath}`
}

