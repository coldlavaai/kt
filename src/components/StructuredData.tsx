export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cold Lava AI Ltd',
    legalName: 'COLD LAVA AI LTD',
    url: 'https://coldlava.ai',
    logo: 'https://coldlava.ai/Cold Lava Logo/Cold Lava - Icon.png',
    description: 'AI automation consultancy specialising in bespoke Business Operating Systems (BOS), custom CRMs, voice agents, and workflow automation.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'England',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@coldlava.ai',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://github.com/coldlavaai',
      'https://www.linkedin.com/company/cold-lava-ai',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Cold Lava AI Ltd',
    image: 'https://coldlava.ai/og-image.jpg',
    '@id': 'https://coldlava.ai',
    url: 'https://coldlava.ai',
    telephone: '+44-151-541-6933',
    email: 'hello@coldlava.ai',
    priceRange: '££££',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'England',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Automation & Business Operating Systems',
    provider: {
      '@type': 'Organization',
      name: 'Cold Lava AI Ltd',
      url: 'https://coldlava.ai',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Automation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Operating System (BOS)',
            description: 'Bespoke, AI-assisted software systems designed to centralise data, automate workflows, and provide operational visibility.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom CRM Development',
            description: 'Tailored CRM systems built to match your specific business processes and requirements.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Voice Agents',
            description: 'Intelligent voice agents for customer service, lead qualification, and business automation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Workflow Automation',
            description: 'End-to-end automation of business processes using n8n, custom integrations, and AI.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Database Reactivation (DBR)',
            description: 'AI-powered systems to reactivate dormant contacts and convert them into active opportunities.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cold Lava AI',
    url: 'https://coldlava.ai',
    description: 'AI automation consultancy specialising in Business Operating Systems, custom CRMs, and workflow automation.',
    publisher: {
      '@type': 'Organization',
      name: 'Cold Lava AI Ltd',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://coldlava.ai/?s={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
