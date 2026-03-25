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
    const parts = ['gobuster', values.mode || 'dir'];
    if (values.url) { // Changed from 'target' to 'url' to match existing field ID
      const flag = values.mode === 'dns' ? '-d' : '-u';
      parts.push(`${flag} ${values.url}`);
    }
    if (values.wordlist) parts.push(`-w ${values.wordlist}`);
    if (values.threads) parts.push(`-t ${values.threads}`);
    // Assuming 'extensions' is a new field that might be added later,
    // but not present in the current 'fields' array.
    // If it's meant to be added, it should be in the 'fields' array first.
    // For now, I'll omit it to avoid a potential error if it's not defined.
    // if (values.extensions) parts.push(`-x ${values.extensions}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Gobuster Command Generator - Directory & DNS Brute Forcer',
    description: 'Generate Gobuster commands for directory, DNS, and VHost brute forcing. fast, reliable, and multi-threaded.',
    keywords: ['gobuster generator', 'directory brute force', 'dns enumeration', 'gobuster syntax', 'web discovery']
  },
  additionalContent: [
    {
      title: 'Gobuster Modes',
      content: `Gobuster supports several modes: 'dir' for directories/files, 'dns' for subdomains, and 'vhost' for virtual hosts. Each mode has its own specific flags and requirements.`
    }
  ]
};
