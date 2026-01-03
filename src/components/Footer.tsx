import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="container-full py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Cold Lava</span>
            <span className="text-sm text-white/30">
              © {new Date().getFullYear()} Cold Lava Ltd. Liverpool, UK.
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 md:gap-8 text-sm text-white/40">
            <Link href="#work" className="hover:text-white transition-colors">
              Work
            </Link>
            <Link href="#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#bos" className="hover:text-white transition-colors">
              BOS
            </Link>
            <Link href="#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="mailto:hello@coldlava.ai"
              className="hover:text-white transition-colors"
            >
              hello@coldlava.ai
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
