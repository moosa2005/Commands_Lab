import type { GeneratorConfig } from '../../types/generator';

export const subfinderGenerator: GeneratorConfig = {
  id: 'subfinder',
  name: 'Subfinder',
  description: 'Fast passive subdomain enumeration tool.',
  categoryId: 'network-scanning',
  exampleUsage: 'subfinder -d target.com',
  explanation: 'Subfinder is a subdomain discovery tool that returns valid subdomains for websites by using passive online sources.',
  fields: [
    {
      id: 'domain',
      label: 'Domain',
      type: 'text',
      placeholder: 'e.g. target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'silent',
      label: 'Silent Mode',
      type: 'checkbox',
      defaultValue: false,
      description: 'Show only subdomains in output (-silent)'
    },
    {
      id: 'threads',
      label: 'Threads',
      type: 'number',
      defaultValue: 10,
      description: 'Number of threads to use (-t)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['subfinder'];
    if (values.domain) parts.push(`-d ${values.domain}`);
    if (values.silent) parts.push('-silent');
    if (values.threads) parts.push(`-t ${values.threads}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Subfinder Command Generator - Fast Passive Subdomain Recon',
    description: 'Create Subfinder commands for rapid passive subdomain discovery. Highly optimized for speed and integration with other recon tools.',
    keywords: ['subfinder generator', 'passive recon', 'subdomain finder', 'projectdiscovery', 'bug bounty tools']
  },
  additionalContent: [
    {
      title: 'Integrating Subfinder',
      content: 'Subfinder is designed to be pipe-friendly. You can pipe its output to other tools like httpx or naabu for a complete automated recon workflow: subfinder -d target.com | httpx'
    }
  ]
};
