import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  structuredData?: Record<string, unknown>;
}

const BASE_URL = 'https://commandslab.com';
const SITE_NAME = 'CommandsLab';
const DEFAULT_TITLE = 'CommandsLab - Free Cybersecurity & Pentesting Command Generator';
const DEFAULT_DESCRIPTION = 'Generate complex Nmap, SQLMap, Hydra, Metasploit, reverse shell and other pentesting commands instantly. Free online tool for ethical hackers and cybersecurity professionals.';

export function useSEO(options: SEOOptions | string, legacyDescription?: string) {
  // Support legacy (title, description) signature
  const opts: SEOOptions = typeof options === 'string'
    ? { title: options, description: legacyDescription || DEFAULT_DESCRIPTION }
    : options;

  useEffect(() => {
    const fullTitle = opts.title
      ? `${opts.title} | ${SITE_NAME}`
      : DEFAULT_TITLE;

    // Update the document title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attr: string, key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Primary meta
    setMetaTag('name', 'description', opts.description);
    setMetaTag('name', 'title', fullTitle);
    if (opts.keywords) {
      setMetaTag('name', 'keywords', opts.keywords);
    }

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', opts.description);
    setMetaTag('property', 'og:type', opts.ogType || 'website');
    setMetaTag('property', 'og:site_name', SITE_NAME);

    // Twitter Card
    setMetaTag('property', 'twitter:title', fullTitle);
    setMetaTag('property', 'twitter:description', opts.description);

    // Canonical URL
    if (opts.canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = `${BASE_URL}${opts.canonical}`;
      setMetaTag('property', 'og:url', `${BASE_URL}${opts.canonical}`);
      setMetaTag('property', 'twitter:url', `${BASE_URL}${opts.canonical}`);
    }

    // Structured Data (JSON-LD)
    if (opts.structuredData) {
      // Remove any previous JSON-LD
      const existing = document.querySelector('script[data-seo="json-ld"]');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'json-ld');
      script.textContent = JSON.stringify(opts.structuredData);
      document.head.appendChild(script);
    }

    // Cleanup structured data on unmount
    return () => {
      const existing = document.querySelector('script[data-seo="json-ld"]');
      if (existing) existing.remove();
    };
  }, [opts.title, opts.description, opts.keywords, opts.canonical, opts.ogType]);
}

export { BASE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION };
