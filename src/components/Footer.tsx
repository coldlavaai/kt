import Link from 'next/link'
import Image from 'next/image'
import { ISSTracker } from './ISSTracker'
import { MeetingsTicker } from './MeetingsTicker'

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      {/* Main Footer Content - Slim and Horizontal */}
      <div className="container-full py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo & Company Info - Inline */}
          <div className="flex items-center gap-4">
            <Image
              src="/Cold Lava Logo/Cold Lava - Icon.png"
              alt="Cold Lava"
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <div className="text-xs text-white/30 leading-tight">
              <div>© {new Date().getFullYear()} Cold Lava AI Ltd. United Kingdom.</div>
              <div>Company No. 16492732</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 md:gap-8 text-sm text-white/40">
            <Link href="#process" className="relative hover:text-white transition-colors group">
              Process
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="#services" className="relative hover:text-white transition-colors group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
            </Link>
            <div className="relative group">
              <Link href="#bos" className="relative hover:text-white transition-colors">
                BOS
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
              </Link>
              <div className="absolute left-0 mt-2 hidden min-w-[160px] rounded-md border border-white/10 bg-black/95 shadow-lg group-hover:block group-focus-within:block z-10">
                <Link
                  href="/solar-bos"
                  className="block px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors rounded-md"
                >
                  Solar BOS
                </Link>
              </div>
            </div>
            <Link href="#clients" className="relative hover:text-white transition-colors group">
              Clients
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="#contact" className="relative hover:text-white transition-colors group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>

      {/* Live Stats Ticker Row */}
      <div className="border-t border-white/5 bg-cyan-500/[0.01]">
        <div className="container-full">
          <div className="flex flex-wrap items-center justify-center gap-8 py-4">
            <ISSTracker />
            <MeetingsTicker />
          </div>
        </div>
      </div>

      {/* Legal Links Row */}
      <div className="border-t border-white/5">
        <div className="container-full py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
            <Link href="/privacy" className="relative hover:text-cyan-400 transition-colors group">
              Privacy Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <span className="text-white/10">·</span>
            <Link href="/terms" className="relative hover:text-cyan-400 transition-colors group">
              Terms of Service
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <span className="text-white/10">·</span>
            <Link href="/cookies" className="relative hover:text-cyan-400 transition-colors group">
              Cookie Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
