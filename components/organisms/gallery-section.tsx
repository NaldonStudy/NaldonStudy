'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, ExternalLink, ImageIcon, Camera } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty'
import { withBasePath } from '@/lib/utils'

import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'

interface GalleryItem {
  id: string
  type: 'image' | 'youtube'
  title: string
  description?: string
  src: string
  thumbnail?: string
}

const galleryData: GalleryItem[] = [
  // TODO: 활동 사진이 추가되면 여기에 데이터를 추가하세요.
]

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  return (
    <SectionWrapper id="gallery">
      <SectionHeader title="Gallery" subtitle="다양한 활동 기록" />

      {galleryData.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryData.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      ) : (
        <Empty className="border-border/40 bg-card/20 py-20">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Camera className="w-8 h-8" />
            </EmptyMedia>
            <EmptyTitle>활동 기록 준비 중</EmptyTitle>
            <EmptyDescription>
              더 많은 활동 사진들이 곧 업데이트될 예정입니다.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}

const GalleryCard = memo(({
  item,
  index,
  onClick,
}: {
  item: GalleryItem
  index: number
  onClick: () => void
}) => {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-border/50 bg-card/95 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
        onClick={onClick}
      >
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden">
            {item.type === 'youtube' ? (
              <>
                {item.thumbnail && !imageError ? (
                  <Image
                    src={withBasePath(item.thumbnail!)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <Play className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {!imageError ? (
                  <Image
                    src={withBasePath(item.src)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
              <h4 className="text-sm font-medium text-foreground truncate">{item.title}</h4>
              {item.description && (
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})
GalleryCard.displayName = 'GalleryCard'

const LightboxModal = memo(({ item, onClose }: { item: GalleryItem; onClose: () => void }) => {
  const [imageError, setImageError] = useState(false)

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
