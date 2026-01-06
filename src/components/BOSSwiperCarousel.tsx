'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCards, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'

const screenshots = [
  {
    src: '/screenshots/bos-dashboard.png',
    alt: 'BOS Dashboard Overview',
    label: 'Dashboard',
  },
  {
    src: '/screenshots/bos-clients.png',
    alt: 'BOS Client Management',
    label: 'Client Management',
  },
  {
    src: '/screenshots/bos-jobs.png',
    alt: 'BOS Job Tracking',
    label: 'Job Tracking',
  },
  {
    src: '/screenshots/bos-analytics.png',
    alt: 'BOS Analytics',
    label: 'Analytics',
  },
]

export function BOSSwiperCarousel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Mobile Swiper */}
      <div className="lg:hidden">
        <Swiper
          modules={[Pagination, EffectCards, Autoplay]}
          effect="cards"
          grabCursor
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          cardsEffect={{
            perSlideOffset: 8,
            perSlideRotate: 2,
            slideShadows: false,
          }}
          className="bos-swiper"
        >
          {screenshots.map((screenshot, i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-white/[0.02]">
                {/* Screenshot placeholder - replace with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
                      <span className="font-mono text-2xl text-cyan-500/60">{(i + 1).toString().padStart(2, '0')}</span>
                    </div>
                    <p className="font-mono text-sm text-cyan-500/80 uppercase tracking-wider">
                      {screenshot.label}
                    </p>
                    <p className="text-xs text-white/40 mt-2">BOS Screenshot</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination styling */}
        <style jsx global>{`
          .bos-swiper {
            padding: 2rem 0 3rem;
            overflow: visible;
          }
          .bos-swiper .swiper-pagination {
            bottom: 0;
          }
          .bos-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.3);
            opacity: 1;
            width: 8px;
            height: 8px;
          }
          .bos-swiper .swiper-pagination-bullet-active {
            background: #06b6d4;
            width: 24px;
            border-radius: 4px;
          }
          .swiper-slide {
            border-radius: 12px;
          }
        `}</style>
      </div>

      {/* Desktop: Keep existing carousel or show grid */}
      <div className="hidden lg:block">
        {/* Original BOSScreenshotCarousel component will render here */}
        {/* We'll integrate this in the parent component */}
      </div>
    </motion.div>
  )
}
