'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, ExternalLink, ImageIcon } from 'lucide-react'
import { withBasePath } from '@/lib/utils'
import { GalleryItem } from './gallery-data'

interface LightboxModalProps {
  item: GalleryItem | null
  onClose: () => void
}

export const LightboxModal = memo(({ item, onClose }: LightboxModalProps) => {
  const [imageError, setImageError] = useState(false)

  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="aspect-video bg-secondary relative">
          {item.type === 'youtube' ? (
            <iframe
              src={`${item.src}?autoplay=1`}
              title={item.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {!imageError ? (
                <Image
                  src={withBasePath(item.src)}
                  alt={item.title}
                  fill
                  className="object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-muted-foreground" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-muted-foreground">{item.description}</p>
              )}
            </div>
            {item.type === 'youtube' && (
              <a
                href={item.src.replace('/embed/', '/watch?v=')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                YouTube에서 보기
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
})
LightboxModal.displayName = 'LightboxModal'
