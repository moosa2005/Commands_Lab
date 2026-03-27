import type { GeneratorConfig } from '../../types/generator';

export const searchsploitGenerator: GeneratorConfig = {
  id: 'searchsploit',
  name: 'Searchsploit',
  description: 'Exploit-DB CLI Search Tool.',
  categoryId: 'exploitation',
  exampleUsage: 'searchsploit remote windows smb',
  explanation: 'searchsploit is a command line search tool for Exploit-DB that also allows you to take a copy of exploit binaries with you.',
  fields: [
    {
      id: 'query',
      label: 'Search Query',
      type: 'text',
      placeholder: 'e.g. windows smb',
      required: true,
      defaultValue: ''
    },
    {
      id: 'remote',
      label: 'Remote Exploits Only',
      type: 'checkbox',
      defaultValue: false,
      description: 'Search for remote exploits'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['searchsploit'];
    if (values.query) parts.push(String(values.query));
    if (values.mirror) parts.push('-m');
    if (values.examine) parts.push('-x');
    return parts.join(' ');
  },
  seo: {
    title: 'Searchsploit Command Generator - Exploit Database CLI',
    description: 'Generate Searchsploit commands to search the Exploit-DB archive for known vulnerabilities and exploits. Offline access to exploit data.',
    keywords: ['searchsploit generator', 'exploit-db cli', 'vulnerability search', 'exploit database', 'searchsploit syntax']
  },
  additionalContent: [
    {
      title: 'Offline Exploit Database',
      content: `Searchsploit is the command-line interface for Exploit-DB. It allows you to keep a local copy of the entire exploit database on your machine, making it searchable even without an internet connection.`
    }
  ]
};
