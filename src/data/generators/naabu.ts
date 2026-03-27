import type { GeneratorConfig } from '../../types/generator';

export const naabuGenerator: GeneratorConfig = {
  id: 'naabu',
  name: 'Naabu',
  description: 'A fast port scanner focused on reliability and simplicity.',
  categoryId: 'network-scanning',
  exampleUsage: 'naabu -host 192.168.1.1 -p -',
  explanation: 'Naabu is a port scanning tool written in Go that allows you to enumerate valid ports for hosts in a fast and reliable manner.',
  fields: [
    {
      id: 'target',
      label: 'Target Host',
      type: 'text',
      placeholder: 'e.g. 192.168.1.1 or target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'ports',
      label: 'Ports',
      type: 'text',
      placeholder: 'e.g. 80,443 or - for all',
      defaultValue: '80,443,8080',
      description: 'Comma separated ports or range (-p)'
    },
    {
      id: 'rate',
      label: 'Rate',
      type: 'number',
      defaultValue: 1000,
      description: 'Packet rate (-rate)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['naabu'];
    if (values.target) parts.push(`-host ${values.target}`);
    if (values.ports) parts.push(`-p ${values.ports}`);
    if (values.rate) parts.push(`-rate ${values.rate}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Naabu Command Generator - Fast Port Scanner',
    description: 'Create Naabu commands for high-speed port enumeration. optimized for reliability and simplicity in network reconnaissance.',
    keywords: ['naabu generator', 'port scanner go', 'fast port scan', 'projectdiscovery naabu', 'network recon']
  },
  additionalContent: [
    {
      title: 'Why Naabu?',
      content: `Naabu is a port scanning tool written in Go that focuses on speed and accuracy. It's often used in automated recon pipelines because of its efficiency and simple CLI.`
    }
  ]
};
