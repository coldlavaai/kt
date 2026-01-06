import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coldlava.ai'

  // Static pages
  const staticPages = [
    '',
    '/privacy',
    '/terms',
    '/cookies',
  ]

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: (page === '' ? 'weekly' : 'monthly') as const,
    priority: page === '' ? 1 : page === '/privacy' || page === '/terms' ? 0.5 : 0.6,
  }))

  return staticEntries
}
