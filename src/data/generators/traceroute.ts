import type { GeneratorConfig } from '../../types/generator';

export const tracerouteGenerator: GeneratorConfig = {
  id: 'traceroute',
  name: 'Traceroute',
  description: 'Trace the path packets take to a network host.',
  categoryId: 'network-scanning',
  exampleUsage: 'traceroute target.com',
  explanation: 'Traceroute is a computer network diagnostic command for displaying the route (path) and measuring transit delays of packets across an Internet Protocol (IP) network.',
  fields: [
    {
      id: 'target',
      label: 'Target Host',
      type: 'text',
      placeholder: 'e.g. 8.8.8.8 or target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'method',
      label: 'Method',
      type: 'select',
      options: [
        { label: 'UDP (Default)', value: '' },
        { label: 'ICMP Echo (-I)', value: '-I' },
        { label: 'TCP SYN (-T)', value: '-T' }
      ],
      defaultValue: ''
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['traceroute'];
    if (values.method) parts.push(values.method);
    if (values.target) parts.push(values.target);
    return parts.join(' ');
  },
  seo: {
    title: 'Traceroute Command Generator - Network Path Analysis',
    description: 'Generate Traceroute commands to map the path packets take to reach a destination host or IP. diagnose network hops and latency.',
    keywords: ['traceroute generator', 'mtr command', 'network path trace', 'hop discovery', 'network troubleshooting']
  },
  additionalContent: [
    {
      title: 'How Traceroute Works',
      content: `Traceroute uses the TTL (Time to Live) field in IP packets to map the route. Each hop increments the TTL until the packet reaches the destination, revealing each router along the way.`
    }
  ]
};
