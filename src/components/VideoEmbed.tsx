import Link from 'next/link'

interface VideoEmbedProps {
  thumbnailUrl?: string
  videoUrl: string
  title: string
  duration?: string
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  )
}

export function VideoEmbed({
  thumbnailUrl = '/screenshots/dbr-dashboard.png',
  videoUrl,
  title,
  duration = '60s'
}: VideoEmbedProps) {
  return (
    <Link
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20 hover:bg-white/[0.03]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-cyan-500/10 to-orange-500/10">
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
          <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-500 group-hover:bg-orange-400 transition-all group-hover:scale-110 shadow-lg">
            <PlayIcon className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        {duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/80 text-white text-xs font-mono">
            {duration}
          </div>
        )}
      </div>

      {/* Title */}
      <div className="p-4">
        <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors">
          {title}
        </p>
      </div>
    </Link>
  )
}
