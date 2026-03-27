import type { GeneratorConfig } from '../../types/generator';

export const ffufGenerator: GeneratorConfig = {
  id: 'ffuf',
  name: 'FFUF',
  description: 'Fast web fuzzer written in Go.',
  categoryId: 'web-testing',
  exampleUsage: 'ffuf -w wordlist.txt -u http://example.com/FUZZ',
  explanation: 'FFUF (Fuzz Faster U Fool) is a fast web fuzzer written in Go. It is used for directory discovery, virtual host discovery (without DNS records), and GET/POST parameter fuzzing.',
  fields: [
    {
      id: 'url',
      label: 'Target URL (include FUZZ)',
      type: 'text',
      placeholder: 'http://example.com/FUZZ',
      required: true,
      defaultValue: '',
      description: 'The target URL containing the FUZZ keyword.'
    },
    {
      id: 'wordlist',
      label: 'Wordlist Path',
      type: 'text',
      placeholder: '/usr/share/wordlists/dirb/common.txt',
      required: true,
      defaultValue: '',
      description: 'Path to the wordlist file.'
    },
    {
      id: 'extensions',
      label: 'Extensions',
      type: 'text',
      placeholder: '.php,.html,.txt',
      defaultValue: '',
      description: 'Comma separated list of extensions. Example: .php,.html'
    },
    {
      id: 'threads',
      label: 'Threads',
      type: 'number',
      placeholder: '40',
      defaultValue: 40,
      description: 'Number of concurrent threads.'
    },
    {
      id: 'filterStatus',
      label: 'Filter Status Codes',
      type: 'text',
      placeholder: '404,403',
      defaultValue: '404',
      description: 'Comma separated list of status codes to filter out.'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['ffuf'];
    if (values.wordlist) parts.push(`-w ${values.wordlist}`);
    if (values.url) parts.push(`-u ${values.url}`);
    if (values.extensions) parts.push(`-e ${values.extensions}`);
    if (values.threads && values.threads !== 40) parts.push(`-t ${values.threads}`);
    if (values.filterStatus) parts.push(`-fc ${values.filterStatus}`);
    return parts.join(' ');
  },
  seo: {
    title: 'ffuf Command Generator - Fast Web Fuzzer',
    description: 'Create ffuf commands for high-speed directory discovery and fuzzying. Highly customizable and optimized for performance.',
    keywords: ['ffuf generator', 'web fuzzer', 'directory discovery', 'fuzzing tool', 'ffuf syntax']
  },
  additionalContent: [
    {
      title: 'Filtering Results',
      content: `Use the -fs (filter size), -fc (filter code), and -fw (filter words) options to remove noise from your results. This is essential when fuzzing targets that return the same response for all invalid paths.`
    }
  ]
};
