import type { GeneratorConfig } from '../../types/generator';

export const shodanGenerator: GeneratorConfig = {
  id: 'shodan',
  name: 'Shodan CLI',
  description: 'The search engine for Internet-connected devices.',
  categoryId: 'osint',
  exampleUsage: 'shodan search --fields ip_str,port,org "Apache"',
  explanation: 'Shodan is the world\'s first search engine for Internet-connected devices. The CLI allows you to interact with Shodan from your terminal.',
  fields: [
    {
      id: 'query',
      label: 'Search Query',
      type: 'text',
      placeholder: 'e.g. Apache, port:22',
      required: true,
      defaultValue: ''
    },
    {
      id: 'limit',
      label: 'Limit',
      type: 'number',
      defaultValue: 10,
      description: 'Number of results to return'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['shodan', values.queryType || 'search'];
    if (values.query) parts.push(values.query);
    if (values.limit) parts.push(`--limit ${values.limit}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Shodan CLI Command Generator - Search the IoT Ecosystem',
    description: 'Generate Shodan CLI commands to search for Internet-connected devices. Find open ports, services, and vulnerabilities across the entire internet.',
    keywords: ['shodan cli generator', 'iot search engine', 'find devices shodan', 'shodan syntax', 'cybersecurity search']
  },
  additionalContent: [
    {
      title: 'The Search Engine for Devices',
      content: `Shodan is a search engine that lets users find specific types of computers connected to the internet using a variety of filters. It's an essential tool for understanding the global attack surface.`
    }
  ]
};
