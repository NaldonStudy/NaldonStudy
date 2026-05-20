'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { Camera } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty'

import { SectionHeader } from '@/components/atoms/section-header'
import { SectionWrapper } from '@/components/atoms/section-wrapper'
import { GalleryCard } from './gallery-card'
import { galleryData, GalleryItem } from './gallery-data'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

// LightboxModal을 지연 로딩하여 초기 번들 크기 감소
const LightboxModal = dynamic(
  () => import('./lightbox-modal').then((mod) => mod.LightboxModal),
  {
    loading: () => null,
    ssr: false
  }
)

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  return (
    <SectionWrapper id="gallery">
      <SectionHeader title="Gallery" subtitle="다양한 활동 기록" />

      {galleryData.length > 0 ? (
        <div className="px-12 relative group">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {galleryData.map((item, index) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <GalleryCard
                    item={item}
                    index={index}
                    onClick={() => setSelectedItem(item)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {galleryData.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-primary w-6" 
                    : "bg-primary/20 hover:bg-primary/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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
