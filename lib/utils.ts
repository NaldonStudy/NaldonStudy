import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Next.js의 basePath('/NaldonStudy')를 고려하여 절대 경로 앞에 basePath를 추가합니다.
 */
export function withBasePath(path: string) {
  if (!path) return path
  if (path.startsWith('http') || path.startsWith('https') || path.startsWith('data:')) return path
  
  const basePath = '/NaldonStudy'
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  
  // basePath가 이미 포함되어 있는지 확인 (중복 방지)
  if (cleanPath.startsWith(basePath)) return cleanPath
  
  return `${basePath}${cleanPath}`
}
