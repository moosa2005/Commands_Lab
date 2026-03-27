import type { GeneratorConfig } from '../../types/generator';

export const httpxGenerator: GeneratorConfig = {
  id: 'httpx',
  name: 'Httpx',
  description: 'Fast and multi-purpose HTTP toolkit.',
  categoryId: 'web-testing',
  exampleUsage: 'httpx -u target.com -title -status-code',
  explanation: 'httpx is a fast and multi-purpose HTTP toolkit that allows you to run multiple probes using the retryablehttp library.',
  fields: [
    {
      id: 'url',
      label: 'Target URL/List',
      type: 'text',
      placeholder: 'e.g. target.com or domains.txt',
      required: true,
      defaultValue: ''
    },
    {
      id: 'showTitle',
      label: 'Show Title',
      type: 'checkbox',
      defaultValue: true,
      description: 'Display page title (-title)'
    },
    {
      id: 'showStatusCode',
      label: 'Show Status Code',
      type: 'checkbox',
      defaultValue: true,
      description: 'Display HTTP status code (-sc)'
    },
    {
      id: 'threads',
      label: 'Threads',
      type: 'number',
      defaultValue: 50,
      description: 'Number of threads (-t)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['httpx'];
    if (values.url) {
      if (String(values.url).endsWith('.txt')) parts.push(`-l ${values.url}`);
      else parts.push(`-u ${values.url}`);
    }
    if (values.showTitle) parts.push('-title');
    if (values.showStatusCode) parts.push('-sc');
    if (values.threads) parts.push(`-t ${values.threads}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Httpx Command Generator - Fast & Multi-purpose HTTP Toolkit',
    description: 'Create httpx commands for rapid HTTP probing. title detection, status codes, and tech stack identification at scale.',
    keywords: ['httpx generator', 'http probing', 'status code checker', 'projectdiscovery httpx', 'web asset discovery']
  },
  additionalContent: [
    {
      title: 'Performance at Scale',
      content: `httpx is built for performance. Use the -t flag to increase threads when scanning large lists of subdomains. It's the standard tool for validating live assets in modern recon workflows.`
    }
  ]
};
