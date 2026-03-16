import type { GeneratorConfig } from '../../types/generator';

export const gobusterGenerator: GeneratorConfig = {
  id: 'gobuster',
  name: 'Gobuster',
  description: 'Directory/File, DNS and VHost busting tool written in Go.',
  categoryId: 'web-testing',
  exampleUsage: 'gobuster dir -u http://example.com -w wordlist.txt',
  explanation: 'Gobuster is a tool used to brute-force: URIs (directories and files) in web sites, DNS subdomains, and Virtual Host names.',
  fields: [
    {
      id: 'mode',
      label: 'Mode',
      type: 'select',
      options: [
        { label: 'Directory/File Enumeration (dir)', value: 'dir' },
        { label: 'DNS Subdomain Enumeration (dns)', value: 'dns' },
        { label: 'VHost Enumeration (vhost)', value: 'vhost' }
      ],
      defaultValue: 'dir'
    },
    {
      id: 'url',
      label: 'Target URL/Domain',
      type: 'text',
      placeholder: 'http://example.com',
      required: true,
      defaultValue: '',
      description: 'Target URL for dir/vhost modes, or Domain for dns mode.'
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
      id: 'threads',
      label: 'Threads',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      description: 'Number of concurrent threads (default 10).'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['gobuster'];
    if (values.mode) parts.push(values.mode);
    
    // Gobuster uses -u for URL in dir/vhost modes, but -d for domain in dns mode.
    if (values.url) {
      if (values.mode === 'dns') {
        parts.push(`-d ${values.url}`);
      } else {
        parts.push(`-u ${values.url}`);
      }
    }
    
    if (values.wordlist) parts.push(`-w ${values.wordlist}`);
    if (values.threads && values.threads !== 10) parts.push(`-t ${values.threads}`);
    
    return parts.join(' ');
  }
};
