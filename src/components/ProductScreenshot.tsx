import Image from 'next/image'

interface ProductScreenshotProps {
  src: string
  alt: string
  caption?: string
  priority?: boolean
}

export function ProductScreenshot({ src, alt, caption, priority = false }: ProductScreenshotProps) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-2xl">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          priority={priority}
          className="w-full h-auto"
        />
        {/* Subtle overlay to blend with dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      {caption && (
        <p className="mt-3 text-xs md:text-sm text-white/40 text-center">{caption}</p>
      )}
    </div>
  )
}
