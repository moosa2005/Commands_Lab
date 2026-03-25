import type { GeneratorConfig } from '../../types/generator';

export const xsstrikeGenerator: GeneratorConfig = {
  id: 'xsstrike',
  name: 'XSStrike',
  description: 'Advanced XSS detection suite.',
  categoryId: 'web-testing',
  exampleUsage: 'python3 xsstrike.py -u "http://target.com/search?q=query"',
  explanation: 'XSStrike is a powerful XSS detection suite equipped with four hand-written parsers, an intelligent payload generator, a powerful fuzzing engine and an incredibly fast crawler.',
  fields: [
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'e.g. http://target.com/search?q=test',
      required: true,
      defaultValue: ''
    },
    {
      id: 'crawl',
      label: 'Enable Crawler',
      type: 'checkbox',
      defaultValue: false,
      description: 'Crawl the target for links (--crawl)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['python3 xsstrike.py'];
    if (values.url) parts.push(`-u "${values.url}"`);
    if (values.crawl) parts.push('--crawl');
    return parts.join(' ');
  },
  seo: {
    title: 'XSStrike Command Generator - Advanced XSS Detection Suite',
    description: 'Create XSStrike commands for intelligent XSS detection. equipped with custom parsers and a powerful fuzzing engine.',
    keywords: ['xsstrike generator', 'xss detection suite', 'dom xss scanner', 'intelligent fuzzer', 'xsstrike syntax']
  },
  additionalContent: [
    {
      title: 'Advanced XSS Fuzzing',
      content: `XSStrike uses an intelligent payload generator that analyzes the context of the reflection to bypass modern WAFs and filters. It's one of the most effective tools for manual XSS research.`
    }
  ]
};
