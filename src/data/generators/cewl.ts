import type { GeneratorConfig } from '../../types/generator';

export const cewlGenerator: GeneratorConfig = {
  id: 'cewl',
  name: 'CeWL',
  description: 'Custom Word List Generator.',
  categoryId: 'password-attacks',
  exampleUsage: 'cewl -w wordlist.txt -d 2 -m 5 https://target.com',
  explanation: 'CeWL (Custom Word List Generator) is a ruby app which spiders a given URL to a specified depth and returns a list of words which can then be used for password crackers such as John the Ripper.',
  fields: [
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'e.g. https://target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'depth',
      label: 'Spider Depth',
      type: 'number',
      defaultValue: 2,
      description: 'Depth to spider (-d)'
    },
    {
      id: 'minWordLength',
      label: 'Min Word Length',
      type: 'number',
      defaultValue: 5,
      description: 'Minimum word length (-m)'
    },
    {
      id: 'output',
      label: 'Output File',
      type: 'text',
      placeholder: 'wordlist.txt',
      defaultValue: 'cewl_wordlist.txt',
      description: 'File to write to (-w)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['cewl'];
    if (values.depth) parts.push(`-d ${values.depth}`);
    if (values.minWordLength) parts.push(`-m ${values.minWordLength}`);
    if (values.output) parts.push(`-w ${values.output}`);
    if (values.url) parts.push(String(values.url));
    return parts.join(' ');
  },
  seo: {
    title: 'CeWL Command Generator - Custom Word List Generator',
    description: 'Generate CeWL commands to spider URLs and create target-specific wordlists. indispensable for custom password cracking attacks.',
    keywords: ['cewl generator', 'custom wordlist', 'spider website wordlist', 'cewl syntax', 'targeted password attacks']
  },
  additionalContent: [
    {
      title: 'Targeted Wordlists',
      content: `CeWL (Custom Word List Generator) is a ruby app which spiders a given URL to a specified depth and returns a list of words. This is extremely effective for brute forcing passwords that are likely to be related to the target's industry or company name.`
    }
  ]
};
