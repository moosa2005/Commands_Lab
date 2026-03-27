import type { GeneratorConfig } from '../../types/generator';

export const amassGenerator: GeneratorConfig = {
  id: 'amass',
  name: 'Amass',
  description: 'In-depth Asset Discovery and Network Mapping.',
  categoryId: 'network-scanning',
  exampleUsage: 'amass enum -d target.com',
  explanation: 'OWASP Amass is a tool for professional information gathering and network mapping. It performs active and passive discovery of subdomains and IP addresses.',
  fields: [
    {
      id: 'subcommand',
      label: 'Subcommand',
      type: 'select',
      options: [
        { label: 'Enumeration (enum)', value: 'enum' },
        { label: 'Intelligence (intel)', value: 'intel' },
        { label: 'Visualization (viz)', value: 'viz' },
        { label: 'Tracking (track)', value: 'track' }
      ],
      defaultValue: 'enum'
    },
    {
      id: 'domain',
      label: 'Domain',
      type: 'text',
      placeholder: 'e.g. target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'passive',
      label: 'Passive Mode',
      type: 'checkbox',
      defaultValue: false,
      description: 'Perform passive discovery (-passive)'
    },
    {
      id: 'active',
      label: 'Active Mode',
      type: 'checkbox',
      defaultValue: false,
      description: 'Enable active enumeration (-active)'
    },
    {
      id: 'brute',
      label: 'Brute Force',
      type: 'checkbox',
      defaultValue: false,
      description: 'Enable brute forcing (-brute)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['amass', values.subcommand || 'enum'];
    if (values.domain) parts.push(`-d ${values.domain}`);
    if (values.passive) parts.push('-passive');
    if (values.active) parts.push('-active');
    if (values.brute) parts.push('-brute');
    return parts.join(' ');
  },
  seo: {
    title: 'Amass Command Generator - Asset Discovery & Network Mapping',
    description: 'Generate OWASP Amass commands for in-depth subdomain enumeration and attack surface mapping. Supports passive and active discovery modes.',
    keywords: ['amass generator', 'subdomain enumeration', 'asset discovery', 'owasp amass', 'attack surface mapping', 'osint recon']
  },
  additionalContent: [
    {
      title: 'Passive vs Active Enumeration',
      content: 'Passive mode relies on external data sources (like search engines and certificate transparency logs) without touching the target. Active mode performs DNS zone transfers and certificate pulling, which is more thorough but detectable.'
    }
  ]
};
