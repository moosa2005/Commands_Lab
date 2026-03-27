import type { GeneratorConfig } from '../../types/generator';

export const dirsearchGenerator: GeneratorConfig = {
  id: 'dirsearch',
  name: 'Dirsearch',
  description: 'Web path scanner.',
  categoryId: 'web-testing',
  exampleUsage: 'dirsearch -u target.com -e php,html',
  explanation: 'Dirsearch is a simple command line tool designed to brute force directories and files in websites.',
  fields: [
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'e.g. http://target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'extensions',
      label: 'Extensions',
      type: 'text',
      placeholder: 'e.g. php,html,txt',
      defaultValue: 'php,txt,html',
      description: 'List of extensions to check (-e)'
    },
    {
      id: 'threads',
      label: 'Threads',
      type: 'number',
      defaultValue: 10,
      description: 'Number of threads (-t)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['dirsearch'];
    if (values.url) parts.push(`-u ${values.url}`);
    if (values.extensions) parts.push(`-e ${values.extensions}`);
    if (values.threads) parts.push(`-t ${values.threads}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Dirsearch Command Generator - Web Path Scanner',
    description: 'Create Dirsearch commands for efficient web directory and file brute forcing. Supports custom extensions and high-speed multi-threading.',
    keywords: ['dirsearch generator', 'web path scanner', 'directory discovery', 'dirsearch syntax', 'web recon']
  },
  additionalContent: [
    {
      title: 'Effective Path Scanning',
      content: `Dirsearch is known for its simplicity and effectiveness. Always specify relevant extensions (like php, txt, html) to narrow down your results and find hidden resources.`
    }
  ]
};
