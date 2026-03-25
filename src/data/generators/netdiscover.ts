import type { GeneratorConfig } from '../../types/generator';

export const netdiscoverGenerator: GeneratorConfig = {
  id: 'netdiscover',
  name: 'Netdiscover',
  description: 'Active/passive network address scanner using ARP requests.',
  categoryId: 'network-scanning',
  exampleUsage: 'netdiscover -r 192.168.1.0/24',
  explanation: 'Netdiscover is an active/passive ARP reconnaissance tool, built to be used in wireless networks without DHCP servers.',
  fields: [
    {
      id: 'range',
      label: 'Network Range',
      type: 'text',
      placeholder: 'e.g. 192.168.1.0/24',
      required: true,
      defaultValue: ''
    },
    {
      id: 'passive',
      label: 'Passive Mode',
      type: 'checkbox',
      defaultValue: false,
      description: 'Enable passive mode (-p)'
    },
    {
      id: 'interface',
      label: 'Interface',
      type: 'text',
      placeholder: 'e.g. eth0, wlan0',
      defaultValue: '',
      description: 'Bind to a specific interface (-i)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['netdiscover'];
    if (values.range) parts.push(`-r ${values.range}`);
    if (values.passive) parts.push('-p');
    if (values.interface) parts.push(`-i ${values.interface}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Netdiscover Command Generator - ARP Network Scanner',
    description: 'Generate Netdiscover commands for active and passive network discovery using ARP. Excellent for local network reconnaissance.',
    keywords: ['netdiscover generator', 'arp scanner', 'local network discovery', 'wifi recon', 'internal network scan']
  },
  additionalContent: [
    {
      title: 'Active vs Passive Scanning',
      content: `Active scanning sends ARP requests to the network. Passive mode quietly listens for ARP traffic, making it completely undetectable to most systems on the network.`
    }
  ]
};
