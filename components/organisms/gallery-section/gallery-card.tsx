'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, ImageIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { withBasePath } from '@/lib/utils'
import { GalleryItem } from './gallery-data'

interface GalleryCardProps {
  item: GalleryItem
  index: number
  onClick: () => void
}

export const GalleryCard = memo(({
  item,
  index,
  onClick,
}: GalleryCardProps) => {
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
