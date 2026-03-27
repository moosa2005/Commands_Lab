import type { GeneratorConfig } from '../../types/generator';

export const dnsxGenerator: GeneratorConfig = {
  id: 'dnsx',
  name: 'DNSx',
  description: 'Fast and multi-purpose DNS toolkit.',
  categoryId: 'network-scanning',
  exampleUsage: 'dnsx -d target.com -a -aaaa -cname -ns -mx',
  explanation: 'dnsx is a multi-purpose DNS toolkit that allows you to perform DNS queries of your choice with a focus on speed and accuracy.',
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
      id: 'queryType',
      label: 'Query Types',
      type: 'checkbox',
      defaultValue: true,
      description: 'Request all DNS records (-a, -aaaa, -cname, etc.)'
    },
    {
      id: 'resolver',
      label: 'Resolver',
      type: 'text',
      placeholder: 'e.g. 1.1.1.1, 8.8.8.8',
      defaultValue: '',
      description: 'Use custom DNS resolvers'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['dnsx'];
    if (values.domain) parts.push(`-d ${values.domain}`);
    if (values.queryType) parts.push('-a -aaaa -cname -ns -mx -txt -ptr');
    if (values.resolver) parts.push(`-r ${values.resolver}`);
    return parts.join(' ');
  },
  seo: {
    title: 'DNSx Command Generator - Multi-purpose DNS Toolkit',
    description: 'Generate DNSx commands for ultra-fast DNS resolution and record querying. Perfect for validating subdomains and finding IP addresses.',
    keywords: ['dnsx generator', 'dns resolution', 'query dns records', 'fast dns checker', 'projectdiscovery dnsx']
  },
  additionalContent: [
    {
      title: 'Advanced DNS Probing',
      content: 'DNSx is more than a resolver. It can perform wildcard checks, response time analysis, and massive scale DNS resolution with ease.'
    }
  ]
};
