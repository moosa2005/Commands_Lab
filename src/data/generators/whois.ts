import type { GeneratorConfig } from '../../types/generator';

export const whoisGenerator: GeneratorConfig = {
  id: 'whois',
  name: 'Whois',
  description: 'Query WHOIS databases for domain information.',
  categoryId: 'network-scanning',
  exampleUsage: 'whois target.com',
  explanation: 'Whois is a query and response protocol that is widely used for querying databases that store the registered users or assignees of an Internet resource.',
  fields: [
    {
      id: 'target',
      label: 'Target Domain/IP',
      type: 'text',
      placeholder: 'e.g. target.com',
      required: true,
      defaultValue: ''
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['whois'];
    if (values.target) parts.push(values.target);
    return parts.join(' ');
  },
  seo: {
    title: 'Whois Command Generator - Domain & IP Info Lookup',
    description: 'Generate Whois commands to find ownership and registration details for domains and IP addresses. Essential OSINT tool.',
    keywords: ['whois generator', 'domain lookup', 'ip whois', 'domain registration info', 'osint tools']
  },
  additionalContent: [
    {
      title: 'What is WHOIS?',
      content: `WHOIS is a database that stores the registered users or assignees of an Internet resource, such as a domain name, an IP address block, or an autonomous system.`
    }
  ]
};
