import type { GeneratorConfig } from '../../types/generator';

export const wfuzzGenerator: GeneratorConfig = {
  id: 'wfuzz',
  name: 'Wfuzz',
  description: 'The Web Fuzzer.',
  categoryId: 'web-testing',
  exampleUsage: 'wfuzz -c -z file,wordlist.txt --hc 404 http://target.com/FUZZ',
  explanation: 'Wfuzz is a tool designed for uncovering resources in web applications, it can be used for brute forcing GET and POST parameters for testing various vulnerabilities.',
  fields: [
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'e.g. http://target.com/FUZZ',
      required: true,
      defaultValue: ''
    },
    {
      id: 'wordlist',
      label: 'Wordlist Path',
      type: 'text',
      placeholder: 'e.g. /usr/share/wordlists/dirb/common.txt',
      required: true,
      defaultValue: ''
    },
    {
      id: 'hideCode',
      label: 'Hide HTTP Code',
      type: 'text',
      placeholder: 'e.g. 404,403',
      defaultValue: '404',
      description: 'Hide responses with these codes (--hc)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['wfuzz -c'];
    if (values.wordlist) parts.push(`-z file,${values.wordlist}`);
    if (values.hideCode) parts.push(`--hc ${values.hideCode}`);
    if (values.url) parts.push(values.url);
    return parts.join(' ');
  },
  seo: {
    title: 'Wfuzz Command Generator - Advanced Web Fuzzer',
    description: 'Generate Wfuzz commands for advanced web application fuzzing. Detect hidden parameters, directories, and vulnerabilities with ease.',
    keywords: ['wfuzz generator', 'web fuzzer', 'parameter discovery', 'wfuzz syntax', 'vulnerability scanning']
  },
  additionalContent: [
    {
      title: 'Power of the FUZZ',
      content: `In Wfuzz, the keyword 'FUZZ' is replaced by words from your wordlist. You can use multiple wordlists and multiple 'FUZZ' keywords (FUZZ, FUZ2Z, etc.) for complex payloads.`
    }
  ]
};
