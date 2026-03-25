import type { GeneratorConfig } from '../../types/generator';

export const theHarvesterGenerator: GeneratorConfig = {
  id: 'theharvester',
  name: 'theHarvester',
  description: 'E-mails, subdomains and names Harvester.',
  categoryId: 'osint',
  exampleUsage: 'theHarvester -d target.com -b google',
  explanation: 'theHarvester is a tool for gathering subdomain names, e-mail addresses, virtual hosts, open ports/ banners, and employee names from different public sources.',
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
      id: 'source',
      label: 'Source',
      type: 'select',
      options: [
        { label: 'Google', value: 'google' },
        { label: 'Bing', value: 'bing' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'All', value: 'all' }
      ],
      defaultValue: 'google'
    },
    {
      id: 'limit',
      label: 'Limit',
      type: 'number',
      defaultValue: 500,
      description: 'Limit the number of search results (-l)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['theHarvester'];
    if (values.domain) parts.push(`-d ${values.domain}`);
    if (values.limit) parts.push(`-l ${values.limit}`);
    if (values.source) parts.push(`-b ${values.source}`);
    return parts.join(' ');
  },
  seo: {
    title: 'theHarvester Command Generator - OSINT Email & Domain Recon',
    description: 'Generate theHarvester commands to gather emails, subdomains, hosts, and employee names from various public sources.',
    keywords: ['theHarvester generator', 'osint recon', 'email harvester', 'domain gathering', 'theHarvester syntax']
  },
  additionalContent: [
    {
      title: 'OSINT Gathering',
      content: `theHarvester is a tool for gathering subdomain names, e-mail addresses, virtual hosts, open ports/ banners, and employee names from different public sources like search engines, PGP key servers and SHODAN database.`
    }
  ]
};
